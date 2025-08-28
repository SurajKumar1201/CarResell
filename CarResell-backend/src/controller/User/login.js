import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import bcrypt from "bcryptjs"

const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body

        // check if empty
        if(!email || !password){
            return res.status(400).send(new ApiResponse(400,null,"Feilds are empty"))
        }

        // Check if user exists
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(404).send(new ApiResponse(404,null,"User does not exist please register"))
        }

        // verify the user
        const verified=await bcrypt.compare(password,existingUser.password)
        if(!verified){
            return res.status(404).send(new ApiResponse(404,null,"Invalid credential"))
        }


        // sign Token
        const token=jwt.sign({
            name:existingUser.name,
            email:existingUser.email,
            _id:existingUser._id
        },process.env.SECRET_TOKEN,{expiresIn:"1d"})

        res.status(200).send(new ApiResponse(200,token,"Logged in successfully"))
        
    } catch (error) {
        console.log(error)
        res.status(500).send(new ApiResponse(500,error,"Something went wrong"))
    }
}
export default loginUser