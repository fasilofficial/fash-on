const {
  getAdminDashboard,
  getUsers,
  getProducts,
  getCategories,
  getAddUser,
  getAddProduct,
  getAddCategory,
  getEditProduct,
  getEditCategory,
  handleAddUser,
  handleAddProduct,
  handleAddCategory,
  handleBlockAndUnblock,
  handleEditProduct,
  handleEditCategory,
  handleDeleteProduct,
  handleDeleteCategory,
} = require("./admin");

const {
  getUserSignup,
  getUserLogin,
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
  getProfile,
} = require("./user");

module.exports = {
  getAdminDashboard,
  getUsers,
  getProducts,
  getCategories,
  getAddUser,
  getAddProduct,
  getAddCategory,
  getEditProduct,
  getEditCategory,
  handleAddUser,
  handleAddProduct,
  handleAddCategory,
  handleBlockAndUnblock,
  handleEditProduct,
  handleEditCategory,
  handleDeleteProduct,
  handleDeleteCategory,
  getUserSignup,
  getUserLogin,
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
  getHome,
  getAllProducts,
  getProduct,
  getWishlist,
  getCart,
  getProfile,
  getAbout,
  getContact,
};
