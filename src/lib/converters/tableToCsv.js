// tableToCsv.js — pull text, naive table rows -> CSV (pdf.js lazy)
function escapeCsv(s) {
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

export async function tableToCsv(file, onProgress) {
  const pdfjsLib = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

  const buf = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buf }).promise;
  const rows = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const txt = await page.getTextContent();
    txt.items.forEach((t) => {
      const line = t.str.trim();
      if (line) rows.push(line.split(/\s{2,}|\t/).map(escapeCsv).join(','));
    });
    onProgress?.(i / doc.numPages);
  }
  const csv = rows.join('\n');
  return { type: 'text', text: csv, name: file.name.replace(/\.pdf$/i, '') + '.csv' };
}
