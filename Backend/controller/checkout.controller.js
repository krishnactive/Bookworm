import Book from "../model/book.model.js";
import Course from "../model/course.model.js";
import User from "../model/user.model.js";

// controllers/userController.js

export const handleCheckout = async (req, res) => {
  const { userId } = req.body;
  console.log("sfdfadfs");

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItems = user.cart;

    // Use Set to prevent duplicates
    const existingBooks = new Set(user.myBooks.map(String));
    const existingCourses = new Set(user.myCourses.map(String));

    cartItems.forEach((item) => {
      console.log("Cart item:", item);

      if (item.itemType === "books" && !existingBooks.has(String(item.itemId))) {
        user.myBooks.push(item.itemId);
      } else if (item.itemType === "courses" && !existingCourses.has(String(item.itemId))) {
        user.myCourses.push(item.itemId);
      }
    });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Items added to library" });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
