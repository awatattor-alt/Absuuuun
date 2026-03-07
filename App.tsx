import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './src/components/Layout';
import ProtectedRoute from './src/components/ProtectedRoute';
import HomePage from './src/pages/HomePage';
import AboutPage from './src/pages/AboutPage';
import DashboardPage from './src/pages/DashboardPage';
import ProfilePage from './src/pages/ProfilePage';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignupPage';
import NotFoundPage from './src/pages/NotFoundPage';

const withLayout = (node: React.ReactNode) => <Layout>{node}</Layout>;

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={withLayout(<HomePage />)} />
      <Route path="/about" element={withLayout(<AboutPage />)} />
      <Route path="/dashboard" element={withLayout(<ProtectedRoute><DashboardPage /></ProtectedRoute>)} />
      <Route path="/profile" element={withLayout(<ProtectedRoute><ProfilePage /></ProtectedRoute>)} />
      <Route path="/login" element={withLayout(<LoginPage />)} />
      <Route path="/signup" element={withLayout(<SignupPage />)} />
      <Route path="*" element={withLayout(<NotFoundPage />)} />
    </Routes>
  </BrowserRouter>
);

export default App;
