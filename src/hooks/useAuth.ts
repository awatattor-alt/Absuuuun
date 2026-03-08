import { useMemo, useState } from 'react';
import type { UserSession } from '../types/models';
import { getSession, login, logout } from '../services/authService';

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(() => getSession());

  const auth = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login: (username: string) => setSession(login(username)),
      logout: () => {
        logout();
        setSession(null);
      },
    }),
    [session],
  );

  return auth;
}
