# cleat-ui — @cleat/ui Shared Component Library

Svelte 5 component library and theme for cleat-team's apps (clew's dashboard, cleat-apps, the cleat.run website). **This repo is the canonical `@cleat/ui`**: change it here first, tag a release, then bring each app's copy up to the tag. Not published to npm; apps carry a checked copy of a tag.

## Repo structure

- `src/lib/` — All components and theme
  - `index.js` / `index.d.ts` — Barrel exports
  - `theme.css` — CSS custom properties: semantic tokens (the public API) over nautical material tokens, plus OKLCH scales, typography, spacing, radius, shadows; dark mode via `[data-theme="dark"]`
  - `Layout.svelte` — Shell with sidebar + top nav + content
  - `AppShell.svelte` — Simple themed container
  - `Button.svelte`, `Form.svelte`, `Input.svelte`, `Card.svelte`, `Badge.svelte`, `Modal.svelte`, `Table.svelte`, `Tabs.svelte`, `EmptyState.svelte`, `StatusDot.svelte`, `Loading.svelte`
  - `__tests__/` — vitest component tests (`npm test`); `src/setup.ts` loads jest-dom's matchers

## Development conventions

When building components or modifying theming, read the full guidance at:
/localssd/rcownie/cleat-internal/prompts/plugins-and-apps-guidance.md

Key conventions:
- Svelte 5 ONLY — use `$state`, `$derived`, `$props` runes, NEVER `export let` or `<slot />`
- Children content: use `{@render children?.()}` with typed `Snippet` props
- All props must have TypeScript types
- CSS is scoped per component via `<style>` blocks
- Theme tokens are imported via `theme.css` — use `var(--color-*)` etc.
- NEVER use `{@html}` on user-supplied data without an opt-in flag
- Built with `svelte-package` for library distribution
- Package exports: `"svelte"` field for HMR, `"types"` for TS, `"default"` for consumers

## Theme system

- Style: nautical, mid-century, flat (spec: clew's `docs/dashboard-redesign-plan.md`)
- Components reference **semantic** tokens only (`--color-accent`, `--color-text`, `--color-surface`, `--color-border`, `--color-status-*`, ...); the **material** tokens (`--color-brass`, `--color-cream`, `--color-ink`, ...) are the defaults under them
- OKLCH scales (50-900 + base + foreground) for primary, secondary, success, warning, danger, info, neutral
- Typography: sans/mono font stacks, text size scale
- Spacing: 4px base scale (--space-1 through --space-8)
- Radius: sm/md/lg
- Shadows: sm/md/lg

## Reference

- Firstlight frontend components: /localssd/rcownie/firstlight/frontend/src/
- Cleat admin dashboard: /localssd/rcownie/cleat-agent2/web/src/
