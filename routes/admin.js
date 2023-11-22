const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const {
  getAdminDashboard,
  getUsers,
  getAdminProfile,
  getProducts,
  getCategories,
  getOrders,
  getCoupons,
  getOffers,
  getBanners,
  getSales,
  getSettings,
  getViewSale,
  getAddUser,
  getAddCoupon,
  getAddOffer,
  getAddProduct,
  getAddCategory,
  getAddBanner,
  getEditProduct,
  getEditCategory,
  getViewOrder,
  getEditOrder,
  getEditBanner,
  getAdmin404,
  handleCancelOrder,
  handleFilterByDate,
  handleExcelDownload,
  handleAddUser,
  handleAddProduct,
  handleAddCategory,
  handleAddBanner,
  handleBlockAndUnblock,
  handleEditAdminProfile,
  handleEditProduct,
  handleEditOrder,
  handleEditCategory,
  handleEditBanner,
  handleEditSeo,
  handleDeleteProduct,
  handleDeleteCategory,
  handleDeleteBanner,
  handleAddCoupon,
  handleAddOffer,
  getEditCoupon,
  getEditOffer,
  handleEditCoupon,
  handleEditOffer,
  handleDeleteCoupon,
  handleDeleteProductImg,
  handleDeleteOffer,
} = require("../controllers");

router.use((req, res, next) => {
  req.app.set("layout", "layouts/adminLayout");
  next();
});

router.get("/", getAdminDashboard);
router.get("/users", getUsers);
router.get("/products", getProducts);
router.get("/categories", getCategories);
router.get("/orders", getOrders);
router.get("/coupons", getCoupons);
router.get("/offers", getOffers);
router.get("/banners", getBanners);
router.get("/sales", getSales);
router.get("/profile", getAdminProfile);
router.get("/settings", getSettings);

router.get("/users/add", getAddUser);
router.get("/products/add", getAddProduct);
router.get("/categories/add", getAddCategory);
router.get("/coupons/add", getAddCoupon);
router.get("/offers/add", getAddOffer);
router.get("/banners/add", getAddBanner);

router.get("/products/edit/:id", getEditProduct);
router.get("/categories/edit/:id", getEditCategory);
router.get("/coupons/edit/:id", getEditCoupon);
router.get("/offers/edit/:id", getEditOffer);
router.get("/banners/edit/:id", getEditBanner);
router.get("/orders/edit/:id", getEditOrder);

router.get("/orders/view/:id", getViewOrder);
router.get("/sales/view/:id", getViewSale);

router.get("/orders/cancel/:id", handleCancelOrder);
router.get("/products/edit/deleteImg/:id", handleDeleteProductImg);
router.get("/downloadExcel", handleExcelDownload);

router.post("/sales", handleFilterByDate);

router.post("/users/add", handleAddUser);
router.post(
  "/products/add",
  upload.array("productImages", 3),
  handleAddProduct
);
router.post("/banners/add", upload.single("image"), handleAddBanner);
router.post("/categories/add", handleAddCategory);
router.post("/coupons/add", handleAddCoupon);
router.post("/offers/add", handleAddOffer);

router.put("/users/edit/:id", handleBlockAndUnblock);
router.put(
  "/products/edit/:id",
  upload.array("productImages", 3),
  handleEditProduct
);
router.put("/profile/edit", upload.single("avatar"), handleEditAdminProfile);
router.put("/banners/edit/:id", upload.single("image"), handleEditBanner);
router.put("/categories/edit/:id", handleEditCategory);
router.put("/coupons/edit/:id", handleEditCoupon);
router.put("/offers/edit/:id", handleEditOffer);
router.put("/orders/edit/:id", handleEditOrder);
router.put("/seo/edit", handleEditSeo);

router.delete("/products/edit/:id", handleDeleteProduct);
router.delete("/categories/edit/:id", handleDeleteCategory);
router.delete("/coupons/edit/:id", handleDeleteCoupon);
router.delete("/offers/edit/:id", handleDeleteOffer);
router.delete("/banners/edit/:id", handleDeleteBanner);

router.get("*", getAdmin404);

module.exports = router;
