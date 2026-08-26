// pdfToPng.js — render every PDF page to PNG (pdf.js lazy-loaded, browser only)
import * as JSZip from 'jszip';

export async function pdfToPng(file, onProgress) {
  const pdfjsLib = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

  const buf = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buf }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    pages.push(canvas.toDataURL('image/png'));
    onProgress?.(i / doc.numPages);
  }
  if (pages.length === 1) return { type: 'single', dataUrl: pages[0], name: file.name.replace(/\.pdf$/i, '') + '.png' };
  const zip = new JSZip();
  pages.forEach((p, idx) => zip.file(`page-${String(idx + 1).padStart(3, '0')}.png`, p.split(',')[1], { base64: true }));
  const blob = await zip.generateAsync({ type: 'blob' });
  return { type: 'zip', blob, name: file.name.replace(/\.pdf$/i, '') + '-pages.zip' };
}
