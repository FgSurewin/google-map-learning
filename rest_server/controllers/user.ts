import { Request, Response, NextFunction } from "express";
import { log, Red } from "../config/logger";
import { UserService } from "../services/user";
import { UserBody, LoginBody } from "../types";

const NAMESPACE: string = "USER ROUTE";
const userService = new UserService();

export class UserController {
	@log(NAMESPACE)
	async addUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		// await imageService.getAllImages({ req, res, next });
		const body: UserBody = req.body;
		await userService.addUser({ req, res, next }, body);
		// console.log(body);
	}
	@log(NAMESPACE)
	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		// await imageService.getAllImages({ req, res, next });
		const body: LoginBody = req.body;
		await userService.login({ req, res, next }, body);
		// console.log(body);
	}
}
