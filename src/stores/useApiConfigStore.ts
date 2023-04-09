import { ApiConfig } from '@/types';
import { getApiConfig } from '@/utils/getApiConfig';
import { create } from 'zustand';

interface BearState {
  config: ApiConfig;
  setApiConfig: () => void;
}

export const useApiConfigStore = create<BearState>((set) => ({
  config: {
    images: {
      secure_base_url: '',
      poster_sizes: [],
    },
  },
  setApiConfig: async () => {
    set({ config: await getApiConfig() });
  },
}));
