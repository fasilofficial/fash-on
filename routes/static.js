const express = require("express");
const router = express.Router();

const {
  getRoot,
  getStaticProducts,
  getStaticProduct,
  getAbout,
  getContact,
} = require("../controllers");

router.get("/", getRoot);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/products", getStaticProducts);
router.get("/products/:id", getStaticProduct);

module.exports = router;
