<script>
  let { icon = 'pdfmd', tool = 'pdfmd', title = '', desc = '', span = '', onclick } = $props();
  const icons = {
    pdfmd: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"/><path d="M9 13h6M9 17h4"/>',
    split: '<path d="M12 3v6m0 0 3-3m-3 3L9 6"/><path d="M12 9v12m0 0 3-3m-3 3-3-3"/><path d="M5 12h4M15 12h4"/>',
    png: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    imgpdf: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/>',
    csv: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    epub: '<path d="M4 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2Z"/><path d="M17 4v14a2 2 0 0 1 2 2h0"/>'
  };
  const path = $derived(icons[icon] || icons.pdfmd);
</script>

<button type="button" onclick={() => onclick?.(tool)}
  class="tool-card group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121214] p-6 text-left transition-colors hover:border-white/[0.16] {span}">
  <div class="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08]">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{@html path}</svg>
  </div>
  <div>
    <h3 class="text-[17px] font-medium text-[#FAFAFA]">{title}</h3>
    {#if desc}<p class="mt-1.5 text-sm leading-relaxed text-[#8A8A93]">{desc}</p>{/if}
  </div>
</button>
