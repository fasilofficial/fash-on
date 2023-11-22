const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAltPhone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalCategoryOfferAmount: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    shippingCharge: {
      type: Number,
      required: true,
      default: 50,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cash on delivery",
    },
    order_id: {
      type: String,
    },
    payment_id: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    deliveredAt: {
      type: Date,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
        size: {
          type: String,
        },
        categoryOfferAmount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
