const { Product, User } = require("../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

// GET REQUESTS
const getHome = async (req, res) => {
  const products = await Product.find({}).limit(12);
  const path = req.route.path;
  res.render("user/index", { products, path });
};
const getProducts = async (req, res) => {
  let perPage = 20;
  let page = req.query.page || 1;

  try {
    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Product.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("user/products", {
      products,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const relatedProducts = await Product.find({
    $and: [{ _id: { $ne: product._id } }, { category: product.category }],
  }).limit(4);
  const path = req.route.path;
  res.render("user/product", { product, relatedProducts, sizes, path });
};
const getWishlist = async (req, res) => {
  const path = req.route.path;
  res.render("user/wishlist", { path });
};
const getCart = async (req, res) => {
  const path = req.route.path;
  res.render("user/cart", { path });
};
const getProfile = async (req, res) => {
  const path = req.route.path;
  const user = await User.findById(req.cookies.userId)
  res.render("user/profile", { user, path });
};


module.exports = {
  getHome,
  getProducts,
  getProduct,
  getWishlist,
  getCart,
  getProfile,
};
