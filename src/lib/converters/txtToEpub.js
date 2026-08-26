// txtToEpub.js — wrap plain text into a minimal EPUB (zip with XHTML)
import * as JSZip from 'jszip';

export async function txtToEpub(file, onProgress) {
  const txt = await file.text();
  const title = file.name.replace(/\.txt$/i, '');
  const paras = txt.split(/\n{2,}/).map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</p>`).join('\n');
  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip');
  zip.folder('META-INF')?.file('container.xml', `<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></rootfiles></container>`);
  const oebps = zip.folder('OEBPS');
  oebps.file('content.opf', `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title}</dc:title><dc:language>en</dc:language><dc:identifier id="bookid">urn:uuid:${Date.now()}</dc:identifier>
  </metadata>
  <manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml"/><item id="content" href="content.xhtml" media-type="application/xhtml+xml"/></manifest>
  <spine><itemref idref="content"/></spine>
</package>`);
  oebps.file('content.xhtml', `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${title}</title></head><body>${paras}</body></html>`);
  oebps.file('nav.xhtml', `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${title}</title></head><body><nav epub:type="toc"><ol><li><a href="content.xhtml">${title}</a></li></ol></nav></body></html>`);
  const blob = await zip.generateAsync({ type: 'blob' });
  onProgress?.(1);
  return { type: 'blob', blob, name: title + '.epub' };
}
