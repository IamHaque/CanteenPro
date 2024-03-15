import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { ItemCard } from '../common';

import { useAppStore } from '../../store';

export default function PopularItemManagement() {
  const productsOfTheDay = useAppStore.use.productsOfTheDay();
  const getProductsOfTheDay = useAppStore.use.getProductsOfTheDay();

  useEffect(() => {
    getProductsOfTheDay();
  }, []);

  return (
    <Box>
      <Typography mb={2} variant="h5" component="h2">
        Items of the Day
      </Typography>

      <Grid container spacing={2}>
        {productsOfTheDay.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ItemCard product={item.product} hideActions={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
