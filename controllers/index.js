const {
  getAdminDashboard,
  getUsers,
  getProducts,
  getCategories,
  getOrders,
  getAddUser,
  getAddProduct,
  getAddCategory,
  getEditProduct,
  getEditCategory,
  getViewOrder,
  getEditOrder,
  handleCancelOrder,
  handleAddUser,
  handleAddProduct,
  handleAddCategory,
  handleBlockAndUnblock,
  handleEditProduct,
  handleEditCategory,
  handleEditOrder,
  handleDeleteProduct,
  handleDeleteCategory,
} = require("./admin");

const {
  getUserSignup,
  getUserLogin,
  handleResendOtp,
  getUserLoginVerify,
  getAdminLogin,
  getAdminLoginVerify,
  handleUserSignup,
  handleUserLogin,
  handleUserLoginOtpVerification,
  handleUserLogout,
  handleAdminLogin,
  handleAdminLoginOtpVerification,
  handleAdminLogout,
} = require("./authentication");

const {
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
  get404,
} = require("./static");

const {
  getHome,
  getProducts: getAllProducts,
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
} = require("./user");

module.exports = {
  getAdminDashboard,
  getUsers,
  getProducts,
  getCategories,
  getOrders,
  getAddUser,
  getAddProduct,
  getAddCategory,
  getEditProduct,
  getEditCategory,
  getViewOrder,
  getEditOrder,
  handleCancelOrder,
  handleAddUser,
  handleAddProduct,
  handleAddCategory,
  handleBlockAndUnblock,
  handleEditProduct,
  handleEditCategory,
  handleEditOrder,
  handleDeleteProduct,
  handleDeleteCategory,
  getUserSignup,
  getUserLogin,
  handleResendOtp,
  getUserLoginVerify,
  getAdminLogin,
  getAdminLoginVerify,
  handleUserSignup,
  handleUserLogin,
  handleUserLoginOtpVerification,
  handleUserLogout,
  handleAdminLogin,
  handleAdminLoginOtpVerification,
  handleAdminLogout,
  get404,
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
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
};
