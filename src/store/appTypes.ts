type AppStateData = {
  isDarkMode: boolean;
};

interface AppState extends AppStateData {
  toggleDarkMode: () => void;
}

export type { AppState, AppStateData };
