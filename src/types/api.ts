export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  bio?: string;
  profilePhotos: Array<{
    url: string;
    isMain: boolean;
    isVerified: boolean;
    id?: string;
    _id?: string;
  }>;
  tokens: number;
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

export interface ExternalUserProfile {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  address: {
    city: string;
    state: string;
  };
  company: {
    title: string;
  };
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
  location: {
    city: string;
    state: string;
    country: string;
  };
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
