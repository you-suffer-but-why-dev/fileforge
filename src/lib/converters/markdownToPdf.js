// markdownToPdf.js — render Markdown to a simple PDF via pdf-lib (text flow)
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function markdownToPdf(file, onProgress) {
  const md = await file.text();
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const size = 11;
  const margin = 48;
  const maxW = 612 - margin * 2;
  let page = doc.addPage([612, 792]);
  let y = 792 - margin;
  const lines = md.split('\n');
  let total = lines.length;
  for (let i = 0; i < total; i++) {
    let line = lines[i].replace(/^#+\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();
    if (!line) { y -= size * 0.6; continue; }
    const isHead = /^#{1,3}\s/.test(lines[i]);
    const f = isHead ? bold : font;
    const fs = isHead ? size + 3 : size;
    // wrap
    const words = line.split(' ');
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (f.widthOfTextAtSize(test, fs) > maxW) {
        if (y < margin) { page = doc.addPage([612, 792]); y = 792 - margin; }
        page.drawText(cur, { x: margin, y, size: fs, font: f, color: rgb(0.1, 0.1, 0.1) });
        y -= fs * 1.4;
        cur = w;
      } else cur = test;
    }
    if (cur) {
      if (y < margin) { page = doc.addPage([612, 792]); y = 792 - margin; }
      page.drawText(cur, { x: margin, y, size: fs, font: f, color: rgb(0.1, 0.1, 0.1) });
      y -= fs * 1.4;
    }
    onProgress?.((i + 1) / total);
  }
  const bytes = await doc.save();
  return { type: 'blob', blob: new Blob([bytes], { type: 'application/pdf' }), name: file.name.replace(/\.md$/i, '') + '.pdf' };
}
