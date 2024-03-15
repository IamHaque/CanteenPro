/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllPOTDApiResponse, AllProductApiResponse } from './auth.types';
import { IPOTD, IProduct } from './table';

const BASE_URL = 'http://localhost:3200/api/v1';
const API_KEY = 'LhPRmQ2iKnQsGpAanoyAU8c3qgc4fydlcw9Z';

function getHeaders() {
  const token = localStorage.getItem('token');

  return {
    ApiKey: API_KEY,
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

async function getAllProducts(): Promise<IProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/product/`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const responseData = (await response.json()) as AllProductApiResponse;

    if (!response.ok && !responseData?.error)
      throw new Error('Failed to fetch data');

    if (responseData?.error || !responseData?.data?.items)
      throw new Error('Failed to fetch data');

    const allProducts = responseData?.data?.items.map(
      (product, index): IProduct => {
        return {
          id: index,
          ...product,
        };
      }
    );
    return allProducts;
  } catch (error) {
    return [];
  }
}

async function getProductsOfTheDay(): Promise<IPOTD[]> {
  try {
    const response = await fetch(`${BASE_URL}/product/today/`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const responseData = (await response.json()) as AllPOTDApiResponse;

    if (!response.ok && !responseData?.error)
      throw new Error('Failed to fetch data');

    if (responseData?.error || !responseData?.data?.items)
      throw new Error('Failed to fetch data');

    const productsOfTheDay = responseData?.data?.items.map(
      (product, index): IPOTD => {
        return {
          ...product,
          product: {
            ...product.product,
            quantity: product.quantity,
            id: index,
          },
        };
      }
    );
    return productsOfTheDay;
  } catch (error) {
    return [];
  }
}

export default { getAllProducts, getProductsOfTheDay };
