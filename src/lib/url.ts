const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const ABSOLUTE_OR_SPECIAL_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

export function withoutBase(pathname: string) {
  if (!base) return pathname;
  if (pathname === base) return '/';
  return pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
}

export function withBase(url: string) {
  if (!url || ABSOLUTE_OR_SPECIAL_URL.test(url)) return url;

  const normalized = url.startsWith('/') ? url : `/${url}`;
  if (!base || normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}
