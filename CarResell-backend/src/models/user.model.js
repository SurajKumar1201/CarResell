import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    resetOtp: {
      type: String,
    },
    resetOtpExpires: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePic:{
      type:String,
      default:""
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
