<script lang="ts">
  import './theme.css';

  export interface Tab {
    id: string;
    label: string;
  }

  let {
    tabs = [] as Tab[],
    activeTab = '',
    onTabChange = undefined as ((id: string) => void) | undefined,
  }: {
    tabs?: Tab[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
  } = $props();

  function handleTabClick(id: string) {
    if (id !== activeTab && onTabChange) {
      onTabChange(id);
    }
  }
</script>

<div class="tabs">
  <div class="tabs-bar" role="tablist">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        class="tab"
        class:active={activeTab === tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        onclick={() => handleTabClick(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
    <div
      class="tab-indicator"
      style="width: {100 / tabs.length}%"
    ></div>
  </div>
</div>

<style>
  .tabs {
    font-family: var(--font-sans);
  }

  .tabs-bar {
    display: flex;
    position: relative;
    border-bottom: 2px solid var(--color-border);
    gap: 0;
  }

  .tab {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-family: inherit;
    font-size: var(--text-sm);
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s;
    position: relative;
    z-index: 1;
    white-space: nowrap;
  }

  .tab:hover {
    color: var(--color-text);
  }

  .tab.active {
    color: var(--color-primary);
    font-weight: 600;
  }

  .tab-indicator {
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    background: var(--color-primary);
    transition: left 0.2s ease, width 0.2s ease;
    pointer-events: none;
  }
</style>
