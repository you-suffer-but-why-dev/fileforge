<script>
  import Hero from '$lib/components/Hero.svelte';
  import Dropzone from '$lib/components/Dropzone.svelte';
  import ToolCard from '$lib/components/ToolCard.svelte';
  import ToolModal from '$lib/components/ToolModal.svelte';

  const tools = [
    { icon: 'pdfmd', tool: 'pdfmd', title: 'PDF ↔ Markdown', desc: 'Extract clean text or turn Markdown into a PDF.', span: 'sm:col-span-2 lg:col-span-2' },
    { icon: 'split', tool: 'split', title: 'Split / Join', desc: 'Break PDFs per page or merge many into one.', span: '' },
    { icon: 'png', tool: 'png', title: 'PDF → PNG', desc: 'Render each page to an image.', span: '' },
    { icon: 'imgpdf', tool: 'imgpdf', title: 'Image → PDF', desc: 'Stitch photos into a single PDF.', span: '' },
    { icon: 'csv', tool: 'csv', title: 'Table → CSV', desc: 'Pull tables out of PDFs into CSV.', span: 'sm:col-span-2 lg:col-span-2' },
    { icon: 'epub', tool: 'epub', title: 'EPUB → TXT', desc: 'Strip an ebook down to plain text.', span: '' },
    { icon: 'pdfmd', tool: 'mdtopdf', title: 'Markdown → PDF', desc: 'Render Markdown into a clean PDF.', span: '' },
    { icon: 'epub', tool: 'txttoepub', title: 'TXT → EPUB', desc: 'Wrap plain text into an ebook.', span: '' },
    { icon: 'csv', tool: 'csvtopdf', title: 'CSV → PDF', desc: 'Render a CSV table as a PDF.', span: '' }
  ];

  let activeTool = $state(null);
</script>

<svelte:head>
  <title>fileforge — Forge any file. In your browser.</title>
</svelte:head>

<main>
  <Hero />

  <section class="mx-auto max-w-6xl px-6">
    <Dropzone />
  </section>

  <section id="tools" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-2xl font-semibold tracking-tight text-[#FAFAFA]">All tools, one forge</h2>
    <p class="mt-2 text-[#8A8A93]">Six converters, fully in-browser.</p>
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[170px]">
      {#each tools as t}
        <ToolCard icon={t.icon} tool={t.tool} title={t.title} desc={t.desc} span={t.span} onclick={(tool) => (activeTool = tool)} />
      {/each}
    </div>
  </section>

  <section id="privacy" class="mx-auto max-w-6xl px-6 pb-20">
    <div class="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-[#121214] p-8">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-[#FAFAFA]">Your files never leave your browser</h2>
        <p class="mt-2 max-w-2xl text-[#8A8A93]">All conversion runs locally with pdf.js and pdf-lib. Nothing is uploaded to any server. No accounts, no tracking, no limits.</p>
      </div>
    </div>
  </section>
</main>

{#if activeTool}
  <ToolModal tool={activeTool} onclose={() => (activeTool = null)} />
{/if}
