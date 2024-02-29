import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { ItemCard } from '../common';

import { IProduct } from '../../utils/table';

const mockProductOfDayData: IProduct[] = [
  {
    id: 1,
    name: 'Cappuccino',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=640&h=480',
    price: 3.99,
    category: 'Beverage',
    description: 'A classic espresso-based coffee topped with foamed milk.',
  },
  {
    id: 2,
    name: 'Club Sandwich',
    img: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=640&h=480',
    price: 8.49,
    category: 'Sandwich',
    description:
      'Triple-layered sandwich with bacon, lettuce, tomato, and turkey.',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    img: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=640&h=480',
    price: 7.99,
    category: 'Salad',
    description:
      'Fresh romaine lettuce with croutons, Parmesan cheese, and Caesar dressing.',
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    img: 'https://images.unsplash.com/photo-1564936281291-294551497d81?w=640&h=480',
    price: 10.99,
    category: 'Pizza',
    description:
      'Classic pizza topped with tomato sauce, mozzarella, and fresh basil leaves.',
  },
  {
    id: 5,
    name: 'Chocolate Chip Cookie',
    img: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=640&h=480',
    price: 2.49,
    category: 'Dessert',
    description: 'Soft and chewy cookie loaded with chocolate chips.',
  },
  {
    id: 6,
    name: 'Fruit Smoothie',
    img: 'https://images.unsplash.com/photo-1589734575451-8ddc34c5752b?w=640&h=480',
    price: 4.99,
    category: 'Smoothie',
    description: 'Refreshing blend of assorted fruits, yogurt, and honey.',
  },
  {
    id: 7,
    name: 'Chicken Caesar Wrap',
    img: 'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=640&h=480',
    price: 6.99,
    category: 'Wrap',
    description:
      'Grilled chicken, romaine lettuce, Parmesan cheese, and Caesar dressing wrapped in a tortilla.',
  },
  {
    id: 8,
    name: 'Vegetable Soup',
    img: 'https://images.unsplash.com/photo-1601060581830-34a0c67d2fa3?w=640&h=480',
    price: 5.49,
    category: 'Soup',
    description:
      'Hearty soup with a variety of fresh vegetables in a savory broth.',
  },
];

export default function PopularItemManagement() {
  return (
    <Box>
      <Stack
        mb={2}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" component="h2">
          Items of the Day
        </Typography>

        <Tooltip title="Add Item of the day">
          <IconButton onClick={() => {}}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Grid container spacing={2}>
        {mockProductOfDayData.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ItemCard product={product} hideActions={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
