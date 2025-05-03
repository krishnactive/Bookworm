import express from "express";
import { signup, login } from "../controller/user.controller.js";
import requireSignIn from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.put("/profile", requireSignIn, updateProfile);

export default router;