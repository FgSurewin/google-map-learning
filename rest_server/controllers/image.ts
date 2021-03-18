import { Request, Response, NextFunction } from "express";
import { log, Red } from "../config/logger";
import ImageModel, { ImageInterface } from "../database/models/image";
import { ImageService } from "../services/image";
import { ImageBody, ImageParams } from "../types";
import { getField } from "../utils/image";

const NAMESPACE: string = "IMAGE ROUTE";
const imageService = new ImageService();
export class ImageController {
	@log(NAMESPACE)
	async getAllImages(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		await imageService.getAllImages({ req, res, next });
	}

	@log(NAMESPACE)
	async getImageByPano(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { panoId }: ImageParams = req.params;
		if (panoId) await imageService.getImageByPano({ req, res, next }, panoId);
		else
			res.json({
				code: 6000,
				message: "params is invalid.",
			});
	}

	@log(NAMESPACE)
	async getImageById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { Id }: ImageParams = req.params;
		if (Id) await imageService.getImageById({ req, res, next }, Id);
		else
			res.json({
				code: 6000,
				message: "params is invalid.",
			});
	}

	@log(NAMESPACE)
	async getRandomImageList(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		await imageService.getRandomImageList({ req, res, next });
	}

	@log(NAMESPACE)
	async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { labeled, id }: ImageBody = req.body;
		if (id) {
			console.log("Here@@@@@@@@");
			await imageService.toggle({ req, res, next }, labeled!, id);
		} else
			res.json({
				code: 6000,
				message: "Post body is invalid.",
			});
	}

	@log(NAMESPACE)
	async addLabelArea(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { labelArea, id }: ImageBody = req.body;
		const result: ImageInterface | null = await ImageModel.findById({
			_id: id,
		});
		if (result) {
			// console.log(Red(field));
			// console.log(Red(id));
			if (labelArea && id && result.count < 3) {
				console.log("labeled -> ", Red(id));
				const newCount = result.count + 1;
				const newField = getField(newCount);
				await imageService.addLabelArea(
					{ req, res, next },
					labelArea,
					id,
					newField,
					newCount
				);
			} else {
				console.log("Failed -> ", Red(id));
				res.json({
					code: 6000,
					message: "Post body is invalid OR count is larger than 3.",
				});
			}
		} else {
			res.json({
				code: "6000",
				message: "Image ID is invalid.",
			});
		}
	}

	@log(NAMESPACE)
	async test(req: Request, res: Response, next: NextFunction): Promise<void> {
		console.log(Red("TEST ROUTE"));
		res.json({
			message: "Hello Test",
		});
	}
}
