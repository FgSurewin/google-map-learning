import { myService } from ".";

export const fetchRandomList = () =>
	myService.request({
		method: "GET",
		url: "/image/getRanList",
	});

export const fetchImage = (id) =>
	myService.request({
		method: "GET",
		url: `/image/getOneById/${id}`,
	});
