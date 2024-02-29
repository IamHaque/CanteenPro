import { create } from 'zustand';

import { AppState, AppStateData } from './appTypes';

// define the initial state
const initialState: AppStateData = {
  isDarkMode: false,
};

// Create store, which includes both state and (optionally) actions
const useAppStoreBase = create<AppState>((set) => ({
  ...initialState,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useAppStoreBase;
