<script lang="ts">
  import './theme.css';
  import Button from './Button.svelte';

  type Illustration = 'compass' | 'lighthouse' | 'anchor' | 'waves';

  let {
    title = 'Nothing here yet',
    description = '',
    actionLabel = undefined as string | undefined,
    onaction = undefined as (() => void) | undefined,
    illustration = 'compass' as Illustration,
  }: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onaction?: () => void;
    illustration?: Illustration;
  } = $props();

  const defaultDescriptions: Record<Illustration, string> = {
    compass: "Set a course to get started.",
    lighthouse: "A guiding light will appear here soon.",
    anchor: "Drop anchor and hold steady — data is on its way.",
    waves: "Ride the waves — check back shortly.",
  };

  const displayDescription = $derived(description || defaultDescriptions[illustration]);
</script>

<div class="empty-state">
  <svg class="empty-state-illustration" viewBox="0 0 120 120" width="80" height="80" fill="none" stroke="var(--color-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    {#if illustration === 'compass'}
      <!-- Outer ring -->
      <circle cx="60" cy="60" r="48" />
      <circle cx="60" cy="60" r="42" stroke-width="0.75" stroke="var(--color-accent-subtle)" />
      <!-- Cardinal ticks -->
      <line x1="60" y1="12" x2="60" y2="20" />
      <line x1="60" y1="100" x2="60" y2="108" />
      <line x1="12" y1="60" x2="20" y2="60" />
      <line x1="100" y1="60" x2="108" y2="60" />
      <!-- Cross lines (compass rose) -->
      <line x1="60" y1="20" x2="60" y2="100" stroke-width="0.75" stroke="var(--color-accent-subtle)" />
      <line x1="20" y1="60" x2="100" y2="60" stroke-width="0.75" stroke="var(--color-accent-subtle)" />
      <!-- Labels -->
      <text x="60" y="10" text-anchor="middle" font-size="10" fill="var(--color-accent)" stroke="none">N</text>
      <text x="60" y="118" text-anchor="middle" font-size="10" fill="var(--color-accent)" stroke="none">S</text>
      <text x="8" y="63" text-anchor="middle" font-size="10" fill="var(--color-accent)" stroke="none">W</text>
      <text x="112" y="63" text-anchor="middle" font-size="10" fill="var(--color-accent)" stroke="none">E</text>
    {:else if illustration === 'lighthouse'}
      <!-- Base -->
      <rect x="42" y="90" width="36" height="8" rx="1" />
      <!-- Tower -->
      <polygon points="50,90 70,90 66,40 54,40" />
      <rect x="48" y="40" width="24" height="8" rx="1" />
      <!-- Light room -->
      <rect x="54" y="28" width="12" height="12" rx="1" />
      <!-- Light beams -->
      <line x1="60" y1="28" x2="20" y2="10" stroke="var(--color-brass-subtle)" stroke-width="2" />
      <line x1="60" y1="28" x2="100" y2="10" stroke="var(--color-brass-subtle)" stroke-width="2" />
      <line x1="60" y1="28" x2="30" y2="5" stroke="var(--color-brass-subtle)" stroke-width="1" />
      <line x1="60" y1="28" x2="90" y2="5" stroke="var(--color-brass-subtle)" stroke-width="1" />
      <!-- Lens -->
      <circle cx="60" cy="34" r="4" fill="var(--color-accent)" stroke="none" />
    {:else if illustration === 'anchor'}
      <!-- Ring -->
      <circle cx="60" cy="20" r="8" />
      <!-- Shank / vertical bar -->
      <line x1="60" y1="28" x2="60" y2="90" />
      <!-- Stock / horizontal bar -->
      <line x1="30" y1="40" x2="90" y2="40" />
      <!-- Left arm -->
      <path d="M60,70 Q30,80 25,95" />
      <line x1="25" y1="90" x2="25" y2="100" />
      <!-- Right arm -->
      <path d="M60,70 Q90,80 95,95" />
      <line x1="95" y1="90" x2="95" y2="100" />
    {:else if illustration === 'waves'}
      <!-- Wave 1 (top) -->
      <path d="M10,60 Q30,45 50,60 Q70,75 90,60 Q110,45 115,55" fill="none" />
      <!-- Wave 2 (middle) -->
      <path d="M5,75 Q25,60 45,75 Q65,90 85,75 Q105,60 115,70" fill="none" />
      <!-- Wave 3 (bottom) -->
      <path d="M10,90 Q30,75 50,90 Q70,105 90,90 Q110,75 115,85" fill="none" stroke-width="0.75" stroke="var(--color-accent-subtle)" />
    {/if}
  </svg>

  <h2 class="empty-state-title">{title}</h2>
  <p class="empty-state-description">{displayDescription}</p>

  {#if actionLabel && onaction}
    <div class="empty-state-action">
      <Button variant="primary" onclick={onaction}>{actionLabel}</Button>
    </div>
  {/if}
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
    padding: var(--space-8) var(--space-4);
    background: var(--color-page-bg);
    border: 1px solid var(--color-accent-subtle);
    border-radius: var(--radius-lg);
  }

  .empty-state-illustration {
    margin-bottom: var(--space-4);
    flex-shrink: 0;
  }

  .empty-state-title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 var(--space-2) 0;
  }

  .empty-state-description {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-4) 0;
  }

  .empty-state-action {
    margin-top: var(--space-2);
  }
</style>
