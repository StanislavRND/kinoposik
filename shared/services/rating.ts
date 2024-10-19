import { axiosInstance } from './instance';

export const putRating = async (mediaId: number, userId: number, score: number) => {
  try {
    await axiosInstance.put('/rate', { mediaId, userId, score });
  } catch (error) {
    throw error;
  }
};
