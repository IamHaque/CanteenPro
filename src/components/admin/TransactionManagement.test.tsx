import '@testing-library/jest-dom';
import moment from 'moment';
import { render, screen, waitFor } from '@testing-library/react';

import { ITransaction } from '../../utils/table';
import { useAppStore, useAuthStore } from '../../store';
import TransactionManagement from './TransactionManagement';

const mockTransactions: ITransaction[] = [
  {
    id: 1,
    name: 'User 1',
    price: 100,
    title: 'Product 1',
    userId: 'user1',
    quantity: 10,
    createdAt: '2024-09-01',
    updatedAt: '2024-09-02',
    productId: 'p1',
  },
  {
    id: 2,
    name: 'User 2',
    price: 200,
    title: 'Product 2',
    userId: 'user2',
    quantity: 20,
    createdAt: '2024-09-03',
    updatedAt: '2024-09-04',
    productId: 'p2',
  },
];

describe('TransactionManagement Component', () => {
  beforeEach(() => {
    // Reset the Zustand store state before each test
    useAppStore.setState({
      allTransactions: [],
      getAllTransactions: async (isAdmin: boolean) => {
        // Simulate an API call and set all transactions
        const allTransactions = isAdmin ? mockTransactions : [];
        useAppStore.setState({ allTransactions });
      },
    });

    useAuthStore.setState({
      user: { isAdmin: true, email: 'test@test.com' }, // Simulate an admin user
    });
  });

  it('renders without crashing', () => {
    render(<TransactionManagement />);
    expect(screen.getByText('All Transactions')).toBeInTheDocument();
  });

  it('displays transactions when available', async () => {
    render(<TransactionManagement />);

    // Wait for the transactions to be displayed
    await waitFor(() => {
      mockTransactions.forEach((transaction) => {
        expect(screen.getByText(transaction.title)).toBeInTheDocument();
        expect(screen.getByText(transaction.name)).toBeInTheDocument();
        expect(
          screen.getByText(transaction.quantity.toString())
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            `$ ${(transaction.price * transaction.quantity).toFixed(2)}`
          )
        ).toBeInTheDocument();
        expect(
          screen.getByText(moment(transaction.createdAt).fromNow().toString())
        ).toBeInTheDocument();
      });
    });
  });
});
