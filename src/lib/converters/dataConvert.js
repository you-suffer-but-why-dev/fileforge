// dataConvert.js — JSON/CSV/YAML + base64
export async function jsonToCsv(file, onProgress) {
  const json = JSON.parse(await file.text());
  const arr = Array.isArray(json) ? json : [json];
  const headers = [...new Set(arr.flatMap((o) => Object.keys(o)))];
  const rows = arr.map((o) => headers.map((h) => {
    let v = o[h];
    if (v === null || v === undefined) v = '';
    else if (typeof v === 'object') v = JSON.stringify(v);
    return /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
  }).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  onProgress?.(1);
  return { type: 'text', text: csv, name: file.name.replace(/\.json$/i, '') + '.csv' };
}

export async function csvToJson(file, onProgress) {
  const csv = await file.text();
  const lines = csv.split('\n').filter((l) => l.trim());
  const headers = lines[0].split(',').map((h) => h.trim());
  const out = lines.slice(1).map((l) => {
    const cells = l.split(',');
    const o = {};
    headers.forEach((h, i) => (o[h] = cells[i]?.trim() ?? ''));
    return o;
  });
  onProgress?.(1);
  return { type: 'text', text: JSON.stringify(out, null, 2), name: file.name.replace(/\.csv$/i, '') + '.json' };
}

// tiny YAML-ish serializer (no deps, simple key:value / list)
export async function jsonToYaml(file, onProgress) {
  const json = JSON.parse(await file.text());
  const lines = [];
  const walk = (v, ind) => {
    if (Array.isArray(v)) v.forEach((i) => lines.push(ind + '- ' + (typeof i === 'object' ? '\n' + walk(i, ind + '  ').trimEnd() : String(i))));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, val]) => lines.push(ind + k + ': ' + (typeof val === 'object' ? '\n' + walk(val, ind + '  ').trimEnd() : String(val))));
    else lines.push(ind + String(v));
  };
  walk(json, '');
  onProgress?.(1);
  return { type: 'text', text: lines.join('\n'), name: file.name.replace(/\.json$/i, '') + '.yaml' };
}

export async function yamlToJson(file, onProgress) {
  // minimal parser: supports maps + lists of scalars
  const txt = await file.text();
  const lines = txt.split('\n');
  const root = {};
  let stack = [{ indent: -1, obj: root }];
  for (const raw of lines) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const m = raw.match(/^(\s*)([-\w]+):\s*(.*)$/);
    if (!m) continue;
    const indent = m[1].length, key = m[2], val = m[3];
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    if (val !== '') parent[key] = val;
    else { parent[key] = {}; stack.push({ indent, obj: parent[key] }); }
  }
  onProgress?.(1);
  return { type: 'text', text: JSON.stringify(root, null, 2), name: file.name.replace(/\.ya?ml$/i, '') + '.json' };
}

export async function base64Encode(file, onProgress) {
  const buf = await file.arrayBuffer();
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
  const b64 = btoa(bin);
  onProgress?.(1);
  return { type: 'text', text: b64, name: file.name + '.b64.txt' };
}

export async function base64Decode(file, onProgress) {
  const txt = (await file.text()).trim();
  const bin = atob(txt);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const blob = new Blob([bytes]);
  onProgress?.(1);
  const ext = 'bin';
  return { type: 'blob', blob, name: file.name.replace(/\.b64.*$/, '') + '.' + ext };
}
