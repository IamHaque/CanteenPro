import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Icon,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

import { ItemCard } from '../common';
import { useSnackbar } from '../../hooks';
import { useAppStore, useAuthStore } from '../../store';
import { IProduct } from '../../utils/table';
import BuyProductModal from './BuyProductModal';

const skeletonData = [0, 0, 0, 0];

export default function PopularItemManagement() {
  const [productToBuy, setProductToBuy] = useState<IProduct>();
  const [openBuyProductModal, setOpenBuyProductModal] = useState(false);

  const { SnackbarComponent, handleClick } = useSnackbar();

  const user = useAuthStore.use.user();
  const isBusy = useAppStore.use.isBusy();
  const productsOfTheDay = useAppStore.use.productsOfTheDay();
  const getAllTransactions = useAppStore.use.getAllTransactions();
  const getProductsOfTheDay = useAppStore.use.getProductsOfTheDay();

  const handleBuyProductModalOpen = () => setOpenBuyProductModal(true);
  const handleBuyProductModalClose = () => setOpenBuyProductModal(false);

  const handleCardButtonClick = (product: IProduct) => {
    setProductToBuy(product);
    handleBuyProductModalOpen();
  };

  useEffect(() => {
    getProductsOfTheDay();
  }, []);

  return (
    <Box>
      <Typography mb={2} variant="h5" component="h2">
        Items of the Day
      </Typography>

      {!isBusy && productsOfTheDay.length <= 0 && (
        <Paper sx={{ mb: 2 }}>
          <Stack
            py={5}
            gap={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icon color="warning" sx={{ fontSize: 128 }}>
              <ReportGmailerrorredIcon fontSize="inherit" />
            </Icon>
            <Typography variant="h6" component="h3">
              No items found in Today's menu!
            </Typography>
          </Stack>
        </Paper>
      )}

      <Grid container spacing={2}>
        {isBusy &&
          skeletonData.map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton
                width="100%"
                height={400}
                animation="wave"
                variant="rounded"
              />
            </Grid>
          ))}

        {!isBusy &&
          productsOfTheDay.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ItemCard
                product={item.product}
                onActionClick={handleCardButtonClick}
              />
            </Grid>
          ))}
      </Grid>

      <BuyProductModal
        open={openBuyProductModal}
        productData={productToBuy}
        handleClose={handleBuyProductModalClose}
        handleSuccess={() => {
          handleClick('success', 'Product bought!', 3000);
          getProductsOfTheDay();
          getAllTransactions(user?.isAdmin || false);
        }}
      />

      <SnackbarComponent />
    </Box>
  );
}
