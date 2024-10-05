import { axiosInstance } from "./instance"

export const getPremieres = async () => {
	const response = await axiosInstance.get('/premier');
	return response.data;
}