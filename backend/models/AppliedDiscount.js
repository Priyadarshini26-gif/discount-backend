import mongoose from "mongoose";

const appliedDiscountSchema = new mongoose.Schema(
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
    orderValue: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      required: true
    },
    finalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("AppliedDiscount", appliedDiscountSchema);
