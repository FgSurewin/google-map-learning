import mongoose, { Document, Schema } from "mongoose";

export interface LabelInterface extends Document {
	label_id: string;
	box: number[];
	label: number;
	create_at?: string;
	score: number;
}

export interface ImageInterface extends Document {
	image_id: string;
	pano: string;
	name: string;
	lat: number;
	lon: number;
	url: string;
	image_size: number[];
	create_at?: string;
	isLabeled: boolean;
	count: number;
	labeled_area: LabelInterface[];
	user_one: LabelInterface[];
	user_two: LabelInterface[];
	user_three: LabelInterface[];
}

const ImageModel = new Schema({
	image_id: {
		type: String,
		required: true,
	},
	pano: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	lat: {
		type: Number,
		required: true,
	},
	lon: {
		type: Number,
		required: true,
	},
	create_at: {
		type: String,
		required: false,
	},
	image_size: {
		type: [Number],
		required: true,
	},
	isLabeled: {
		type: Boolean,
		required: true,
	},
	count: {
		type: Number,
		require: true,
	},
	labeled_area: {
		type: [
			{
				label_id: String,
				box: [Number],
				label: Number,
				create_at: String,
				score: Number,
			},
		],
		required: true,
	},
	user_one: {
		type: [
			{
				label_id: String,
				box: [Number],
				label: Number,
				create_at: String,
				score: Number,
			},
		],
		required: false,
	},
	user_two: {
		type: [
			{
				label_id: String,
				box: [Number],
				label: Number,
				create_at: String,
				score: Number,
			},
		],
		required: false,
	},
	user_three: {
		type: [
			{
				label_id: String,
				box: [Number],
				label: Number,
				create_at: String,
				score: Number,
			},
		],
		required: false,
	},
});

export default mongoose.model<ImageInterface>("Image", ImageModel, "panorama");
