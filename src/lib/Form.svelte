<script lang="ts">
  import './theme.css';

  let {
    onSubmit = undefined as ((e: SubmitEvent) => void) | undefined,
    loading = false,
    error = '',
    children,
  }: {
    onSubmit?: (e: SubmitEvent) => void;
    loading?: boolean;
    error?: string;
    children?: import('svelte').Snippet;
  } = $props();

  function handleSubmit(e: SubmitEvent) {
    if (loading) return;
    if (onSubmit) onSubmit(e);
  }
</script>

<form class="form" onsubmit={handleSubmit} novalidate>
  {#if error}
    <div class="form-error" role="alert">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="error-icon">
        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 5v3M8 10.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>{error}</span>
    </div>
  {/if}

  <div class="form-fields">
    {@render children?.()}
  </div>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    font-family: var(--font-sans);
  }

  .form-error {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    background: var(--color-danger-50);
    color: var(--color-danger-700);
    border: 1px solid var(--color-danger-200);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: 500;
  }

  .error-icon {
    flex-shrink: 0;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
</style>
