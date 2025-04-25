// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // attach user (without password)
    next();
  } catch (err) {
    console.error("Token error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protect;
