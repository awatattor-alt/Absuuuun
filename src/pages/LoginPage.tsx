import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const LoginPage: React.FC = () => {
  usePageTitle('Login');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return setError('Email and password are required.');
    setError('');
    await login(email, password);
    navigate('/feed');
  };

  return (
    <main className="form-shell">
      <section className="card auth-card">
        <aside className="auth-aside stack">
          <h1 className="page-title">Welcome back</h1>
          <p className="muted">Sign in to continue your conversations, alerts, and community feed.</p>
        </aside>
        <form className="auth-main stack" onSubmit={submit}>
          <h2 style={{ margin: 0 }}>Login</h2>
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <small style={{ color: '#fca5a5' }}>{error}</small>}
          <button className="btn btn-primary" type="submit">Continue</button>
          <small className="muted">New here? <NavLink to="/register" style={{ color: 'var(--primary)' }}>Create an account</NavLink></small>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
