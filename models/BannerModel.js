const mongoose = require("mongoose");

const bannerScheme = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      imagePath: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerScheme);
