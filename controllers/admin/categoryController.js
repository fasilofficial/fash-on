const { Category } = require("../../models");

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
    res.render("admin/categoryViews/categories", {
      categories,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAddCategory = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/categoryViews/addCategory", { path });
  } catch (error) {
    console.log(error);
  }
};
const getEditCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/categoryViews/editCategory", { category, path });
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
  getCategories,
  getAddCategory,
  getEditCategory,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
};
