import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
	user: process.env.USERNAME!,
	password: process.env.PASSWORD!,
	database: process.env.DB_NAME!,
};
export default {
	link: `mongodb+srv://${CONFIG.user}:${CONFIG.password}@cluster0.xsuns.mongodb.net/${CONFIG.database}?retryWrites=true&w=majority`,
	options: {
		useNewUrlParser: true,
		autoIndex: false,
		useUnifiedTopology: true,
	},
};
