import publicCv from '../data/cv.public.json';
import schema from '../data/cv.public.schema.json';

export type PublicCv = typeof publicCv;
export type CvLocale = 'fr' | 'en';

const PLACEHOLDER = /\[(EMAIL|PHONE|LINKEDIN|GITHUB)_PUBLIC_APPROVED\]/;
const FORBIDDEN_KEYS = new Set([
  'street',
  'address',
  'postal',
  'birth',
  'birthDate',
  'dateOfBirth',
  'ssn',
  'passport',
  'iban',
  'signature',
]);

function assertAllowlist(value: unknown, path: string, allowed: Set<string> | null, findings: string[]) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      const next = path ? `${path}.${key}` : key;
      if (FORBIDDEN_KEYS.has(key)) {
        findings.push(`forbidden-field:${next}`);
      }
      if (allowed && path === '' && !allowed.has(key)) {
        findings.push(`unknown-root-field:${key}`);
      }
      assertAllowlist(child, next, null, findings);
    }
  }
}

export function validatePublicCv(data: PublicCv = publicCv) {
  const findings: string[] = [];
  const rootKeys = new Set(Object.keys((schema as { properties: Record<string, unknown> }).properties));
  assertAllowlist(data, '', rootKeys, findings);

  if (!data.approvals.email && data.contacts.email && !PLACEHOLDER.test(data.contacts.email)) {
    findings.push('unapproved-contact:email');
  }
  if (!data.approvals.phone) {
    if (data.contacts.phone && !PLACEHOLDER.test(data.contacts.phone)) {
      findings.push('unapproved-contact:phone');
    }
  }
  if (!data.approvals.linkedin && data.contacts.linkedin && !PLACEHOLDER.test(data.contacts.linkedin)) {
    findings.push('unapproved-contact:linkedin');
  }
  if (!data.approvals.github && data.contacts.github && !PLACEHOLDER.test(data.contacts.github)) {
    findings.push('unapproved-contact:github');
  }

  const phoneLooksReal = /\+?\d[\d\s().-]{7,}\d/.test(data.contacts.phone || '');
  if (phoneLooksReal && (!data.approvals.phone || PLACEHOLDER.test(data.contacts.phone))) {
    findings.push('phone-pattern-without-approval');
  }

  return { ok: findings.length === 0, findings };
}

export function resolvePublicContacts(data: PublicCv = publicCv) {
  const contacts: { label: string; href?: string; value: string }[] = [];
  if (data.approvals.email && data.contacts.email && !PLACEHOLDER.test(data.contacts.email)) {
    contacts.push({ label: 'Email', href: `mailto:${data.contacts.email}`, value: data.contacts.email });
  }
  if (data.approvals.phone && data.contacts.phone && !PLACEHOLDER.test(data.contacts.phone)) {
    contacts.push({ label: 'Phone', href: `tel:${data.contacts.phone.replace(/\s+/g, '')}`, value: data.contacts.phone });
  }
  if (data.approvals.location && data.contacts.location) {
    contacts.push({ label: 'Location', value: data.contacts.location });
  }
  if (data.approvals.linkedin && data.contacts.linkedin && !PLACEHOLDER.test(data.contacts.linkedin)) {
    contacts.push({ label: 'LinkedIn', href: data.contacts.linkedin, value: 'LinkedIn' });
  }
  if (data.approvals.github && data.contacts.github && !PLACEHOLDER.test(data.contacts.github)) {
    contacts.push({ label: 'GitHub', href: data.contacts.github, value: 'GitHub' });
  }
  if (data.contacts.portfolio) {
    contacts.push({ label: 'Portfolio', href: data.contacts.portfolio, value: 'Portfolio' });
  }
  return contacts;
}

export function getPublicCv() {
  const validation = validatePublicCv(publicCv);
  if (!validation.ok) {
    throw new Error(`Public CV privacy validation failed: ${validation.findings.join(', ')}`);
  }
  return publicCv;
}
