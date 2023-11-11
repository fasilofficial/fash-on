const { User, Cart, Order, Wishlist } = require("../../models");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });

    let perPage = 12;
    let page = req.query.page || 1;
    const userOrders = await Order.find({ customerId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    const tab = req.query.tab;
    const user = await User.findById(req.user._id);
    res.render("user/profile", {
      user,
      path,
      tab: tab || "dashboard",
      userCart,
      current: page,
      pages,
      userOrders,
      userWishlist,
    });
  } catch (error) {
    console.log(error);
  }
};
const getEditProfile = async (req, res) => {
  try {
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    res.render("user/profile", { user, path, tab: "details" });
  } catch (error) {
    console.log(error);
  }
};
const handleEditProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    });
    await req.flash("info", "User details updated successfully");
    return res.redirect("/user/profile?tab=details");
  } catch (error) {
    console.log(error);
  }
};
const handleChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      await req.flash("error", "Entered password is incorrect");
      return res.redirect("/user/profile?tab=details");
    }
    if (newPassword !== confirmPassword) {
      await req.flash(
        "error",
        "New password and confirm password doesn't match"
      );
      return res.redirect("/user/profile?tab=details");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user._id, {
      password: hashedPassword,
    });
    await req.flash("info", "Password changed successfully");
    return res.redirect("/user/profile?tab=details");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProfile,
  getEditProfile,
  handleEditProfile,
  handleChangePassword,
};
