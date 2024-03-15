/* eslint-disable @typescript-eslint/no-explicit-any */

import { IEmployee } from './table';
import { AllUserApiResponse } from './auth.types';

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

async function getAllUsers(): Promise<IEmployee[]> {
  try {
    const response = await fetch(`${BASE_URL}/user/`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const responseData = (await response.json()) as AllUserApiResponse;

    if (!response.ok && !responseData?.error)
      throw new Error('Failed to fetch data');

    if (responseData?.error || !responseData?.data?.items)
      throw new Error('Failed to fetch data');

    const allUsers = responseData?.data?.items.map((user, index): IEmployee => {
      return {
        id: index,
        ...user,
      };
    });
    return allUsers;
  } catch (error) {
    return [];
  }
}

export default { getAllUsers };
