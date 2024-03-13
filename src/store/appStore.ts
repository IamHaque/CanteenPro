import { create } from 'zustand';

import { AppState, AppStateData } from './appTypes';

// define the initial state
const initialState: AppStateData = {
  themeMode: 'light',
};

// Create store, which includes both state and (optionally) actions
const useAppStoreBase = create<AppState>((set) => ({
  ...initialState,
  setThemeMode: (themeMode) => set(() => ({ themeMode: themeMode })),
}));

export default useAppStoreBase;
