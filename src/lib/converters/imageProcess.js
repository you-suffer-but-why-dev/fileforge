// imageProcess.js — compress/resize + format convert (client-side canvas)
export async function imageProcess(file, opts = {}, onProgress) {
  const { maxDim = 1600, quality = 0.85, format = 'image/jpeg' } = opts;
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
  let { width, height } = img;
  const scale = Math.min(1, maxDim / Math.max(width, height));
  width = Math.round(width * scale); height = Math.round(height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);
  const blob = await new Promise((r) => canvas.toBlob(r, format, quality));
  const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
  onProgress?.(1);
  return { type: 'blob', blob, name: file.name.replace(/\.[^.]+$/, '') + '.' + ext };
}

// rotate (90/180/270) via canvas
export async function imageRotate(file, deg = 90, onProgress) {
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
  const canvas = document.createElement('canvas');
  const swap = deg % 180 !== 0;
  canvas.width = swap ? img.height : img.width;
  canvas.height = swap ? img.width : img.height;
  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  URL.revokeObjectURL(url);
  const blob = await new Promise((r) => canvas.toBlob(r, file.type || 'image/png'));
  onProgress?.(1);
  return { type: 'blob', blob, name: file.name.replace(/\.[^.]+$/, '') + '_rot' + deg + '.' + (file.name.split('.').pop() || 'png') };
}
