import { axiosInstance } from "./instance";


export const getUserCurrent = async () => {
	try {
		const response = await axiosInstance.get('/users/me');
		return response.data;
	} catch (error) {
		throw error;
	}
}