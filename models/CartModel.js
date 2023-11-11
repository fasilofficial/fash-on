const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    couponDiscountPercentage: {
      type: Number,
    },
    cartItems: [
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
            category: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              default: 1,
            },
            categoryOfferAmount: {
              type: Number,
            },
            size: {
              type: String,
              required: true,
              default: "s",
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
          { timeStamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
