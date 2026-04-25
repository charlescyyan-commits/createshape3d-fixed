import DOMPurify from 'dompurify';

export function sanitizeHtml(input: string | null | undefined) {
  if (!input) return '';
  try {
    return DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
  } catch {
    return '';
  }
}

