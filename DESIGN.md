# fileforge — DESIGN.md

> Source of truth untuk visual. Setiap implementasi ikuti file ini verbatim.

## 🎨 Theme

- **Mode:** Dark-mode native
- **Background:** `#0A0A0A` (base) → `#141414` (raised)
- **Surface 1:** `#1A1A1A`, **Surface 2:** `#202020`
- **Primary accent:** `#7C5CFF` (violet-electric) — untuk CTA & highlight
- **Secondary accent:** `#22D3EE` (cyan) — glow, link
- **Text primary:** `#F5F5F5`, **Text muted:** `#A1A1AA`
- **Hairline border:** `rgba(255,255,255,0.08)`
- **Glow:** `0 0 24px rgba(124,92,255,0.35)`

## 🔤 Typography

- **Family:** Geometric sans — Geist / Inter (system fallback)
- **Mono:** Geist Mono / JetBrains Mono untuk kode & label teknis
- **Type scale:** H1 64px `line-height 1.05` `letter-spacing -0.03em`; H2 36px; H3 22px; body 16px `line-height 1.6`; small 13px
- **Weight:** 400 regular, 500 medium, 700 bold, 800 extrabold (headline)

## 📐 Layout

- **Grid:** 12-column, max content width `1280px`, centered
- **Hero:** Z-pattern — headline kiri, visual animasi kanan
- **Features:** Bento grid, mixed card sizes, radius `20px`
- **Spacing:** 8px grid — card padding `24px` (lg), gap `16px` (md), section `64px` (3xl)

## 🟦 Shape & Depth

- **Border radius:** subtle `8px` untuk input, rounded `20px` untuk card, pill `9999px` untuk badge/button kecil
- **Navbar:** glassmorphism — `backdrop-filter: blur(20px)`, `1px rgba(255,255,255,0.1)` border, sticky top
- **Shadow:** subtle `0 1px 2px rgba(0,0,0,0.4)`; glow pada hover CTA
- **Elevation:** tonal (Surface steps), bukan shadow tebal

## 🎬 Motion

- **Duration:** 150ms fast, 300ms standard
- **Easing:** ease-out default, spring untuk playful
- **Microinteraction:** card hover scale `1.02` + glow; button press bounce
- **Library:** anime.js untuk hero float, motion-primitives style reveal on scroll

## ♿ Accessibility

- **Contrast:** WCAG AA ≥4.5:1 (text vs surface)
- **Focus ring:** `2px` outline `#22D3EE` visible
- **Touch target:** min `44x44px`
- **Semantic HTML:** `<header> <nav> <main> <section> <footer> <button>`

## 📱 Responsive

- **Breakpoints:** sm 640, md 768, lg 1024, xl 1280
- **Mobile-first:** bento → single column stack di <768px
- **Fluid:** `clamp()` untuk H1

## 🧩 Components

1. **Navbar** — logo "fileforge" + link (Tools, Privacy, GitHub) + glass
2. **Hero** — H1 "Forge any file. In your browser." + sub + CTA "Try a tool" + floating file icon animasi
3. **Upload zone** — drag-drop, affordance dashed border, hover glow
4. **Bento tools** — card per converter: PDF↔MD, Split/Join, PDF→PNG, Image→PDF, Table→CSV, EPUB→TXT
5. **Privacy strip** — "Files never leave your browser" badge
6. **Footer** — link + copyright

## 🔒 Privacy principle

Semua konversi **client-side** (pdf.js / pdf-lib di browser). Tidak ada upload ke server. Badge ini wajib ada di hero & footer.
