const { Product, Cart, Wishlist, Category } = require("../../models");

const getProducts = async (req, res) => {
  try {
    let perPage = 20;
    let page = req.query.page || 1;
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const categories = await Category.find({});
    const count = await Product.count();
    const pages = Math.ceil(count / perPage);
    const path = req.route.path;

    const category = req.query.category;
    if (category) {
      const products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      res.status(200);
      return res.render("user/products", {
        products,
        current: page,
        pages,
        path,
        userCart,
        userWishlist,
        categories,
      });
    } else {
      const products = await Product.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      res.render("user/products", {
        products,
        current: page,
        pages,
        path,
        userCart,
        userWishlist,
        categories,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const relatedProducts = await Product.find({
      $and: [{ _id: { $ne: product._id } }, { category: product.category }],
    }).limit(4);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];
    res.status(200);
    res.render("user/product", {
      product,
      relatedProducts,
      sizes,
      path,
      userCart,
      userWishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProduct,
  getProducts,
};
