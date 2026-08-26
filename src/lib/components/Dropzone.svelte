<script>
  let { label = 'Drop a file here', hint = 'or click to browse — PDF, image, EPUB, CSV' } = $props();
  let status = $state('');
  let dragover = $state(false);
  let input;

  function handleFile(file) {
    if (!file) return;
    status = `Loaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Tool routes coming soon.`;
  }

  function onDrop(e) {
    dragover = false;
    handleFile(e.dataTransfer?.files?.[0]);
  }
</script>

<div
  id="dropzone"
  class="rounded-[20px] border-2 border-dashed border-white/15 bg-[#1A1A1A]/50 px-6 py-12 text-center hover:border-[#7C5CFF] hover:shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-all cursor-pointer {dragover ? 'dragover' : ''}"
  role="button"
  tabindex="0"
  onclick={() => input?.click()}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && input?.click()}
  ondragenter={() => (dragover = true)}
  ondragover={(e) => { e.preventDefault(); dragover = true; }}
  ondragleave={() => (dragover = false)}
  ondrop={(e) => { e.preventDefault(); onDrop(e); }}
>
  <input bind:this={input} type="file" multiple class="hidden" onchange={(e) => handleFile(e.currentTarget.files?.[0])} />
  <div class="text-4xl mb-3">⬆️</div>
  <p class="text-lg font-medium">{label}</p>
  <p class="text-[#A1A1AA] text-sm mt-1">{hint}</p>
</div>
{#if status}
  <p class="mt-4 text-sm text-[#A1A1AA]">{status}</p>
{/if}
