import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'absuuun_user';

type User = {
  name: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const persist = (nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, _password: string) => {
    const name = email.split('@')[0] || 'User';
    persist({ name, email, avatar: name[0]?.toUpperCase() || 'U' });
  };

  const register = async (name: string, email: string, _password: string) => {
    persist({ name, email, avatar: name[0]?.toUpperCase() || 'U' });
  };

  const logout = () => persist(null);
  const updateProfile = (name: string) => {
    if (!user) return;
    persist({ ...user, name, avatar: name[0]?.toUpperCase() || 'U' });
  };

  const value = useMemo(() => ({ user, login, register, logout, updateProfile }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
