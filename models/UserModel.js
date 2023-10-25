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
    addresses: [
      {
        type: new mongoose.Schema(
          {
            fullName: String,
            addressType: String,
            street: String,
            city: String,
            state: String,
            pincode: String,
            phone: String,
            altPhone: String,
          },
          { timestamps: true }
        ),
      },
    ],
    cart: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
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
