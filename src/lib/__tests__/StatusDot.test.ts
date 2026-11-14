import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import StatusDot from '../StatusDot.svelte';

describe('StatusDot', () => {
  it('renders with each status variant', () => {
    const statuses = ['active', 'idle', 'error', 'offline'] as const;
    for (const status of statuses) {
      const { container, unmount } = render(StatusDot, {
        props: { status },
      });
      const dot = container.querySelector('.status-dot');
      expect(dot).not.toBeNull();
      expect(dot!.className).toContain(`status-dot-${status}`);
      unmount();
    }
  });

  it('applies pulsing animation class only when pulsing=true and status is active', () => {
    const { container: c1, unmount: u1 } = render(StatusDot, {
      props: { status: 'active', pulsing: true },
    });
    const dot1 = c1.querySelector('.status-dot');
    expect(dot1!.className).toContain('status-dot-pulsing');
    u1();

    // pulsing with non-active status should not add class
    const { container: c2, unmount: u2 } = render(StatusDot, {
      props: { status: 'idle', pulsing: true },
    });
    const dot2 = c2.querySelector('.status-dot');
    expect(dot2!.className).not.toContain('status-dot-pulsing');
    u2();

    // no pulsing prop
    const { container: c3, unmount: u3 } = render(StatusDot, {
      props: { status: 'active', pulsing: false },
    });
    const dot3 = c3.querySelector('.status-dot');
    expect(dot3!.className).not.toContain('status-dot-pulsing');
    u3();
  });

  it('respects size prop (sm default, md)', () => {
    const { container: c1, unmount: u1 } = render(StatusDot, {
      props: { status: 'active' },
    });
    expect(c1.querySelector('.status-dot')!.className).toContain('status-dot-sm');
    u1();

    const { container: c2, unmount: u2 } = render(StatusDot, {
      props: { status: 'active', size: 'md' },
    });
    expect(c2.querySelector('.status-dot')!.className).toContain('status-dot-md');
    u2();
  });

  it('renders sr-only label text for accessibility', () => {
    const { container } = render(StatusDot, {
      props: { status: 'active', label: 'Online' },
    });
    const sr = container.querySelector('.sr-only');
    expect(sr).not.toBeNull();
    expect(sr!.textContent).toBe('Online');
  });

  it('uses status as fallback label when no label provided', () => {
    const { container } = render(StatusDot, {
      props: { status: 'error' },
    });
    const sr = container.querySelector('.sr-only');
    expect(sr!.textContent).toBe('error');
  });
});
