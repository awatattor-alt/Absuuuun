import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Page.module.css';

const SignupPage: React.FC = () => {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) return setError('Name is required');
    if (!email.trim()) return setError('Email is required');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    try {
      setSubmitting(true);
      setError('');
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <h1>Signup</h1>
      <form className={styles.card} onSubmit={submit}>
        <label>Name
          <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>Email
          <input className={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>Password
          <input type="password" className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Create account'}</button>
      </form>
      <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
    </section>
  );
};

export default SignupPage;
