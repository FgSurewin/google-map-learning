import express from "express";
import { ImageController } from "../controllers/image";
const route = express.Router();
const imageController = new ImageController();

route.get("/test", imageController.test);
route.get("/getAll", imageController.getAllImages);
route.get("/getRanList", imageController.getRandomImageList);
route.get("/getImagesByPano/:panoId", imageController.getImageByPano);
route.get("/getOneById/:Id", imageController.getImageById);
route.post("/toggle", imageController.toggle);
route.post("/addLabelArea", imageController.addLabelArea);

export default route;
