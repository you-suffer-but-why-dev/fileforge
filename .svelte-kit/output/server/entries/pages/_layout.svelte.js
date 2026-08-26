import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
function Navbar($$renderer) {
  $$renderer.push(`<header class="sticky top-0 z-50"><nav class="backdrop-blur-[20px] border-b border-white/10 bg-base/60"><div class="mx-auto px-6 h-16 flex items-center justify-between max-w-[1280px]"><a href="/" class="flex items-center gap-2 font-extrabold text-lg tracking-tight"><span class="text-[#7C5CFF]">file</span><span>forge</span></a> <div class="hidden md:flex items-center gap-8 text-sm text-[#A1A1AA]"><a href="/#tools" class="hover:text-[#F5F5F5] transition-colors">Tools</a> <a href="/#privacy" class="hover:text-[#F5F5F5] transition-colors">Privacy</a> <a href="https://github.com/you-suffer-but-why-dev/fileforge" class="hover:text-[#F5F5F5] transition-colors">GitHub</a></div> <a href="/#tools" class="text-sm px-4 py-2 rounded-full bg-[#7C5CFF] text-white shadow-[0_0_24px_rgba(124,92,255,0.35)] hover:scale-[1.02] transition-transform">Try a tool</a></div></nav></header>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="border-t border-white/10"><div class="mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A1A1AA] max-w-[1280px]"><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} fileforge — built in-browser.</span> <div class="flex gap-6"><a href="/#tools" class="hover:text-[#F5F5F5]">Tools</a> <a href="https://github.com/you-suffer-but-why-dev/fileforge" class="hover:text-[#F5F5F5]">GitHub</a></div></div></footer>`);
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
