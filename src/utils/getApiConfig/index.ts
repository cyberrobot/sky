import { config } from '@/config';
import { ApiConfig } from '@/types';

// TODO: Store in global state
export const getApiConfig = async (): Promise<ApiConfig> => {
  const response = await fetch(`${config.apiUrl}/configuration`);
  const data = await response.json();
  return data;
};
