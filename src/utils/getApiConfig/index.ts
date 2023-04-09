import { config } from '@/config';
import { ApiConfig } from '@/types';

// TODO: Store in global state
export const getApiConfig = async (): Promise<ApiConfig> => {
  const response = await fetch(`${config.apiUrl}/configuration`, {
    method: 'GET',
    headers: {
      Authorization: config.apiToken,
    },
  });
  const data = await response.json();
  return data;
};
