import express from "express";
import carController from "../controller/car.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const carRoute=express.Router()

carRoute.post('/enterDetails',upload.array("carImage",5),carController.enterDetails)
export default carRoute