import React, { useEffect, useState } from 'react';

import AddCardIcon from '@mui/icons-material/AddCard';

import { IEmployee, ISmartTableHeaderCell } from '../../utils/table';

import AddEmployeeModal from './AddEmployeeModal';
import SmartTable from '../common/Table/SmartTable';

import {
  AllUserApiResponse,
  DeleteUserApiResponse,
} from '../../utils/auth.types';
import { useAlertDialog, useApiRequest, useSnackbar } from '../../hooks';
import UpdateEmployeeBalanceModal from './UpdateEmployeeBalanceModal';

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

export default function EmployeeManagement() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [employeeData, setEmployeeData] = useState<IEmployee[]>([]);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openUpdateEmployeeBalanceModal, setOpenUpdateEmployeeBalanceModal] =
    useState(false);
  const [employeeDataToUpdate, setEmployeeDataToUpdate] = useState<IEmployee>();

  const { openDialog, AlertDialog } = useAlertDialog();
  const { SnackbarComponent, handleClick } = useSnackbar();
  const { data, makeRequest } = useApiRequest<
    AllUserApiResponse | DeleteUserApiResponse
  >();

  const handleAddEmployeeModalOpen = () => setOpenAddEmployeeModal(true);
  const handleAddEmployeeModalClose = () => setOpenAddEmployeeModal(false);
  const handleUpdateEmployeeBalanceModalClose = () =>
    setOpenUpdateEmployeeBalanceModal(false);

  const actionButtons = [
    {
      title: 'Add money to wallet balance',
      icon: <AddCardIcon />,
      onClick: (selectedRowIds: readonly number[]) => {
        if (!selectedRowIds || selectedRowIds.length <= 0) return;

        const employeeToUpdate = employeeData.find(
          (_, index) => index === selectedRowIds[0]
        );

        if (!employeeToUpdate) return;

        setEmployeeDataToUpdate(employeeToUpdate);
        setOpenUpdateEmployeeBalanceModal(true);
      },
    },
  ];

  const handleEmployeeDelete = (selectedRowIds: readonly number[]) => {
    if (!selectedRowIds || selectedRowIds.length <= 0) return;

    const employeeToDelete = employeeData.find(
      (_, index) => index === selectedRowIds[0]
    );

    if (!employeeToDelete) return;

    openDialog(
      `Are you sure you want to delete all the data for employee ${employeeToDelete.name}?`,
      `Delete employee ${employeeToDelete.name}?`,
      'Confirm',
      () => {
        deleteEmployee(employeeToDelete);
      }
    );
  };

  const deleteEmployee = async (employeeToDelete: IEmployee) => {
    await makeRequest(
      `http://localhost:3200/api/v1/user/${employeeToDelete.userId}`,
      'DELETE'
    );
  };

  useEffect(() => {
    const getAllUsers = async () => {
      await makeRequest('http://localhost:3200/api/v1/user/', 'GET');
    };

    getAllUsers();
  }, [refreshCount]);

  useEffect(() => {
    const allEmployeeResData = (data as AllUserApiResponse)?.data?.items;
    const deletedEmployeeResData = (data as DeleteUserApiResponse)?.data
      ?.deleted;

    if (allEmployeeResData) {
      const parsedAllEmployeeResData = allEmployeeResData.map(
        (user, index): IEmployee => {
          return {
            id: index,
            name: user.name,
            email: user.email,
            userId: user.userId,
            balance: user.balance,
          };
        }
      );

      setEmployeeData([...parsedAllEmployeeResData]);
    } else if (deletedEmployeeResData) {
      handleClick('success', 'Employee deleted!', 3000);
      setRefreshCount(refreshCount + 1);
    }
  }, [data]);

  return (
    <React.Fragment>
      <SmartTable
        dense={false}
        title="All Employees"
        headCells={headCells}
        rows={employeeData}
        singleSelection={true}
        disableSelection={false}
        disablePagination={false}
        ariaLabel="Select all Employees"
        actionTitle="Add Employee"
        onActionClick={() => {
          handleAddEmployeeModalOpen();
        }}
        onDeleteClick={handleEmployeeDelete}
        headerButtons={actionButtons}
      />

      <AddEmployeeModal
        open={openAddEmployeeModal}
        handleClose={handleAddEmployeeModalClose}
        handleSuccess={() => {
          handleClick('success', 'New Employee added!', 3000);
        }}
      />

      <UpdateEmployeeBalanceModal
        employeeData={employeeDataToUpdate}
        open={openUpdateEmployeeBalanceModal}
        handleClose={handleUpdateEmployeeBalanceModalClose}
        handleSuccess={() => {
          handleClick('success', 'Employee wallet updated!', 3000);
          setRefreshCount(refreshCount + 1);
        }}
      />

      <AlertDialog />
      <SnackbarComponent />
    </React.Fragment>
  );
}
