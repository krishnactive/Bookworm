import mongoose from "mongoose";
import CartItem from "./cart.model.js"; // Import the CartItem schema

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", ""],
    default: "",
  },
  profile: {
    type: String,
    default: "", // URL to profile picture
  },
  password: {
    type: String,
    required: true,
  },
  cart: [CartItem.schema], // Referencing CartItem schema
  myBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    }
  ],
  myCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    }
  ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
