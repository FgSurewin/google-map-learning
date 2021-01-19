import mongoose, { Document, Schema } from "mongoose";

interface LabelInterface extends Document {
	label_id: string;
	box: number[];
	label: number;
	create_at?: string;
	score: number;
}

interface ImageInterface extends Document {
	image_id: string;
	pano: string;
	name: string;
	lat: number;
	lon: number;
	url: string;
	image_size: [Number];
	create_at: string;
	isChecked: boolean;
	isLabeled: boolean;
	isReviewed: boolean;
	labeled_area: LabelInterface[];
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
	isChecked: {
		type: Boolean,
		required: true,
	},
	isLabeled: {
		type: Boolean,
		required: true,
	},
	isReviewed: {
		type: Boolean,
		required: true,
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
});

export default mongoose.model<ImageInterface>("Image", ImageModel, "panorama");
