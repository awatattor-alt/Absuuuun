import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider } from '../context/AuthContext';

describe('Layout', () => {
  it('renders navigation links and children', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Layout><div>Child content</div></Layout>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(screen.getByText('Absuuuun')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
