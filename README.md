# ZypherWorks

A premium marketing site for ZypherWorks — a fictional platform-engineering studio. Built as a showcase of production-grade Next.js + GSAP work: cinematic typography, mouse-tracked 3D tilt interactions, CSS-sticky pinned-scroll sections, layered photo compositions, and a fully interactive ROI calculator.

Six routes, each with its own distinct hero pattern and at least one signature interaction.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router, client components for animation) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS 3** + CSS custom properties bridged via `var(--token)` |
| Animation | **GSAP 3.12** + ScrollTrigger |
| Reveals | IntersectionObserver via `.reveal` class with 1.2s safety fallback |
| Fonts | `next/font/google` — Space Grotesk, Inter Tight, Instrument Serif, JetBrains Mono |
| Color | `oklch()` throughout — perceptually uniform, native browser support |
| Images | `picsum.photos` for placeholder team/culture/milestone photos |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

No env vars, no API keys, no backend — every form is self-contained with simulated success states.

---

## Routes

| Route | Section | Signature interaction |
|---|---|---|
| `/` | Home | Hero scene with 3D rings + cards, horizontal pinned-scroll **Pillars** section, **Products** showcase with laptop dashboard |
| `/products` | Products | 6 product cards with mouse-tracked 3D tilt, scroll-pinned **Featured deep-dive** that cycles all 4 Ease Fit dashboard tabs |
| `/process` | Process | Scroll-pinned **Phase deep-dive** with 4 animated SVG phase visuals (network discovery, module composition, workflow automation, live monitoring) |
| `/pricing` | Pricing | Asymmetric hero with **3D fanned tier card stack**, interactive **ROI calculator** with live-tweened numbers |
| `/company` | Company | Layered 3D photo hero, scroll-pinned **milestone timeline**, team grid, parallax-free editorial gallery |
| `/contact` | Contact | Premium glass-card **form with floating labels**, morphing submit button, multi-channel cards, "what happens next" timeline |

---

## Project structure

```
app/
├── layout.tsx                    # Root layout + font loading
├── page.tsx                       # Home page composer
├── globals.css                    # Design tokens + keyframes
├── products/page.tsx
├── process/page.tsx
├── pricing/page.tsx
├── company/page.tsx
└── contact/page.tsx

components/
├── Nav.tsx                        # Desktop pill + mobile sidebar with GSAP slide
├── Atmosphere.tsx                 # Fixed grain + ambient blobs + .reveal observer
├── Footer.tsx
│
├── hero/                          # Home hero
│   ├── Hero.tsx
│   ├── HeroScene.tsx              # 3D rings + floating cards
│   └── FadeInHeadline.tsx         # Character-by-character GSAP reveal
│
├── pillars/                       # Home pillars (horizontal pinned scroll)
│   ├── Pillars.tsx
│   └── PillarVisual.tsx           # 6 ref-driven visuals updated via DOM writes
│
├── products/
│   ├── Products.tsx               # Home products section
│   ├── EaseFitDashboard.tsx       # Dashboard mockup with animated tabs
│   └── page/                      # /products route components
│       ├── data.ts
│       ├── ProductCard3D.tsx
│       ├── ProductMini.tsx        # 6 mini animated SVG previews
│       ├── ProductsPageHero.tsx
│       ├── ProductsShowcase.tsx
│       ├── ProductsFeatured.tsx   # Scroll-pinned tab cycling
│       └── ProductsMatrix.tsx
│
├── process/page/                  # /process route
│   ├── data.ts
│   ├── PhaseVisual.tsx
│   ├── PhaseCard3D.tsx
│   ├── ProcessPageHero.tsx
│   ├── ProcessPhasesGrid.tsx
│   └── ProcessDeepDive.tsx
│
├── pricing/page/                  # /pricing route
│   ├── data.ts
│   ├── HeroCardStack.tsx          # Fanned 3D tier cards
│   ├── TierCard3D.tsx
│   ├── PricingPageHero.tsx
│   ├── PricingTiers.tsx
│   ├── PricingCalculator.tsx      # Interactive ROI with tweened numbers
│   ├── PricingFAQ.tsx
│   └── PricingPageCTA.tsx
│
├── company/page/                  # /company route
│   ├── data.ts
│   ├── CompanyPageHero.tsx        # Layered 3D photo composition
│   ├── CompanyStory.tsx           # Scroll-pinned milestone timeline
│   ├── TeamCard3D.tsx
│   ├── CompanyTeam.tsx
│   ├── CompanyValues.tsx
│   ├── CompanyGallery.tsx         # Editorial uniform grid
│   └── CompanyPageCTA.tsx
│
├── contact/page/                  # /contact route
│   ├── data.ts
│   ├── ContactForm.tsx            # Floating labels + morphing submit
│   ├── ContactPageHero.tsx
│   ├── ContactChannels.tsx
│   └── ContactProcess.tsx
│
├── Process.tsx                    # Home process timeline
├── Metrics.tsx                    # Home metrics row
├── Marquee.tsx                    # Home logo marquee
├── CTA.tsx                        # Home CTA
│
└── ui/                            # Shared primitives
    ├── Container.tsx              # max-w-[1440px] + clamp px
    ├── Buttons.tsx                # ButtonPrimary, ButtonGhost
    ├── Icon.tsx                   # 20 named SVG icons
    ├── Kicker.tsx                 # Mono accent with hairline before:
    └── Sparkline.tsx              # Pure-SVG sparkline (optional draw animation)

lib/
├── gsap.ts                        # Registers ScrollTrigger once
└── hooks.ts                       # useReveal IntersectionObserver
```

