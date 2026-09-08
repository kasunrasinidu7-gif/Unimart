import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './authTypes';

const savedToken = localStorage.getItem('unimart_token');
const savedUserStr = localStorage.getItem('unimart_user');
let savedUser: User | null = null;
if (savedUserStr) {
  try {
    savedUser = JSON.parse(savedUserStr);
  } catch (e) {
    savedUser = null;
  }
}

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken && !!savedUser,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('unimart_token', action.payload.token);
      localStorage.setItem('unimart_user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('unimart_token');
      localStorage.removeItem('unimart_user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
