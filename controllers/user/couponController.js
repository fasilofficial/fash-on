const { Coupon, User, Cart, Wishlist, Offer } = require("../../models");

const getUserCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    const path = req.route.path;
    res.render("user/coupons", { coupons, path });
  } catch (error) {
    console.log(error);
  }
};
const handleApplyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const coupon = await Coupon.findOne({ couponCode });
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    if (!coupon) {
      const userWishlist = await Wishlist.findOne({ userId: req.user._id });
      const path = req.route.path;
      const user = await User.findById(req.user._id);
      let total = userCart.cartItems.reduce(
        (currentTotal, cartItem) =>
          currentTotal + cartItem.salePrice * cartItem.quantity,
        0
      );
      const grandTotal = userCart?.couponDiscountPercentage
        ? total + 50 - (userCart.couponDiscountPercentage * (total + 50)) / 100
        : total + 50;

      let totalCategoryOfferAmount = 0;
      userCart.cartItems.forEach(async (cartItem) => {
        const productCategoryOffer = await Offer.findOne({
          offerName: cartItem.category,
        });
        cartItem.categoryOfferAmount = productCategoryOffer.offerAmount;
        totalCategoryOfferAmount += productCategoryOffer.offerAmount;
      });

      await userCart.save();

      return res.render("user/checkout", {
        path,
        user,
        userCart,
        userWishlist,
        total,
        totalCategoryOfferAmount,
        grandTotal,
        error: "Invalid coupon code",
        show: true,
      });
    }

    if (userCart && !userCart.couponDiscountPercentage) {
      if (coupon.couponCode == "welcome50") {
        if (user.newUser) {
          userCart.couponDiscountPercentage = coupon.discountPercentage;
          user.newUser = !user.newUser;
          await user.save();
        } else {
          const userWishlist = await Wishlist.findOne({ userId: req.user._id });
          const path = req.route.path;
          const user = await User.findById(req.user._id);
          let total = userCart.cartItems.reduce(
            (currentTotal, cartItem) =>
              currentTotal + cartItem.salePrice * cartItem.quantity,
            0
          );
          const grandTotal = userCart?.couponDiscountPercentage
            ? total +
              50 -
              (userCart.couponDiscountPercentage * (total + 50)) / 100
            : total + 50;

          let totalCategoryOfferAmount = 0;
          userCart.cartItems.forEach(async (cartItem) => {
            const productCategoryOffer = await Offer.findOne({
              offerName: cartItem.category,
            });
            cartItem.categoryOfferAmount = productCategoryOffer.offerAmount;
            totalCategoryOfferAmount += productCategoryOffer.offerAmount;
          });

          await userCart.save();
          return res.render("user/checkout", {
            path,
            user,
            userCart,
            userWishlist,
            total,
            totalCategoryOfferAmount,
            grandTotal,
            error: "WELCOME50 is only valid for first order",
            show: true,
          });
        }
      }
      userCart.couponDiscountPercentage = coupon.discountPercentage;
      await userCart.save();
    }

    res.redirect("/user/checkout");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserCoupons,
  handleApplyCoupon,
};
