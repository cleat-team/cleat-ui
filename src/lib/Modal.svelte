<script lang="ts">
  import './theme.css';

  let {
    open = false,
    title = '',
    onClose = undefined as (() => void) | undefined,
    body = undefined as import('svelte').Snippet | undefined,
    footer = undefined as import('svelte').Snippet | undefined,
    children,
  }: {
    open?: boolean;
    title?: string;
    onClose?: () => void;
    body?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="modal-backdrop"
    role="presentation"
    onclick={handleBackdropClick}
  >
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      <div class="modal-header">
        <h3 class="modal-title">{title}</h3>
        {#if onClose}
          <button
            type="button"
            class="modal-close"
            onclick={onClose}
            aria-label="Close dialog"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        {/if}
      </div>

      <div class="modal-body">
        {#if body}
          {@render body()}
        {:else}
          {@render children?.()}
        {/if}
      </div>

      {#if footer}
        <div class="modal-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: oklch(0 0 0 / 0.4);
    z-index: 1000;
    padding: var(--space-4);
  }

  .modal {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 500px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    animation: modal-enter 0.15s ease-out;
  }

  @keyframes modal-enter {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-5);
    border-bottom: 1px solid var(--color-border);
  }

  .modal-title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
  }

  .modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .modal-close:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .modal-body {
    padding: var(--space-4) var(--space-5);
    overflow-y: auto;
    flex: 1;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    border-top: 1px solid var(--color-border);
  }
</style>
