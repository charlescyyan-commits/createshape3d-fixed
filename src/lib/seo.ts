export function stripHtmlToText(input: string) {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncateText(input: string, maxLen: number) {
  const s = input.trim();
  if (s.length <= maxLen) return s;
  return s.slice(0, Math.max(0, maxLen - 1)).trimEnd() + '…';
}

export function getOrigin() {
  return typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
}

export function buildCanonical(pathname: string) {
  const origin = getOrigin();
  if (!origin) return pathname;
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${origin}${p}`;
}

