/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonService } from './';
import { IPOTD, IProduct } from '../utils/table';
import { AllPOTDApiResponse, AllProductApiResponse } from '../utils/auth.types';

async function getAllProducts(): Promise<IProduct[]> {
  try {
    const response = await fetch(`${CommonService.BASE_URL}/product/`, {
      method: 'GET',
      headers: CommonService.getHeaders(),
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
    const response = await fetch(`${CommonService.BASE_URL}/product/today/`, {
      method: 'GET',
      headers: CommonService.getHeaders(),
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
