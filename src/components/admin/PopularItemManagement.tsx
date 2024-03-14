import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { ItemCard } from '../common';

import { IPOTD } from '../../utils/table';
import { useApiRequest } from '../../hooks';
import { AllPOTDApiResponse } from '../../utils/auth.types';

export default function PopularItemManagement() {
  const [potdData, setPOTDData] = useState<IPOTD[]>([]);

  const { data, makeRequest } = useApiRequest<AllPOTDApiResponse>();

  useEffect(() => {
    const getAllPOTD = async () => {
      await makeRequest('http://localhost:3200/api/v1/product/today/', 'GET');
    };

    getAllPOTD();
  }, []);

  useEffect(() => {
    const allPOTDResData = data?.data?.items;

    if (allPOTDResData) {
      const parsedAllPOTDResData = allPOTDResData.map(
        (product, index): IPOTD => {
          return {
            quantity: product.quantity,
            product: {
              id: index,
              title: product.product.title,
              category: product.product.category,
              price: product.product.price,
              quantity: product.product.quantity,
              description: product.product.description,
              productId: product.product.productId,
              thumbnail: product.product.thumbnail,
            },
          };
        }
      );

      setPOTDData([...parsedAllPOTDResData]);
    }
  }, [data]);

  return (
    <Box>
      <Typography mb={2} variant="h5" component="h2">
        Items of the Day
      </Typography>

      <Grid container spacing={2}>
        {potdData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ItemCard product={item.product} hideActions={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
