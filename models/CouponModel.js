const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },
    couponDescription: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
