import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, Grid, TextField, Button, Modal } from '@mui/material';

import { useApiRequest } from '../../hooks';
import { IEmployee } from '../../utils/table';
import { UpdatedUserApiResponse } from '../../utils/auth.types';

interface UpdateEmployeeBalanceModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
  employeeData: IEmployee | undefined;
}

export default function UpdateEmployeeBalanceModal(
  props: UpdateEmployeeBalanceModalProps
) {
  const { open, employeeData, handleClose, handleSuccess } = props;

  const { data, loading, makeRequest } =
    useApiRequest<UpdatedUserApiResponse>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await makeRequest(
      `http://localhost:3200/api/v1/user/${employeeData?.userId}`,
      'PATCH',
      {
        balance: formData.get('balance'),
      }
    );
  };

  useEffect(() => {
    if (data?.data?.updated) {
      handleClose();
      handleSuccess();
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-add-employee"
      aria-describedby="modal-add-employee-form"
    >
      <Box
        sx={{
          p: 4,
          top: '50%',
          width: 400,
          left: '50%',
          boxShadow: 24,
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography component="h1" variant="h5">
          Update Employee Wallet
        </Typography>

        <Box
          noValidate
          width="100%"
          sx={{ mt: 3 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="balance"
                type="number"
                name="balance"
                label="Wallet Balance"
                autoComplete="balance"
                defaultValue={employeeData?.balance || 0}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            {loading ? (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Updating Balance
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                Update Balace
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
