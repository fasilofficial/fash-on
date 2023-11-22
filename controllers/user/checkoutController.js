const razorPay = require("razorpay");

const { User, Cart, Wishlist, Offer, Product } = require("../../models");

const getCheckout = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "cartItems.productId",
      model: "Product",
    });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    const error = req.query.error;
    const shippingCharge = 50;
    if (error) error = "Out of stock";
    if (!userCart) {
      return res.redirect("/user/");
    }

    let total = userCart.cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.productId.salePrice * cartItem.quantity,
      0
    );

    total = userCart?.couponDiscountPercentage
      ? total - (userCart.couponDiscountPercentage * total) / 100
      : total;

    let totalCategoryOfferAmount = 0;
    for (const cartItem of userCart.cartItems) {
      let productCategoryOffer = await Offer.findOne({
        offerName: cartItem.productId.category,
      });

      cartItem.productId.categoryOfferAmount = productCategoryOffer.offerAmount;
      totalCategoryOfferAmount += productCategoryOffer.offerAmount;
    }
    const grandTotal = total - totalCategoryOfferAmount + shippingCharge;

    await userCart.save();
    res.status(200);
    res.render("user/checkout", {
      path,
      user,
      userCart,
      userWishlist,
      total,
      shippingCharge,
      totalCategoryOfferAmount,
      grandTotal,
      error,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleRazorPayPayment = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "cartItems.productId",
      model: "Product",
    });
    const shippingCharge = 50;

    const instance = new razorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let total = userCart.cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.productId.salePrice * cartItem.quantity,
      0
    );

    total = userCart?.couponDiscountPercentage
      ? total - (userCart.couponDiscountPercentage * total) / 100
      : total;

    let totalCategoryOfferAmount = 0;
    let isOutOfStock = false;

    for (const cartItem of userCart.cartItems) {
      let productCategoryOffer = await Offer.findOne({
        offerName: cartItem.productId.category,
      });

      console.log(cartItem.productId);
      console.log(productCategoryOffer);

      totalCategoryOfferAmount += productCategoryOffer.offerAmount;

      const cartProduct = await Product.findById(cartItem.productId);
      if (cartProduct.stock < cartItem.quantity) isOutOfStock = true;
    }

    const grandTotal = total - totalCategoryOfferAmount + shippingCharge;

    if (isOutOfStock) {
      return res.redirect("/user/checkout?error=outOfStock");
    }

    const options = {
      amount: grandTotal * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);

    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCheckout,
  handleRazorPayPayment,
};
