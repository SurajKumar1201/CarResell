import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

const verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send(new ApiResponse(400, null, "Fields are empty"));
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send(new ApiResponse(400, null, "User does not exist"));
    }

    if (!existingUser.resetOtp || existingUser.resetOtpExpires < Date.now()) {
      return res.status(400).send(new ApiResponse(400, null, "Otp expired"));
    }
    const isMatch = await bcrypt.compare(otp, existingUser.resetOtp);

    if (!isMatch) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid Otp"));
    }
    res.status(200).send(new ApiResponse(200,null,"Otp verified"))

  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Something went wrong"));
  }
};
export default verifyotp;
