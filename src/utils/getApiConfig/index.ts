import { config } from '@/config';

interface ApiConfigResponse {
  images: {
    secure_base_url: string;
    poster_sizes: string[];
  };
}

// TODO: Store in global state
export const getApiConfig = async (): Promise<ApiConfigResponse> => {
  const response = await fetch(`${config.apiUrl}/configuration`, {
    method: 'GET',
    headers: {
      Authorization: config.apiToken,
    },
  });
  const data = await response.json();
  return data;
};
