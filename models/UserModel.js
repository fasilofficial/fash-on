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
    newUser: {
      type: Boolean,
      required: true,
      default: true,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
