import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
	nickname: string;
	password: string;
	email: string;
	role: string;
	institution: string;
	isSent: number;
	isReviewed: number;
	images: number;
}

const UserModel = new Schema({
	nickname: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	institution: {
		type: String,
		required: true,
	},
	isSent: {
		type: Number,
		required: true,
	},
	isReviewed: {
		type: Number,
		required: true,
	},
	images: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<UserInterface>("User", UserModel);
