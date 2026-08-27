<script>
  import { onMount } from 'svelte';
  import { pdfToPng } from '$lib/converters/pdfToPng.js';
  import { imageToPdf } from '$lib/converters/imageToPdf.js';
  import { splitPdf, joinPdf } from '$lib/converters/splitJoinPdf.js';
  import { pdfToMarkdown } from '$lib/converters/pdfToMarkdown.js';
  import { tableToCsv } from '$lib/converters/tableToCsv.js';
  import { epubToTxt } from '$lib/converters/epubToTxt.js';
  import { markdownToPdf } from '$lib/converters/markdownToPdf.js';
  import { txtToEpub } from '$lib/converters/txtToEpub.js';
  import { csvToPdf } from '$lib/converters/csvToPdf.js';
  import { imageProcess, imageRotate } from '$lib/converters/imageProcess.js';
  import { jsonToCsv, csvToJson, jsonToYaml, yamlToJson, base64Encode, base64Decode } from '$lib/converters/dataConvert.js';
  import { qrGen } from '$lib/converters/qrGen.js';
  import { urlFetch } from '$lib/converters/urlFetch.js';

  let { tool = 'pdfmd', onclose } = $props();

  // expected extensions per tool, for client-side guard
  const allowExt = {
    pdfmd: ['pdf'], png: ['pdf'], split: ['pdf'], imgpdf: ['png','jpg','jpeg','webp','gif'], csv: ['pdf'],
    epub: ['epub'], mdtopdf: ['md','markdown','txt'], txttoepub: ['txt'], csvtopdf: ['csv'],
    imgcomp: ['png','jpg','jpeg','webp','gif'], imgconv: ['png','jpg','jpeg','webp','gif'], imgrot: ['png','jpg','jpeg','webp','gif'],
    jsoncsv: ['json'], csvjson: ['csv'], jsonyaml: ['json','yaml','yml'], b64: null, qr: ['txt'], urldl: ['txt']
  };

  const meta = {
    pdfmd: { title: 'PDF → Markdown', accept: '.pdf', multiple: false, desc: 'Extract text from a PDF into Markdown.' },
    split: { title: 'Split / Join PDF', accept: '.pdf', multiple: true, desc: 'Upload 1 PDF to split, or many to join into one.' },
    png: { title: 'PDF → PNG', accept: '.pdf', multiple: false, desc: 'Render each PDF page as a PNG image.' },
    imgpdf: { title: 'Image → PDF', accept: 'image/*', multiple: true, desc: 'Stitch images into a single PDF.' },
    csv: { title: 'Table → CSV', accept: '.pdf', multiple: false, desc: 'Pull tabular text out of a PDF into CSV.' },
    epub: { title: 'EPUB → TXT', accept: '.epub', multiple: false, desc: 'Strip an ebook down to plain text.' },
    mdtopdf: { title: 'Markdown → PDF', accept: '.md,.markdown,.txt', multiple: false, desc: 'Render Markdown into a clean PDF.' },
    txttoepub: { title: 'TXT → EPUB', accept: '.txt', multiple: false, desc: 'Wrap plain text into an ebook.' },
    csvtopdf: { title: 'CSV → PDF', accept: '.csv', multiple: false, desc: 'Render a CSV table as a PDF.' },
    imgcomp: { title: 'Image Compress', accept: 'image/*', multiple: false, desc: 'Resize + compress to JPEG/WebP.' },
    imgconv: { title: 'Image Convert', accept: 'image/*', multiple: false, desc: 'Convert between PNG/JPG/WebP.' },
    imgrot: { title: 'Image Rotate', accept: 'image/*', multiple: false, desc: 'Rotate 90/180/270 degrees.' },
    jsoncsv: { title: 'JSON → CSV', accept: '.json', multiple: false, desc: 'Flatten JSON array into CSV.' },
    csvjson: { title: 'CSV → JSON', accept: '.csv', multiple: false, desc: 'Parse CSV into JSON.' },
    jsonyaml: { title: 'JSON ↔ YAML', accept: '.json,.yaml,.yml', multiple: false, desc: 'Convert between JSON and YAML.' },
    b64: { title: 'Base64 Encode/Decode', accept: '*', multiple: false, desc: 'Encode file to base64 or decode.' },
    qr: { title: 'QR Code Generator', accept: '.txt', multiple: false, desc: 'Text or URL -> QR PNG.' },
    urldl: { title: 'URL → Download', accept: '.txt', multiple: false, desc: 'Fetch a URL and download it.' }
  };
  const m = $derived(meta[tool] || meta.pdfmd);

  let files = $state([]);
  let busy = $state(false);
  let progress = $state(0);
  let error = $state('');

  onMount(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = '');
  });

  function extOf(name) { return (name.split('.').pop() || '').toLowerCase(); }

  function onPick(e) {
    files = Array.from(e.target.files || []);
    error = '';
  }
  function onDrop(e) {
    e.preventDefault();
    files = Array.from(e.dataTransfer?.files || []);
    error = '';
  }

  function validate() {
    const exts = allowExt[tool];
    if (!exts) return true; // no restriction (b64, etc.)
    if (!files.length) { error = 'Pilih file dulu.'; return false; }
    const bad = files.find((f) => !exts.includes(extOf(f.name)));
    if (bad) { error = `Tipe file tidak didukung: ${bad.name}`; return false; }
    return true;
  }

  async function run() {
    if (!validate()) return;
    busy = true; progress = 0; error = '';
    try {
      let res;
      if (tool === 'pdfmd') res = await pdfToMarkdown(files[0], (p) => (progress = p));
      else if (tool === 'png') res = await pdfToPng(files[0], (p) => (progress = p));
      else if (tool === 'split') res = files.length > 1 ? await joinPdf(files, (p) => (progress = p)) : await splitPdf(files[0], (p) => (progress = p));
      else if (tool === 'imgpdf') res = await imageToPdf(files, (p) => (progress = p));
      else if (tool === 'csv') res = await tableToCsv(files[0], (p) => (progress = p));
      else if (tool === 'epub') res = await epubToTxt(files[0], (p) => (progress = p));
      else if (tool === 'mdtopdf') res = await markdownToPdf(files[0], (p) => (progress = p));
      else if (tool === 'txttoepub') res = await txtToEpub(files[0], (p) => (progress = p));
      else if (tool === 'csvtopdf') res = await csvToPdf(files[0], (p) => (progress = p));
      else if (tool === 'imgcomp') res = await imageProcess(files[0], { maxDim: 1600, quality: 0.8, format: 'image/jpeg' }, (p) => (progress = p));
      else if (tool === 'imgconv') res = await imageProcess(files[0], { maxDim: 4000, quality: 0.95, format: 'image/webp' }, (p) => (progress = p));
      else if (tool === 'imgrot') res = await imageRotate(files[0], 90, (p) => (progress = p));
      else if (tool === 'jsoncsv') res = await jsonToCsv(files[0], (p) => (progress = p));
      else if (tool === 'csvjson') res = await csvToJson(files[0], (p) => (progress = p));
      else if (tool === 'jsonyaml') res = (files[0].name.match(/\.ya?ml$/i) ? await yamlToJson(files[0], (p) => (progress = p)) : await jsonToYaml(files[0], (p) => (progress = p)));
      else if (tool === 'b64') res = (files[0].name.includes('.b64') ? await base64Decode(files[0], (p) => (progress = p)) : await base64Encode(files[0], (p) => (progress = p)));
      else if (tool === 'qr') res = await qrGen(files[0], (p) => (progress = p));
      else if (tool === 'urldl') res = await urlFetch(files[0], (p) => (progress = p));
      download(res);
    } catch (e) {
      error = 'Gagal: ' + (e?.message || e);
    } finally {
      busy = false;
    }
  }

  function safeName(n) {
    const s = String(n || 'download');
    const base = s.split(/[\\/]/).pop();
    return base.replace(/[^\w.\-]/g, '_') || 'download';
  }

  function download(res) {
    if (!res) { error = 'Tidak ada hasil.'; return; }
    let url, name = safeName(res.name);
    if (res.type === 'text') {
      url = URL.createObjectURL(new Blob([res.text], { type: 'text/plain' }));
    } else if (res.type === 'blob' || res.type === 'zip') {
      url = URL.createObjectURL(res.blob);
    } else if (res.type === 'single') {
      url = res.dataUrl;
    } else {
      error = 'Format hasil tidak dikenal.'; return;
    }
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  function close() { onclose?.(); }
</script>

<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" role="button" tabindex="0" aria-label="Close" onclick={close} onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && close()}></div>
  <div class="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#121214] p-6">
    <div class="flex items-start justify-between">
      <h3 class="text-lg font-semibold text-[#FAFAFA]">{m.title}</h3>
      <button class="text-[#8A8A93] hover:text-[#FAFAFA]" onclick={close} aria-label="Close">✕</button>
    </div>
    <p class="mt-1 text-sm text-[#8A8A93]">{m.desc}</p>

    <label class="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.12] bg-[#0A0A0B] px-4 py-8 text-center transition-colors hover:border-[#7C5CFF]/50"
      ondragover={(e) => e.preventDefault()} ondrop={onDrop}>
      <input type="file" accept={m.accept} multiple={m.multiple} class="hidden" onchange={onPick} />
      <span class="text-sm text-[#FAFAFA]">{files.length ? files.map(f => f.name).join(', ') : 'Drop or click to choose'}</span>
      <span class="mt-1 text-xs text-[#8A8A93]">accepts {m.accept}</span>
    </label>

    {#if busy}
      <div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div class="h-full bg-[#7C5CFF] transition-all" style="width:{Math.round(progress * 100)}%"></div>
      </div>
    {/if}
    {#if error}<p class="mt-3 text-sm text-red-400">{error}</p>{/if}

    <button class="mt-5 w-full rounded-full bg-[#FAFAFA] py-2.5 text-sm font-medium text-[#0A0A0B] transition-transform hover:scale-[1.01] disabled:opacity-50"
      onclick={run} disabled={busy || !files.length}>
      {busy ? 'Processing…' : 'Convert & Download'}
    </button>
  </div>
</div>
