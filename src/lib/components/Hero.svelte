<script>
  import { onMount } from 'svelte';
  let floatEl;
  onMount(() => {
    if (floatEl && window.anime) {
      window.anime({ targets: floatEl, translateY: [-8, 8], duration: 3000, direction: 'alternate', loop: true, easing: 'easeInOutSine' });
    }
  });
</script>

<section class="mx-auto max-w-3xl px-6 pt-24 pb-20 text-center">
  <span class="inline-block rounded-full border border-white/[0.08] px-3 py-1 font-mono text-xs text-[#8A8A93]">100% client-side · no upload</span>
  <h1 class="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#FAFAFA] sm:text-6xl">
    Forge any file.<br />In your browser.
  </h1>
  <p class="mx-auto mt-5 max-w-md text-lg leading-relaxed text-[#8A8A93]">
    Convert PDF, images, and documents without uploading a single byte. Fast, private, free.
  </p>
  <div class="mt-8 flex items-center justify-center gap-3">
    <a href="/#tools" class="rounded-full bg-[#FAFAFA] px-6 py-2.5 text-sm font-medium text-[#0A0A0B] transition-transform hover:scale-[1.02]">Start converting</a>
    <a href="/#privacy" class="rounded-full border border-white/[0.08] px-6 py-2.5 text-sm text-[#FAFAFA] transition-colors hover:bg-white/[0.04]">How it's private</a>
  </div>
</section>
