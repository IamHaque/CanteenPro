import React from 'react';

import {
  IEmployee,
  createEmployee,
  ISmartTableHeaderCell,
} from '../../utils/table';

import SmartTable from '../common/Table/SmartTable';
import { useSnackbar } from '../../hooks';
import AddEmployeeModal from './AddEmployeeModal';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    numeric: false,
    label: 'Employee ID',
    disablePadding: false,
  },
  {
    id: 'name',
    numeric: false,
    label: 'Employee Name',
    disablePadding: false,
  },
  {
    id: 'balance',
    numeric: false,
    label: 'Wallet Balance',
    disablePadding: false,
  },
];

const mockEmployeeData: IEmployee[] = [
  createEmployee(1, 'John Doe', 1200),
  createEmployee(2, 'Jane Smith', 1500),
  createEmployee(3, 'Michael Johnson', 1700),
  createEmployee(4, 'Emily Davis', 1300),
  createEmployee(5, 'Chris Wilson', 1600),
  createEmployee(6, 'Jessica Martinez', 1400),
  createEmployee(7, 'David Anderson', 1800),
  createEmployee(8, 'Sarah Taylor', 1250),
  createEmployee(9, 'Daniel Thomas', 1350),
  createEmployee(10, 'Amanda Garcia', 1450),
  createEmployee(11, 'Matthew Brown', 1550),
  createEmployee(12, 'Ashley Miller', 1650),
  createEmployee(13, 'James Hernandez', 1750),
  createEmployee(14, 'Linda Young', 1850),
  createEmployee(15, 'Robert King', 1900),
  createEmployee(16, 'Karen Lee', 1950),
  createEmployee(17, 'Jason Allen', 2000),
  createEmployee(18, 'Michelle Wright', 2050),
  createEmployee(19, 'William Scott', 2100),
  createEmployee(20, 'Melissa Lopez', 2150),
];

export default function EmployeeManagement() {
  const [open, setOpen] = React.useState(false);
  const { SnackbarComponent, handleClick } = useSnackbar();

  const handleAppEmployeeModalOpen = () => setOpen(true);
  const handleAppEmployeeModalClose = () => setOpen(false);

  return (
    <React.Fragment>
      <SmartTable
        dense={false}
        title="All Employees"
        headCells={headCells}
        rows={mockEmployeeData}
        disableSelection={false}
        disablePagination={false}
        ariaLabel="Select all Employees"
        actionTitle="Add Employee"
        onActionClick={() => {
          handleAppEmployeeModalOpen();
        }}
        onDeleteClick={() => {
          console.log('onDeleteClick');
        }}
      />

      <AddEmployeeModal
        open={open}
        handleClose={handleAppEmployeeModalClose}
        handleSuccess={() => {
          handleClick('success', 'New Employee added!', 3000);
        }}
      />

      <SnackbarComponent />
    </React.Fragment>
  );
}
