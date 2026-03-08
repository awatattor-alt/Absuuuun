import type { UserSession } from '../types/models';

const SESSION_KEY = 'iraq-compass-session';

export function getSession(): UserSession | null {
  const rawSession = window.localStorage.getItem(SESSION_KEY);
  return rawSession ? (JSON.parse(rawSession) as UserSession) : null;
}

export function login(username: string): UserSession {
  const session: UserSession = {
    username,
    token: crypto.randomUUID(),
  };

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
