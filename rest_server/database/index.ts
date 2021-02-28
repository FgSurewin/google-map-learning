import dotenv from "dotenv";

dotenv.config();

export const config = {
	link: process.env.LINK!,
	options: {
		useNewUrlParser: true,
		autoIndex: false,
		useUnifiedTopology: true,
	},
};
