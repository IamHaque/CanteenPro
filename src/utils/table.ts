import { ISmartTable } from '../components/common/Table/SmartTable';

type TOrder = 'asc' | 'desc';

interface ISmartTableHeaderCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

interface IEmployee extends ISmartTable {
  id: number;
  name: string;
  balance: number;
}

interface ITransaction extends ISmartTable {
  productName: string;
  amount: number;
  date: string;
  id: number;
  saleBy?: string;
  quantity?: number;
}

interface IProduct extends ISmartTable {
  id: number;
  name: string;
  img?: string;
  price: number;
  category: string;
  description: string;
}

// Function to create an employee object
function createEmployee(id: number, name: string, balance: number): IEmployee {
  return {
    id,
    name,
    balance,
  };
}

// Function to create a transaction object
function createAdminTransaction(
  id: number,
  productName: string,
  saleBy: string,
  amount: number,
  date: string
): ITransaction {
  return {
    id: id,
    productName: productName,
    saleBy: saleBy,
    amount: amount,
    date: date,
  };
}

// Function to create a transaction object
function createEmployeeTransaction(
  id: number,
  productName: string,
  quantity: number,
  amount: number,
  date: string
): ITransaction {
  return {
    id: id,
    productName: productName,
    quantity: quantity,
    amount: amount,
    date: date,
  };
}

// Function to create a product object
function createProduct(
  id: number,
  name: string,
  price: number,
  category: string,
  description: string
): IProduct {
  return {
    id: id,
    name: name,
    price: price,
    category: category,
    description: description,
  };
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

export {
  stableSort,
  getComparator,
  createProduct,
  createEmployee,
  descendingComparator,
  createAdminTransaction,
  createEmployeeTransaction,
};

export type {
  TOrder,
  IProduct,
  IEmployee,
  ITransaction,
  ISmartTableHeaderCell,
};
