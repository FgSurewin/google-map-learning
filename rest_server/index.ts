import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import imageRoute from "./routes/image";
import { logger, loggerMiddleware } from "./config/logger";

const app = express();

// Initialize Middleware
dotenv.config();
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize Routes
app.use("/image", imageRoute);

// Handle Error
app.use(async (req, res, next) => {
	const error = new Error("NOT FOUND");

	return res.status(404).json({
		code: 404,
		message: error.message,
	});
});

app.listen(parseInt(process.env.PORT!), () =>
	logger("SERVER", `Server is running on http://localhost:${process.env.PORT}`)
);
