// epubToTxt.js — unzip epub, concat all XHTML/HTML text content
import * as JSZip from 'jszip';

export async function epubToTxt(file, onProgress) {
  if (file.size > 100 * 1024 * 1024) throw new Error('File terlalu besar (>100MB)');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const files = Object.values(zip.files).filter(
    (f) => !f.dir && /\.(x?html?|xml)$/i.test(f.name)
  );
  const chunks = [];
  for (let i = 0; i < files.length; i++) {
    const html = await files[i].async('string');
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) chunks.push(text);
    onProgress?.((i + 1) / files.length);
  }
  const txt = chunks.join('\n\n');
  return { type: 'text', text: txt, name: file.name.replace(/\.epub$/i, '') + '.txt' };
}
