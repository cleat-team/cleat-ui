import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Table from '../Table.svelte';

describe('Table', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];
  const rows = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' },
  ];

  it('renders column headers', () => {
    render(Table, { props: { columns } });
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(Table, { props: { columns, rows } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(Table, { props: { columns, loading: true } });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state when no rows', () => {
    render(Table, { props: { columns } });
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
