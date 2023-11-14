const { Product, User, Cart, Wishlist, Banner } = require("../../models");

const getHome = async (req, res) => {
  try {
    const products = await Product.find({}).limit(12);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const banners = await Banner.find({});
    const path = req.route.path;
    res.status(200);
    res.render("user/index", {
      products,
      path,
      userCart,
      userWishlist,
      banners,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getUserAbout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.status(200);
    res.render("user/about", { path, user, userWishlist, userCart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getUserContact = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.status(200);
    res.render("user/contact", { path, user, userWishlist, userCart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleProductSearch = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    searchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const products = await Product.find({
      productName: { $regex: new RegExp(searchTerm, "i") },
    });
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const banners = await Banner.find({});
    res.status(200);
    res.render("user/index", {
      products,
      path,
      banners,
      userCart,
      userWishlist,
      searchTerm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getHome,
  getUserAbout,
  getUserContact,
  handleProductSearch,
};
