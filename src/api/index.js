import axios from "axios";
import { message } from "antd";

export const myService = axios.create({
	baseURL: "/api",
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
		console.log("res ->", res);
		if (res.data.code === 2000) {
			message.error(res.data.message);
			// window.location.href = "/home";
		}
		if (res.data.code === 4000) {
			message.error(res.data.message);
			return Promise.reject(res);
		}
		return Promise.resolve(res);
	},
	(error) => {
		console.log("Return Error");
		return Promise.reject(error);
	}
);
