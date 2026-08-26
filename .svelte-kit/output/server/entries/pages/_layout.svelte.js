import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
function Navbar($$renderer) {
  $$renderer.push(`<header class="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0A0B]/80 backdrop-blur-xl"><nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"><a href="/" class="text-[15px] font-semibold tracking-tight text-[#FAFAFA]">fileforge</a> <div class="hidden items-center gap-8 text-sm text-[#8A8A93] md:flex"><a href="/#tools" class="transition-colors hover:text-[#FAFAFA]">Tools</a> <a href="/#privacy" class="transition-colors hover:text-[#FAFAFA]">Privacy</a> <a href="https://github.com/you-suffer-but-why-dev/fileforge" class="transition-colors hover:text-[#FAFAFA]">GitHub</a></div> <a href="/#tools" class="rounded-full bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#0A0A0B] transition-transform hover:scale-[1.02]">Try a tool</a></nav></header>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="border-t border-white/[0.08]"><div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[#8A8A93] md:flex-row"><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} fileforge — built in-browser.</span> <div class="flex gap-6"><a href="/#tools" class="transition-colors hover:text-[#FAFAFA]">Tools</a> <a href="https://github.com/you-suffer-but-why-dev/fileforge" class="transition-colors hover:text-[#FAFAFA]">GitHub</a></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  Navbar($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!----> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
