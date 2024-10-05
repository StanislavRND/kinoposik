import { axiosInstance } from "./instance";

export const getFilms = async () => {
  try {
    const response = await axiosInstance.get('/films');
    return response.data;
  } catch (error) {
    throw error;
  }
};