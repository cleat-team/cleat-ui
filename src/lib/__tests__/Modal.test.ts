import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import Modal from '../Modal.svelte';

describe('Modal', () => {
  it('does not render when open is false', () => {
    render(Modal, {
      props: {
        open: false,
        title: 'Test',
        children: textSnippet('Content'),
      },
    });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders when open is true', () => {
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        children: textSnippet('Content'),
      },
    });
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(Modal, {
      props: {
        open: true,
        title: 'Dialog Title',
        children: textSnippet('Content'),
      },
    });
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  });

  it('renders body content via children', () => {
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        children: textSnippet('Body text'),
      },
    });
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders body snippet when body prop is provided', () => {
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        body: textSnippet('Custom body'),
      },
    });
    expect(screen.getByText('Custom body')).toBeInTheDocument();
  });

  it('renders footer content', () => {
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        children: textSnippet('Content'),
        footer: textSnippet('Footer'),
      },
    });
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('fires onClose when backdrop is clicked', async () => {
    const fn = vi.fn();
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        onClose: fn,
        children: textSnippet('Content'),
      },
    });
    const backdrop = document.querySelector('.modal-backdrop')!;
    await backdrop.click();
    expect(fn).toHaveBeenCalledOnce();
  });

  it('fires onClose when the close button is clicked', async () => {
    const fn = vi.fn();
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        onClose: fn,
        children: textSnippet('Content'),
      },
    });
    const closeBtn = screen.getByLabelText('Close dialog');
    await closeBtn.click();
    expect(fn).toHaveBeenCalledOnce();
  });

  it('fires onClose when Escape key is pressed', async () => {
    const fn = vi.fn();
    render(Modal, {
      props: {
        open: true,
        title: 'Test',
        onClose: fn,
        children: textSnippet('Content'),
      },
    });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fn).toHaveBeenCalledOnce();
  });
});
