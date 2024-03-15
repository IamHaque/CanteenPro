/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonService } from './';
import { IEmployee } from '../utils/table';
import { AllUserApiResponse } from '../utils/auth.types';

async function getAllUsers(): Promise<IEmployee[]> {
  try {
    const response = await fetch(`${CommonService.BASE_URL}/user/`, {
      method: 'GET',
      headers: CommonService.getHeaders(),
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
