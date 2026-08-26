import { a3 as attr_class, a4 as stringify, a2 as derived, a5 as head, a6 as ensure_array_like } from "../../chunks/index.js";
import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
import "jszip";
import "pdf-lib";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section class="mx-auto max-w-3xl px-6 pt-24 pb-20 text-center"><span class="inline-block rounded-full border border-white/[0.08] px-3 py-1 font-mono text-xs text-[#8A8A93]">100% client-side · no upload</span> <h1 class="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#FAFAFA] sm:text-6xl">Forge any file.<br/>In your browser.</h1> <p class="mx-auto mt-5 max-w-md text-lg leading-relaxed text-[#8A8A93]">Convert PDF, images, and documents without uploading a single byte. Fast, private, free.</p> <div class="mt-8 flex items-center justify-center gap-3"><a href="/#tools" class="rounded-full bg-[#FAFAFA] px-6 py-2.5 text-sm font-medium text-[#0A0A0B] transition-transform hover:scale-[1.02]">Start converting</a> <a href="/#privacy" class="rounded-full border border-white/[0.08] px-6 py-2.5 text-sm text-[#FAFAFA] transition-colors hover:bg-white/[0.04]">How it's private</a></div></section>`);
  });
}
function Dropzone($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      label = "Drop a file here",
      hint = "or click to browse — PDF, image, EPUB, CSV"
    } = $$props;
    $$renderer2.push(`<div id="dropzone"${attr_class(`rounded-2xl border border-dashed border-white/[0.12] bg-[#121214] px-6 py-14 text-center transition-colors hover:border-[#7C5CFF]/50 ${""}`)} role="button" tabindex="0"><input type="file" multiple="" class="hidden"/> <div class="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A8A93" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg></div> <p class="text-[15px] font-medium text-[#FAFAFA]">${escape_html(label)}</p> <p class="mt-1 text-sm text-[#8A8A93]">${escape_html(hint)}</p></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ToolCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      icon = "pdfmd",
      title = "",
      desc = "",
      span = ""
    } = $$props;
    const icons = {
      pdfmd: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"/><path d="M9 13h6M9 17h4"/>',
      split: '<path d="M12 3v6m0 0 3-3m-3 3L9 6"/><path d="M12 9v12m0 0 3-3m-3 3-3-3"/><path d="M5 12h4M15 12h4"/>',
      png: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
      imgpdf: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/>',
      csv: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
      epub: '<path d="M4 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2Z"/><path d="M17 4v14a2 2 0 0 1 2 2h0"/>'
    };
    const path = derived(() => icons[icon] || icons.pdfmd);
    $$renderer2.push(`<button type="button"${attr_class(`tool-card group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121214] p-6 text-left transition-colors hover:border-white/[0.16] ${stringify(span)}`)}><div class="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${html(path())}</svg></div> <div><h3 class="text-[17px] font-medium text-[#FAFAFA]">${escape_html(title)}</h3> `);
    if (desc) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-1.5 text-sm leading-relaxed text-[#8A8A93]">${escape_html(desc)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></button>`);
  });
}
function _page($$renderer) {
  const tools = [
    {
      icon: "pdfmd",
      tool: "pdfmd",
      title: "PDF ↔ Markdown",
      desc: "Extract clean text or turn Markdown into a PDF.",
      span: "sm:col-span-2 lg:col-span-2"
    },
    {
      icon: "split",
      tool: "split",
      title: "Split / Join",
      desc: "Break PDFs per page or merge many into one.",
      span: ""
    },
    {
      icon: "png",
      tool: "png",
      title: "PDF → PNG",
      desc: "Render each page to an image.",
      span: ""
    },
    {
      icon: "imgpdf",
      tool: "imgpdf",
      title: "Image → PDF",
      desc: "Stitch photos into a single PDF.",
      span: ""
    },
    {
      icon: "csv",
      tool: "csv",
      title: "Table → CSV",
      desc: "Pull tables out of PDFs into CSV.",
      span: "sm:col-span-2 lg:col-span-2"
    },
    {
      icon: "epub",
      tool: "epub",
      title: "EPUB → TXT",
      desc: "Strip an ebook down to plain text.",
      span: ""
    }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>fileforge — Forge any file. In your browser.</title>`);
    });
  });
  $$renderer.push(`<main>`);
  Hero($$renderer);
  $$renderer.push(`<!----> <section class="mx-auto max-w-6xl px-6">`);
  Dropzone($$renderer, {});
  $$renderer.push(`<!----></section> <section id="tools" class="mx-auto max-w-6xl px-6 py-20"><h2 class="text-2xl font-semibold tracking-tight text-[#FAFAFA]">All tools, one forge</h2> <p class="mt-2 text-[#8A8A93]">Six converters, fully in-browser.</p> <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[170px]"><!--[-->`);
  const each_array = ensure_array_like(tools);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let t = each_array[$$index];
    ToolCard($$renderer, {
      icon: t.icon,
      tool: t.tool,
      title: t.title,
      desc: t.desc,
      span: t.span
    });
  }
  $$renderer.push(`<!--]--></div></section> <section id="privacy" class="mx-auto max-w-6xl px-6 pb-20"><div class="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-[#121214] p-8"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div> <div><h2 class="text-xl font-semibold text-[#FAFAFA]">Your files never leave your browser</h2> <p class="mt-2 max-w-2xl text-[#8A8A93]">All conversion runs locally with pdf.js and pdf-lib. Nothing is uploaded to any server. No accounts, no tracking, no limits.</p></div></div></section></main> `);
  {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
export {
  _page as default
};
