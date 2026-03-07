export type FeatureItem = {
  id: string;
  title: string;
  description: string;
};

export type DashboardData = {
  greeting: string;
  tasks: string[];
  alerts: string[];
};

export type ProfileData = {
  name: string;
  email: string;
  role: string;
  location: string;
};

export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const mockDelay = <T,>(data: T, timeout = 500): Promise<T> =>
  new Promise((resolve) => window.setTimeout(() => resolve(data), timeout));

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Falls back to mock payloads so frontend remains functional without a running API.
export const apiService = {
  async getHomeFeatures(): Promise<FeatureItem[]> {
    try {
      return await fetchJson<FeatureItem[]>('/api/features');
    } catch {
      return mockDelay([
        { id: 'f1', title: 'Fast onboarding', description: 'Get started in minutes with guided workflows.' },
        { id: 'f2', title: 'Progress tracking', description: 'Monitor activity with a clear dashboard snapshot.' },
        { id: 'f3', title: 'Team collaboration', description: 'Keep updates centralized and easy to discover.' },
      ]);
    }
  },

  async getAboutFacts(): Promise<FeatureItem[]> {
    try {
      return await fetchJson<FeatureItem[]>('/api/about');
    } catch {
      return mockDelay([
        { id: 'a1', title: 'Mission', description: 'Build a practical starter app with reliable UX defaults.' },
        { id: 'a2', title: 'Stack', description: 'React + TypeScript + Vite with route-level data handling.' },
        { id: 'a3', title: 'Support', description: 'Designed to run with either live APIs or local mocks.' },
      ]);
    }
  },

  async getDashboard(): Promise<DashboardData> {
    try {
      return await fetchJson<DashboardData>('/api/dashboard');
    } catch {
      return mockDelay({
        greeting: 'Welcome back! Here is your current snapshot.',
        tasks: ['Complete profile details', 'Review analytics trend', 'Invite one teammate'],
        alerts: ['API currently using mock data fallback'],
      });
    }
  },

  async getProfile(): Promise<ProfileData> {
    try {
      return await fetchJson<ProfileData>('/api/profile');
    } catch {
      return mockDelay({
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'Administrator',
        location: 'Remote',
      });
    }
  },

  async login(payload: AuthPayload): Promise<{ token: string; name: string; email: string }> {
    try {
      return await fetchJson('/api/login', { method: 'POST', body: JSON.stringify(payload) });
    } catch {
      return mockDelay({ token: 'mock-token', name: payload.email.split('@')[0], email: payload.email });
    }
  },

  async signup(payload: AuthPayload): Promise<{ token: string; name: string; email: string }> {
    try {
      return await fetchJson('/api/signup', { method: 'POST', body: JSON.stringify(payload) });
    } catch {
      return mockDelay({ token: 'mock-token', name: payload.name || 'New User', email: payload.email });
    }
  },
};
