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
    if (!email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    await login(email, password);
    navigate('/feed');
  };

  return (
    <div className="min-h-[70vh] grid place-items-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-3">
        <h1 className="text-xl text-white font-bold">Login</h1>
        <input className="w-full p-2 rounded bg-slate-900 text-white border border-slate-600 focus:ring-2 focus:ring-sky-400" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 rounded bg-slate-900 text-white border border-slate-600 focus:ring-2 focus:ring-sky-400" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full py-2 rounded bg-sky-600 hover:bg-sky-500">Login</button>
        <p className="text-sm text-slate-300">No account? <NavLink className="text-sky-400 hover:underline" to="/register">Register</NavLink></p>
      </form>
    </div>
  );
};

export default LoginPage;
