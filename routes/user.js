const express = require("express");
const router = express.Router();

const {
  getHome,
  getAllProducts,
  getProduct,
  getWishlist,
  getCart,
  getProfile,
  getAbout,
  getContact,
} = require("../controllers");

router.get("/", getHome);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/wishlist", getWishlist);
router.get("/cart", getCart);
router.get("/profile", getProfile);


// router.get("/", async (req, res) => {
//   const products = await Product.find({});
//   res.render("index", { products });
// });

// // ALL PRODUCTS
// router.get("/products", async (req, res) => {
//   const products = await Product.find({});
//   res.render("products", { products });
// });
// // SINGLE PRODUCT
// router.get("/products/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   const relatedProducts = await Product.find({
//     $and: [{ _id: { $ne: product._id } }, { category: product.category }],
//   }).limit(4);
//   res.render("product", { product, relatedProducts, sizes });
// });
// // WISHLIST
// router.get("/wishlist", (req, res) => {
//   res.render("wishlist");
// });
// // CART
// router.get("/cart", (req, res) => {
//   res.render("cart");
// });
// // PROFILE
// router.get("/profile", (req, res) => {
//   res.render("profile");
// });
// // SHOP
// router.get("/shop", (req, res) => {
//   res.render("shop");
// });
// // ORDERS
// router.get("/orders", (req, res) => {
//   res.render("orders");
// });

// // SINGLE PRODUCT
// router.get("/shop/:id", (req, res) => {
//   res.render("product");
// });

// // ABOUT
// router.get("/about", (req, res) => {
//   res.render("about");
// });
// // CONTACT
// router.get("/contact", (req, res) => {
//   res.render("contact");
// });

module.exports = router;
