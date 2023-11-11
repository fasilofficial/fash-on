const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
      unique: true,
    },
    offerType: {
      type: String,
      required: true,
    },
    offerAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
