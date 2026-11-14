import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import EmptyState from '../EmptyState.svelte';

describe('EmptyState', () => {
  it('renders default illustration (compass) and default title when no props given', () => {
    render(EmptyState);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
    expect(screen.getByText('Set a course to get started.')).toBeInTheDocument();
  });

  it('renders custom title and description text', () => {
    render(EmptyState, {
      props: {
        title: 'No leads found',
        description: 'Try adjusting your filters.',
      },
    });
    expect(screen.getByText('No leads found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('renders action button when actionLabel is set', () => {
    render(EmptyState, {
      props: {
        title: 'Empty',
        actionLabel: 'Add item',
        onaction: vi.fn(),
      },
    });
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('calls onaction when action button is clicked', async () => {
    const fn = vi.fn();
    render(EmptyState, {
      props: {
        title: 'Empty',
        actionLabel: 'Click me',
        onaction: fn,
      },
    });
    await screen.getByRole('button', { name: 'Click me' }).click();
    expect(fn).toHaveBeenCalledOnce();
  });

  it('renders each illustration variant without error', () => {
    const illustrations = ['compass', 'lighthouse', 'anchor', 'waves'] as const;
    for (const illustration of illustrations) {
      const { unmount } = render(EmptyState, {
        props: { illustration },
      });
      expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
      unmount();
    }
  });
});
