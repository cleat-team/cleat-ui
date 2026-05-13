import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import AppShell from '../AppShell.svelte';

describe('AppShell', () => {
  it('renders children content', () => {
    render(AppShell, {
      props: { children: textSnippet('Shell content') },
    });
    expect(screen.getByText('Shell content')).toBeInTheDocument();
  });

  it('applies maxWidth style', () => {
    const { container } = render(AppShell, {
      props: {
        children: textSnippet('Content'),
        maxWidth: '800px',
      },
    });
    const inner = container.querySelector('.app-shell-inner') as HTMLElement;
    expect(inner.style.maxWidth).toBe('800px');
  });

  it('applies padding class by default', () => {
    const { container } = render(AppShell, {
      props: { children: textSnippet('Content') },
    });
    const shell = container.querySelector('.app-shell') as HTMLElement;
    expect(shell.className).toContain('has-padding');
  });
});
