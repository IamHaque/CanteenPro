import { create } from 'zustand';

import { AuthState, AuthStateData, User } from './authTypes';

// define the initial state
const initialState: AuthStateData = {
  user: null,
  isAuthenticated: false,
};

// Create store, which includes both state and (optionally) actions
const useAuthStoreBase = create<AuthState>((set) => ({
  ...initialState,
  logout: () => set(() => ({ isAuthenticated: false, user: null })),
  login: (userData: User | null) =>
    set(() => ({ user: userData, isAuthenticated: true })),
}));

export default useAuthStoreBase;
