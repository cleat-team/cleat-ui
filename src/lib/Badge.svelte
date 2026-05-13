<script lang="ts">
  import './theme.css';

  type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

  let {
    variant = 'neutral' as Variant,
    text = '',
  }: {
    variant?: Variant;
    text?: string;
  } = $props();
</script>

<span class="badge badge-{variant}">{text}</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: 999px;
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    white-space: nowrap;
    line-height: 1.4;
  }

  .badge-success {
    background: var(--color-success-100);
    color: var(--color-success-700);
  }

  .badge-warning {
    background: var(--color-warning-100);
    color: var(--color-warning-700);
  }

  .badge-danger {
    background: var(--color-danger-100);
    color: var(--color-danger-700);
  }

  .badge-info {
    background: var(--color-info-100);
    color: var(--color-info-700);
  }

  .badge-neutral {
    background: var(--color-neutral-100);
    color: var(--color-neutral-700);
  }
</style>
