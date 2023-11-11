const express = require("express");
const router = express.Router();

const {
  getHome,
  getAllProducts,
  getProduct,
  getWishlist,
  getUserAbout,
  getUserContact,
  getCart,
  getUserOrders,
  getViewUserOrder,
  getOrderPlaced,
  getCheckout,
  getProfile,
  getUserCoupons,
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
  handleCancelOrder,
  handleProductSearch,
  handleReturnOrder,
  handleApplyCoupon,
  handleRazorPayPayment,
  handleUpdateCart,
} = require("../controllers");

const { isOrderPlaced } = require("../middlewares");

router.use(async (req, res, next) => {
  req.app.set("layout", "layouts/userLayout");
  next();
});

router.get("/", getHome);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/wishlist", getWishlist);
router.get("/cart", getCart);
router.get("/orders", getUserOrders);
router.get("/about", getUserAbout);
router.get("/contact", getUserContact);
router.get("/coupons", getUserCoupons);
router.get("/orders/view/:id", getViewUserOrder);
router.get("/profile", getProfile);
router.get("/editProfile", getEditProfile);
router.get("/checkout", getCheckout);
router.get("/orderPlaced", isOrderPlaced, getOrderPlaced);

router.get("/wishlist/add/:id", handleAddToWishlist);
router.get("/orders/return/:id", handleReturnOrder);
router.get("/orders/cancel/:id", handleCancelOrder);
router.get("/cart/delete/:id", handleDeleteFromCart);
router.get("/wishlist/delete/:id", handleDeleteFromWishlist);
router.get("/deleteAddress/:id", handleDeleteAddress);

router.post("/addAddress", handleAddAddress);
router.post("/cart/add/:id", handleAddToCart);
router.post("/applyCoupon", handleApplyCoupon);
router.post("/placeorder", handlePlaceOrder);
router.put("/editProfile", handleEditProfile);
router.put("/changePassword", handleChangePassword);

router.post("/razorpayPayment", handleRazorPayPayment);
router.post("/search", handleProductSearch);
router.put("/cart/update/:id", handleUpdateCart);

router.get("*", get404);

module.exports = router;
