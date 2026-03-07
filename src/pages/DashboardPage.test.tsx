import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from './DashboardPage';

describe('DashboardPage', () => {
  it('loads mocked dashboard content', async () => {
    render(<DashboardPage />);

    expect(screen.getByText(/Loading dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument();
  });
});
