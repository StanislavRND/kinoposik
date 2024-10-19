import { axiosInstance } from './instance';

export const userAuth = async (phone: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { phone });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async () => {
  const response = await axiosInstance.get('/auth/check');
  return response.data.authenticated;
};

export const sendCode = async (phoneNumber: string) => {
  const response = await axiosInstance.post('/auth/code', { phoneNumber });
  return response.data.code;
};

export const logout = (userId: number) => {
  const response = axiosInstance.post('/auth/logout', { userId });
  return response;
};
