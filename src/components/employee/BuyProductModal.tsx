import React, { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Modal,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useApiRequest } from '../../hooks';
import { IProduct } from '../../utils/table';
import { BuyProductApiResponse } from '../../utils/auth.types';
import { useAuthStore } from '../../store';

interface BuyProductModalModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
  productData: IProduct | undefined;
}

export default function BuyProductModalModal(props: BuyProductModalModalProps) {
  const { open, productData, handleClose, handleSuccess } = props;

  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const user = useAuthStore.use.user();

  const { data, loading, makeRequest } = useApiRequest<BuyProductApiResponse>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userBalance = user?.balance || 0;
    const totalPrice = parseFloat(
      ((productData?.price || 0) * quantity).toFixed(2)
    );

    if (userBalance < totalPrice) {
      setError('Insufficient wallet balance');
      return;
    }

    const formData = new FormData(event.currentTarget);

    await makeRequest(
      `http://localhost:3200/api/v1/product/buy/${productData?.productId}`,
      'POST',
      {
        quantity: formData.get('quantity'),
      }
    );
  };

  useEffect(() => {
    if (open) {
      setError('');
      setQuantity(1);
    }
  }, [open]);

  useEffect(() => {
    if (data?.data?.bought) {
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
          Buy {productData?.title}
        </Typography>

        <Box
          noValidate
          width="100%"
          sx={{ mt: 3 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography mb={2} align="center">
            Select Quantity
          </Typography>

          <Stack direction="row" gap={2}>
            <IconButton
              size="large"
              color="error"
              disabled={quantity <= 1}
              aria-label="decrease-quantity"
              onClick={() => {
                const newQuantity = quantity > 1 ? quantity - 1 : 1;
                setQuantity(newQuantity);
              }}
            >
              <RemoveCircleOutlineIcon fontSize="inherit" />
            </IconButton>

            <TextField
              required
              fullWidth
              autoFocus
              id="quantity"
              type="number"
              name="quantity"
              value={quantity}
            />

            <IconButton
              size="large"
              color="success"
              aria-label="increase-quantity"
              disabled={quantity >= (productData?.quantity || 1)}
              onClick={() => {
                const newQuantity =
                  quantity < (productData?.quantity || 1)
                    ? quantity + 1
                    : quantity;
                setQuantity(newQuantity);
              }}
            >
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>

          <Box sx={{ mt: 3, px: 5 }}>
            <Stack direction="row" gap={1} justifyContent="space-between">
              <Typography>Price</Typography>
              <Typography fontWeight={500}>
                $ {productData?.price || 0}
              </Typography>
            </Stack>

            <Stack direction="row" gap={1} justifyContent="space-between">
              <Typography>Total Price</Typography>
              <Typography fontWeight={500}>
                $ {((productData?.price || 0) * quantity).toFixed(2)}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ mt: 3 }}>
            {loading ? (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Buying
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                Buy Now
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
