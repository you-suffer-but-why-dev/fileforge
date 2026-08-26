// fileforge — client-side logic
// Core: dropzone + hero float (anime.js via CDN) + privacy-first status.
// Conversion modules (pdf.js / pdf-lib) are loaded lazily per tool.

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const dz = document.getElementById('dropzone');
  const input = document.getElementById('file-input');
  const status = document.getElementById('status');

  function show(msg) {
    if (!status) return;
    status.textContent = msg;
    status.classList.remove('hidden');
  }

  if (dz && input) {
    dz.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const f = input.files && input.files[0];
      if (f) show(`Loaded: ${f.name} (${(f.size / 1024).toFixed(1)} KB). Tool routes coming soon.`);
    });
    ['dragenter', 'dragover'].forEach((ev) =>
      dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('dragover'); })
    );
    ['dragleave', 'drop'].forEach((ev) =>
      dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('dragover'); })
    );
    dz.addEventListener('drop', (e) => {
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) show(`Dropped: ${f.name} (${(f.size / 1024).toFixed(1)} KB). Tool routes coming soon.`);
    });
  }

  // Hero float (anime.js) — graceful if CDN missing
  const floatEl = document.getElementById('hero-float');
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
