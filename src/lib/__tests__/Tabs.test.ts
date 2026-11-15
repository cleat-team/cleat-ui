import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Tabs from '../Tabs.svelte';

describe('Tabs', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab One' },
    { id: 'tab2', label: 'Tab Two' },
    { id: 'tab3', label: 'Tab Three' },
  ];

  it('renders all tab labels', () => {
    render(Tabs, { props: { tabs } });
    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Tab Three')).toBeInTheDocument();
  });

  it('first tab is active by default', () => {
    render(Tabs, { props: { tabs, activeTab: 'tab1' } });
    const buttons = screen.getAllByRole('tab');
    expect(buttons[0].className).toContain('active');
    expect(buttons[1].className).not.toContain('active');
  });

  it('clicking a tab fires onTabChange with the tab id', async () => {
    const fn = vi.fn();
    render(Tabs, { props: { tabs, activeTab: 'tab1', onTabChange: fn } });
    const buttons = screen.getAllByRole('tab');
    await buttons[1].click();
    expect(fn).toHaveBeenCalledWith('tab2');
  });

  it('fires onTabChange with the tab id when clicked', async () => {
    const fn = vi.fn();
    render(Tabs, { props: { tabs, activeTab: 'tab1', onTabChange: fn } });
    await screen.getByText('Tab Three').click();
    expect(fn).toHaveBeenCalledWith('tab3');
  });

  // The marker sits under the active tab, not always under the first one: clew's Project settings opened on
  // Reviewers with the marker on General (2026-11-15).
  const marker = (container: HTMLElement) => container.querySelector<HTMLElement>('.tab-indicator');
  const left = (container: HTMLElement) => parseFloat(marker(container)!.style.left);

  it('puts the marker under the active tab', () => {
    const { container } = render(Tabs, { props: { tabs, activeTab: 'tab2' } });
    expect(left(container)).toBeCloseTo(100 / 3, 2);
  });

  it('moves the marker when the active tab changes', async () => {
    const { container, rerender } = render(Tabs, { props: { tabs, activeTab: 'tab1' } });
    expect(left(container)).toBeCloseTo(0, 2);
    await rerender({ tabs, activeTab: 'tab3' });
    expect(left(container)).toBeCloseTo(200 / 3, 2);
  });

  it('draws no marker when no tab is active', () => {
    const { container } = render(Tabs, { props: { tabs, activeTab: 'nope' } });
    expect(marker(container)).toBeNull();
  });

  it('draws no marker with no tabs', () => {
    const { container } = render(Tabs, { props: { tabs: [], activeTab: '' } });
    expect(marker(container)).toBeNull();
  });
});
