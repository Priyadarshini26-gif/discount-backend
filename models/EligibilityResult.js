import mongoose from "mongoose";

const eligibilityResultSchema = new mongoose.Schema(
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
    isEligible: {
      type: Boolean,
      required: true
    },
    reason: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("EligibilityResult", eligibilityResultSchema);
