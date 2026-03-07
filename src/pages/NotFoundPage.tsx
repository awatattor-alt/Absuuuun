import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePageTitle } from './usePageTitle';

const NotFoundPage: React.FC = () => {
  usePageTitle('404');
  return (
    <div className="min-h-[70vh] grid place-items-center text-center p-6">
      <div className="space-y-3">
        <h1 className="text-4xl text-white font-bold">404</h1>
        <p className="text-slate-300">Page not found.</p>
        <NavLink to="/" className="inline-block px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white">Go Home</NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
