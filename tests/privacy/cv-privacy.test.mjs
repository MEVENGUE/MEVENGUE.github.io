import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const result = spawnSync(process.execPath, [join(root, 'scripts/cv-privacy-check.mjs')], {
  encoding: 'utf8',
});

assert.equal(result.status, 0, result.stdout || result.stderr);

const report = JSON.parse(result.stdout);
assert.equal(report.ok, true);
assert.equal(report.hardFails, 0);

const publicCv = JSON.parse(readFileSync(join(root, 'src/cv/data/cv.public.json'), 'utf8'));
assert.equal(publicCv.approvals.phone, false);
assert.match(publicCv.contacts.phone, /\[PHONE_PUBLIC_APPROVED\]/);
assert.ok(!('street' in (publicCv.contacts || {})));
assert.ok(!('address' in publicCv));

console.log('cv-privacy.test.mjs: ok');
