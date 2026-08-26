import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Rf6FXSTe.js","_app/immutable/chunks/htZNzMS5.js","_app/immutable/chunks/DKrHqI3f.js","_app/immutable/chunks/BJZ7K6pq.js","_app/immutable/chunks/CL0IwpOH.js"];
export const stylesheets = ["_app/immutable/assets/0.CeEL_NGq.css"];
export const fonts = [];
