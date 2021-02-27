import { Request, Response, NextFunction } from "express";
import { log } from "../config/logger";

const NAMESPACE: string = "IMAGE ROUTE";

export class ImageController {
	@log(NAMESPACE)
	async getAllImages(req: Request, res: Response, next: NextFunction) {
		res.json({
			code: 0,
			message: "GET ALL IMAGES",
			data: null,
		});
	}
}
