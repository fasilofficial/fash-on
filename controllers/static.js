const { Product } = require("../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

const getRoot = async (req, res) => {
  try {
    const products = await Product.find({}).limit(12);
    const path = req.route.path;
    res.render("misc/home", { products, path });
  } catch (error) {
    console.log(error);
  }
};
const getStaticProducts = async (req, res) => {
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
    res.render("misc/products", {
      products,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getStaticProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const relatedProducts = await Product.find({
      $and: [{ _id: { $ne: product._id } }, { category: product.category }],
    }).limit(4);
    const path = req.route.path;
    res.render("misc/product", { product, relatedProducts, sizes, path });
  } catch (error) {
    console.log(error);
  }
};
const getAbout = async (req, res) => {
  const path = req.route.path;
  res.render("misc/about", { path });
};
const getContact = async (req, res) => {
  const path = req.route.path;
  res.render("misc/contact", { path });
};

const get404 = (req, res) => {
  const userToken = req.cookies.userToken;
  res.render("misc/404", { userToken });
};

module.exports = {
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
  get404,
};
