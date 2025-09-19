export const ENV = {
  IMGBB_API_KEY: process.env.REACT_APP_IMGBB_API_KEY as string,
  IMGBB_EXPIRATION: 3600,
  IMGBB_BASE_URL: 'https://api.imgbb.com/1/upload',
};

export interface ApiConfig {
  baseUrl: string;
  endpoints: Record<
    'products' | 'users',
    string
  >;
}

/**
 * Default API configuration for MockAPI
 */
export const API_CONFIG: ApiConfig = {
  baseUrl: 'https://68ca0a21430c4476c3480ff6.mockapi.io',
  endpoints: {
    products: '/products',
    users: '/users',
  },
} as const;
