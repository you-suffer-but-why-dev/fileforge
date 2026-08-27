// imageToPdf.js — stitch multiple images into one PDF
import { PDFDocument } from 'pdf-lib';

export async function imageToPdf(files, onProgress) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const arr = await files[i].arrayBuffer();
    const type = files[i].type || '';
    let img;
    if (type.includes('png')) img = await doc.embedPng(arr);
    else if (type.includes('webp')) img = await doc.embedPng(arr); // webp -> png embedding fallback
    else if (type.includes('gif')) img = await doc.embedPng(arr);
    else img = await doc.embedJpg(arr);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    onProgress?.((i + 1) / files.length);
  }
  const bytes = await doc.save();
  return { type: 'blob', blob: new Blob([bytes], { type: 'application/pdf' }), name: 'images.pdf' };
}
