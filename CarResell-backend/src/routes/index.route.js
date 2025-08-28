import express from "express";
import userRoute from "./user.route.js";

const indexRouter=express.Router()
indexRouter.use("/api/v1/users",userRoute)

export default indexRouter