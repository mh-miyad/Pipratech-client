# SNL International Project Memory

## Current Project

- Project: SNL International frontend.
- Location: `E:\TechElement_IT\SLNBD-frontend\client`.
- Site type: corporate + e-commerce showcase for premium jute products export from Bangladesh.
- Audience: international B2B buyers/importers.
- Visual goal: premium, eco-friendly, trustworthy, export-focused.
- Fixed style guide colors:
  - Primary Text: `#0D0D0D`
  - Background: `#FFFFFF`
  - Natural BG: `#F4F4F4`
  - Brand Neutral: `#C5A572`
  - Natural Neutral: `#E4D3B4`
  - Accent 1: `#D9A441`
  - Accent 2: `#6FAE75`
  - Rustic Background: `#FAF8F4`
  - Brand Primary normal: `#1C3D2D`
  - General Black normal: `#0D0D0D`
  - Brand Primary states: `#E8ECEA`, `#DDE2E0`, `#B9C3BE`, `#1C3D2D`, `#193729`, `#163124`, `#152E22`, `#11251B`, `#0D1B14`, `#0A1510`
  - General Black states: `#E7E7E7`, `#DBDBDB`, `#B4B4B4`, `#0D0D0D`, `#0C0C0C`, `#0A0A0A`, `#0A0A0A`, `#080808`, `#060606`, `#050505`
- User prefers normal font weight in many sections, not heavy bold.
- User wants close Figma matching, mobile responsive, reusable components.

## Hard Rules

- Use `bun`, not `npm` or `pnpm`.
- Next.js version is `16.2.4`; read relevant docs in `node_modules/next/dist/docs/` before code changes involving Next APIs.
- Tailwind CSS v4; no `tailwind.config.js`.
- Tailwind theme tokens live in `app/globals.css`.
- Use `@/` path alias.
- Use Next `<Image />`; avoid raw `<img>`.
- Use GSAP for animation; do not use Framer Motion.
- Swiper is installed and used for sliders/carousels.
- Use `@hugeicons/react` when adding icons, unless existing local SVG style is being preserved.
- Avoid editing `components/ui/*` manually.

## Installed Stack

- Next.js `16.2.4`
- React `19.2.4`
- TypeScript `5.9.3`
- Tailwind CSS `4.3.0`
- shadcn `4.7.0`
- GSAP `3.15.0`
- `@gsap/react`
- Swiper `12.1.4`
- Lenis `1.3.23`
- Zustand `5.0.13`
- TanStack React Query `5.100.9`

## Important Files

- `CLAUDE.md`: detailed project rules and original TODO list.
- `AGENTS.md`: Next.js warning/rule.
- `app/globals.css`: Tailwind v4 imports, brand tokens, shadcn tokens, Lenis CSS import.
- `app/(main)/layout.tsx`: wraps public pages with `LenisProvider`, `Header`, `Footer`.
- `provider/LenisProvider.tsx`: smooth scroll provider.
- `components/common/Header.tsx`: current Figma-inspired navbar.
- `components/common/Footer.tsx`: current footer implementation.
- `components/common/PageHero.tsx`: reusable inner page hero.
- `components/sections/HeroSection.tsx`: homepage hero slider.
- `components/sections/ProductCatalogue.tsx`: bento product section.
- `components/sections/WhyChooseJute.tsx`: image + "Why Choose Jute?" section.
- `components/sections/WhyChooseUs.tsx`: accordion USP section.

## Conversation History Summary

- User first asked to define folder structure, rules, and keep all agent memory up to date. `CLAUDE.md` was rewritten with stack, conventions, folder structure, design system, and TODO list.
- User shared Figma link; Figma access/rate limit blocked, so implementation continued from screenshots and project config.
- Lenis was broken. Fix made in previous Claude session:
  - `requestAnimationFrame` loop fixed.
  - Lenis ref connected.
  - GSAP/ScrollTrigger sync added.
  - Duplicate Lenis CSS import cleaned.
- Navbar was redesigned from screenshot:
  - Uses `/snl-logo.png`.
  - Fixed top header.
  - Center warm beige nav pill.
  - Contact pill with phone circle.
  - Mobile drawer added.
  - Active link changed to white pill with dark text.
