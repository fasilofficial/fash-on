const { Product, Banner, Category } = require("../models");

const getRoot = async (req, res) => {
  try {
    const products = await Product.find({}).limit(12);
    const banners = await Banner.find({});
    const path = req.route.path;
    res.render("misc/home", {
      products,
      path,
      banners,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getStaticProducts = async (req, res) => {
  try {
    let perPage = 20;
    let page = req.query.page || 1;
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
      return res.render("misc/products", {
        products,
        current: page,
        pages,
        path,
        categories,
      });
    } else {
      const products = await Product.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      res.render("misc/products", {
        products,
        current: page,
        pages,
        path,
        categories,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getStaticProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const relatedProducts = await Product.find({
      $and: [{ _id: { $ne: product._id } }, { category: product.category }],
    }).limit(4);
    const path = req.route.path;
    const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];
    res.render("misc/product", { product, relatedProducts, sizes, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAbout = async (req, res) => {
  try {
    const path = req.route.path;
    res.render("misc/about", { path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getContact = async (req, res) => {
  try {
    const path = req.route.path;
    res.render("misc/contact", { path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const get404 = (req, res) => {
  try {
    const userToken = req.cookies.userToken;
    res.render("misc/404", { userToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
  get404,
};
