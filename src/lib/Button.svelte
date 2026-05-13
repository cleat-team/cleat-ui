<script lang="ts">
  import './theme.css';

  type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  let {
    variant = 'primary' as Variant,
    size = 'md' as Size,
    disabled = false,
    loading = false,
    type = 'button' as 'button' | 'submit' | 'reset',
    onclick = undefined as ((e: MouseEvent) => void) | undefined,
    children,
  }: {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (e: MouseEvent) => void;
    children?: import('svelte').Snippet;
  } = $props();

  const btnClass = $derived([
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading ? 'btn-loading' : '',
    disabled ? 'btn-disabled' : '',
  ].filter(Boolean).join(' '));
</script>

<button
  {type}
  class={btnClass}
  {disabled}
  {onclick}
>
  {#if loading}
    <span class="spinner"></span>
  {/if}
  <span class="btn-content" class:visually-hidden={loading}>
    {@render children?.()}
  </span>
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s;
    white-space: nowrap;
    user-select: none;
    line-height: 1;
    text-decoration: none;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .btn-disabled,
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Sizes */
  .btn-sm {
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-sm);
    height: 28px;
  }

  .btn-md {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-base);
    height: 36px;
  }

  .btn-lg {
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-md);
    height: 44px;
  }

  /* Variants */
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-primary-foreground);
    border-color: var(--color-primary);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  .btn-primary:active:not(:disabled) {
    background: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--color-surface-hover);
    border-color: var(--color-neutral-300);
  }

  .btn-secondary:active:not(:disabled) {
    background: var(--color-neutral-100);
  }

  .btn-danger {
    background: var(--color-danger);
    color: var(--color-danger-foreground);
    border-color: var(--color-danger);
  }

  .btn-danger:hover:not(:disabled) {
    background: var(--color-danger-600);
    border-color: var(--color-danger-600);
  }

  .btn-danger:active:not(:disabled) {
    background: var(--color-danger-700);
    border-color: var(--color-danger-700);
  }

  .btn-ghost {
    background: transparent;
    color: var(--color-text);
    border-color: transparent;
  }

  .btn-ghost:hover:not(:disabled) {
    background: var(--color-surface-hover);
  }

  .btn-ghost:active:not(:disabled) {
    background: var(--color-neutral-100);
  }

  /* Loading state */
  .btn-loading {
    position: relative;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    position: absolute;
  }

  .btn-content.visually-hidden {
    visibility: hidden;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
