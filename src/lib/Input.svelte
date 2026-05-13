<script lang="ts">
  import './theme.css';

  let {
    name = '',
    label = '',
    type = 'text' as string,
    value = '',
    error = '',
    disabled = false,
    required = false,
    placeholder = '',
    oninput = undefined as ((e: Event) => void) | undefined,
    onblur = undefined as ((e: FocusEvent) => void) | undefined,
  }: {
    name?: string;
    label?: string;
    type?: string;
    value?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    oninput?: (e: Event) => void;
    onblur?: (e: FocusEvent) => void;
  } = $props();

  const inputId = `input-${name || label.replace(/\s+/g, '-').toLowerCase()}`;
  const hasError = $derived(error.length > 0);
</script>

<div class="input-group" class:has-error={hasError}>
  {#if label}
    <label for={inputId} class="input-label">
      {label}
      {#if required}
        <span class="required-mark">*</span>
      {/if}
    </label>
  {/if}
  <input
    {type}
    {name}
    {value}
    {placeholder}
    {disabled}
    {required}
    id={inputId}
    class="input-field"
    class:input-error={hasError}
    {oninput}
    {onblur}
  />
  {#if hasError}
    <p class="error-text">{error}</p>
  {/if}
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .input-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text);
  }

  .required-mark {
    color: var(--color-danger);
    margin-left: 2px;
  }

  .input-field {
    width: 100%;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    box-sizing: border-box;
  }

  .input-field::placeholder {
    color: var(--color-text-muted);
    opacity: 0.7;
  }

  .input-field:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
  }

  .input-field:disabled {
    background: var(--color-surface-hover);
    color: var(--color-text-muted);
    cursor: not-allowed;
  }

  .input-field.input-error {
    border-color: var(--color-danger);
  }

  .input-field.input-error:focus {
    box-shadow: 0 0 0 3px oklch(from var(--color-danger) l c h / 0.15);
  }

  .error-text {
    font-size: var(--text-xs);
    color: var(--color-danger);
    margin: 0;
  }
</style>
