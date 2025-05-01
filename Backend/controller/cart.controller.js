import User from "../model/user.model.js";
import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";
// import Course from "../model/course.model.js";
import mongoose from "mongoose";
import authMiddleware from "../middleware/authMiddleware.js";
// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, itemId, itemType } = req.body;

  if (!userId || !itemId || !itemType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyExists = user.cart.some(
      (entry) =>
        entry.itemId.toString() === itemId && entry.itemType === itemType
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Item already in cart" });
    }

    user.cart.push({ itemId, itemType }); // <-- use correct field names
    await user.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user?._id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) =>
        item.itemId.toString() !== itemId.toString() || item.itemType !== itemType
    );

    await user.save();
    await user.populate("cart.itemId");

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const fetchCart = async (req, res) => {
  const userId = req.user._id;

  try {
    //Find the user
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    //Populate the cart based on itemType
    const populatedCart = await Promise.all(
      user.cart.map(async (cartItem) => {
        if (cartItem.itemType === "books") {
          const book = await Book.findById(cartItem.itemId);
          return { ...cartItem.toObject(), itemId: book };  // Attach populated book to the cartItem
        } else if (cartItem.itemType === "courses") {
          const course = await course.findById(cartItem.itemId);
          return { ...cartItem.toObject(), item: course };  // Attach populated course to the cartItem
        }
        return cartItem;  // Return cartItem as is if itemType doesn't match
      })
    );

    res.status(200).json({ cart: populatedCart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



