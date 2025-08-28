import forgotPassword from "./User/forgotpassword.js";
import loginUser from "./User/login.js";
import registerUser from "./User/register.js";
import resetPassword from "./User/resetpassword.js";
import verifyotp from "./User/verify.js";

const userController={
    register:registerUser,
    login:loginUser,
    forgot:forgotPassword,
    verify:verifyotp,
    resetPassword:resetPassword
}
export default userController