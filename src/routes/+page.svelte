<script>
  import Hero from '$lib/components/Hero.svelte';
  import Dropzone from '$lib/components/Dropzone.svelte';
  import ToolCard from '$lib/components/ToolCard.svelte';

  const tools = [
    { emoji: '📄↔️📝', title: 'PDF ↔ Markdown', desc: 'Extract clean text or turn Markdown into a PDF.', span: 'md:col-span-2' },
    { emoji: '✂️', title: 'Split / Join', desc: 'Break PDFs per page or merge many into one.', span: '' },
    { emoji: '🖼️', title: 'PDF → PNG', desc: 'Render each page to an image.', span: '' },
    { emoji: '🖼️→📄', title: 'Image → PDF', desc: 'Stitch photos into a single PDF.', span: '' },
    { emoji: '📊→📑', title: 'Table → CSV', desc: 'Pull tables out of PDFs into CSV.', span: 'md:col-span-2' },
    { emoji: '📚→📝', title: 'EPUB → TXT', desc: 'Strip an ebook down to plain text.', span: '' }
  ];
</script>

<svelte:head>
  <title>fileforge — Forge any file. In your browser.</title>
</svelte:head>

<main>
  <Hero />

  <section class="mx-auto px-6 max-w-[1280px]">
    <Dropzone />
  </section>

  <section id="tools" class="mx-auto px-6 py-16 max-w-[1280px]">
    <h2 class="text-3xl font-bold tracking-tight mb-2">All tools, one forge</h2>
    <p class="text-[#A1A1AA] mb-8">Six converters, fully in-browser.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
      {#each tools as t}
        <ToolCard emoji={t.emoji} title={t.title} desc={t.desc} span={t.span} />
      {/each}
    </div>
  </section>

  <section id="privacy" class="mx-auto px-6 pb-20 max-w-[1280px]">
    <div class="rounded-[20px] bg-[#1A1A1A] border border-[#7C5CFF]/30 p-8 flex items-start gap-4">
      <div class="text-3xl">🔒</div>
      <div>
        <h2 class="text-2xl font-bold">Your files never leave your browser</h2>
        <p class="text-[#A1A1AA] mt-2 max-w-2xl">All conversion runs locally with pdf.js and pdf-lib. Nothing is uploaded to any server. No accounts, no tracking, no limits.</p>
      </div>
    </div>
  </section>
</main>
