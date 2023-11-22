const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    wishlistItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          default: "s",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("wishlist", wishlistSchema);
