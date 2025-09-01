import express from "express";
import userRoute from "./user.route.js";
import carRoute from "./car.route.js";

const indexRouter=express.Router()
indexRouter.use("/api/v1/users",userRoute)
indexRouter.use("api/v1/cars",carRoute)

export default indexRouter