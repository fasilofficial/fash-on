const { Product, User, Cart, Order, Wishlist, Offer } = require("../../models");

const getUserOrders = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    let perPage = 12;
    let page = req.query.page || 1;
    const userOrders = await Order.find({ customerId: req.user._id })
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    res.status(200);
    res.render("user/orders", {
      path,
      user,
      userCart,
      userWishlist,
      userOrders,
      current: page,
      pages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getViewUserOrder = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const order = await Order.findById(req.params.id).populate({
      path: "products.productId",
      model: "Product",
    });
    const path = "/" + req.route.path.split("/").slice(1, 2);
    const user = await User.findById(req.user._id);
    const source = req.query.source;
    res.status(200);
    res.render("user/viewOrder", {
      path,
      user,
      userCart,
      userWishlist,
      order,
      source,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getOrderPlaced = async (req, res) => {
  try {
    const addressId = req.query.address;
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(addressId);
    const failed = req.query.failed;
    res.status(200);
    res.render("user/orderPlaced", { address, path: "", failed });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handlePlaceOrder = async (req, res) => {
  try {
    const {
      selectedAddress: addressId,
      order_id,
      payment_id,
      success,
      error,
    } = req.body;

    const user = await User.findById(req.user._id);
    const { email } = user;

    const { fullName, street, city, state, pincode, phone, altPhone } =
      user.addresses.id(addressId);

    const userCart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "cartItems.productId",
      model: "Product",
    });

    const shippingCharge = 50;

    const totalQuantity = userCart.cartItems.reduce(
      (currentTotal, cartItem) => currentTotal + cartItem.quantity,
      0
    );

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

      totalCategoryOfferAmount += productCategoryOffer.offerAmount;

      const cartProduct = await Product.findById(cartItem.productId);
      if (cartProduct.stock < cartItem.quantity) isOutOfStock = true;
    }

    const grandTotal = total - totalCategoryOfferAmount + shippingCharge;

    if (isOutOfStock) {
      return res.redirect("/user/checkout?error=outOfStock");
    }

    const newOrder = {
      customerId: req.user._id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      customerAltPhone: altPhone,
      street,
      city,
      state,
      pincode,
      totalAmount: grandTotal,
      totalCategoryOfferAmount,
      shippingCharge,
      totalQuantity,
      order_id,
      payment_id,
    };
    if (order_id || error) {
      newOrder.paymentMethod = "online payment";
    }
    userCart.cartItems.forEach(async (cartItem) => {
      const { quantity, productId } = cartItem;
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity },
      });
    });
    if (error) {
      newOrder.status = "failed";
      userCart.cartItems.forEach(async (cartItem) => {
        const { quantity, productId } = cartItem;
        await Product.findByIdAndUpdate(productId, {
          $inc: { stock: quantity },
        });
      });
    }
    const products = [];

  
    for (const cartItem of userCart.cartItems) {
      const { quantity, size } = cartItem;

      let categoryOfferAmount = await Offer.findOne({
        offerName: cartItem.productId.category,
      });

      categoryOfferAmount = categoryOfferAmount.offerAmount;

      products.push({
        productId: cartItem.productId,
        quantity,
        size,
        categoryOfferAmount,
      });
    }

    newOrder.products = products;
    await Order.insertMany(newOrder);
    await Cart.deleteOne({ userId: req.user._id });
    res.status(200);
    res.render(`user/orderPlaced`, {
      address: user.addresses.id(addressId),
      path: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleReturnOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
      status: "returned",
    });
    return res.redirect("/user/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUserOrders,
  getViewUserOrder,
  getOrderPlaced,
  handlePlaceOrder,
  handleReturnOrder,
};
