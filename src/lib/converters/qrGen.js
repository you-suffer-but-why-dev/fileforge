// qrGen.js — text/url -> QR PNG via canvas (no dep, using qrcode lib)
import QRCode from 'qrcode';

export async function qrGen(file, onProgress) {
  const text = await file.text();
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, text, { width: 512, margin: 2 });
  const dataUrl = canvas.toDataURL('image/png');
  onProgress?.(1);
  return { type: 'single', dataUrl, name: (file.name || 'qr').replace(/\.[^.]+$/, '') + '-qr.png' };
}
