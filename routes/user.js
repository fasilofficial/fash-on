const express = require("express");
const router = express.Router();

const {
  getHome,
  getAllProducts,
  getProduct,
  getWishlist,
  getCart,
  getCheckout,
  getProfile,
  getEditProfile,
  handlePlaceOrder,
  handleEditProfile,
  handleChangePassword,
  handleAddAddress,
  handleAddToWishlist,
  handleAddToCart,
  handleDeleteAddress,
  handleDeleteFromWishlist,
  handleDeleteFromCart,
  get404,
} = require("../controllers");

router.get("/", getHome);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/wishlist", getWishlist);
router.get("/cart", getCart);
router.get("/profile", getProfile);
router.get("/editProfile", getEditProfile);
router.get("/checkout", getCheckout);

router.post("/addAddress", handleAddAddress);
router.post("/cart/add/:id", handleAddToCart);
router.get("/wishlist/add/:id", handleAddToWishlist);
router.get("/orderPlaced/:id", handlePlaceOrder);

router.put("/editProfile", handleEditProfile);
router.put("/changePassword", handleChangePassword);

router.get("/cart/delete/:id", handleDeleteFromCart);
router.get('/wishlist/delete/:id', handleDeleteFromWishlist)
router.get("/deleteAddress/:id", handleDeleteAddress);

router.get('*', get404)

module.exports = router;
