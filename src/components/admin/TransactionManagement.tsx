import {
  ITransaction,
  ISmartTableHeaderCell,
  createAdminTransaction,
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
    id: 'saleBy',
    numeric: false,
    label: 'Sold By',
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

// Mock data for admin transactions
const mockTransactionData: ITransaction[] = [
  createAdminTransaction(1, 'Sandwich', 'John Doe', 5.99, '2024-02-28'),
  createAdminTransaction(2, 'Coffee', 'Jane Smith', 2.49, '2024-02-28'),
  createAdminTransaction(3, 'Salad', 'Michael Johnson', 7.99, '2024-02-27'),
  createAdminTransaction(4, 'Pizza', 'Emily Brown', 8.99, '2024-02-27'),
  createAdminTransaction(5, 'Burger', 'Chris Wilson', 6.49, '2024-02-26'),
  createAdminTransaction(6, 'Pasta', 'Sarah Lee', 9.99, '2024-02-25'),
  createAdminTransaction(7, 'Soup', 'David Taylor', 4.99, '2024-02-24'),
  createAdminTransaction(8, 'Wrap', 'Jennifer Garcia', 7.29, '2024-02-24'),
  createAdminTransaction(9, 'Smoothie', 'Daniel Clark', 3.99, '2024-02-23'),
  createAdminTransaction(10, 'Cake', 'Emma Rodriguez', 12.99, '2024-02-23'),
  createAdminTransaction(11, 'Fries', 'William Martinez', 3.49, '2024-02-22'),
  createAdminTransaction(
    12,
    'Chicken Wings',
    'Olivia Adams',
    9.99,
    '2024-02-22'
  ),
  createAdminTransaction(13, 'Soda', 'James White', 1.99, '2024-02-21'),
  createAdminTransaction(
    14,
    'Ice Cream',
    'Sophia Hernandez',
    4.99,
    '2024-02-21'
  ),
  createAdminTransaction(15, 'Tacos', 'Logan Garcia', 8.49, '2024-02-20'),
  createAdminTransaction(16, 'Burrito', 'Evelyn King', 6.99, '2024-02-20'),
  createAdminTransaction(17, 'Juice', 'Mia Rodriguez', 2.99, '2024-02-19'),
  createAdminTransaction(18, 'Donut', 'Lucas Anderson', 1.49, '2024-02-19'),
  createAdminTransaction(19, 'French Toast', 'Chloe Lee', 7.99, '2024-02-18'),
  createAdminTransaction(
    20,
    'Pancakes',
    'Alexander Taylor',
    6.49,
    '2024-02-18'
  ),
  createAdminTransaction(21, 'Bagel', 'Madison Brown', 3.49, '2024-02-17'),
  createAdminTransaction(22, 'Croissant', 'Ethan Martinez', 2.99, '2024-02-17'),
  createAdminTransaction(23, 'Muffin', 'Abigail Wilson', 2.49, '2024-02-16'),
  createAdminTransaction(24, 'Cookies', 'Noah Taylor', 4.49, '2024-02-16'),
  createAdminTransaction(25, 'Brownie', 'Ava Thomas', 3.99, '2024-02-15'),
  createAdminTransaction(26, 'Cupcake', 'Elijah Jones', 2.49, '2024-02-15'),
  createAdminTransaction(27, 'Chips', 'Sophia Jackson', 1.99, '2024-02-14'),
  createAdminTransaction(
    28,
    'Granola Bar',
    'Benjamin Harris',
    2.99,
    '2024-02-14'
  ),
  createAdminTransaction(29, 'Popcorn', 'Elizabeth Evans', 3.49, '2024-02-13'),
  createAdminTransaction(30, 'Trail Mix', 'Ethan Phillips', 4.99, '2024-02-13'),
];

export default function TransactionManagement() {
  return (
    <SmartTable
      dense={false}
      headCells={headCells}
      title="All Transactions"
      singleSelection={false}
      disableSelection={true}
      disablePagination={false}
      rows={mockTransactionData}
    />
  );
}
