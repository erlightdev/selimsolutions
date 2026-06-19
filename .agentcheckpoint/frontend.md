# Agent Checkpoint — Frontend (apps/web)

> Frontend-only orientation. For stack/monorepo/DB/API/auth see
> [`agentcheckpoint.md`](./agentcheckpoint.md) — read that first, this layers on top.

## Scope

Everything user-facing in `apps/web`. React 19 + TanStack Router (file-based) +
TailwindCSS v4 + shadcn primitives from `packages/ui`. Dark theme default.

## Layout shell

- `src/routes/__root.tsx` — app shell. Grid `min-h-svh grid-rows-[1fr_auto]`:
  `<Navbar />` (fixed, see below) / `<main className="pt-23">` wrapping `<Outlet />`
  / `<Footer />`. ThemeProvider defaults dark. `pt-23` on `<main>` clears the
  fixed navbar; a hero opts out with `-mt-23` to bleed under it.
- `src/layouts/navbar.tsx` — site header (see below). **Replaced** the old
  `src/components/header.tsx` (now dead/unused — Home/Dashboard stub).
- `src/layouts/footer.tsx` — site footer (see below).

## Routes (file-based, `src/routes/`)

| Path        | File                       | State |
|-------------|----------------------------|-------|
| `/`         | `index.tsx`                | home — video hero + SOC dashboard mockup; API ping below |
| `/login`    | `login.tsx`                | auth |
| `/dashboard`| `_auth/dashboard.tsx`      | protected |

**Pending routes** referenced by navbar + footer but NOT built yet:
`/about`, `/case-studies`, `/contact`, `/services` (+ `/services/*`),
`/solutions/*`, `/compliance/*`, `/privacy`, `/terms`, `/certifications`,
`/downloads`. Linked via plain `<a href>` (full-page nav → 404 until created).
Do NOT use TanStack `<Link to>` for these — typed router throws at render for
unknown routes (caused a white-screen crash, now fixed).

## Navbar (`src/layouts/navbar.tsx`)

- `fixed inset-x-0 top-0 z-40` → overlaps the hero (grid row collapses). Two rows:
  brand-blue **announcement bar** + **main header**.
- **Light mode = solid `bg-white`** (always); **dark = translucent** `bg-background/40`
  → `/85` on scroll, with `backdrop-blur`. Adds `shadow-sm` on scroll (light).
  Scroll state via a `window.scroll` listener (`scrolled` > 8px).
- **Services megamenu**: panel anchored to the full-width row (`relative` on the
  `max-w-7xl` row) → centered on screen, NOT on the trigger button. Hover stays
  open because the panel is a DOM descendant of the row (`onMouseLeave` ignores
  descendants). Enter anim on the inner card only (`anim-megamenu`) so the
  outer `-translate-x-1/2` centering isn't clobbered by the keyframe transform.
- Logo swaps by theme via CSS: `dark:hidden` (light logo) / `hidden dark:block`.
- Mobile: slide-in panel (`anim-drawer`) + backdrop (`anim-backdrop`).
- Content (primaryNav, services, solutions, compliance, resources) in top-of-file
  `const` arrays. Source of truth for nav copy.

## Hero (`src/routes/index.tsx`)

- Full-bleed `/hero-video.mp4` (`autoPlay muted loop playsInline`), `-mt-23` to
  bleed under the navbar, `pt-32` to keep content clear.
- Overlays: left dark gradient (text contrast) + **bottom `from-black/95`** kept
  dark in BOTH themes (by request — not the light page bg) + brand glow blob.
- Left col: live-status pill (ping dot), gradient-accent h1 (`text-balance`),
  subtext (`text-pretty`), 2 CTAs, trust-stat strip (`tabular-nums`). Staggered
  enter via `anim-fade-up` + `[animation-delay:*]`.
- Right col (`lg:` only): **SOC dashboard mockup** — `AlertRadar` (pure-SVG
  octagon radar) + stat chips + floating "Suspicious Logins" card (`anim-float`).
  All decorative; built from local `const` coord strings.

## Animation utilities (`src/index.css`)

App-specific keyframes + `@theme` easing tokens (`--ease-out-strong`,
`--ease-drawer`). Utility classes: `anim-fade-up` (staggered enter: opacity +
lift + blur), `anim-megamenu` (origin-top scale-in), `anim-backdrop`,
`anim-drawer`, `anim-float` (idle bob). `@media (prefers-reduced-motion)` guard
shortens/disables them. Also sets `-webkit-font-smoothing: antialiased` on `html`.
Tailwind built-ins `animate-ping`/`animate-bounce` are used too but do NOT
auto-respect reduced-motion.

**Design skills installed** (`.agents/skills/`, symlinked for Claude Code):
`make-interfaces-feel-better`, `emil-design-eng`, `review-animations`. Applied:
scale-on-press (`active:scale-[0.96]`), no `transition: all` (always specify
props), concentric radius, 40px hit areas, staggered enters, origin-aware popover.

## Footer (`src/layouts/footer.tsx`)

Two stacked blocks inside `<footer>`:

1. **CTA card** — dark rounded panel (`bg-[#0a0a0c]`), brand glow, dotted globe
   on the right. Desktop: lifts up to overlap the section above via wrapper
   `sm:-mb-52` + card `sm:-mt-24`, and the slab below pads `sm:pt-48` to clear it.
   Mobile: no overlap (`mb-4` gap), `px-3` inset.
2. **Main slab** — links grid (Brand+contact / Services / Company / Connect+Legal)
   + bottom bar (copyright, ISO 27001 badge, Hiver credit). Desktop
   `sm:m-3 sm:rounded-2xl`; **mobile full-width, no rounding** (by design).

Content (services, company, legal, socials, contact) lives in top-of-file
`const` arrays. Source of truth for footer copy.

## Conventions / gotchas

- **Brand color: `#405cfe`** (arbitrary value `bg-[#405cfe]`). Used for the CTA glow.
- **lucide-react is v1.x** in `apps/web` — **brand icons removed** (no `Linkedin`,
  etc.). Use generic icons (`Globe`, `Mail`, …) or text. Importing a missing icon
  = `undefined` component = white screen.
- **Globe asset**: `apps/web/public/globe-dots.svg` — generated orthographic
  dotted sphere (front-hemisphere dots, depth-shaded, glowing rainbow rim).
  Regenerate via a node script writing dot `<circle>`s; not hand-edited.
- **Logo**: `apps/web/public/selim-logo-white.svg` (placeholder shield + wordmark).
- No `framer-motion`/`motion` installed. Motion = CSS transitions on base-ui
  `data-[state]` attrs (no Dialog component exists yet).
- Lint/format: Biome — run `npx biome check <file> --write`. IDE parse-error
  diagnostics during edits are often **stale**; trust `biome check` + `tsc`.
- Shared UI: `npx shadcn@latest add <comp> -c packages/ui`. Existing primitives:
  button, card, checkbox, dropdown-menu, input, label, skeleton, sonner.
- Theme tokens (`--background`, `--foreground`, …) in
  `packages/ui/src/styles/globals.css`; `cn()` in `packages/ui/src/lib/utils.ts`.
