import { useEffect } from 'react';
import { useAppStore, useAuthStore } from '../../store';

import { ISmartTableHeaderCell } from '../../utils/table';

import SmartTable from '../common/Table/SmartTable';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    label: 'Transaction Id',
  },
  {
    id: 'title',
    label: 'Product Name',
  },
  {
    id: 'quantity',
    label: 'Quantity',
  },
  {
    id: 'price',
    label: 'Amount',
    type: 'currency',
  },
  {
    id: 'createdAt',
    label: 'Date',
    type: 'date',
  },
];

export default function TransactionManagement() {
  const user = useAuthStore.use.user();
  const allTransactions = useAppStore.use.allTransactions();
  const getAllTransactions = useAppStore.use.getAllTransactions();

  useEffect(() => {
    getAllTransactions(user?.isAdmin || false);
  }, []);

  return (
    <SmartTable
      dense={false}
      headCells={headCells}
      title="My Transactions"
      singleSelection={false}
      disableSelection={true}
      disablePagination={false}
      rows={allTransactions.map((t) => ({
        ...t,
        price: Number(t.price) * Number(t.quantity),
      }))}
    />
  );
}
