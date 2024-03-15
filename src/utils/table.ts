import { ISmartTable } from '../components/common/Table/SmartTable';

type TOrder = 'asc' | 'desc';

interface ISmartTableHeaderCell {
  id: string;
  label: string;
  type?: 'date' | 'currency';
}

interface IEmployee extends ISmartTable {
  id: number;
  name: string;
  email: string;
  userId: string;
  balance: number;
}

interface ITransaction extends ISmartTable {
  id: number;
  name: string;
  price: number;
  title: string;
  userId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

interface IProduct extends ISmartTable {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: string;
  productId: string;
  thumbnail?: string;
  description: string;
}

interface IPOTD {
  quantity: number;
  product: IProduct;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: TOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export { stableSort, getComparator, descendingComparator };

export type {
  TOrder,
  IProduct,
  IEmployee,
  ITransaction,
  IPOTD,
  ISmartTableHeaderCell,
};
