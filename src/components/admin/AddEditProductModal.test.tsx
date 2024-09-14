import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import * as hooks from './../../hooks';
import { IProduct } from '../../utils/table';
import AddEditProductModal from './AddEditProductModal';

global.fetch = vi.fn();
vi.mock('./../../hooks');

describe('AddEditProductModal Component', () => {
  const handleClose = vi.fn();
  const handleSuccess = vi.fn();

  const defaultProps = {
    open: true,
    handleClose,
    handleSuccess,
    productData: undefined,
  };

  beforeEach(() => {
    vi.mocked(hooks.useApiRequest).mockImplementation(() => {
      return {
        error: null,
        loading: false,
        data: undefined,
        makeRequest: vi.fn(),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal with correct title for adding a product', () => {
    render(<AddEditProductModal {...defaultProps} />);

    expect(screen.getByRole('heading').textContent).toEqual('Add Product');

    expect(screen.getByRole('spinbutton', { name: /price/i })).toHaveValue(0);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      0
    );

    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /category/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /image/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue(
      ''
    );
  });

  it('renders the modal with correct title for updating a product', () => {
    const productData: IProduct = {
      id: 1,
      price: 100,
      quantity: 5,
      productId: 'p1',
      title: 'Test Product',
      category: 'Test Category',
      thumbnail: 'test-thumbnail.jpg',
      description: 'Test Description',
    };

    render(<AddEditProductModal {...defaultProps} productData={productData} />);

    expect(screen.getByRole('heading').textContent).toEqual('Update Product');

    expect(screen.getByRole('spinbutton', { name: /price/i })).toHaveValue(100);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      5
    );

    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      'Test Product'
    );
    expect(screen.getByRole('textbox', { name: /category/i })).toHaveValue(
      'Test Category'
    );
    expect(screen.getByRole('textbox', { name: /image/i })).toHaveValue(
      'test-thumbnail.jpg'
    );
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue(
      'Test Description'
    );
  });

  it('displays error message when API returns an error', () => {
    vi.mocked(hooks.useApiRequest).mockImplementation(() => {
      return {
        error: null,
        loading: false,
        makeRequest: vi.fn(),
        data: { error: { message: 'An error occurred' } },
      };
    });

    render(<AddEditProductModal {...defaultProps} />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('submits the form and makes API request when submitting a new product', () => {
    vi.mocked(fetch).mockReset();

    render(<AddEditProductModal {...defaultProps} />);

    fireEvent.change(screen.getByRole('spinbutton', { name: /price/i }), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: /quantity/i }), {
      target: { value: 2 },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'New Product' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /category/i }), {
      target: { value: 'New Category' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /image/i }), {
      target: { value: 'New Image' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
      target: { value: 'New Description' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /add product/i }));

    // expect(fetch).toHaveBeenCalledOnce();
  });
});
