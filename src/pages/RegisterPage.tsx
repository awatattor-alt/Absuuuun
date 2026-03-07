import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const RegisterPage: React.FC = () => {
  usePageTitle('Register');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return setError('All fields are required.');
    setError('');
    await register(name, email, password);
    navigate('/feed');
  };

  return (
    <main className="form-shell">
      <section className="card auth-card">
        <aside className="auth-aside stack">
          <h1 className="page-title">Join Absuuuun</h1>
          <p className="muted">Build your profile, discover events, and connect with local explorers in Iraq.</p>
        </aside>
        <form className="auth-main stack" onSubmit={submit}>
          <h2 style={{ margin: 0 }}>Create account</h2>
          <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <small style={{ color: '#fca5a5' }}>{error}</small>}
          <button className="btn btn-primary" type="submit">Create account</button>
          <small className="muted">Already registered? <NavLink to="/login" style={{ color: 'var(--primary)' }}>Login</NavLink></small>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
