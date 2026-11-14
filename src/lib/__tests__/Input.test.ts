import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Input from '../Input.svelte';

describe('Input', () => {
  it('renders with label', () => {
    render(Input, { props: { label: 'Email', name: 'email' } });
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(Input, { props: { label: 'Email', name: 'email', placeholder: 'Enter email' } });
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('shows error message when error prop is set', () => {
    render(Input, { props: { label: 'Email', name: 'email', error: 'Required' } });
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByRole('textbox').className).toContain('input-error');
  });

  it('associates label with input via for/id', () => {
    render(Input, { props: { label: 'Email', name: 'email' } });
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'input-email');
    expect(input).toHaveAttribute('id', 'input-email');
  });

  it('calls oninput when value changes', async () => {
    const fn = vi.fn();
    render(Input, { props: { label: 'Name', name: 'name', oninput: fn } });
    const input = screen.getByRole('textbox');
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('disables input when disabled', () => {
    render(Input, { props: { label: 'Name', name: 'name', disabled: true } });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
