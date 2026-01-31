import mongoose from "mongoose";

const discountUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ruleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiscountRule",
      required: true
    },
    usedCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("DiscountUsage", discountUsageSchema);
