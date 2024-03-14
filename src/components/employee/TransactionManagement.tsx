import {
  ITransaction,
  ISmartTableHeaderCell,
  createEmployeeTransaction,
} from '../../utils/table';

import SmartTable from '../common/Table/SmartTable';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    numeric: false,
    label: 'Transaction Id',
    disablePadding: false,
  },
  {
    id: 'productName',
    numeric: false,
    label: 'Product Name',
    disablePadding: false,
  },
  {
    id: 'quantity',
    numeric: false,
    label: 'Quantity',
    disablePadding: false,
  },
  {
    id: 'amount',
    numeric: false,
    label: 'Amount',
    disablePadding: false,
  },
  {
    id: 'date',
    numeric: false,
    label: 'Date',
    disablePadding: false,
  },
];

// Mock data for employee transactions
const mockTransactionData: ITransaction[] = [
  createEmployeeTransaction(1, 'Sandwich', 2, 5.99, '2024-02-28'),
  createEmployeeTransaction(2, 'Coffee', 3, 2.49, '2024-02-28'),
  createEmployeeTransaction(3, 'Salad', 1, 7.99, '2024-02-27'),
  createEmployeeTransaction(4, 'Pizza', 2, 8.99, '2024-02-27'),
  createEmployeeTransaction(5, 'Burger', 3, 6.49, '2024-02-26'),
  createEmployeeTransaction(6, 'Pasta', 1, 9.99, '2024-02-25'),
  createEmployeeTransaction(7, 'Soup', 2, 4.99, '2024-02-24'),
  createEmployeeTransaction(8, 'Wrap', 3, 7.29, '2024-02-24'),
  createEmployeeTransaction(9, 'Smoothie', 1, 3.99, '2024-02-23'),
  createEmployeeTransaction(10, 'Cake', 2, 12.99, '2024-02-23'),
  createEmployeeTransaction(11, 'Fries', 1, 3.49, '2024-02-22'),
  createEmployeeTransaction(12, 'Chicken Wings', 2, 9.99, '2024-02-22'),
  createEmployeeTransaction(13, 'Soda', 1, 1.99, '2024-02-21'),
  createEmployeeTransaction(14, 'Ice Cream', 3, 4.99, '2024-02-21'),
  createEmployeeTransaction(15, 'Tacos', 2, 8.49, '2024-02-20'),
  createEmployeeTransaction(16, 'Burrito', 1, 6.99, '2024-02-20'),
  createEmployeeTransaction(17, 'Juice', 3, 2.99, '2024-02-19'),
  createEmployeeTransaction(18, 'Donut', 1, 1.49, '2024-02-19'),
  createEmployeeTransaction(19, 'French Toast', 2, 7.99, '2024-02-18'),
  createEmployeeTransaction(20, 'Pancakes', 1, 6.49, '2024-02-18'),
  createEmployeeTransaction(21, 'Bagel', 3, 3.49, '2024-02-17'),
  createEmployeeTransaction(22, 'Croissant', 1, 2.99, '2024-02-17'),
  createEmployeeTransaction(23, 'Muffin', 2, 2.49, '2024-02-16'),
  createEmployeeTransaction(24, 'Cookies', 1, 4.49, '2024-02-16'),
  createEmployeeTransaction(25, 'Brownie', 3, 3.99, '2024-02-15'),
  createEmployeeTransaction(26, 'Cupcake', 1, 2.49, '2024-02-15'),
  createEmployeeTransaction(27, 'Chips', 2, 1.99, '2024-02-14'),
  createEmployeeTransaction(28, 'Granola Bar', 1, 2.99, '2024-02-14'),
  createEmployeeTransaction(29, 'Popcorn', 3, 3.49, '2024-02-13'),
  createEmployeeTransaction(30, 'Trail Mix', 1, 4.99, '2024-02-13'),
];

export default function TransactionManagement() {
  return (
    <SmartTable
      dense={false}
      headCells={headCells}
      title="My Transactions"
      singleSelection={false}
      disableSelection={true}
      disablePagination={false}
      rows={mockTransactionData}
    />
  );
}
