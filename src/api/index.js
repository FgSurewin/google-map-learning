import axios from "axios";

export const myService = axios.create({
	baseURL: "/api",
	timeout: 5000,
});

myService.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

myService.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);
