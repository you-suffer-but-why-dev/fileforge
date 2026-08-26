<script>
  // Hero float — anime.js loaded from CDN in app.html (defer).
  import { onMount } from 'svelte';

  let floatEl;
  onMount(() => {
    if (floatEl && window.anime) {
      window.anime({
        targets: floatEl,
        translateY: [-10, 10],
        rotate: [-4, 4],
        duration: 2600,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  });
</script>

<section class="relative mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center max-w-[1280px]">
  <div>
    <span class="inline-block text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-[#22D3EE] mb-5">100% client-side · no upload</span>
    <h1 class="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
      Forge any file.<br /><span class="text-[#7C5CFF]">In your browser.</span>
    </h1>
    <p class="mt-5 text-[#A1A1AA] text-lg max-w-md">Convert PDF, images, and docs without uploading a byte. Fast, private, free. Your files never leave this device.</p>
    <div class="mt-8 flex gap-4">
      <a href="/#tools" class="px-6 py-3 rounded-full bg-[#7C5CFF] text-white font-medium shadow-[0_0_24px_rgba(124,92,255,0.35)] hover:scale-[1.02] transition-transform">Start converting</a>
      <a href="/#privacy" class="px-6 py-3 rounded-full border border-white/10 text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors">How it's private</a>
    </div>
  </div>
  <div class="relative flex items-center justify-center">
    <div bind:this={floatEl} class="w-48 h-48 rounded-[28px] bg-[#1A1A1A] border border-white/10 shadow-[0_0_24px_rgba(124,92,255,0.35)] grid place-items-center text-5xl">📄</div>
    <div class="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-[#202020] border border-white/10 grid place-items-center text-2xl">🔧</div>
    <div class="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-[#202020] border border-white/10 grid place-items-center text-xl">✨</div>
  </div>
</section>
