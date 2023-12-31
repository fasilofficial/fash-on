const { Order, Coupon } = require("../../models");

const getCoupons = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const coupons = await Coupon.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.status(200);
    res.render("admin/couponViews/coupons", {
      coupons,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAddCoupon = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/couponViews/addCoupon", { path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getEditCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/couponViews/editCoupon", { coupon, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAddCoupon = async (req, res) => {
  try {
    var { couponCode, discountPercentage, couponDescription } = req.body;
    couponCode = couponCode.toLowerCase();
    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      await req.flash("error", "Coupon already exist.");
      res.status(409);
      return res.redirect("/admin/coupons");
    }
    const coupon = new Coupon({
      couponCode,
      discountPercentage,
      couponDescription,
    });
    await coupon.save();
    await req.flash("info", "New coupon has been added.");
    res.status(200);
    res.redirect("/admin/coupons");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndUpdate(req.params.id, {
      couponCode: req.body.couponCode.toLowerCase(),
      discountPercentage: req.body.discountPercentage,
      couponDescription: req.body.couponDescription,
    });
    res.status(200);
    res.redirect(`/admin/coupons/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    await req.flash("info", "A coupon has been deleted.");
    res.status(200);
    res.redirect("/admin/coupons");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCoupons,
  getAddCoupon,
  getEditCoupon,
  handleAddCoupon,
  handleEditCoupon,
  handleDeleteCoupon,
};
