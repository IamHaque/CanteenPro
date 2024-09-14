import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { IPOTD } from '../../utils/table';
import { useAppStore } from '../../store';
import PopularItemManagement from './PopularItemManagement';

const mockProductsOfTheDay: IPOTD[] = [
  {
    quantity: 5,
    product: {
      id: 1,
      title: 'Product 1',
      price: 100,
      quantity: 10,
      category: 'Category 1',
      productId: 'p1',
      description: 'Description of Product 1',
    },
  },
  {
    quantity: 3,
    product: {
      id: 2,
      title: 'Product 2',
      price: 200,
      quantity: 20,
      category: 'Category 2',
      productId: 'p2',
      description: 'Description of Product 2',
    },
  },
];

describe('PopularItemManagement Component', () => {
  beforeEach(() => {
    // Reset the Zustand store state before each test
    useAppStore.setState({
      isBusy: false,
      productsOfTheDay: [],
      getProductsOfTheDay: async () => {
        // Simulate an API call and set products of the day
        useAppStore.setState({ productsOfTheDay: mockProductsOfTheDay });
      },
    });
  });

  it('renders without crashing', () => {
    render(<PopularItemManagement />);
    expect(screen.getByText('Items of the Day')).toBeInTheDocument();
  });

  it('displays a message when no items are found', async () => {
    // Simulate an empty productsOfTheDay array
    useAppStore.setState({
      getProductsOfTheDay: async () => {
        useAppStore.setState({ productsOfTheDay: [] });
      },
    });

    render(<PopularItemManagement />);

    await waitFor(() => {
      expect(
        screen.getByText("No items found in Today's menu!")
      ).toBeInTheDocument();
    });
  });

  it('displays skeletons when loading', () => {
    // Set the store state to busy
    useAppStore.setState({ isBusy: true });

    const { container } = render(<PopularItemManagement />);
    const loaderEls = container.querySelectorAll('.MuiSkeleton-root');

    expect(loaderEls).toHaveLength(4);
  });

  it('displays products when productsOfTheDay are available', async () => {
    render(<PopularItemManagement />);

    // Wait for the products to be displayed
    await waitFor(() => {
      mockProductsOfTheDay.forEach((item) => {
        expect(screen.getByText(item.product.title)).toBeInTheDocument();
        expect(screen.getByText(item.product.description)).toBeInTheDocument();
      });
    });
  });
});
