import express from "express";
const router = express.Router();
import  protect  from "../middleware/authMiddleware.js  ";

import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../controller/cart.controller.js";

router.post("/add", addToCart);
router.delete("/:userId/cart/:itemId", removeFromCart);
router.get("/show",protect, fetchCart);

export default router;
