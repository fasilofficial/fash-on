const flash = require("express-flash");
const { Product, User, Cart, Order, Wishlist } = require("../models");
const bcrypt = require("bcrypt");

const sizes = ["s", "m", "l", "xl", "xxl", "xxxl"];

// GET REQUESTS
const getHome = async (req, res) => {
  try {
    const products = await Product.find({}).limit(12);
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.render("user/index", { products, path, userCart, userWishlist }); 
  } catch (error) {
    console.log(error)
  }
};
const getProducts = async (req, res) => {
  try {
    let perPage = 20;
    let page = req.query.page || 1;
    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });

    const count = await Product.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("user/products", {
      products,
      current: page,
      pages,
      path,
      userCart,
      userWishlist,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const relatedProducts = await Product.find({
      $and: [{ _id: { $ne: product._id } }, { category: product.category }],
    }).limit(4);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.render("user/product", {
      product,
      relatedProducts,
      sizes,
      path,
      userCart,
      userWishlist,
    });
  } catch (error) {
    console.log(error)
  }
};
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.render("user/wishlist", { path, user, userWishlist, userCart });
  } catch (error) {
    console.log(error)
  }
};
const getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    res.render("user/cart", { path, user, userCart, userWishlist });
  } catch (error) {
    console.log(error)
  }
};
const getCheckout = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    const total = userCart.cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.salePrice * cartItem.quantity,
      0
    );
    res.render("user/checkout", { path, user, userCart, userWishlist, total });
  } catch (error) {
    console.log(error)
  }
};
const getProfile = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userOrders = await Order.find({ customerId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
  
    const path = req.route.path;
    const tab = req.query.tab;
    const user = await User.findById(req.user._id);
    res.render("user/profile", {
      user,
      path,
      tab: tab || "dashboard",
      userCart,
      userOrders,
      userWishlist,
    });
  } catch (error) {
    console.log(error)
  }
};
const getEditProfile = async (req, res) => {
  try {
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    res.render("user/profile", { user, path, tab: "details" });
  } catch (error) {
    console.log(error)
  }
};

// POST REQUESTS
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
    const total = userCart.cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.salePrice * cartItem.quantity,
      0
    );
    if (sourceUrl == "checkout") {
      return res.render("user/checkout", { path, user, userCart, total });
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
const handleAddToWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, salePrice, productImages } = await Product.findById(
      productId
    );
    const userWishlist = await Wishlist.findOne({ userId: req.user });
    if (!userWishlist) {
      const newItem = new Wishlist({
        userId: req.user._id,
        wishlistItems: [
          {
            productId,
            productName,
            salePrice,
            productImages,
          },
        ],
      });
      await newItem.save();
    } else {
      const existingItem = userWishlist.wishlistItems.find(
        (item) => item.productId === productId
      );
      if (!existingItem) {
        userWishlist.wishlistItems.push({
          productId,
          productName,
          salePrice,
          productImages,
        });
      }
      await userWishlist.save();
    }
    return res.redirect("/user");
  } catch (error) {
    console.log(error);
  }
};
const handleAddToCart = async (req, res) => {
  try {
    const source = req.query.source;
    const productId = req.params.id;
    const { productName, salePrice, productImages } = await Product.findById(
      productId
    );
    const { quantity } = req.body;
    const userCart = await Cart.findOne({ userId: req.user._id });
    if (!userCart) {
      const newItem = new Cart({
        userId: req.user._id,
        cartItems: [
          {
            productId,
            productName,
            salePrice,
            productImages,
            quantity: Number(quantity) || 1,
          },
        ],
      });
      await newItem.save();
    } else {
      const existingItem = userCart.cartItems.find(
        (item) => item.productId === productId
      );
      if (!existingItem) {
        userCart.cartItems.push({
          productId,
          productName,
          salePrice,
          productImages,
          quantity: Number(quantity) || 1,
        });
      } else {
        existingItem.quantity += Number(quantity) || 1;
      }
      await userCart.save();
      await Wishlist.updateOne(
        { userId: req.user._id },
        { $pull: { wishlistItems: { productId }} }
      );
    }
    if (quantity) {
      return res.redirect("/user/products/" + req.params.id);
    } else if (source == "wishlist") {
      return res.redirect('/user/wishlist');
    } else {
      return res.redirect("/user");
    }
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    await Wishlist.updateOne(
      { userId },
      { $pull: { wishlistItems: { productId } } }
    );
    res.redirect("/user/wishlist");
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    await Cart.updateOne(
      { userId },
      { $pull: { cartItems: { productId } } }
    );
    res.redirect("/user/cart");
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
const handlePlaceOrder = async (req, res) => {
  try {
    const addressId = req.params.id;
    const user = await User.findById(req.user._id);
    const { email } = user;
    const { fullName, street, city, state, pincode, phone, altPhone } =
    user.addresses.id(addressId);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const totalAmount = userCart.cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.salePrice * cartItem.quantity,
      0
    );
    const totalQuantity = userCart.cartItems.reduce(
      (currentTotal, cartItem) => currentTotal + cartItem.quantity,
      0
    );

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
      totalAmount,
      totalQuantity,
    };

    const products = [];
    userCart.cartItems.forEach((cartItem) => {
      const { productName, productId, salePrice, quantity, productImages } =
        cartItem;
      products.push({
        quantity,
        productId,
        productName,
        salePrice,
        productImages,
      });
    });
    newOrder.products = products;
    await Order.insertMany(newOrder);
    await Cart.deleteOne({ userId: req.user._id });
    res.render("user/orderPlaced", {
      address: user.addresses.id(addressId),
      path: "",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHome,
  getProducts,
  getProduct,
  getWishlist,
  getCart,
  getCheckout,
  getProfile,
  getEditProfile,
  handlePlaceOrder,
  handleEditProfile,
  handleChangePassword,
  handleAddAddress,
  handleAddToWishlist,
  handleAddToCart,
  handleDeleteAddress,
  handleDeleteFromWishlist,
  handleDeleteFromCart,
};
