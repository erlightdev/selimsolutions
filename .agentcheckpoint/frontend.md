# Agent Checkpoint — Frontend (apps/web)

> Frontend-only orientation. For stack/monorepo/DB/API/auth see
> [`agentcheckpoint.md`](./agentcheckpoint.md) — read that first, this layers on top.

## Scope

Everything user-facing in `apps/web`. React 19 + TanStack Router (file-based) +
TailwindCSS v4 + shadcn primitives from `packages/ui`. Dark theme default.

## Layout shell

- `src/routes/__root.tsx` — app shell. Grid `min-h-svh grid-rows-[auto_1fr_auto]`:
  `<Header />` / `<Outlet />` / `<Footer />`. ThemeProvider defaults dark.
- `src/components/header.tsx` — top nav (Home, Dashboard) + ModeToggle + UserMenu.
- `src/layouts/footer.tsx` — site footer (see below).

## Routes (file-based, `src/routes/`)

| Path        | File                       | State |
|-------------|----------------------------|-------|
| `/`         | `index.tsx`                | home / API health ping |
| `/login`    | `login.tsx`                | auth |
| `/dashboard`| `_auth/dashboard.tsx`      | protected |

**Pending routes** referenced by the footer but NOT built yet:
`/services`, `/about`, `/case-studies`, `/contact`, `/privacy`, `/terms`,
`/certifications`. Footer links to them via plain `<a href>` (full-page nav →
404 until created). Do NOT use TanStack `<Link to>` for these — typed router
throws at render for unknown routes (caused a white-screen crash, now fixed).

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
