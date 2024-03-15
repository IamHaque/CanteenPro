import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Stack,
} from '@mui/material';

import { IProduct } from '../../utils/table';

interface ItemCardProps {
  product: IProduct;
  hideActions?: boolean;
  onActionClick?: (product: IProduct) => void;
}

export default function ItemCard(props: ItemCardProps) {
  const { product, hideActions, onActionClick } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.thumbnail}
        sx={{
          aspectRatio: '4/3',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      {!hideActions && (
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              $ {product.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {product.quantity} items in stock
            </Typography>
          </Stack>

          {onActionClick && (
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => {
                onActionClick(product);
              }}
            >
              Buy Now
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
