const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    referenceId: {
      type: String,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    deliveredOn: {
      type: Date,
    },
    customer: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    addresses: {
      type: Object,
      fields: {
        addressName: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        landmark: {
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
        phone: {
          type: String,
          required: true,
        },
        altPhone: {
          type: String,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
