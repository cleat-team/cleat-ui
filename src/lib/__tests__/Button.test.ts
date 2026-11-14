import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import Button from '../Button.svelte';

describe('Button', () => {
  it('renders with default props', () => {
    render(Button, {
      props: { children: textSnippet('Click me') },
    });
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('btn-primary');
    expect(btn.className).toContain('btn-md');
  });

  it('renders different variants', () => {
    const variants = ['primary', 'secondary', 'danger', 'ghost'] as const;
    for (const variant of variants) {
      const { unmount } = render(Button, {
        props: { children: textSnippet('Test'), variant },
      });
      expect(screen.getByRole('button').className).toContain(`btn-${variant}`);
      unmount();
    }
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(Button, {
        props: { children: textSnippet('Test'), size },
      });
      expect(screen.getByRole('button').className).toContain(`btn-${size}`);
      unmount();
    }
  });

  it('shows loading state', () => {
    render(Button, {
      props: { children: textSnippet('Saving'), loading: true },
    });
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('btn-loading');
    const content = btn.querySelector('.btn-content');
    expect(content?.className).toContain('visually-hidden');
  });

  it('fires onclick handler when clicked', async () => {
    const fn = vi.fn();
    render(Button, {
      props: { children: textSnippet('Click'), onclick: fn },
    });
    await screen.getByRole('button').click();
    expect(fn).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(Button, {
      props: { children: textSnippet('Click'), disabled: true },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has type="button" by default', () => {
    render(Button, {
      props: { children: textSnippet('Click') },
    });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('can override type prop', () => {
    render(Button, {
      props: { children: textSnippet('Click'), type: 'submit' },
    });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
