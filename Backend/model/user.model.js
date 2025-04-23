import mongoose from "mongoose";
import CartItem from "./cart.model.js"; // Import the CartItem schema

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [CartItem.schema], // Referencing CartItem schema
});

const User = mongoose.model("User", userSchema);
export default User;
