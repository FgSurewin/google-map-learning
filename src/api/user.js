import { myService } from ".";

export const signUp = (data) =>
	myService.request({
		method: "POST",
		url: `/user/addUser`,
		data,
	});
