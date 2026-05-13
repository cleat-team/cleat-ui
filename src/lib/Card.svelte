<script lang="ts">
  import './theme.css';

  let {
    padding = true,
    hoverable = false,
    header = undefined as import('svelte').Snippet | undefined,
    footer = undefined as import('svelte').Snippet | undefined,
    children,
  }: {
    padding?: boolean;
    hoverable?: boolean;
    header?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class="card"
  class:card-padded={padding}
  class:card-hoverable={hoverable}
>
  {#if header}
    <div class="card-header">
      {@render header()}
    </div>
  {/if}
  <div class="card-body">
    {@render children?.()}
  </div>
  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style>
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
  }

  .card-padded {
    padding: var(--space-4);
  }

  .card-hoverable {
    cursor: pointer;
    transition: box-shadow 0.15s, transform 0.15s;
  }

  .card-hoverable:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .card-header {
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
    font-weight: 600;
    font-size: var(--text-md);
  }

  .card-padded .card-header {
    margin: calc(-1 * var(--space-4)) calc(-1 * var(--space-4)) var(--space-3);
    padding: var(--space-4);
  }

  .card-body {
    flex: 1;
  }

  .card-footer {
    padding-top: var(--space-3);
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .card-padded .card-footer {
    margin: var(--space-3) calc(-1 * var(--space-4)) calc(-1 * var(--space-4));
    padding: var(--space-4);
  }
</style>
