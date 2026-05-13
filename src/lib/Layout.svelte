<script lang="ts">
  import './theme.css';

  export interface NavSection {
    id: string;
    label: string;
    icon?: string;
    children?: NavSection[];
  }

  export interface User {
    name: string;
    email?: string;
    avatar?: string;
  }

  let {
    sections = [] as NavSection[],
    activeSection = '',
    user = undefined as User | undefined,
    appName = 'Cleat',
    onNavigate = undefined as ((id: string) => void) | undefined,
    sidebarCollapsed = $state(false),
    children,
  }: {
    sections?: NavSection[];
    activeSection?: string;
    user?: User;
    appName?: string;
    onNavigate?: (id: string) => void;
    sidebarCollapsed?: boolean;
    children?: import('svelte').Snippet;
  } = $props();

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

  function handleNavClick(id: string) {
    if (onNavigate) onNavigate(id);
  }

  const sidebarWidth = $derived(sidebarCollapsed ? '56px' : '240px');
</script>

<div
  class="layout"
  style="--sidebar-width: {sidebarWidth}"
>
  <!-- Sidebar -->
  <aside class="sidebar" class:collapsed={sidebarCollapsed}>
    <div class="sidebar-header">
      <span class="sidebar-logo">{appName.slice(0, 1)}</span>
      {#if !sidebarCollapsed}
        <span class="sidebar-title">{appName}</span>
      {/if}
    </div>

    <nav class="sidebar-nav">
      {#snippet renderNavItem(section: NavSection)}
        <button
          type="button"
          class="nav-item"
          class:active={activeSection === section.id}
          onclick={() => handleNavClick(section.id)}
          title={section.label}
        >
          {#if section.icon}
            <span class="nav-icon">{section.icon}</span>
          {/if}
          {#if !sidebarCollapsed}
            <span class="nav-label">{section.label}</span>
          {/if}
        </button>
        {#if section.children && !sidebarCollapsed}
          <div class="nav-children">
            {#each section.children as child (child.id)}
              {@render renderNavItem(child)}
            {/each}
          </div>
        {/if}
      {/snippet}
      {#each sections as section (section.id)}
        {@render renderNavItem(section)}
      {/each}
    </nav>

    <div class="sidebar-footer">
      {#if user && !sidebarCollapsed}
        <div class="user-info">
          <span class="user-name">{user.name}</span>
          {#if user.email}
            <span class="user-email">{user.email}</span>
          {/if}
        </div>
      {/if}
    </div>
  </aside>

  <!-- Main area -->
  <div class="main-area">
    <!-- Top bar -->
    <header class="topbar">
      <button type="button" class="toggle-btn" onclick={toggleSidebar} aria-label="Toggle sidebar">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="topbar-spacer"></div>

      {#if user}
        <div class="topbar-user">
          <span class="topbar-user-name">{user.name}</span>
        </div>
      {/if}
    </header>

    <!-- Content area -->
    <main class="content">
      {@render children?.()}
    </main>
  </div>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    min-height: 100vh;
    transition: grid-template-columns 0.2s ease;
    background: var(--color-bg);
    font-family: var(--font-sans);
    color: var(--color-text);
  }

  .sidebar {
    background: oklch(0.18 0.01 270);
    color: oklch(0.85 0.005 270);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.2s ease;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-3);
    border-bottom: 1px solid oklch(0.25 0.01 270);
    min-height: 56px;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-sm);
    background: var(--color-primary);
    color: var(--color-primary-foreground);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: var(--text-md);
    flex-shrink: 0;
  }

  .sidebar-title {
    font-size: var(--text-lg);
    font-weight: 600;
    white-space: nowrap;
  }

  .sidebar-nav {
    flex: 1;
    padding: var(--space-2);
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-y: auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: var(--text-base);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    text-align: left;
    white-space: nowrap;
  }

  .nav-item:hover {
    background: oklch(1 0 0 / 0.08);
    color: oklch(0.95 0 0);
  }

  .nav-item.active {
    background: oklch(1 0 0 / 0.12);
    color: oklch(1 0 0);
    font-weight: 600;
  }

  .nav-icon {
    width: 20px;
    text-align: center;
    flex-shrink: 0;
    font-size: var(--text-md);
  }

  .nav-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-children {
    margin-left: var(--space-4);
  }

  .sidebar-footer {
    padding: var(--space-3);
    border-top: 1px solid oklch(0.25 0.01 270);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .user-name {
    font-size: var(--text-sm);
    font-weight: 600;
    color: oklch(0.9 0 0);
  }

  .user-email {
    font-size: var(--text-xs);
    color: oklch(0.6 0 0);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ---- Main area ---- */
  .main-area {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-4);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    min-height: 48px;
  }

  .toggle-btn {
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

  .toggle-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .topbar-spacer {
    flex: 1;
  }

  .topbar-user {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .topbar-user-name {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text);
  }

  .content {
    flex: 1;
    padding: var(--space-6);
    overflow-y: auto;
  }
</style>
