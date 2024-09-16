import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, Grid, TextField, Button, Modal } from '@mui/material';

import { useApiRequest } from '../../hooks';
import {
  InsertedProductApiResponse,
  UpdatedProductApiResponse,
} from '../../utils/auth.types';
import { IProduct } from '../../utils/table';

interface AddEditProductModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
  productData: IProduct | undefined;
}

export default function AddEditProductModal(props: AddEditProductModalProps) {
  const { open, productData, handleClose, handleSuccess } = props;

  const isAdding = productData === undefined;

  const { data, loading, reset, makeRequest } = useApiRequest<
    InsertedProductApiResponse | UpdatedProductApiResponse
  >();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method = isAdding ? 'POST' : 'PATCH';
    const formData = new FormData(event.currentTarget);

    await makeRequest(
      `http://localhost:3200/api/v1/product/${
        isAdding ? '' : productData.productId
      }`,
      method,
      {
        title: formData.get('title'),
        price: formData.get('price'),
        category: formData.get('category'),
        quantity: formData.get('quantity'),
        thumbnail: formData.get('thumbnail'),
        description: formData.get('description'),
      }
    );
  };

  useEffect(() => {
    const isProductAdded = (data as InsertedProductApiResponse)?.data?.added;
    const isProductUpdated = (data as UpdatedProductApiResponse)?.data?.updated;

    if (isProductAdded || isProductUpdated) {
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
          {isAdding ? 'Add' : 'Update'} Product
        </Typography>

        {data?.error?.message && (
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
                id="title"
                autoFocus
                name="title"
                label="Product Name"
                defaultValue={productData?.title || ''}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                autoFocus
                name="price"
                type="number"
                label="Product Price"
                defaultValue={productData?.price || 0}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                type="number"
                id="quantity"
                name="quantity"
                label="Product Quantity"
                defaultValue={productData?.quantity || 0}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="category"
                name="category"
                label="Product Category"
                defaultValue={productData?.category || ''}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="thumbnail"
                name="thumbnail"
                label="Product Image"
                defaultValue={productData?.thumbnail || ''}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="description"
                name="description"
                label="Product Description"
                defaultValue={productData?.description || ''}
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
                {isAdding ? 'Adding' : 'Updating'} Product
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                {isAdding ? 'Add' : 'Update'} Product
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
