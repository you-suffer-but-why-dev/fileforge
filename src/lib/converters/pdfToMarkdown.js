// pdfToMarkdown.js — extract text per page, join as Markdown (pdf.js lazy)
export async function pdfToMarkdown(file, onProgress) {
  const pdfjsLib = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

  const buf = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buf }).promise;
  const parts = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const txt = await page.getTextContent();
    const text = txt.items.map((t) => t.str).join(' ');
    parts.push(`## Page ${i}\n\n${text}\n`);
    onProgress?.(i / doc.numPages);
  }
  const md = `# ${file.name}\n\n` + parts.join('\n');
  return { type: 'text', text: md, name: file.name.replace(/\.pdf$/i, '') + '.md' };
}
