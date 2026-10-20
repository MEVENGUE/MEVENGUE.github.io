#!/usr/bin/env node
/**
 * Privacy gate for the public CV.
 * Reports filenames / finding codes only — never prints matched secret values.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const publicCvPath = join(root, 'src/cv/data/cv.public.json');
const schemaPath = join(root, 'src/cv/data/cv.public.schema.json');
const privateDir = join(root, 'private');
const findings = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function add(code, file) {
  findings.push({ code, file: relative(root, file).replaceAll('\\', '/') });
}

const publicCv = JSON.parse(readFileSync(publicCvPath, 'utf8'));
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const allowedRoot = new Set(Object.keys(schema.properties || {}));

for (const key of Object.keys(publicCv)) {
  if (!allowedRoot.has(key)) add(`unknown-root-field:${key}`, publicCvPath);
}

const forbiddenKeys = ['street', 'address', 'postal', 'birth', 'passport', 'iban', 'ssn', 'signature'];
function scanObject(value, path, file) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanObject(item, `${path}[${index}]`, file));
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    const next = path ? `${path}.${key}` : key;
    if (forbiddenKeys.includes(key)) add(`forbidden-field:${next}`, file);
    scanObject(child, next, file);
  }
}
scanObject(publicCv, '', publicCvPath);

if (!publicCv.approvals?.phone) {
  const phone = publicCv.contacts?.phone || '';
  if (phone && !/\[PHONE_PUBLIC_APPROVED\]/.test(phone) && /\d{6,}/.test(phone.replace(/\D/g, ''))) {
    add('unapproved-phone-present', publicCvPath);
  }
}

const publicFiles = [
  ...walk(join(root, 'src/cv')),
  ...walk(join(root, 'src/pages')),
].filter((file) => !file.includes(`${join('src', 'cv', 'output')}`));

for (const file of publicFiles) {
  if (!/\.(astro|ts|tsx|js|mjs|css|json)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  if (
    /import\s+[^;]*cv\.private\.json/.test(text)
    || /from\s+['"][^'"]*\/private\//.test(text)
    || /require\([^)]*\/private\//.test(text)
  ) {
    add('private-import-in-public-code', file);
  }
  if (/VITE_|NEXT_PUBLIC_|REACT_APP_/.test(text) && /phone|address|street/i.test(text)) {
    add('client-env-sensitive-pattern', file);
  }
}

if (existsSync(join(privateDir, 'cv.private.json'))) {
  // Presence is fine locally; ensure it is gitignored conceptually.
  add('info:private-cv-present-locally', join(privateDir, 'cv.private.json'));
}

const distCv = join(root, 'dist/cv');
if (existsSync(distCv)) {
  for (const file of walk(distCv)) {
    if (/\.pdf$/i.test(file)) add('info:example-cv-pdf-in-dist-gitignored', file);
  }
}

const hardFails = findings.filter((item) => !item.code.startsWith('info:'));
const report = {
  ok: hardFails.length === 0,
  hardFails: hardFails.length,
  findings,
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exit(1);
