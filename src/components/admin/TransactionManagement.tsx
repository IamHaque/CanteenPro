import {
  ITransaction,
  createTransaction,
  ISmartTableHeaderCell,
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

const mockTransactionData: ITransaction[] = [
  createTransaction(1, 'Laptop', 'John Doe', 1200, '2024-02-28'),
  createTransaction(2, 'Smartphone', 'Jane Smith', 800, '2024-02-28'),
  createTransaction(3, 'Headphones', 'Michael Johnson', 100, '2024-02-27'),
  createTransaction(4, 'Tablet', 'Emily Davis', 500, '2024-02-27'),
  createTransaction(5, 'Camera', 'Chris Wilson', 700, '2024-02-26'),
  createTransaction(6, 'Smartwatch', 'Jessica Martinez', 300, '2024-02-26'),
  createTransaction(7, 'Printer', 'David Anderson', 400, '2024-02-25'),
  createTransaction(8, 'Monitor', 'Sarah Taylor', 600, '2024-02-25'),
  createTransaction(9, 'Keyboard', 'Daniel Thomas', 200, '2024-02-24'),
  createTransaction(10, 'Mouse', 'Amanda Garcia', 150, '2024-02-24'),
  createTransaction(11, 'Speakers', 'Matthew Brown', 250, '2024-02-23'),
  createTransaction(12, 'Hard Drive', 'Ashley Miller', 350, '2024-02-23'),
  createTransaction(13, 'Game Console', 'James Hernandez', 450, '2024-02-22'),
  createTransaction(14, 'Router', 'Linda Young', 550, '2024-02-22'),
  createTransaction(15, 'Graphics Card', 'Robert King', 750, '2024-02-21'),
  createTransaction(16, 'Fitness Tracker', 'Karen Lee', 850, '2024-02-21'),
  createTransaction(17, 'Smart Speaker', 'Jason Allen', 950, '2024-02-20'),
  createTransaction(18, 'Drones', 'Michelle Wright', 1050, '2024-02-20'),
  createTransaction(19, 'VR Headset', 'William Scott', 1150, '2024-02-19'),
  createTransaction(20, 'Smart Home Hub', 'Melissa Lopez', 1250, '2024-02-19'),
];

export default function EmployeeManagementTable() {
  return (
    <SmartTable
      dense={false}
      title="Transactions"
      headCells={headCells}
      disableSelection={true}
      disablePagination={false}
      rows={mockTransactionData}
      ariaLabel="Select all Transactions"
    />
  );
}
