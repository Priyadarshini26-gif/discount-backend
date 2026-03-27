import express from "express";
import { applyDiscount } from "../controllers/appliedDiscountController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyDiscount);

export default router;