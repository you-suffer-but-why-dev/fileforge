import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BMLcN4sQ.js","_app/immutable/chunks/BHtVFvMF.js","_app/immutable/chunks/DWqsNzsq.js","_app/immutable/chunks/DpUvWkHQ.js","_app/immutable/chunks/BtEyvRMK.js"];
export const stylesheets = ["_app/immutable/assets/0.D7RWoVuv.css"];
export const fonts = [];
