const { Product } = require("../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

// GET REQUESTS
const getHome = async (req, res) => {
  const products = await Product.find({});
  res.render("user/index", { products });
};
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.render("user/products", { products });
};
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const relatedProducts = await Product.find({
    $and: [{ _id: { $ne: product._id } }, { category: product.category }],
  }).limit(4);
  res.render("user/product", { product, relatedProducts, sizes });
};
const getWishlist = async (req, res) => {
  res.render("user/wishlist");
};
const getCart = async (req, res) => {
  res.render("user/cart");
};
const getProfile = async (req, res) => {
  res.render("user/profile");
};
const getAbout = async (req, res) => {
  res.render("user/about");
};
const getContact = async (req, res) => {
  res.render("user/contact");
};

module.exports = {
  getHome,
  getProducts,
  getProduct,
  getWishlist,
  getCart,
  getProfile,
  getAbout,
  getContact,
};
