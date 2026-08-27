// urlFetch.js — fetch a URL and return as downloadable blob (SSRF-hardened)
export async function urlFetch(file, onProgress) {
  const raw = (await file.text()).trim();
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('URL tidak valid');
  }
  // Only http/https, block internal/private targets
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Hanya http(s) yang diizinkan');
  }
  const host = url.hostname.toLowerCase();
  if (
    host === 'localhost' || host === '0.0.0.0' || host.endsWith('.local') ||
    host.endsWith('.internal') || host.endsWith('.svc') ||
    /^127\./.test(host) || /^10\./.test(host) ||
    /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    host === '[::1]' || host.startsWith('169.254.')
  ) {
    throw new Error('Alamat internal/private diblokir');
  }
  const res = await fetch(url, { redirect: 'error' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const blob = await res.blob();
  const name = (url.pathname.split('/').pop().split('?')[0] || 'download').replace(/[^\w.\-]/g, '_') || 'download';
  onProgress?.(1);
  return { type: 'blob', blob, name };
}
