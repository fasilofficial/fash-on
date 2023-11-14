const { Product, User, Cart, Wishlist } = require("../../models");

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userCart = await Cart.findOne({ userId: req.user._id });
    const userWishlist = await Wishlist.findOne({ userId: req.user._id });
    const path = req.route.path;
    res.status(200);
    res.render("user/wishlist", { path, user, userWishlist, userCart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getWishlist,
  handleAddToWishlist,
  handleDeleteFromWishlist,
};
