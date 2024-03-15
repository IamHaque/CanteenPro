import { IEmployee, IPOTD, IProduct } from '../utils/table';

type AppStateData = {
  allUsers: IEmployee[];
  allProducts: IProduct[];
  productsOfTheDay: IPOTD[];

  isBusy: boolean;
  themeMode: 'dark' | 'light';
};

interface AppState extends AppStateData {
  getAllUsers: () => void;
  getAllProducts: () => void;
  getProductsOfTheDay: () => void;

  setIsBusy: (isBusy: boolean) => void;
  setThemeMode: (themeMode: 'dark' | 'light') => void;
}

export type { AppState, AppStateData };
