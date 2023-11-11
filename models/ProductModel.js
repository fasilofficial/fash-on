const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sizes: [String],
    color: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
    },
    material: {
      type: String,
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
);

module.exports = mongoose.model("Product", productSchema);
