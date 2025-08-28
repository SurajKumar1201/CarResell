import express from "express";
import userController from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const userRoute=express.Router()

userRoute.post("/register",upload.single("profilePic"),userController.register)
userRoute.route("/login").post(userController.login)
userRoute.route("/forgotPassword").post(userController.forgot)
userRoute.route("/verify").post(userController.verify)
userRoute.route("/resetPassword").post(userController.resetPassword)


export default userRoute