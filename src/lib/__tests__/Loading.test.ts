import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Loading from '../Loading.svelte';

describe('Loading', () => {
  it('renders each variant (radar, binnacle, skeleton)', () => {
    const variants = ['radar', 'binnacle', 'skeleton'] as const;
    for (const variant of variants) {
      const { container, unmount } = render(Loading, {
        props: { variant },
      });
      const el = container.querySelector('.loading');
      expect(el).not.toBeNull();
      expect(el!.className).toContain(`loading-${variant}`);
      unmount();
    }
  });

  it('respects size prop (sm, md default, lg)', () => {
    const { container: c1, unmount: u1 } = render(Loading, {
      props: { variant: 'radar' },
    });
    expect(c1.querySelector('.loading')!.className).toContain('loading-md');
    u1();

    const { container: c2, unmount: u2 } = render(Loading, {
      props: { variant: 'radar', size: 'sm' },
    });
    expect(c2.querySelector('.loading')!.className).toContain('loading-sm');
    u2();

    const { container: c3, unmount: u3 } = render(Loading, {
      props: { variant: 'radar', size: 'lg' },
    });
    expect(c3.querySelector('.loading')!.className).toContain('loading-lg');
    u3();
  });

  it('renders sr-only label for accessibility', () => {
    const { container } = render(Loading, {
      props: { variant: 'radar', label: 'Fetching data...' },
    });
    const sr = container.querySelector('.sr-only');
    expect(sr).not.toBeNull();
    expect(sr!.textContent).toBe('Fetching data...');
  });

  it('uses default label when none provided', () => {
    const { container } = render(Loading, {
      props: { variant: 'binnacle' },
    });
    const sr = container.querySelector('.sr-only');
    expect(sr!.textContent).toBe('Loading...');
  });

  it('skeleton variant renders 3 bars', () => {
    const { container } = render(Loading, {
      props: { variant: 'skeleton' },
    });
    const bars = container.querySelectorAll('.skeleton-bar');
    expect(bars.length).toBe(3);
  });
});
