import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, Grid, TextField, Button, Modal } from '@mui/material';

import { useApiRequest } from '../../hooks';
import { LoginApiResponse } from '../../utils/auth.types';

interface AddEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
}

export default function AddEmployeeModal(props: AddEmployeeModalProps) {
  const { open, handleClose, handleSuccess } = props;

  const { data, loading, reset, makeRequest } =
    useApiRequest<LoginApiResponse>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await makeRequest('http://localhost:3200/api/v1/user/register', 'POST', {
      name: formData.get('name'),
      email: formData.get('email'),
      balance: formData.get('balance'),
      password: formData.get('password'),
      password2: formData.get('password'),
    });
  };

  useEffect(() => {
    if (data?.data) {
      handleClose();
      handleSuccess();
    }
  }, [data]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

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
          Add a new Employee
        </Typography>

        {!data?.error?.validationErrors && data?.error?.message && (
          <Typography color="error" variant="body1" width="100%">
            {data?.error?.message}
          </Typography>
        )}

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
                id="name"
                autoFocus
                name="name"
                label="Full Name"
                autoComplete="given-name"
                helperText={data?.error?.validationErrors?.name?.[0]}
                error={data?.error?.validationErrors?.name !== undefined}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="balance"
                type="number"
                name="balance"
                defaultValue={0}
                label="Wallet Balance"
                autoComplete="balance"
                helperText={data?.error?.validationErrors?.balance?.[0]}
                error={data?.error?.validationErrors?.balance !== undefined}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                label="Email Address"
                helperText={data?.error?.validationErrors?.email?.[0]}
                error={data?.error?.validationErrors?.email !== undefined}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                name="password"
                label="Password"
                helperText={data?.error?.validationErrors?.password?.[0]}
                error={data?.error?.validationErrors?.password !== undefined}
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
                Adding Employee
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                Add Employee
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
