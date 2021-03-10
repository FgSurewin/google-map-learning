import { AppContext, ImageField } from "../types";
import ImageModel, {
	ImageInterface,
	LabelInterface,
} from "../database/models/image";
import { Red } from "../config/logger";

export class ImageService {
	async getAllImages(ctx: AppContext): Promise<void> {
		const { res } = ctx;
		try {
			const result: ImageInterface[] = await ImageModel.find();
			res.json({
				code: 0,
				message: "Get all images",
				data: result,
			});
		} catch (e) {
			const error = new Error(e);
			res.json({
				code: 5000,
				message: error.message,
			});
		}
	}

	async getImageByPano(ctx: AppContext, panoId: string): Promise<void> {
		const { res } = ctx;
		try {
			const result: ImageInterface[] = await ImageModel.find({ pano: panoId });
			if (result.length > 0) {
				res.json({
					code: 0,
					message: "Get images by panorama id",
					data: result,
				});
			} else {
				res.json({
					code: 2000,
					message: "Result is NULL",
					data: null,
				});
			}
		} catch (e) {
			const error = new Error(e);
			res.json({
				code: 5000,
				message: error.message,
			});
		}
	}

	async getImageById(ctx: AppContext, id: string): Promise<void> {
		const { res } = ctx;
		try {
			const result: ImageInterface | null = await ImageModel.findOne({
				_id: id,
			});
			if (result) {
				// await this.trigger(true, result._id);
				res.json({
					code: 0,
					message: "Get one image by _id",
					data: result,
				});
			} else {
				res.json({
					code: 2000,
					message: "Result is NULL",
					data: result,
				});
			}
		} catch (e) {
			const error = new Error(e);
			res.json({
				code: 5000,
				message: error.message,
			});
		}
	}

	async getRandomImageList(ctx: AppContext): Promise<void> {
		const { res } = ctx;
		try {
			const collections: ImageInterface[] = await ImageModel.find({
				isLabeled: false,
			});
			if (collections.length === 0) {
				res.json({
					code: 2000,
					message: "Result is NULL",
					data: null,
				});
			} else {
				const random = Math.floor(Math.random() * collections.length);
				collections.forEach((item) => {
					console.log(Red(item.name));
				});
				console.log(`${Red("Length")} -> ${collections.length}`);
				const pano: string = collections[random].pano;
				const result: ImageInterface[] = await ImageModel.find({ pano });
				res.json({
					code: 0,
					message: "Get images randomly",
					data: result,
				});
			}
		} catch (e) {
			const error = new Error(e);
			res.json({
				code: 5000,
				message: error.message,
			});
		}
	}

	async trigger(labeled: boolean, id: string): Promise<boolean> {
		let result: boolean = false;
		try {
			await ImageModel.updateOne({ _id: id }, { isLabeled: labeled });
			result = true;
		} catch (e) {
			const error = new Error(e);
			console.log(Red(error.message));
		}
		return result;
	}

	async toggle(ctx: AppContext, labeled: boolean, id: string): Promise<void> {
		const { res } = ctx;
		const result: boolean = await this.trigger(labeled, id);
		if (result) {
			res.json({
				code: 0,
				message: "Toggle Successfully",
			});
		} else {
			res.json({
				code: 5000,
				message: "Toggle Failed - Invalid ID",
			});
		}
	}

	async addLabelArea(
		ctx: AppContext,
		labels: LabelInterface[],
		id: string,
		field: ImageField
	): Promise<void> {
		const { res } = ctx;
		try {
			const { ok } = await ImageModel.updateOne(
				{ _id: id },
				{ [field]: labels }
			);
			console.log("test -> ", test);
			// 明天要处理count的问题, 建议前端直接传过来
			const result = await ImageModel.findOne({ _id: id });
			if (ok === 1) {
				res.json({
					code: 0,
					message: "Add Successfully",
					data: result,
				});
			} else {
				res.json({
					code: 4000,
					message: "Field name is invalid",
				});
			}
		} catch (e) {
			const error = new Error(e);
			res.json({
				code: 5000,
				message: error.message,
			});
		}
	}
}
