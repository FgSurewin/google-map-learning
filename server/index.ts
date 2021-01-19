import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ImageResolver } from "./resolvers/image";
import cors from "cors";
import config from "./database/config";

(async function () {
	const app = express();

	// Middleware
	dotenv.config();
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	// Constant
	const PORT = parseInt(process.env.PORT!);
	app.get("/test", (req, res, next) => {
		res.json({
			message: "Hello",
		});
	});
	// Connect to MongoDB
	try {
		await mongoose.connect(config.link, config.options);
		console.log("Connect to the MongoDB successfully!");
	} catch (error) {
		console.log(new Error(error));
	}

	// Connect to ApolloServer
	const server = new ApolloServer({
		schema: await buildSchema({ resolvers: [ImageResolver] }),
	});
	server.applyMiddleware({ app });
	app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
})();
