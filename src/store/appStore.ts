import { create } from 'zustand';

import { AppState, AppStateData } from './appTypes';

import { ProductService, UserService, TransactionService } from '../services';

// define the initial state
const initialState: AppStateData = {
  allUsers: [],
  allProducts: [],
  allTransactions: [],
  productsOfTheDay: [],

  isBusy: false,
  themeMode: 'light',
};

// Create store, which includes both state and (optionally) actions
const useAppStoreBase = create<AppState>((set) => ({
  ...initialState,

  getAllUsers: async () => {
    set(() => ({ isBusy: true }));
    const allUsers = await UserService.getAllUsers();
    set(() => ({ isBusy: false, allUsers }));
  },
  getAllProducts: async () => {
    set(() => ({ isBusy: true }));
    const allProducts = await ProductService.getAllProducts();
    set(() => ({ isBusy: false, allProducts }));
  },
  getProductsOfTheDay: async () => {
    set(() => ({ isBusy: true }));
    const productsOfTheDay = await ProductService.getProductsOfTheDay();
    set(() => ({ isBusy: false, productsOfTheDay }));
  },
  getAllTransactions: async (isAdmin) => {
    set(() => ({ isBusy: true }));
    const allTransactions = await TransactionService.getAllTransactions(
      isAdmin
    );
    set(() => ({ isBusy: false, allTransactions }));
  },

  setIsBusy: (isBusy) => set(() => ({ isBusy })),
  setThemeMode: (themeMode) => set(() => ({ themeMode })),
}));

export default useAppStoreBase;
