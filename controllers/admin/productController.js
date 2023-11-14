const { Category, Product } = require("../../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

const getProducts = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Product.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.status(200);
    res.render("admin/productViews/products", {
      products,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAddProduct = async (req, res) => {
  try {
    const categories = await Category.find({});
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/productViews/addProduct", { sizes, categories, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find({});
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/productViews/editProduct", {
      product,
      sizes,
      categories,
      path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAddProduct = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const productImages = [];
    for (const file of uploadedFiles) {
      productImages.push({
        image: file.buffer,
        contentType: file.mimetype,
      });
    }
    if (!uploadedFiles) {
      const product = new Product({
        productName: req.body.productName,
        brand: req.body.brand,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        sizes: req.body.sizes,
        color: req.body.color,
        material: req.body.material,
        regularPrice: req.body.regularPrice,
        salePrice: req.body.salePrice,
      });
      await product.save();
    } else {
      const product = new Product({
        productName: req.body.productName,
        brand: req.body.brand,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        sizes: req.body.sizes,
        color: req.body.color,
        material: req.body.material,
        regularPrice: req.body.regularPrice,
        salePrice: req.body.salePrice,
        productImages: productImages,
      });
      await product.save();
    }
    await req.flash("info", "New product has been added.");
    res.status(200);
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditProduct = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    if (uploadedFiles.length) {
      const productImages = [];
      for (const file of uploadedFiles) {
        productImages.push({
          image: file.buffer,
          contentType: file.mimetype,
        });
      }
      await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        brand: req.body.brand,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        sizes: req.body.sizes,
        color: req.body.color,
        material: req.body.material,
        regularPrice: req.body.regularPrice,
        salePrice: req.body.salePrice,
        // productImages: productImages,
      });
      const product = await Product.findById(req.params.id);
      productImages.forEach((productImage) => {
        product.productImages.push(productImage);
      });
      await product.save();
      res.status(200);
      return res.redirect(`/admin/products/edit/${req.params.id}`);
    } else {
      await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        brand: req.body.brand,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        sizes: req.body.sizes,
        color: req.body.color,
        material: req.body.material,
        regularPrice: req.body.regularPrice,
        salePrice: req.body.salePrice,
      });
      res.status(200);
      return res.redirect(`/admin/products/edit/${req.params.id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    await req.flash("info", "A product has been deleted.");
    res.status(200);
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteProductImg = async (req, res) => {
  try {
    const productId = req.query.productId;
    const productImgId = req.params.id;
    await Product.findByIdAndUpdate(productId, {
      $pull: { productImages: { _id: productImgId } },
    });
    res.status(200);
    res.redirect(`/admin/products/edit/${productId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProducts,
  getAddProduct,
  getEditProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleDeleteProductImg,
};
