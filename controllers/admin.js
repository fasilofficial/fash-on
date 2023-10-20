const bcrypt = require("bcrypt");

const { Category, Product, User } = require("../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

// GET REQUESTS
const getAdminDashboard = async (req, res) => {
  const path = req.route.path;
  res.render("admin/admin", { path });
};
const getUsers = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await User.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("admin/users", {
      users,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProducts = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Product.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("admin/products", {
      products,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getCategories = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Category.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("admin/categories", {
      categories,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAddUser = async (req, res) => {
  const path = req.route.path;
  res.render("admin/addUser", { path });
};
const getAddProduct = async (req, res) => {
  const categories = await Category.find({});
  const path = req.route.path;
  res.render("admin/addProduct", { sizes, categories, path });
};
const getEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = await Category.find({});
  const path = req.route.path;
  res.render("admin/editProduct", { product, sizes, categories, path });
};
const getAddCategory = async (req, res) => {
  const path = req.route.path;
  res.render("admin/addCategory", { path });
};
const getEditCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  const path = req.route.path;
  res.render("admin/editCategory", { category, path });
};

// POST REQUESTS

// HANDLE ADD ROUTES
const handleAddUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });
  try {
    await user.save();
    await req.flash("info", "New user has been added.");
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users");
  }
};
const handleAddProduct = async (req, res) => {
  const uploadedFiles = req.files;
  const productImages = [];
  for (const file of uploadedFiles) {
    productImages.push({
      image: file.buffer,
      contentType: file.mimetype,
    });
  }
  if (!uploadedFiles) {
    res.status(400).send("No files were uploaded.");
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
    try {
      product.save();
      await req.flash("info", "New product has been added.");
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  }
};
const handleAddCategory = async (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName.toLowerCase(),
    active: true,
  });
  try {
    category.save();
    await req.flash("info", "New category has been added.");
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
};

// HANDLE EDIT ROUTES
const handleBlockAndUnblock = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.blocked = !user.blocked;
  user.save();
  res.redirect("/admin/users");
};
const handleEditProduct = async (req, res) => {
  const uploadedFiles = req.files;
  if (uploadedFiles.length) {
    const productImages = [];
    for (const file of uploadedFiles) {
      productImages.push({
        image: file.buffer,
        contentType: file.mimetype,
      });
    }
    try {
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
        productImages: productImages,
      });
      res.redirect(`/admin/products/edit/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
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
      res.redirect(`/admin/products/edit/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  const product = await Product.findById(req.params.id);
  res.render("admin/editProduct", { product });
};
const handleEditCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, {
      categoryName: req.body.categoryName.toLowerCase(),
    });
    res.redirect(`/admin/categories/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// HANDLE DELETE ROUTES
const handleDeleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    await req.flash("info", "A product has been deleted.");
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    await req.flash("info", "A category has been deleted.");
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
};

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
};
