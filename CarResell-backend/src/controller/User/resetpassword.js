import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      res.status(400).send(new ApiResponse(400, null, "Fields are empty!"));
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User does not exist please register")
        );
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedNewPassword;
    existingUser.resetOtp = undefined;
    existingUser.resetOtpExpires = undefined;
    
    await existingUser.save()

    res.status(200).send(new ApiResponse(200,null,"Password updated sucessfully"))
  } catch (error) {}
};
export default resetPassword;
