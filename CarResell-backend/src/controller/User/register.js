import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../utils/cloudinary.js";

const registerUser = async (req, res) => {
  try {
    //destructure feilds
    const { name, email, password } = req.body;

    // check if feilds are empty
    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Feilds are empty"));
    }

    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send(new ApiResponse(409, null, "User Already exists please login"));
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Profile Pic
    let profilePicUrl = "";

    if (req.file) {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "user_profiles",
            public_id: uniqueName,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result); //  resolve the Cloudinary result object
          }
        );

        stream.end(req.file.buffer); //  send buffer to Cloudinary
      });

      profilePicUrl = uploadResult.secure_url; //  grab secure_url from result
    }

    //Store in Db
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic:profilePicUrl
    });

    // send success code
    res
      .status(201)
      .send(new ApiResponse(201, result, "User Created Successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Something went wrong"));
  }
};
export default registerUser;
