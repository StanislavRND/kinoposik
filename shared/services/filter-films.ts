import { axiosInstance } from './instance';

export const getFilmsFilters = async (queryString: string, sortType: 'rating' | 'createdAt') => {
  try {
    const response = await axiosInstance.get(`/films?query=${queryString}&sort=${sortType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
