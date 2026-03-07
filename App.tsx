import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainNav from './src/components/MainNav';
import ProtectedRoute from './src/components/ProtectedRoute';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import ProfilePage from './src/pages/ProfilePage';
import FeedPage from './src/pages/FeedPage';
import MessagesPage from './src/pages/MessagesPage';
import ChatPage from './src/pages/ChatPage';
import NotificationsPage from './src/pages/NotificationsPage';
import SettingsPage from './src/pages/SettingsPage';
import NotFoundPage from './src/pages/NotFoundPage';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/messages/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  </BrowserRouter>
);

export default App;
