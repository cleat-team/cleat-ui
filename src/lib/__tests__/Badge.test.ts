import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Badge from '../Badge.svelte';

describe('Badge', () => {
  it('renders with text content', () => {
    render(Badge, { props: { text: 'Active' } });
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const variants = ['success', 'warning', 'danger', 'info', 'neutral'] as const;
    for (const variant of variants) {
      const { unmount } = render(Badge, { props: { text: variant, variant } });
      const el = screen.getByText(variant);
      expect(el.className).toContain(`badge-${variant}`);
      unmount();
    }
  });

  it('applies correct CSS classes for each variant', () => {
    render(Badge, { props: { text: 'Neutral', variant: 'neutral' } });
    const el = screen.getByText('Neutral');
    expect(el.className).toContain('badge');
    expect(el.className).toContain('badge-neutral');
  });
});
