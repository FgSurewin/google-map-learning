import dotenv from "dotenv";

dotenv.config();

export const config = {
	link: process.env.WEB_LINK!,
	options: {
		useNewUrlParser: true,
		autoIndex: false,
		useUnifiedTopology: true,
	},
};
