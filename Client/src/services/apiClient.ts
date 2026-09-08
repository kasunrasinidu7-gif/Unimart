const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('unimart_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers as Record<string, string> || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (response.status === 204) {
    return {} as T;
  }

  let data: any;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = typeof data === 'object' && data?.message 
      ? data.message 
      : (typeof data === 'string' && data ? data : `Request failed with status ${response.status}`);
    throw new ApiError(response.status, errorMsg, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', headers }),

  post: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    }),

  put: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    }),

  delete: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'DELETE', headers }),
};

export default apiClient;
