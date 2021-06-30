import { AppContext, UserBody } from "../types";
import UserModel from "../database/models/user";

export class UserService {
	async addUser(ctx: AppContext, body: UserBody) {
		const { res } = ctx;
		const { email } = body;
		const result = await UserModel.find({ email });
		console.log("result -> ", result);
		res.json({
			code: 0,
			message: "Get all users",
			data: result,
		});
	}
}
