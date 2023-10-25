const bcrypt = require("bcrypt");

const { Category, Product, User, Order } = require("../models");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

// GET REQUESTS
const getAdminDashboard = async (req, res) => {
  try {
    const path = req.route.path;
    res.render("admin/admin", { path });
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
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
  try {
    let perPage = 12;
    let page = req.query.page || 1;
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
const getOrders = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const orders = await Order.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("admin/orders", {
      orders,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAddUser = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/addUser", { path });
  } catch (error) {
    console.log(error);
  }
};
const getAddProduct = async (req, res) => {
  try {
    const categories = await Category.find({});
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/addProduct", { sizes, categories, path });
  } catch (error) {
    console.log(error);
  }
};
const getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find({});
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/editProduct", { product, sizes, categories, path });
  } catch (error) {
    console.log(error);
  }
};
const getAddCategory = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/addCategory", { path });
  } catch (error) {
    console.log(error);
  }
};
const getEditCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/editCategory", { category, path });
  } catch (error) {
    console.log(error);
  }
};
const getViewOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/viewOrder", { path, order });
  } catch (error) {
    console.log(error);
  }
};
const getEditOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/editOrder", { path, order });
  } catch (error) {
    console.log(error);
  }
};

// POST REQUESTS

// HANDLE ADD ROUTES
const handleAddUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    await user.save();
    await req.flash("info", "New user has been added.");
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users");
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
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};
const handleAddCategory = async (req, res) => {
  try {
    var { categoryName } = req.body;
    categoryName = categoryName.toLowerCase();
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      await req.flash("error", "Category already exist.");
      return res.redirect("/admin/categories");
    }
    const category = new Category({
      categoryName,
      active: true,
    });
    await category.save();
    await req.flash("info", "New category has been added.");
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
};

// HANDLE EDIT ROUTES
const handleBlockAndUnblock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.blocked = !user.blocked;
    await user.save();
    if (user.blocked) await req.flash("info", "A user has been blocked");
    if (!user.blocked) await req.flash("info", "A user has been unblocked");
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
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
        productImages: productImages,
      });
      res.redirect(`/admin/products/edit/${req.params.id}`);
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
      res.redirect(`/admin/products/edit/${req.params.id}`);
    }
    const product = await Product.findById(req.params.id);
    res.render("admin/editProduct", { product });
  } catch (error) {
    console.log(error);
  }
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
const handleEditOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
      status,
    });
    res.redirect(`/admin/orders/edit/${orderId}`);
  } catch (error) {
    console.log(error);
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    const source = req.query.source;
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
      status: "cancelled",
    });
    if (source == "orders") {
      return res.redirect("/admin/orders");
    } else if (source == "profile") {
      return res.redirect("/user/profile?tab=orders");
    }

    res.redirect(`/admin/orders/edit/${orderId}`);
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
};