---

## Design system

### Tokens (in `globals.css`)
```css
--bg            oklch(0.14 0.012 260)   /* dark base */
--bg-paper      oklch(0.97 0.005 80)    /* cream featured sections */
--ink           oklch(0.98 0.005 80)    /* primary text */
--ink-2 / ink-3                          /* secondary / tertiary */
--ink-dark      oklch(0.22 0.012 260)   /* on cream */
--line / line-strong / line-paper        /* dividers per context */
--accent        oklch(0.78 0.17 220)    /* primary cyan/teal */
--accent-2      oklch(0.85 0.16 195)    /* secondary mint */
--accent-soft   alpha-modulated accent
--accent-glow   alpha-modulated accent for shadows
```

### Typography
- **Display** — `Space Grotesk`, font-variation tracking via `tracking-[-0.03em]` on big headlines
- **Body** — `Inter Tight`, ss01/cv11 font features enabled
- **Italic accent** — `Instrument Serif`, applied via `.serif-italic` class on `<em>` elements inside headlines
- **Mono** — `JetBrains Mono` for kicker eyebrows, metric labels, timestamps

### Sizing
All headlines use `clamp(min, vw-based, max)` for fluid responsiveness. Section padding follows the same pattern: `clamp(40px, 5vw, 96px)`.

---

## Animation patterns

### 1. Mouse-tracked 3D tilt
Used on every interactive card (`ProductCard3D`, `TierCard3D`, `PhaseCard3D`, `TeamCard3D`, `ValueCard`, `ChannelCard`). Pattern:

```tsx
const handleMove = (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  cancelAnimationFrame(rafRef.current);
  rafRef.current = requestAnimationFrame(() => {
    card.style.setProperty("--ry", `${x * 10}deg`);
    card.style.setProperty("--rx", `${-y * 8}deg`);
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
};
```

Child elements get `transform: translateZ(N)` to create parallax depth on tilt.

### 2. Pinned scroll without DOM mutation
GSAP's `pin: true` wraps the trigger in a "pin spacer" — breaks React's reconciler on route change with `removeChild` errors. The codebase uses **CSS `position: sticky`** instead, with a ScrollTrigger that only observes scroll progress:

```tsx
<section style={{ height: "280vh" }}>      {/* outer scroll length */}
  <div className="sticky top-0 h-screen">  {/* pinned panel */}
    {/* content cycles via onUpdate state */}
  </div>
</section>
```

```ts
ScrollTrigger.create({
  trigger: root,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const idx = Math.floor(self.progress * PHASES.length);
    setActiveIdx(idx);
  },
});
```

No `pin: true`, no spacer element, no React/DOM mismatch on unmount.

### 3. IntersectionObserver reveals
`Atmosphere` runs `useReveal()` once. Any element with `.reveal` class fades up when it intersects 8% of the viewport. CSS:

```css
.reveal { opacity: 0; transform: translateY(24px); transition: ... }
.reveal.in { opacity: 1; transform: none; }
```

1.2s safety timeout in the hook ensures elements are never permanently invisible if the observer fails.

### 4. Tab-cycled content with CSS animation replays
The Ease Fit dashboard and Process deep-dive use `<div key={activeTab}>` wrappers to force React remount on each tab change. CSS animation classes (`.ef-fade-up`, `.ef-spark-line`, etc.) with `backwards` fill-mode replay from t=0 on each mount.

### 5. Bulletproof entrance via `gsap.fromTo` (not `gsap.from`)
`gsap.from()` records the current state as the target — if interrupted mid-animation, the next call inherits a broken intermediate value. The Nav sidebar uses:

```ts
gsap.killTweensOf(items);              // clear in-flight
gsap.fromTo(items,                      // explicit start AND end states
  { x: 32, opacity: 0 },
  { x: 0, opacity: 1, overwrite: "auto" }
);
```

Plus a `gsap.set(items, { opacity: 1, x: 0, clearProps: "..." })` on close to reset for next open.

---

## Performance notes

- **No per-frame React renders during scroll.** All scroll-driven animations write directly to DOM (`element.style.setProperty`) — only discrete state changes (e.g. tab index changing) call `setState`.
- **`requestAnimationFrame`-batched** mouse handlers to ensure 60fps tilt updates regardless of mouse-move event frequency.
- **`will-change: transform`** applied to sticky containers that scroll-anchor, signaling GPU promotion before the user reaches them.
- **`fastScrollEnd: true` + `preventOverlaps: true`** on critical ScrollTriggers so fast wheel scrolls don't overshoot.

---

## Browser support

Built and tested against latest evergreen Chrome, Firefox, Safari. Uses:
- `oklch()` (Safari 15.4+, Chrome 111+, Firefox 113+)
- `color-mix()` (Safari 16.2+, Chrome 111+, Firefox 113+)
- CSS `aspect-ratio`, `gap`, container queries fallbacks
- `clamp()` for fluid typography

Older browsers degrade gracefully — animations stop, layouts stay readable.

---

## Adding a new page

1. Create the route: `app/<name>/page.tsx`
2. Drop content components in `components/<name>/page/`
3. Wire the nav: add an entry to `ITEMS` in `components/Nav.tsx` and a clause in `isActiveLink()`
4. Reuse existing 3D-tilt card pattern, scroll-pinning pattern, and design tokens — every premium page on the site is a recomposition of the same ~5 building blocks.
