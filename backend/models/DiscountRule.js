import mongoose from "mongoose";

const discountRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    minOrderValue: {
      type: Number,
      required: true
    },
    allowedRole: {
      type: String,
      enum: ["CUSTOMER", "ADMIN"],
      required: true
    },
    maxUsage: {
      type: Number,
      required: true
    },
    discountPercent: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DiscountRule", discountRuleSchema);
