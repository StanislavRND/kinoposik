import { axiosInstance } from './instance';

export const getActors = async () => {
  try {
    const response = await axiosInstance.get('/actors');
    return response.data;
  } catch (error) {
    throw error;
  }
};
