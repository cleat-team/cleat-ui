<script lang="ts">
  import './theme.css';

  type Status = 'active' | 'idle' | 'error' | 'offline';
  type DotSize = 'sm' | 'md';

  let {
    status,
    pulsing = false,
    size = 'sm' as DotSize,
    label = '',
  }: {
    status: Status;
    pulsing?: boolean;
    size?: DotSize;
    label?: string;
  } = $props();

  const dotClass = $derived([
    'status-dot',
    `status-dot-${status}`,
    `status-dot-${size}`,
    pulsing && status === 'active' ? 'status-dot-pulsing' : '',
  ].filter(Boolean).join(' '));

  const ariaLabel = $derived(label || status);
</script>

<span class={dotClass} role="status" aria-label={ariaLabel}>
  <span class="sr-only">{ariaLabel}</span>
</span>

<style>
  .status-dot {
    display: inline-block;
    flex-shrink: 0;
    border-radius: 50%;
    position: relative;
  }

  .status-dot-sm {
    width: 6px;
    height: 6px;
  }

  .status-dot-md {
    width: 8px;
    height: 8px;
  }

  .status-dot-active {
    background: var(--color-status-active);
    box-shadow: 0 0 6px currentColor;
  }

  .status-dot-idle {
    background: var(--color-status-idle);
    box-shadow: 0 0 6px currentColor;
  }

  .status-dot-error {
    background: var(--color-status-error);
    box-shadow: 0 0 6px currentColor;
  }

  .status-dot-offline {
    background: var(--color-status-offline);
    box-shadow: 0 0 6px currentColor;
  }

  .status-dot-pulsing {
    animation: status-pulse 2s ease-in-out infinite;
  }

  @keyframes status-pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 4px currentColor; }
    50% { opacity: 0.6; box-shadow: 0 0 10px currentColor; }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
