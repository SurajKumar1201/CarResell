import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

const forgotPassword=async(req,res)=>{
    try {
        const{email}=req.body
        if(!email){
            return res.status(404).send(new ApiResponse(404,null,"Feild is empty"))
        }

        const existing=await User.findOne({email})

        if(!existing){
            return res.status(404).send(new ApiResponse(404,null,"New User! Please signup"))
        }

        const otp=Math.floor(100000+Math.random()*900000).toString()
        const hashedOtp=await bcrypt.hash(otp,10)
        existing.resetOtp=hashedOtp
        existing.resetOtpExpires=Date.now()+5*30*1000
        await existing.save()


        // send email
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER_EMAIL,
                pass:process.env.USER_PASS
            }
        })

        await transporter.sendMail({
            from:process.env.USER_EMAIL,
            to:email,
            subject:"Your OTP",
            text:`Your OTP to reset the password ${otp} It will expire in 5 min`
        })

        res.status(200).send(new ApiResponse(200,null,"Message sent successfully"))

    } catch (error) {
        console.log(error)
        res.status(500).send(new ApiResponse(500,error,"Something went wrong"))
    }
}
export default forgotPassword