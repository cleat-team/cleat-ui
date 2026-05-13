# cleat-ui — @cleat/ui Shared Component Library

Svelte 5 component library for all cleat business apps and the cleat.run website. Published as `@cleat/ui`.

## Repo structure

- `src/lib/` — All components and theme
  - `index.js` / `index.d.ts` — Barrel exports
  - `theme.css` — OKLCH-based CSS custom properties (colors, typography, spacing, radius, shadows)
  - `Layout.svelte` — Shell with sidebar + top nav + content
  - `AppShell.svelte` — Simple themed container
  - `Button.svelte`, `Form.svelte`, `Input.svelte`, `Card.svelte`, `Badge.svelte`, `Modal.svelte`, `Table.svelte`, `Tabs.svelte`

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

- Colors use OKLCH space with 50-900 scale + base + foreground
- Semantic colors: primary, secondary, success, warning, danger, info, neutral
- Typography: sans/mono font stacks, text size scale
- Spacing: 4px base scale (--space-1 through --space-8)
- Radius: sm/md/lg
- Shadows: sm/md/lg

## Reference

- Firstlight frontend components: /localssd/rcownie/firstlight/frontend/src/
- Cleat admin dashboard: /localssd/rcownie/cleat-agent2/web/src/
