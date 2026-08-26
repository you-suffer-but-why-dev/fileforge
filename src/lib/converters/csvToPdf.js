// csvToPdf.js — render CSV rows into a simple PDF table via pdf-lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function csvToPdf(file, onProgress) {
  const csv = await file.text();
  const rows = csv.split('\n').filter((r) => r.trim()).map((r) => r.split(',').map((c) => c.trim()));
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const margin = 40;
  const pageW = 612, pageH = 792;
  let page = doc.addPage([pageW, pageH]);
  let y = pageH - margin;
  const fs = 9;
  const colGap = 10;
  const colW = (pageW - margin * 2 - colGap * (rows[0]?.length - 1 || 1)) / (rows[0]?.length || 1);
  const total = rows.length;
  for (let i = 0; i < total; i++) {
    if (y < margin + fs) { page = doc.addPage([pageW, pageH]); y = pageH - margin; }
    let x = margin;
    for (const cell of rows[i]) {
      let t = cell;
      while (font.widthOfTextAtSize(t, fs) > colW) t = t.slice(0, -1);
      page.drawText(t, { x, y, size: fs, font, color: rgb(0.1, 0.1, 0.1) });
      x += colW + colGap;
    }
    y -= fs * 1.6;
    onProgress?.((i + 1) / total);
  }
  const bytes = await doc.save();
  return { type: 'blob', blob: new Blob([bytes], { type: 'application/pdf' }), name: file.name.replace(/\.csv$/i, '') + '.pdf' };
}
