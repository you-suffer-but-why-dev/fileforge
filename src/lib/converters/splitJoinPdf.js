// splitJoinPdf.js — split into per-page PDFs (zip) OR join many PDFs into one
import { PDFDocument } from 'pdf-lib';
import * as JSZip from 'jszip';

export async function splitPdf(file, onProgress) {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes);
  const zip = new JSZip();
  const n = src.getPageCount();
  for (let i = 0; i < n; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    const b = await out.save();
    zip.file(`page-${String(i + 1).padStart(3, '0')}.pdf`, b);
    onProgress?.((i + 1) / n);
  }
  const blob = await zip.generateAsync({ type: 'blob' });
  return { type: 'zip', blob, name: file.name.replace(/\.pdf$/i, '') + '-split.zip' };
}

export async function joinPdf(files, onProgress) {
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const src = await PDFDocument.load(await files[i].arrayBuffer());
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
    onProgress?.((i + 1) / files.length);
  }
  const bytes = await out.save();
  return { type: 'blob', blob: new Blob([bytes], { type: 'application/pdf' }), name: 'merged.pdf' };
}
