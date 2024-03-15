import React, { useEffect, useState } from 'react';

import AddCardIcon from '@mui/icons-material/AddCard';

import { IEmployee, ISmartTableHeaderCell } from '../../utils/table';

import AddEmployeeModal from './AddEmployeeModal';
import SmartTable from '../common/Table/SmartTable';

import { DeleteUserApiResponse } from '../../utils/auth.types';
import { useAlertDialog, useApiRequest, useSnackbar } from '../../hooks';
import UpdateEmployeeBalanceModal from './UpdateEmployeeBalanceModal';
import { useAppStore } from '../../store';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    label: 'Employee ID',
  },
  {
    id: 'name',
    label: 'Employee Name',
  },
  {
    id: 'balance',
    label: 'Wallet Balance',
    type: 'currency',
  },
];

export default function EmployeeManagement() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openUpdateEmployeeBalanceModal, setOpenUpdateEmployeeBalanceModal] =
    useState(false);
  const [employeeDataToUpdate, setEmployeeDataToUpdate] = useState<IEmployee>();

  const { openDialog, AlertDialog } = useAlertDialog();
  const { SnackbarComponent, handleClick } = useSnackbar();
  const { data, makeRequest } = useApiRequest<DeleteUserApiResponse>();

  const allUsers = useAppStore.use.allUsers();
  const getAllUsers = useAppStore.use.getAllUsers();

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

        const employeeToUpdate = allUsers.find(
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

    const employeeToDelete = allUsers.find(
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
    getAllUsers();
  }, [refreshCount]);

  useEffect(() => {
    const deletedEmployeeResData = data?.data?.deleted;

    if (deletedEmployeeResData) {
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
        rows={allUsers}
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
