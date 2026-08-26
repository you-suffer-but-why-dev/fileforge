import { a3 as attr_class, a4 as stringify, a5 as head, a6 as ensure_array_like } from "../../chunks/index.js";
import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section class="relative mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center max-w-[1280px]"><div><span class="inline-block text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-[#22D3EE] mb-5">100% client-side · no upload</span> <h1 class="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Forge any file.<br/><span class="text-[#7C5CFF]">In your browser.</span></h1> <p class="mt-5 text-[#A1A1AA] text-lg max-w-md">Convert PDF, images, and docs without uploading a byte. Fast, private, free. Your files never leave this device.</p> <div class="mt-8 flex gap-4"><a href="/#tools" class="px-6 py-3 rounded-full bg-[#7C5CFF] text-white font-medium shadow-[0_0_24px_rgba(124,92,255,0.35)] hover:scale-[1.02] transition-transform">Start converting</a> <a href="/#privacy" class="px-6 py-3 rounded-full border border-white/10 text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors">How it's private</a></div></div> <div class="relative flex items-center justify-center"><div class="w-48 h-48 rounded-[28px] bg-[#1A1A1A] border border-white/10 shadow-[0_0_24px_rgba(124,92,255,0.35)] grid place-items-center text-5xl">📄</div> <div class="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-[#202020] border border-white/10 grid place-items-center text-2xl">🔧</div> <div class="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-[#202020] border border-white/10 grid place-items-center text-xl">✨</div></div></section>`);
  });
}
function Dropzone($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      label = "Drop a file here",
      hint = "or click to browse — PDF, image, EPUB, CSV"
    } = $$props;
    $$renderer2.push(`<div id="dropzone"${attr_class(`rounded-[20px] border-2 border-dashed border-white/15 bg-[#1A1A1A]/50 px-6 py-12 text-center hover:border-[#7C5CFF] hover:shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-all cursor-pointer ${""}`)} role="button" tabindex="0"><input type="file" multiple="" class="hidden"/> <div class="text-4xl mb-3">⬆️</div> <p class="text-lg font-medium">${escape_html(label)}</p> <p class="text-[#A1A1AA] text-sm mt-1">${escape_html(hint)}</p></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ToolCard($$renderer, $$props) {
  let { emoji = "📄", title = "", desc = "", span = "" } = $$props;
  $$renderer.push(`<article${attr_class(`tool-card rounded-[20px] bg-[#1A1A1A] border border-white/10 p-6 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-all flex flex-col justify-between ${stringify(span)}`)}><div class="text-3xl">${escape_html(emoji)}</div> <div><h3 class="text-xl font-semibold">${escape_html(title)}</h3> `);
  if (desc) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="text-[#A1A1AA] text-sm mt-1">${escape_html(desc)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></article>`);
}
function _page($$renderer) {
  const tools = [
    {
      emoji: "📄↔️📝",
      title: "PDF ↔ Markdown",
      desc: "Extract clean text or turn Markdown into a PDF.",
      span: "md:col-span-2"
    },
    {
      emoji: "✂️",
      title: "Split / Join",
      desc: "Break PDFs per page or merge many into one.",
      span: ""
    },
    {
      emoji: "🖼️",
      title: "PDF → PNG",
      desc: "Render each page to an image.",
      span: ""
    },
    {
      emoji: "🖼️→📄",
      title: "Image → PDF",
      desc: "Stitch photos into a single PDF.",
      span: ""
    },
    {
      emoji: "📊→📑",
      title: "Table → CSV",
      desc: "Pull tables out of PDFs into CSV.",
      span: "md:col-span-2"
    },
    {
      emoji: "📚→📝",
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
  $$renderer.push(`<!----> <section class="mx-auto px-6 max-w-[1280px]">`);
  Dropzone($$renderer, {});
  $$renderer.push(`<!----></section> <section id="tools" class="mx-auto px-6 py-16 max-w-[1280px]"><h2 class="text-3xl font-bold tracking-tight mb-2">All tools, one forge</h2> <p class="text-[#A1A1AA] mb-8">Six converters, fully in-browser.</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]"><!--[-->`);
  const each_array = ensure_array_like(tools);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let t = each_array[$$index];
    ToolCard($$renderer, { emoji: t.emoji, title: t.title, desc: t.desc, span: t.span });
  }
  $$renderer.push(`<!--]--></div></section> <section id="privacy" class="mx-auto px-6 pb-20 max-w-[1280px]"><div class="rounded-[20px] bg-[#1A1A1A] border border-[#7C5CFF]/30 p-8 flex items-start gap-4"><div class="text-3xl">🔒</div> <div><h2 class="text-2xl font-bold">Your files never leave your browser</h2> <p class="text-[#A1A1AA] mt-2 max-w-2xl">All conversion runs locally with pdf.js and pdf-lib. Nothing is uploaded to any server. No accounts, no tracking, no limits.</p></div></div></section></main>`);
}
export {
  _page as default
};
