import { createRawSnippet } from 'svelte';

/**
 * Create a Svelte 5 snippet that renders text.
 * Use this to pass children / named snippet props in tests.
 */
export function textSnippet(text: string) {
  return createRawSnippet(() => ({
    render: () => `<span>${escapeHtml(text)}</span>`,
  }));
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
