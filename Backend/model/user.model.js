import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "cart.itemType" // dynamic reference to either Book or Course
  },
  itemType: {
    type: String,
    required: true,
    enum: ["books", "Course"] // matches your collection/model names
  },
  quantity: {
    type: Number,
    default: 1
  },
});

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
  cart: [cartItemSchema], // <-- New field to store cart items
});

const User = mongoose.model("User", userSchema);
export default User;
