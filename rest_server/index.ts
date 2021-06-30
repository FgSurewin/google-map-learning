import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import imageRoute from "./routes/image";
import userRoute from "./routes/user";
import mongoose from "mongoose";
import cors from "cors";
import { logger, loggerMiddleware } from "./config/logger";
import { config } from "./database";

(async function () {
	const app = express();

	// Initialize Middleware
	dotenv.config();
	// app.use(cors());
	app.use(loggerMiddleware);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// Initialize Routes
	app.use("/api/image", imageRoute);
	app.use("/api/user", userRoute);

	// MongoDB Connection
	try {
		await mongoose.connect(config.link, config.options);
		logger("DATABASE", "Connect to the MongoDB successfully!");
	} catch (error) {
		console.log(new Error(error));
	}

	// Handle Error
	app.use(async (req, res, next) => {
		const error = new Error("NOT FOUND");

		return res.status(404).json({
			code: 404,
			message: error.message,
		});
	});

	app.listen(parseInt(process.env.PORT!), () =>
		logger(
			"SERVER",
			`Server is running on http://localhost:${process.env.PORT}`
		)
	);
})();
