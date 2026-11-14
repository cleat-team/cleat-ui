import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import Form from '../Form.svelte';

describe('Form', () => {
  it('renders children', () => {
    render(Form, {
      props: { children: textSnippet('Form content') },
    });
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('shows error message when error prop is set', () => {
    render(Form, {
      props: {
        children: textSnippet('Content'),
        error: 'Something went wrong',
      },
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows loading state - does not call onSubmit when loading', () => {
    const fn = vi.fn();
    render(Form, {
      props: {
        children: textSnippet('Content'),
        loading: true,
        onSubmit: fn,
      },
    });
    const form = document.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    expect(fn).not.toHaveBeenCalled();
  });

  it('fires onSubmit when form is submitted', async () => {
    const fn = vi.fn();
    render(Form, {
      props: {
        children: textSnippet('Content'),
        onSubmit: fn,
      },
    });
    const form = document.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    expect(fn).toHaveBeenCalledOnce();
  });
});
