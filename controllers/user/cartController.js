const { Product, User, Cart, Wishlist } = require("../../models");

const getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    const user = await User.findById(req.user._id);
    res.status(200);
    res.render("user/cart", { path, user, userCart, userWishlist });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAddToCart = async (req, res) => {
  try {
    const source = req.query.source;
    const productId = req.params.id;
    const { productName, salePrice, productImages, category } =
      await Product.findById(productId);
    const { quantity, size } = req.body;
    const userCart = await Cart.findOne({ userId: req.user._id });
    if (!userCart) {
      const newItem = new Cart({
        userId: req.user._id,
        cartItems: [
          {
            productId,
            productName,
            salePrice,
            category,
            productImages,
            size,
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
          category,
          productImages,
          size,
          quantity: Number(quantity) || 1,
        });
      } else {
        existingItem.quantity += Number(quantity) || 1;
      }
      await userCart.save();
      await Wishlist.updateOne(
        { userId: req.user._id },
        { $pull: { wishlistItems: { productId } } }
      );
    }
    res.status(200);
    if (quantity) {
      return res.redirect("/user/products/" + req.params.id);
    } else if (source == "wishlist") {
      return res.redirect("/user/wishlist");
    } else {
      return res.redirect("/user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    await Cart.updateOne({ userId }, { $pull: { cartItems: { productId } } });
    res.redirect("/user/cart");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleUpdateCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    const { quantity } = req.body;
    const cartProduct = await Product.findById(productId);
    if (quantity > cartProduct.stock) {
      await req.flash(
        "error",
        `Requested quantity is not available. The maximum stock available for this product is ${cartProduct.stock}.`
      );
      return res.redirect("/user/cart");
    }
    await Cart.updateOne(
      { userId, "cartItems.productId": productId },
      { $set: { "cartItems.$.quantity": quantity } }
    );
    res.redirect("/user/cart");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCart,
  handleAddToCart,
  handleUpdateCart,
  handleDeleteFromCart,
};
