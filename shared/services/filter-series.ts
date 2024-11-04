import { axiosInstance } from './instance';

export const getSeriesFilters = async (queryString: string, sortType: 'rating' | 'createdAt') => {
  try {
    const response = await axiosInstance.get(`/series?query=${queryString}&sort=${sortType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