- Missing routes were added to prevent 404:
  - `/about`
  - `/products`
  - `/sister-concerns`
  - `/gallery`
  - `/contact`
- Footer was rebuilt from screenshot:
  - Natural logo colors, no brightness filter.
  - Social icons in circle borders.
  - Quick links, phones, emails, office info.
- `PageHero` was rewritten:
  - Shared reusable hero for inner pages.
  - Bold title with optional highlighted substring.
  - Left gold bar stretches to title height.
  - Dark overlay over background image.
- Homepage hero was rebuilt:
  - Swiper slider.
  - Uses `/hero-img.png`.
  - GSAP text mask/crop animation.
  - Left/right navigation and dots.
  - 15+ Countries Served badge in layout flow.
  - Max content width adjusted to `max-w-350` (1400px).
  - Dark overlay tuned for bright image.
  - Request quote button uses cream/dark style.
- Product catalogue section was rebuilt:
  - Bento grid.
  - GSAP ScrollTrigger reveal.
  - `btn-cream` color.
  - Normal font weight.
- User then requested next section to be pure white and animated.
- `WhyChooseJute.tsx` was created:
  - Image with gold corner brackets.
  - Pure white background.
  - GSAP bracket/content reveal.
  - "Why Choose Jute?" text and feature row.
- `WhyChooseUs.tsx` was rewritten:
  - Accordion style matching screenshot.
  - Numbered items 01-05.
  - GSAP height animation.
  - Normal font styling.
- `app/(main)/page.tsx` now renders:
  - `HeroSection`
  - `StatsSection`
  - `ProductCatalogue`
  - `WhyChooseJute`
  - `WhyChooseUs`
  - `ExportProcess`
  - `ExportMarkets`
  - `Testimonials`
  - `FaqSection`
  - `CtaSection`

## Current Scan Status

- Working tree was clean before this `MEMORY.md` file was added.
- Homepage has many sections implemented.
- Inner pages mostly still have placeholder content after `PageHero`.
- Product data is duplicated inside `ProductCatalogue.tsx`; `types/product.ts` only defines types.
- `ProductCatalogue.tsx` has a typo class: `text-balck`; should be `text-black`.
- Footer phone numbers are repeated placeholders.
- Footer social links are `#`.
- WhatsApp hero link uses placeholder `https://wa.me/8801000000000`.
- `PageHero` default image uses remote `https://snlbd.com/...`; confirm Next image remote config before relying on it.
- `WhyChooseJute` description repeats the same sentence multiple times; needs real copy.
- `StatsSection` uses static numbers; no animated counters yet.
- `ExportMarkets` is a country grid, not interactive globe.
- `FaqSection` uses local state per item; multiple FAQ items can remain open.
- `ContactPage`, `ProductsPage`, `AboutPage`, `GalleryPage`, `SisterConcernsPage` are placeholders.

## Main Remaining Tasks

1. Finish homepage visual polish section by section against screenshots/Figma.
2. Fix small code issues:
   - `text-balck` typo.
   - placeholder phone/WhatsApp/social links.
   - repeated copy in `WhyChooseJute`.
3. Build full Products page:
   - product data source.
   - categories/filtering.
   - quote CTA per product.
   - product details/specs.
4. Build Contact page:
   - form.
   - validation with `react-hook-form` + `zod` if installed/added with bun.
   - contact cards, map/address, WhatsApp/email links.
5. Build About page:
   - company story.
   - certifications.
   - manufacturing/factory section.
6. Build Gallery page.
7. Build Sister Concerns page.
8. Add `ExportGlobe` only if user asks or approves installing `react-globe.gl`.
9. Run verification:
   - `bun run lint`
   - `bun build`
   - browser/mobile visual check.

## User Preference Notes

- User often says "same to same" and wants close screenshot/Figma matching.
- User gets frustrated when design diverges; inspect current component and screenshot carefully before editing.
- Prioritize one section at a time when asked.
- Do not overbuild unrelated sections.
- Use smooth GSAP scroll animations where requested.
- Keep components reusable and responsive.
