<script lang="ts">
  import './theme.css';

  type Variant = 'radar' | 'binnacle' | 'skeleton';
  type LoadSize = 'sm' | 'md' | 'lg';

  let {
    variant,
    size = 'md' as LoadSize,
    label = 'Loading...',
  }: {
    variant: Variant;
    size?: LoadSize;
    label?: string;
  } = $props();

  const containerClass = $derived([
    'loading',
    `loading-${variant}`,
    `loading-${size}`,
  ].join(' '));
</script>

<div class={containerClass} role="status" aria-label={label}>
  <span class="sr-only">{label}</span>
  {#if variant === 'skeleton'}
    <div class="skeleton-bar" style="width: 100%"></div>
    <div class="skeleton-bar" style="width: 75%"></div>
    <div class="skeleton-bar" style="width: 50%"></div>
  {/if}
</div>

<style>
  .loading {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .loading-radar,
  .loading-binnacle {
    align-items: center;
    justify-content: center;
  }

  .loading-sm {
    width: 24px;
    height: 24px;
  }

  .loading-md {
    width: 40px;
    height: 40px;
  }

  .loading-lg {
    width: 64px;
    height: 64px;
  }

  /* Skeleton has no fixed height — bars determine it */
  .loading-skeleton.loading-sm {
    width: 120px;
    height: auto;
  }

  .loading-skeleton.loading-md {
    width: 200px;
    height: auto;
  }

  .loading-skeleton.loading-lg {
    width: 320px;
    height: auto;
  }

  /* Radar variant */
  .loading-radar::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--color-accent) 90deg,
      transparent 90deg
    );
    animation: radar-sweep 1.5s linear infinite;
  }

  .loading-radar::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    margin-left: -1px;
    margin-top: -1px;
    border-radius: 50%;
    background: var(--color-accent);
    box-shadow: 0 0 0 1.5px var(--color-accent-subtle);
  }

  @keyframes radar-sweep {
    to { transform: rotate(360deg); }
  }

  /* Binnacle variant */
  .loading-binnacle::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--color-accent);
    animation: binnacle-pulse 2s ease-in-out infinite;
  }

  @keyframes binnacle-pulse {
    0%, 100% { opacity: 0.4; box-shadow: 0 0 8px var(--color-accent); transform: scale(0.8); }
    50% { opacity: 1; box-shadow: 0 0 20px var(--color-accent); transform: scale(1); }
  }

  /* Skeleton variant */
  .skeleton-bar {
    height: 12px;
    border-radius: var(--radius-sm);
    background: linear-gradient(
      90deg,
      var(--color-foam) 0%,
      var(--color-surface-alt) 40%,
      var(--color-foam) 80%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
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
