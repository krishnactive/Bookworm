import User from "../model/user.model.js";
import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";
import mongoose from "mongoose";

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
  const { userId, itemId, itemType } = req.body; // or req.params depending on route setup

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) =>
        item.itemId.toString() !== itemId ||
        item.itemType !== itemType
    );
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch cart
export const fetchCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
      path: "cart.itemId",
      model: (doc) => doc.itemType, // dynamic model
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


