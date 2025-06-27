// shared/api/index.ts
import { axiosInstance } from '../config/axios-instance';

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  throw error;
};

export const fetchWithAuth = async (url: string) => {
  try {
    return await axiosInstance.get(url);
  } catch (error) {
    handleApiError(error);
  }
};