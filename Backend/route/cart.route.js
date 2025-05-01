import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";

import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../controller/cart.controller.js";

router.post("/add", addToCart);
router.get("/show", protect, fetchCart);
router.post("/remove", protect, removeFromCart);

export default router;
