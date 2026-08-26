<script>
  let { label = 'Drop a file here', hint = 'or click to browse — PDF, image, EPUB, CSV' } = $props();
  let status = $state('');
  let dragover = $state(false);
  let input;
  function handleFile(file) {
    if (!file) return;
    status = `Loaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Tool routes coming soon.`;
  }
  function onDrop(e) { dragover = false; handleFile(e.dataTransfer?.files?.[0]); }
</script>

<div
  id="dropzone"
  class="rounded-2xl border border-dashed border-white/[0.12] bg-[#121214] px-6 py-14 text-center transition-colors hover:border-[#7C5CFF]/50 {dragover ? 'border-[#7C5CFF]' : ''}"
  role="button" tabindex="0"
  onclick={() => input?.click()}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && input?.click()}
  ondragenter={() => (dragover = true)}
  ondragover={(e) => { e.preventDefault(); dragover = true; }}
  ondragleave={() => (dragover = false)}
  ondrop={(e) => { e.preventDefault(); onDrop(e); }}
>
  <input bind:this={input} type="file" multiple class="hidden" onchange={(e) => handleFile(e.currentTarget.files?.[0])} />
  <div class="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08]">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A8A93" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </div>
  <p class="text-[15px] font-medium text-[#FAFAFA]">{label}</p>
  <p class="mt-1 text-sm text-[#8A8A93]">{hint}</p>
</div>
{#if status}<p class="mt-3 text-sm text-[#8A8A93]">{status}</p>{/if}
