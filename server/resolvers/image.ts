import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Image, Label } from "./image-type";
import ImageModel from "../database/models/image";

@Resolver()
export class ImageResolver {
	@Query(() => [Image])
	async getAllImages() {
		return ImageModel.find();
	}

	@Query(() => Image, { nullable: true })
	async getRandomImage() {
		let result;
		try {
			const collections = await ImageModel.find({
				isLabeled: false,
				isReviewed: false,
			});
			const random = Math.floor(Math.random() * collections.length);
			result = collections[random];
		} catch (e) {
			console.log(new Error(e));
		}
		return result;
	}

	@Query(() => [Image])
	async getRandomImageList() {
		let result;
		try {
			const collections = await ImageModel.find({
				isLabeled: false,
				isReviewed: false,
			});
			if (collections.length === 0) {
				result = [];
			} else {
				const random = Math.floor(Math.random() * collections.length);
				const pano = collections[random].pano;
				result = ImageModel.find({ pano });
			}
		} catch (e) {
			console.log(new Error(e));
		}
		return result;
	}

	@Query(() => Image)
	async getImageByPano(@Arg("id") id: string) {
		let result;
		try {
			result = await ImageModel.findOne({ pano: id });
		} catch (e) {
			console.log(new Error(e));
		}
		return result;
	}

	@Mutation(() => Image)
	async toggle(
		@Arg("id", { nullable: true }) id: string,
		@Arg("bool") bool: boolean,
		@Arg("type") type: string
	) {
		let result;
		try {
			const test = await ImageModel.updateOne({ _id: id }, { [type]: bool });
			result = await ImageModel.findOne({ _id: id });
		} catch (e) {
			console.log(new Error(e));
		}
		return result;
	}

	@Mutation(() => Image)
	async updateLabeledArea(
		@Arg("id") id: string,
		@Arg("labels", () => [Label]) labels: Label[]
	) {
		let result;
		try {
			const test = await ImageModel.updateOne(
				{ _id: id },
				{ labeled_area: labels }
			);
			result = await ImageModel.findOne({ _id: id });
		} catch (e) {
			console.log(new Error(e));
		}
		return result;
	}
}
