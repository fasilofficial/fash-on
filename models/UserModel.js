const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    addresses: {
      type: Object,
      fields: {
        addressName: String,
        name: String,
        type: String,
        city: String,
        landmark: String,
        state: String,
        pincode: String,
        phone: String,
        altPhone: String,
      },
    },
    cart: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    wishlist: [
      {
        productId: String,
        productName: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
