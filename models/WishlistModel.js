const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    wishlistItems: [
      {
        type: new mongoose.Schema(
          {
            productId: {
              type: String,
            },
            productName: {
              type: String,
              required: true,
            },
            salePrice: {
              type: Number,
              required: true,
            },
            productImages: [
              {
                image: {
                  type: Buffer,
                },
                contentType: {
                  type: String,
                },
              },
            ],
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("wishlist", wishlistSchema);