import express from "express";
import { createDiscountRule } from "../controllers/discountRuleController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/roleMiddleware.js";
import { getAllDiscountRules } from "../controllers/discountRuleController.js";
import { toggleDiscountRule } from "../controllers/discountRuleController.js";
import { checkDiscountEligibility } from "../controllers/discountRuleController.js";
import { applyDiscount } from "../controllers/discountRuleController.js";
import { getDiscountUsageReport } from "../controllers/discountRuleController.js";
import { getCustomerAppliedDiscounts } from "../controllers/discountRuleController.js";


const router = express.Router();

router.post("/", protect, isAdmin, createDiscountRule); //Create discount rules -- a
router.get("/", protect, isAdmin, getAllDiscountRules); //View discount rules -- a
router.patch("/:id/toggle", protect, isAdmin, toggleDiscountRule); //toggle whether discount is active or not -- a
router.post("/check-eligibility", protect, checkDiscountEligibility); // checking eligibility for the discount
router.post("/apply", protect, applyDiscount); // apply discount if eligible 
router.get("/usage-report", protect, isAdmin, getDiscountUsageReport); // admin discount usage report --a
router.get("/my-applied-discounts", protect, getCustomerAppliedDiscounts); //view apllied discounts --c


export default router;
