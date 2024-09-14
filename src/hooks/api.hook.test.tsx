import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useApiRequest from './api.hook';

const mockFetch = vi.spyOn(global, 'fetch');

interface MockApiResponseType {
  data: {
    message: string;
  };
}

describe('useApiRequest Hook', () => {
  const mockSuccessResponse: MockApiResponseType = {
    data: {
      message: 'Request successful',
    },
  };

  const mockErrorResponse = {
    error: 'Something went wrong',
  };

  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
  });

  it('initially returns default states', () => {
    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('sets loading to true when the request is made and false after it ends', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockSuccessResponse),
    } as unknown as Response);

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    act(async () => {
      result.current.makeRequest('http://localhost:3200/api/v1/test', 'GET');
    }).then(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(true);
  });

  it('fetches data successfully and updates state', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockSuccessResponse),
    } as unknown as Response);

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    await act(async () => {
      await result.current.makeRequest(
        'http://localhost:3200/api/v1/test',
        'GET'
      );
    });

    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockSuccessResponse);
  });

  it('handles errors and sets error state', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    } as unknown as Response);

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    await act(async () => {
      await result.current.makeRequest(
        'http://localhost:3200/api/v1/test',
        'GET'
      );
    });

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch data');
  });

  it('handles fetch failure and sets error state', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    await act(async () => {
      await result.current.makeRequest(
        'http://localhost:3200/api/v1/test',
        'GET'
      );
    });

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network Error');
  });

  it('adds Authorization header if token exists in localStorage', async () => {
    localStorage.setItem('token', 'test-token');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockSuccessResponse),
    } as unknown as Response);

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    await act(async () => {
      await result.current.makeRequest(
        'http://localhost:3200/api/v1/test',
        'GET'
      );
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3200/api/v1/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      })
    );
  });

  it('sends the correct body when making a POST request', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockSuccessResponse),
    } as unknown as Response);

    const { result } = renderHook(() => useApiRequest<MockApiResponseType>());

    const requestBody = { title: 'Test' };

    await act(async () => {
      await result.current.makeRequest(
        'http://localhost:3200/api/v1/product',
        'POST',
        requestBody
      );
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3200/api/v1/product',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
    );
  });
});
