# @cleat/ui

Shared Svelte 5 component library and theme for cleat-team's own apps: [clew](https://github.com/cleat-team/clew)'s dashboard, `cleat-apps` and the [cleat.run](https://cleat.run) website.

**This repository is the canonical `@cleat/ui`.** Change components and tokens here first, then bring each app's copy up to the new tag.

It is a brand layer for cleat-team's products, not part of cleat itself: the cleat engine, its SDKs and its web console don't depend on it.

## Installation

`@cleat/ui` is not published to npm. An app carries a copy of a tagged release (for example `packages/ui` in clew) and checks in CI that its copy matches the tag it names, so the copies can't drift silently. When something outside cleat-team needs it, it will be published to npm under the same versions.

Releases are git tags, `vX.Y.Z`, following semver: a renamed or removed semantic token, prop or component is a major change.

## Usage

Import components and theme tokens in your Svelte 5 app:

```svelte
<script>
  import { Button, Card, Badge, Layout, Tabs, Table, Modal, Input, Form, AppShell } from '@cleat/ui';
</script>

<!-- Layout with sidebar -->
<Layout
  sections={[
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'workflows', label: 'Workflows', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]}
  activeSection="dashboard"
  appName="MyApp"
  user={{ name: 'Alice', email: 'alice@example.com' }}
>
  <h1>Dashboard</h1>
</Layout>

<!-- Button variants -->
<Button variant="primary" onclick={() => console.log('clicked')}>
  Save
</Button>
<Button variant="danger" size="sm">Delete</Button>
<Button variant="ghost" loading>Loading</Button>

<!-- Card with header and footer -->
<Card>
  {#snippet header()}
    <strong>Account Summary</strong>
  {/snippet}
  <p>Your account is in good standing.</p>
  {#snippet footer()}
    <span>Last updated today</span>
  {/snippet}
</Card>

<!-- Status badges -->
<Badge variant="success" text="Active" />
<Badge variant="warning" text="Pending" />
<Badge variant="danger" text="Failed" />

<!-- Form with input -->
<Form onSubmit={(e) => console.log('submit')}>
  <Input name="email" label="Email" type="email" required />
  <Input name="password" label="Password" type="password" required />
  <Button type="submit" variant="primary">Sign In</Button>
</Form>

<!-- Tabs -->
<Tabs tabs={[{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }]} activeTab="overview" onTabChange={(id) => console.log(id)} />

<!-- Data table -->
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date', sortable: true },
  ]}
  rows={[
    { name: 'Workflow A', status: 'Running', date: '2025-01-15' },
    { name: 'Workflow B', status: 'Completed', date: '2025-01-14' },
  ]}
/>

<!-- Modal -->
<Modal open={showModal} title="Confirm" onClose={() => showModal = false}>
  {#snippet body()}
    <p>Are you sure you want to proceed?</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={() => showModal = false}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  {/snippet}
</Modal>

<!-- AppShell (simple theme wrapper) -->
<AppShell>
  <h1>Page without sidebar</h1>
</AppShell>
```

## Theme

Import theme tokens in your app's root layout:

```css
@import '@cleat/ui/theme.css';
```

Or import the compiled version:

```css
@import '@cleat/ui/dist/theme.css';
```

### Style

The look is nautical and mid-century: flat, clean surfaces, nothing in excess, with colour from the materials of a classic yacht. Brass, marine blue, cream, teak, mahogany and copper patina, on warm ink. The full spec, with contrast figures, is clew's `docs/dashboard-redesign-plan.md`.

### Two layers of tokens

- **Semantic tokens** are the public API. Components use only these: `--color-accent`, `--color-text`, `--color-surface`, `--color-border`, `--color-page-bg`, the `--color-status-*` set and so on. An app re-themes by overriding them.
- **Material tokens** are the nautical defaults underneath: `--color-brass`, `--color-marine`, `--color-cream`, `--color-canvas`, `--color-ink`, `--color-rigging`, `--color-teak`, `--color-mahogany`, `--color-copper-patina` and their variants. Apps shouldn't reference them directly.

Dark mode is `[data-theme="dark"]` on the root element.

### CSS Custom Properties

- **Colors**: the semantic and material tokens above, plus `--color-primary`, `--color-secondary`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info` and `--color-neutral`, each with a 50–900 scale (OKLCH)
- **Typography**: `--font-sans`, `--font-mono`, `--text-xs` through `--text-3xl`
- **Spacing**: `--space-1` through `--space-8` (4px scale)
- **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Components

| Component    | Description                                       |
|-------------|---------------------------------------------------|
| `Layout`    | Shell layout with collapsible sidebar + top bar   |
| `AppShell`  | Simple theme + container wrapper                  |
| `Button`    | Variants: primary, secondary, danger, ghost       |
| `Form`      | Form wrapper with validation/error display        |
| `Input`     | Text input with label and error state             |
| `Card`      | Container card with optional header/footer slots  |
| `Badge`     | Inline status badge (success/warning/danger/info/neutral) |
| `Modal`     | Dialog with backdrop, title, body, footer slots   |
| `Table`     | Data table with sortable columns                  |
| `Tabs`      | Tab switcher with active state and indicator      |
| `EmptyState`| Empty view with a title, message and optional action |
| `StatusDot` | Small status indicator (active, idle, error, offline) |
| `Loading`   | Loading indicator                                  |

## Development

```bash
npm ci
npm run build    # svelte-package, into dist/
npm run check    # svelte-check: must report 0 errors
npm test         # vitest component tests, in jsdom
npm run dev      # dev server
```

CI runs the same: **Build** (`npm run build`), **Lint** (`npm run check` and `npm test`) and **Developer Certificate of Origin** (every commit has a `Signed-off-by:` line). All three are required on `main`.

## License

Apache-2.0, as in [LICENSE](LICENSE).
