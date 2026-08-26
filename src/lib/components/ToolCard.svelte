<script>
  let { emoji = '📄', title = '', desc = '', span = '' } = $props();
</script>

<article class="tool-card rounded-[20px] bg-[#1A1A1A] border border-white/10 p-6 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-all flex flex-col justify-between {span}">
  <div class="text-3xl">{emoji}</div>
  <div>
    <h3 class="text-xl font-semibold">{title}</h3>
    {#if desc}<p class="text-[#A1A1AA] text-sm mt-1">{desc}</p>{/if}
  </div>
</article>
