import { IEmployee, IPOTD, IProduct, ITransaction } from '../utils/table';

type AppStateData = {
  allUsers: IEmployee[];
  allProducts: IProduct[];
  productsOfTheDay: IPOTD[];
  allTransactions: ITransaction[];

  isBusy: boolean;
  themeMode: 'dark' | 'light';
};

interface AppState extends AppStateData {
  getAllUsers: () => void;
  getAllProducts: () => void;
  getProductsOfTheDay: () => void;
  getAllTransactions: (isAdmin: boolean) => void;

  setIsBusy: (isBusy: boolean) => void;
  setThemeMode: (themeMode: 'dark' | 'light') => void;
}

export type { AppState, AppStateData };
