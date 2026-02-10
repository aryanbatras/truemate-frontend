const API_BASE_URL = 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phone: string;
  bio: string;
  interests: string[];
  hobbies: string[];
  lookingFor: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  authMethod: 'email';
}

export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  bio?: string;
  profilePhotos: Array<{
    url: string;
    isMain: boolean;
    isVerified: boolean;
    id?: string;
  }>;
  tokens: number;
  totalEarned?: number;
  totalSpent?: number;
  isOnline?: boolean;
  lastSeen?: string;
  isVerified: boolean;
  isPhotoVerified: boolean;
  isBlocked: boolean;
  role: string;
  hobbies: string[];
  interests: string[];
  lookingFor: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  preferences?: {
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    interestedIn: string;
  };
  dateOfBirth?: string;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  interests?: string[];
  hobbies?: string[];
  lookingFor?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  preferences?: {
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    interestedIn: string;
  };
  dateOfBirth?: string;
}

export interface BlockedUser {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  profilePhotos: Array<{
    url: string;
    isMain: boolean;
    isVerified: boolean;
  }>;
  blockedAt: string;
}

export interface UserStats {
  totalMatches: number;
  totalConnections: number;
  totalBlocked: number;
  profileViews: number;
  tokensEarned: number;
  tokensSpent: number;
  accountAge: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('truemate_token');
    }
  }

  private setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('truemate_token', token);
      } else {
        localStorage.removeItem('truemate_token');
      }
    }
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private async multipartRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.success && data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (data.success && data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.token) return null;

    try {
      const response = await this.request('/auth/me');
      const data = await response.json();
      
      if (data.success) {
        return data.user;
      }
      return null;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  async getProfile(): Promise<{ success: boolean; user?: User; message?: string }> {
    const response = await this.request('/auth/me');
    const data = await response.json();
    return data;
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        await this.request('/auth/logout', { method: 'POST' });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.setToken(null);
    }
  }

  async updateProfile(profileData: ProfileUpdateData): Promise<{ success: boolean; data?: User; message?: string }> {
    const response = await this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    return data;
  }

  async uploadProfilePhoto(file: File): Promise<{ success: boolean; photos?: any[]; message?: string }> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await this.multipartRequest('/users/photo', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  async deleteProfilePhoto(photoId: string): Promise<{ success: boolean; photos?: any[]; message?: string }> {
    const response = await this.request(`/users/photo/${photoId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  }

  async setMainProfilePhoto(photoId: string): Promise<{ success: boolean; photos?: any[]; message?: string }> {
    const response = await this.request(`/users/photo/${photoId}/main`, {
      method: 'PUT',
    });

    const data = await response.json();
    return data;
  }

  async getBlockedUsers(): Promise<{ success: boolean; users?: BlockedUser[]; message?: string }> {
    const response = await this.request('/users/blocked', {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  }

  async blockUser(userId: string): Promise<{ success: boolean; message?: string }> {
    const response = await this.request(`/users/${userId}/block`, {
      method: 'POST',
    });

    const data = await response.json();
    return data;
  }

  async unblockUser(userId: string): Promise<{ success: boolean; message?: string }> {
    const response = await this.request(`/users/${userId}/block`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  }

  async getUserStats(): Promise<{ success: boolean; stats?: UserStats; message?: string }> {
    const response = await this.request('/users/stats', {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const authService = new AuthService();
