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
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    deliveredOn: {
      type: Date,
    },
    products: [
      {
        type: new mongoose.Schema({
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
          quantity: {
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
        }),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
