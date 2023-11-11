// ADMIN SIDE
const {
  getAdminDashboard,
  getAdmin404,
  handleExcelDownload,
} = require("./admin/admin");
const {
  getBanners,
  getAddBanner,
  getEditBanner,
  handleAddBanner,
  handleEditBanner,
  handleDeleteBanner,
} = require("./admin/bannerController");
const {
  getCategories,
  getAddCategory,
  getEditCategory,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
} = require("./admin/categoryController");
const {
  getCoupons,
  getAddCoupon,
  getEditCoupon,
  handleAddCoupon,
  handleEditCoupon,
  handleDeleteCoupon,
} = require("./admin/couponController");
const {
  getOffers,
  getAddOffer,
  getEditOffer,
  handleAddOffer,
  handleEditOffer,
  handleDeleteOffer,
} = require("./admin/offerController");
const {
  getOrders,
  getViewOrder,
  getEditOrder,
  handleEditOrder,
  handleCancelOrder,
} = require("./admin/orderController");
const {
  getProducts,
  getAddProduct,
  getEditProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleDeleteProductImg,
} = require("./admin/productController");
const {
  getAdminProfile,
  handleEditAdminProfile,
} = require("./admin/profileController");
const {
  getSales,
  getViewSale,
  handleFilterByDate,
} = require("./admin/salesController");
const { getSettings, handleEditSeo } = require("./admin/settingsController");
const {
  getUsers,
  getAddUser,
  handleAddUser,
  handleBlockAndUnblock,
} = require("./admin/userController");

// USER SIDE
const {
  getHome,
  getUserAbout,
  getUserContact,
  handleProductSearch,
} = require("./user/user");
const {
  handleAddAddress,
  handleDeleteAddress,
} = require("./user/addressController");
const {
  getCart,
  handleAddToCart,
  handleUpdateCart,
  handleDeleteFromCart,
} = require("./user/cartController");
const {
  getCheckout,
  handleRazorPayPayment,
} = require("./user/checkoutController");
const {
  getUserCoupons,
  handleApplyCoupon,
} = require("./user/couponController");
const {
  getUserOrders,
  getViewUserOrder,
  getOrderPlaced,
  handlePlaceOrder,
  handleReturnOrder,
} = require("./user/orderController");
const {
  getProduct,
  getProducts: getAllProducts,
} = require("./user/productController");
const {
  getProfile,
  getEditProfile,
  handleEditProfile,
  handleChangePassword,
} = require("./user/profileController");
const {
  getWishlist,
  handleAddToWishlist,
  handleDeleteFromWishlist,
} = require("./user/wishlistController");

// AUTHENTICATION
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

// STATIC
const {
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
  get404,
} = require("./static");

module.exports = {
  getAdminDashboard,
  getAdmin404,
  handleExcelDownload,
  getBanners,
  getAddBanner,
  getEditBanner,
  handleAddBanner,
  handleEditBanner,
  handleDeleteBanner,
  getCategories,
  getAddCategory,
  getEditCategory,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
  getCoupons,
  getAddCoupon,
  getEditCoupon,
  handleAddCoupon,
  handleEditCoupon,
  handleDeleteCoupon,
  getOffers,
  getAddOffer,
  getEditOffer,
  handleAddOffer,
  handleEditOffer,
  handleDeleteOffer,
  getOrders,
  getViewOrder,
  getEditOrder,
  handleEditOrder,
  handleCancelOrder,
  getProducts,
  getAddProduct,
  getEditProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleDeleteProductImg,
  getAdminProfile,
  handleEditAdminProfile,
  getSales,
  getViewSale,
  handleFilterByDate,
  getSettings,
  handleEditSeo,
  getUsers,
  getAddUser,
  handleAddUser,
  handleBlockAndUnblock,
  getHome,
  getUserAbout,
  getUserContact,
  handleProductSearch,
  handleAddAddress,
  handleDeleteAddress,
  getCart,
  handleAddToCart,
  handleUpdateCart,
  handleDeleteFromCart,
  getCheckout,
  handleRazorPayPayment,
  handleApplyCoupon,
  getUserCoupons,
  getUserOrders,
  getViewUserOrder,
  getOrderPlaced,
  handlePlaceOrder,
  handleReturnOrder,
  getProduct,
  getProducts,
  getProfile,
  getEditProfile,
  handleEditProfile,
  handleChangePassword,
  getWishlist,
  handleAddToWishlist,
  handleDeleteFromWishlist,
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
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
  getAllProducts,
  get404,
};
