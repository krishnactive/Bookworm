import express from "express";
import { signup, login, updateProfile, getMyBooks, getMyCourses } from "../controller/user.controller.js";
import {handleCheckout} from "../controller/checkout.controller.js"
import requireSignIn from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/checkout",requireSignIn, handleCheckout);

router.put("/profile", requireSignIn, updateProfile);

router.get("/my-courses", requireSignIn, getMyCourses);
router.get("/my-books", requireSignIn, getMyBooks);
export default router;