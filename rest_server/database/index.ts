import dotenv from "dotenv";

dotenv.config();

// Database Configuration
export const config = {
	link: process.env.WEB_LINK!,
	options: {
		useNewUrlParser: true,
		autoIndex: false,
		useUnifiedTopology: true,
	},
};

// Secret
export const SECRET = process.env.SECRET;
