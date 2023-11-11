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
    type: {
      type: String,
    },
    image: {
      image: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerScheme);
