/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  makeRequest: (url: string, method: string, body?: any) => Promise<void>;
}

const useApiRequest = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = async (url: string, method: string, body: any = null) => {
    setData(null);
    setError(null);
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ApiKey: 'LhPRmQ2iKnQsGpAanoyAU8c3qgc4fydlcw9Z',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: body ? JSON.stringify(body) : null,
      });

      const responseData = await response.json();

      if (!response.ok || responseData?.error) {
        throw new Error('Failed to fetch data');
      }

      setData(responseData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, makeRequest } as ApiResponse<T>;
};

export default useApiRequest;
