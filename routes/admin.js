const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
} = require("../controllers");

router.get("/", getAdminDashboard);
router.get("/users", getUsers);
router.get("/products", getProducts);
router.get("/categories", getCategories);

router.get("/users/add", getAddUser);
router.get("/products/add", getAddProduct);
router.get("/categories/add", getAddCategory);

router.get("/products/edit/:id", getEditProduct);
router.get("/categories/edit/:id", getEditCategory);

router.post("/users/add", handleAddUser);
router.post(
  "/products/add",
  upload.array("productImages", 3),
  handleAddProduct
);
router.post("/categories/add", handleAddCategory);

router.put("/users/edit/:id", handleBlockAndUnblock);
router.put(
  "/products/edit/:id",
  upload.array("productImages", 3),
  handleEditProduct
);
router.put("/categories/edit/:id", handleEditCategory);

router.delete("/products/edit/:id", handleDeleteProduct);
router.delete("/categories/edit/:id", handleDeleteCategory);

module.exports = router;
