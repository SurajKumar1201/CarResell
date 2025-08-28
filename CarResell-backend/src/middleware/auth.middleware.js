import { ApiResponse } from "../utils/ApiResponse"
import jwt from "jsonwebtoken"

const checkIsLoggedIn=(req,res,next)=>{
    const bearerAuth=req.header.authorization

    if(!bearerAuth){
        res.status(400).status(new ApiResponse(400,null,"Invalid Bearer Token"))
    }

    const token=bearerAuth.split(" ")[1]

    try {
        const decodedInfo=jwt.verify(token,process.env.SECRET_TOKEN)
        req.user=decodedInfo;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send(new ApiResponse(500,error,"Invalid or expired token"))
    }

}
export default checkIsLoggedIn