<script lang="ts">
  import './theme.css';

  let {
    padding = true,
    maxWidth = '1200px',
    children,
  }: {
    padding?: boolean;
    maxWidth?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="app-shell" class:has-padding={padding}>
  <div class="app-shell-inner" style="max-width: {maxWidth}">
    {@render children?.()}
  </div>
</div>

<style>
  .app-shell {
    min-height: 100vh;
    background: var(--color-bg);
    font-family: var(--font-sans);
    color: var(--color-text);
  }

  .app-shell.has-padding {
    padding: var(--space-6);
  }

  .app-shell-inner {
    width: 100%;
    margin: 0 auto;
  }
</style>
