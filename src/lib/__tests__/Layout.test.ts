import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import Layout from '../Layout.svelte';

describe('Layout', () => {
  it('renders children content', () => {
    render(Layout, {
      props: { children: textSnippet('Page content') },
    });
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders app name', () => {
    render(Layout, {
      props: {
        appName: 'MyApp',
        children: textSnippet('Content'),
      },
    });
    expect(screen.getByText('MyApp')).toBeInTheDocument();
  });

  it('renders default app name as Cleat', () => {
    render(Layout, {
      props: { children: textSnippet('Content') },
    });
    expect(screen.getByText('Cleat')).toBeInTheDocument();
  });

  it('renders sidebar navigation sections', () => {
    const sections = [{ id: 'home', label: 'Home' }, { id: 'settings', label: 'Settings' }];
    render(Layout, {
      props: { sections, children: textSnippet('Content') },
    });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders user info in sidebar', () => {
    const user = { name: 'Alice', email: 'alice@example.com' };
    render(Layout, {
      props: { user, children: textSnippet('Content') },
    });
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    // username appears in both sidebar footer and top bar
    const nameElements = screen.getAllByText('Alice');
    expect(nameElements.length).toBeGreaterThanOrEqual(1);
  });
});
