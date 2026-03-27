import DiscountRule from "../models/DiscountRule.js";
import DiscountUsage from "../models/DiscountUsage.js";
import AppliedDiscount from "../models/AppliedDiscount.js";
import EligibilityResult from "../models/EligibilityResult.js";

export const applyDiscount = async (req, res) => {
  try {
    const { discountId, orderValue } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const rule = await DiscountRule.findById(discountId);

    if (!rule) {
      return res.status(404).json({ message: "Discount rule not found" });
    }

    if (!rule.isActive) {
      return res.status(400).json({ message: "Discount is not active" });
    }

    if (rule.allowedRole !== userRole) {
      return res.status(403).json({ message: "User role not allowed" });
    }

    if (orderValue < rule.minOrderValue) {
      return res.status(400).json({
        message: `Minimum order value should be ${rule.minOrderValue}`
      });
    }

    let usage = await DiscountUsage.findOne({
      userId,
      ruleId: discountId
    });

    if (usage && usage.usedCount >= rule.maxUsage) {
      return res.status(400).json({
        message: "Usage limit reached"
      });
    }

    const discountAmount = (orderValue * rule.discountPercent) / 100;
    const finalAmount = orderValue - discountAmount;

    const applied = await AppliedDiscount.create({
      userId,
      ruleId: discountId,
      orderValue,
      discountAmount,
      finalAmount
    });

    if (!usage) {
      usage = await DiscountUsage.create({
        userId,
        ruleId: discountId,
        usedCount: 1
      });
    } else {
      usage.usedCount += 1;
      await usage.save();
    }

    await EligibilityResult.create({
      userId,
      ruleId: discountId,
      orderValue,
      isEligible: true,
      reason: "All conditions satisfied"
    });

    res.status(200).json({
      message: "Discount applied successfully",
      applied
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};