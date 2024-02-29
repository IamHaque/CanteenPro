import {
  IProduct,
  createProduct,
  ISmartTableHeaderCell,
} from '../../utils/table';

import SmartTable from '../common/Table/SmartTable';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    numeric: false,
    label: 'Product Id',
    disablePadding: false,
  },
  {
    id: 'name',
    numeric: false,
    label: 'Product Name',
    disablePadding: false,
  },
  {
    id: 'price',
    numeric: false,
    label: 'Price',
    disablePadding: false,
  },
  {
    id: 'category',
    numeric: false,
    label: 'Category',
    disablePadding: false,
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
    disablePadding: false,
  },
];

// Mock data for products
const mockProductData: IProduct[] = [
  createProduct(
    1,
    'Sandwich',
    5.99,
    'Food',
    'Classic sandwich with your choice of fillings'
  ),
  createProduct(
    2,
    'Coffee',
    2.49,
    'Beverage',
    'Freshly brewed coffee, hot or iced'
  ),
  createProduct(
    3,
    'Salad',
    7.99,
    'Food',
    'Fresh salad with assorted vegetables and dressing options'
  ),
  createProduct(
    4,
    'Pizza',
    8.99,
    'Food',
    'Delicious pizza with various toppings'
  ),
  createProduct(
    5,
    'Burger',
    6.49,
    'Food',
    'Juicy burger with lettuce, tomato, and cheese'
  ),
  createProduct(
    9,
    'Pasta',
    9.99,
    'Food',
    'Spaghetti with marinara sauce and meatballs'
  ),
  createProduct(
    10,
    'Soup',
    4.99,
    'Food',
    'Warm and comforting soup, perfect for any time'
  ),
  createProduct(
    16,
    'Wrap',
    7.29,
    'Food',
    'Healthy wrap filled with fresh ingredients'
  ),
  createProduct(
    17,
    'Smoothie',
    3.99,
    'Beverage',
    'Refreshing fruit smoothie, made to order'
  ),
  createProduct(
    18,
    'Cake',
    12.99,
    'Dessert',
    'Decadent cake for special occasions'
  ),
  createProduct(19, 'Fries', 3.49, 'Side', 'Crispy and golden french fries'),
  createProduct(
    20,
    'Chicken Wings',
    9.99,
    'Food',
    'Spicy chicken wings with dipping sauce'
  ),
  createProduct(
    21,
    'Soda',
    1.99,
    'Beverage',
    'Carbonated soda in various flavors'
  ),
  createProduct(
    22,
    'Ice Cream',
    4.99,
    'Dessert',
    'Creamy ice cream in a variety of flavors'
  ),
  createProduct(
    23,
    'Tacos',
    8.49,
    'Food',
    'Mexican-style tacos with meat and toppings'
  ),
  createProduct(
    24,
    'Burrito',
    6.99,
    'Food',
    'Hearty burrito with rice, beans, and meat'
  ),
  createProduct(25, 'Juice', 2.99, 'Beverage', 'Freshly squeezed fruit juice'),
  createProduct(
    26,
    'Donut',
    1.49,
    'Dessert',
    'Sweet glazed donut for a quick treat'
  ),
  createProduct(
    27,
    'French Toast',
    7.99,
    'Food',
    'Classic french toast with syrup'
  ),
  createProduct(
    28,
    'Pancakes',
    6.49,
    'Food',
    'Fluffy pancakes served with butter and syrup'
  ),
  createProduct(
    31,
    'Bagel',
    3.49,
    'Food',
    'Toasted bagel with cream cheese or toppings'
  ),
  createProduct(
    32,
    'Croissant',
    2.99,
    'Food',
    'Buttery croissant for breakfast or snack'
  ),
  createProduct(
    33,
    'Muffin',
    2.49,
    'Dessert',
    'Moist and delicious muffin in various flavors'
  ),
  createProduct(
    34,
    'Cookies',
    4.49,
    'Dessert',
    'Homemade cookies with chocolate chips'
  ),
  createProduct(
    35,
    'Brownie',
    3.99,
    'Dessert',
    'Rich and fudgy chocolate brownie'
  ),
  createProduct(
    36,
    'Cupcake',
    2.49,
    'Dessert',
    'Delicate cupcake with frosting'
  ),
  createProduct(
    37,
    'Chips',
    1.99,
    'Snack',
    'Crunchy potato chips in assorted flavors'
  ),
  createProduct(
    38,
    'Granola Bar',
    2.99,
    'Snack',
    'Healthy granola bar packed with nuts and dried fruit'
  ),
  createProduct(
    39,
    'Popcorn',
    3.49,
    'Snack',
    'Freshly popped popcorn, perfect for movie night'
  ),
  createProduct(
    40,
    'Trail Mix',
    4.99,
    'Snack',
    'Nutritious trail mix with nuts, seeds, and dried fruit'
  ),
];

export default function ItemManagement() {
  return (
    <SmartTable
      dense={false}
      headCells={headCells}
      rows={mockProductData}
      disableSelection={true}
      disablePagination={false}
      title="All Items Available"
    />
  );
}
