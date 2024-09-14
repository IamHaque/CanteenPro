import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { useAppStore } from '../../store';
import { IProduct } from '../../utils/table';
import ItemManagement from './ItemManagement';
import AddEditProductModal from './AddEditProductModal';
import AddToProductOfTheDayModal from './AddToProductOfTheDayModal';

// Mock the necessary hooks and components
vi.mock('../../hooks', () => ({
  useAlertDialog: () => ({
    openDialog: vi.fn(),
    AlertDialog: () => <div>Alert Dialog</div>,
  }),
  useSnackbar: () => ({
    SnackbarComponent: () => <div>Snackbar</div>,
    handleClick: vi.fn(),
  }),
  useApiRequest: () => ({
    loading: false,
    data: undefined,
    makeRequest: vi.fn(),
  }),
}));

// Mock AddEditProductModal and AddToProductOfTheDayModal components
vi.mock('./AddEditProductModal', () => ({
  default: vi.fn(() => <div>Add/Edit Product Modal</div>),
}));

vi.mock('./AddToProductOfTheDayModal', () => ({
  default: vi.fn(() => <div>Add to Product Of The Day Modal</div>),
}));

const mockProducts: IProduct[] = [
  {
    id: 1,
    title: 'Product 1',
    category: 'Category 1',
    price: 100,
    quantity: 10,
    description: 'Description 1',
    productId: 'product1',
  },
  {
    id: 2,
    title: 'Product 2',
    category: 'Category 2',
    price: 200,
    quantity: 20,
    description: 'Description 2',
    productId: 'product2',
  },
];

describe('ItemManagement Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useAppStore.setState({
      allProducts: [],
      productsOfTheDay: [],
      getAllProducts: async () => {
        useAppStore.setState({ allProducts: mockProducts });
      },
      getProductsOfTheDay: async () => {
        useAppStore.setState({
          productsOfTheDay: [{ quantity: 10, product: mockProducts[0] }],
        });
      },
    });
  });

  it('renders without crashing', () => {
    render(<ItemManagement />);
    expect(screen.getByText('All Available Items')).toBeInTheDocument();
  });

  it('opens AddEditProductModal on action button click', () => {
    const addProductModalSpy = vi.mocked(AddEditProductModal);
    const { container } = render(<ItemManagement />);

    fireEvent.click(
      container.querySelector(
        'button[aria-label="Add Item"]'
      ) as HTMLButtonElement
    );

    expect(addProductModalSpy).toHaveBeenCalled();
  });

  it('opens AddToProductOfTheDayModal on action button click', () => {
    const addProductOfTheDayModalSpy = vi.mocked(AddToProductOfTheDayModal);
    const { container } = render(<ItemManagement />);

    fireEvent.click(
      container.querySelector('tr[role="checkbox"]') as HTMLTableRowElement
    );

    fireEvent.click(
      container.querySelector(
        'button[aria-label="Add to \'Items of the Day\'"]'
      ) as HTMLButtonElement
    );

    expect(addProductOfTheDayModalSpy).toHaveBeenCalled();
  });

  it('shows alert dialog when trying to delete a product', () => {
    const { container } = render(<ItemManagement />);

    fireEvent.click(
      container.querySelector('tr[role="checkbox"]') as HTMLTableRowElement
    );

    fireEvent.click(
      container.querySelector(
        'button[aria-label="Delete"]'
      ) as HTMLButtonElement
    );

    expect(screen.getByText(/Alert Dialog/)).toBeDefined();
  });
});
