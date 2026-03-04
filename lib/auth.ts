const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

console.log('Auth Service API_URL:', API_URL);

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    console.log('Registering user:', { email, name, url: `${API_URL}/auth/register` });
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
    return response.json();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    console.log('Logging in user:', { email, url: `${API_URL}/auth/login` });
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
    return response.json();
  },

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  removeToken() {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
