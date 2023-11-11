const { User, Cart, Order } = require("../../models");

const handleAddAddress = async (req, res) => {
  try {
    const sourceUrl = req.query.source;
    const {
      fullName,
      addressType,
      street,
      city,
      state,
      pincode,
      phone,
      altPhone,
    } = req.body;
    const user = await User.findById(req.user._id);
    user.addresses.push({
      fullName,
      addressType,
      street,
      city,
      state,
      pincode,
      phone,
      altPhone,
    });
    await user.save();
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userOrders = await Order.find({ customerId: req.user._id });
    const path = req.route.path;
    // if (userCart) {
    //   const total = userCart.cartItems.reduce(
    //     (currentTotal, cartItem) =>
    //       currentTotal + cartItem.salePrice * cartItem.quantity,
    //     0
    //   );
    // }
    // if (total) {
    //   if (sourceUrl == "checkout") {
    //     return res.render("user/checkout", { path, user, userCart, total });
    //   }
    // }
    if (sourceUrl == "checkout") {
      return res.redirect("/user/checkout");
    }

    res.render("user/profile", {
      user,
      path,
      tab: "address",
      userCart,
      userOrders,
    });
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { addresses: { _id: addressId } } }
    );
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.render("user/profile", { user, path, tab: "address", userCart });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleAddAddress, handleDeleteAddress };
