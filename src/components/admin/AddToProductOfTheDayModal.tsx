import React, { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, Grid, TextField, Button, Modal } from '@mui/material';

import { useApiRequest } from '../../hooks';
import { IProduct } from '../../utils/table';
import { InsertedProductApiResponse } from '../../utils/auth.types';

interface AddToProductOfTheDayModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
  productData: IProduct | undefined;
}

export default function AddToProductOfTheDayModal(
  props: AddToProductOfTheDayModalProps
) {
  const { open, productData, handleClose, handleSuccess } = props;

  const [error, setError] = useState('');

  const { data, loading, makeRequest } =
    useApiRequest<InsertedProductApiResponse>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await makeRequest(
      `http://localhost:3200/api/v1/product/today/${productData?.productId}`,
      'POST',
      {
        quantity: formData.get('quantity'),
      }
    );
  };

  useEffect(() => {
    if (open) {
      setError('');
    }
  }, [open]);

  useEffect(() => {
    if (data?.data?.added) {
      handleClose();
      handleSuccess();
    } else if (data?.error) {
      setError(data?.error?.message);
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
          Add to Today's Menu
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
                id="quantity"
                type="number"
                name="quantity"
                label="Product Quantity"
                autoComplete="quantity"
                defaultValue={productData?.quantity || 0}
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
                Adding
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                Add
              </Button>
            )}

            {error !== '' && (
              <Typography
                mt={2}
                mb={0}
                color="error"
                align="center"
                variant="body1"
              >
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
