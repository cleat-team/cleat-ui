import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { textSnippet } from './helpers';
import Card from '../Card.svelte';

describe('Card', () => {
  it('renders children content', () => {
    render(Card, {
      props: { children: textSnippet('Body content') },
    });
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders header slot content', () => {
    render(Card, {
      props: {
        children: textSnippet('Body'),
        header: textSnippet('Header'),
      },
    });
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders footer slot content', () => {
    render(Card, {
      props: {
        children: textSnippet('Body'),
        footer: textSnippet('Footer'),
      },
    });
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies hoverable class when hoverable prop is true', () => {
    render(Card, {
      props: {
        children: textSnippet('Body'),
        hoverable: true,
      },
    });
    const card = screen.getByText('Body').closest('.card');
    expect(card?.className).toContain('card-hoverable');
  });
});
