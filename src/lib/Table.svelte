<script lang="ts">
  import './theme.css';

  export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    html?: boolean;
  }

  let {
    columns = [] as Column[],
    rows = [] as Record<string, unknown>[],
    loading = false,
    onSort = undefined as ((key: string, direction: 'asc' | 'desc') => void) | undefined,
  }: {
    columns?: Column[];
    rows?: Record<string, unknown>[];
    loading?: boolean;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
  } = $props();

  let sortColumn = $state('');
  let sortDirection = $state<'asc' | 'desc'>('asc');

  function handleSortClick(col: Column) {
    if (!col.sortable) return;
    if (sortColumn === col.key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = col.key;
      sortDirection = 'asc';
    }
    if (onSort) {
      onSort(sortColumn, sortDirection);
    }
  }
</script>

<div class="table-wrapper">
  <table class="table">
    <thead>
      <tr>
        {#each columns as col (col.key)}
          <th
            class:sortable={col.sortable}
            class:sorted={sortColumn === col.key}
            onclick={col.sortable ? () => handleSortClick(col) : undefined}
            tabindex={col.sortable ? 0 : undefined}
            onkeydown={col.sortable ? (e: KeyboardEvent) => { if (e.key === 'Enter') handleSortClick(col); } : undefined}
          >
            <span class="th-content">
              {col.label}
              {#if col.sortable}
                <span class="sort-indicator">
                  {#if sortColumn === col.key}
                    {sortDirection === 'asc' ? '▴' : '▾'}
                  {:else}
                    ▴▾
                  {/if}
                </span>
              {/if}
            </span>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if loading}
        <tr>
          <td colspan={columns.length} class="table-status">
            Loading...
          </td>
        </tr>
      {:else if rows.length === 0}
        <tr>
          <td colspan={columns.length} class="table-status">
            No data
          </td>
        </tr>
      {:else}
        {#each rows as row, i (i)}
          <tr>
            {#each columns as col (col.key)}
              <td>{#if col.html}{@html String(row[col.key] ?? '')}{:else}{String(row[col.key] ?? '')}{/if}</td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);
    font-size: var(--text-base);
  }

  thead {
    background: var(--color-neutral-50);
    border-bottom: 2px solid var(--color-border);
  }

  th {
    text-align: left;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    user-select: none;
  }

  th.sortable {
    cursor: pointer;
    transition: color 0.15s;
  }

  th.sortable:hover {
    color: var(--color-text);
  }

  th.sorted {
    color: var(--color-primary);
  }

  .th-content {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }

  .sort-indicator {
    font-size: var(--text-xs);
    line-height: 1;
    opacity: 0.4;
  }

  th.sorted .sort-indicator {
    opacity: 1;
  }

  td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: var(--text-sm);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: var(--color-surface-hover);
  }

  .table-status {
    text-align: center;
    padding: var(--space-8) var(--space-4);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
</style>
