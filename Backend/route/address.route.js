import express from "express";
import protect from "../middleware/authMiddleware.js";
import { submitContact } from "../controller/contact.controller.js";
import {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses
} from "../controller/address.controller.js";

const router = express.Router();

router.post("/contact", submitContact);

router.post('/user/address', protect, createAddress);
router.put('/user/address/:id', protect, updateAddress);
router.delete('/user/address/:id', protect, deleteAddress);
router.get('/user/address/', protect, getAddresses);

export default router;
