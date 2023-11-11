const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    userTitle: {
      type: String,
    },
    adminTitle: {
      type: String,
    },
    userDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seo", seoSchema);
