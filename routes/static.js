const express = require("express");
const router = express.Router();

const {
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
} = require("../middlewares");

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
  getRoot,
  getAbout,
  getContact,
  getStaticProduct,
  getStaticProducts,
} = require("../controllers");

router.use((req, res, next) => {
  req.app.set("layout", "layouts/staticLayout");
  next();
});

router.get("/", getRoot);
router.get("/signup", getUserSignup);
router.get("/login", isNotUserAuthenticated, getUserLogin);
router.get("/login/verify", isNotUserAuthenticated, getUserLoginVerify);
router.get("/login/verify/resendOtp", isNotUserAuthenticated, handleResendOtp);
router.get("/login/admin", isNotAdminAuthenticated, getAdminLogin);
router.get("/login/admin/verify", isNotAdminAuthenticated, getAdminLoginVerify);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/products", getStaticProducts);
router.get("/products/:id", getStaticProduct);

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/login/verify", handleUserLoginOtpVerification);
router.post("/logout", handleUserLogout);
router.post("/login/admin", handleAdminLogin);
router.post("/login/admin/verify", handleAdminLoginOtpVerification);
router.post("/logout/admin", handleAdminLogout);

module.exports = router;
