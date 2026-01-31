import DiscountRule from "../models/DiscountRule.js";
import DiscountUsage from "../models/DiscountUsage.js";
import EligibilityResult from "../models/EligibilityResult.js";
import AppliedDiscount from "../models/AppliedDiscount.js";

export const createDiscountRule = async (req, res) => {
  try {
    const {
      name,
      minOrderValue,
      allowedRole,
      maxUsage,
      discountPercent
    } = req.body;

    const rule = await DiscountRule.create({
      name,
      minOrderValue,
      allowedRole,
      maxUsage,
      discountPercent
    });

    res.status(201).json({
      message: "Discount rule created",
      rule
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDiscountRules = async (req, res) => {
  try {
    const rules = await DiscountRule.find();
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleDiscountRule = async (req, res) => {
  try {
    const rule = await DiscountRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    rule.isActive = !rule.isActive;
    await rule.save();

    res.json({
      message: "Rule status updated",
      isActive: rule.isActive
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkDiscountEligibility = async (req, res) => {
  try {
    const { ruleId, orderValue } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const rule = await DiscountRule.findById(ruleId);

    if (!rule) {
      return res.status(404).json({ message: "Discount rule not found" });
    }

    let reason = "";
    let isEligible = true;

    if (!rule.isActive) {
      isEligible = false;
      reason = "Discount rule is inactive";
    } else if (orderValue < rule.minOrderValue) {
      isEligible = false;
      reason = "Order value too low";
    } else if (rule.allowedRole !== userRole) {
      isEligible = false;
      reason = "User role not allowed";
    } else {
      const usage = await DiscountUsage.findOne({ userId, ruleId });

      if (usage && usage.usedCount >= rule.maxUsage) {
        isEligible = false;
        reason = "Discount usage limit exceeded";
      }
    }

    await EligibilityResult.create({
      userId,
      ruleId,
      orderValue,
      isEligible,
      reason
    });

    res.json({
      isEligible,
      reason
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyDiscount = async (req, res) => {
  try {
    const { ruleId, orderValue } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const rule = await DiscountRule.findById(ruleId);

    if (!rule || !rule.isActive) {
      return res.status(400).json({ message: "Invalid or inactive discount rule" });
    }

    // Rule checks again (never trust frontend)
    if (orderValue < rule.minOrderValue) {
      return res.status(400).json({ message: "Order value too low" });
    }

    if (rule.allowedRole !== userRole) {
      return res.status(403).json({ message: "User role not allowed" });
    }

    let usage = await DiscountUsage.findOne({ userId, ruleId });

    if (usage && usage.usedCount >= rule.maxUsage) {
      return res.status(400).json({ message: "Discount usage limit exceeded" });
    }

    // Calculate discount
    const discountAmount = (orderValue * rule.discountPercent) / 100;
    const finalAmount = orderValue - discountAmount;

    // Save applied discount
    await AppliedDiscount.create({
      userId,
      ruleId,
      orderValue,
      discountAmount,
      finalAmount
    });

    // Update usage count
    if (!usage) {
      usage = await DiscountUsage.create({
        userId,
        ruleId,
        usedCount: 1
      });
    } else {
      usage.usedCount += 1;
      await usage.save();
    }

    res.json({
      message: "Discount applied successfully",
      discountAmount,
      finalAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
