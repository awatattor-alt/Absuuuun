import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const ProfilePage: React.FC = () => {
  usePageTitle('Profile');
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  if (!user) return null;

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-4">
      <h1 className="text-2xl text-white font-bold">Profile</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
        <div className="w-16 h-16 rounded-full bg-sky-600 grid place-items-center text-2xl text-white font-bold">{user.name[0]?.toUpperCase()}</div>
        {!editing ? (
          <>
            <p className="text-white">{user.name}</p>
            <p className="text-slate-300">{user.email}</p>
            <button onClick={() => setEditing(true)} className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500">Edit Profile</button>
          </>
        ) : (
          <div className="space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
            <input value={user.email} readOnly className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-slate-400" />
            <button onClick={() => { if (!name.trim()) return; updateProfile(name); setEditing(false); }} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500">Save</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
