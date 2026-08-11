/**
 * Represents a authenticated user in the UniMart platform.
 */
export interface User {
  id: number;
  universityEmail: string;
  fullName: string;
  role: string;
  emailVerified: boolean;
}

/**
 * Global authentication state structure.
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
