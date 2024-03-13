type AppStateData = {
  themeMode: 'dark' | 'light';
};

interface AppState extends AppStateData {
  setThemeMode: (themeMode: 'dark' | 'light') => void;
}

export type { AppState, AppStateData };
