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
    enum: ["books", "course"] // matches your collection/model names
  },
  quantity: {
    type: Number,
    default: 1
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
