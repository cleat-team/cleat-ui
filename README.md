# @cleat/ui

Shared Svelte 5 component library for cleat business apps and the [cleat.run](https://cleat.run) website.

## Installation

```bash
npm install @cleat/ui
```

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

### CSS Custom Properties

The theme provides OKLCH-based tokens:

- **Colors**: `--color-primary`, `--color-secondary`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`, `--color-neutral` — each with a 50–900 scale
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

## Development

```bash
npm install
npm run build    # Build with svelte-package
npm run dev     # Start dev server
```

## License

MIT
