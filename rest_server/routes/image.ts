import express from "express";
import { ImageController } from "../controllers/image";
const route = express.Router();
const imageController = new ImageController();

route.get("/getAll", imageController.getAllImages);

export default route;
