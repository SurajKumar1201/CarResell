import mongoose from "mongoose";

const connectToDb=async()=>{
    try {
        console.log("Attempting to connect DB")
        await mongoose.connect(process.env.DB)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectToDb