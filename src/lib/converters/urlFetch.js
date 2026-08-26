// urlFetch.js — fetch a URL and return as downloadable blob
export async function urlFetch(file, onProgress) {
  const url = (await file.text()).trim();
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const blob = await res.blob();
  const name = url.split('/').pop().split('?')[0] || 'download';
  onProgress?.(1);
  return { type: 'blob', blob, name };
}
