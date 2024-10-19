import { axiosInstance } from './instance';

export const getUserCurrent = async () => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await axiosInstance.get('/users/favorites');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFavorites = async (userId: number, mediaId: number) => {
  try {
    const response = await axiosInstance.post('/users/favorites', { userId, mediaId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFavorites = async (mediaId: number) => {
  try {
    const response = await axiosInstance.delete('/users/favorites', { data: { mediaId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};
