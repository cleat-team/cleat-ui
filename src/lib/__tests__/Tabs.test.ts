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
});
