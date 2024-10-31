import { axiosInstance } from './instance';

export const searchMedia = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/search?query=${encodeURIComponent(query)}`);
		return response.data;
  } catch (error) {
    throw error;
  }
};
