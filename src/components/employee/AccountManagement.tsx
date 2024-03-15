import { ISmartTableHeaderCell } from '../../utils/table';

import SmartTable from '../common/Table/SmartTable';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',

    label: 'Transaction Id',
  },
  {
    id: 'productName',

    label: 'Product Name',
  },
  {
    id: 'quantity',

    label: 'Quantity',
  },
  {
    id: 'amount',

    label: 'Amount',
  },
  {
    id: 'date',

    label: 'Date',
  },
];

export default function AccountManagement() {
  return (
    <SmartTable
      dense={false}
      headCells={headCells}
      singleSelection={false}
      disableSelection={true}
      disablePagination={false}
      rows={[]}
      title="My Account Passbook"
    />
  );
}
