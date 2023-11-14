const { Product, User, Order } = require("../../models");

const getOrders = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const orders = await Order.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.status(200);
    res.render("admin/orderViews/orders", {
      orders,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getViewOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/orderViews/viewOrder", { path, order });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getEditOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/orderViews/editOrder", { path, order });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    if (status != "delivered") {
      await Order.findByIdAndUpdate(orderId, {
        status,
      });
      res.status(200);
      return res.redirect(`/admin/orders/edit/${orderId}`);
    }
    await Order.findByIdAndUpdate(orderId, {
      status,
      deliveredAt: Date.now(),
    });
    res.status(200);
    res.redirect(`/admin/orders/edit/${orderId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    const source = req.query.source;
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
      status: "cancelled",
    });
    const order = await Order.findById(orderId);
    const user = await User.findOne({ _id: order.customerId });

    if (
      order.paymentMethod != "cash on delivery" &&
      order.paymentMethod != "cod"
    ) {
      user.walletBalance += order.totalAmount;
    }

    order.products.forEach(async (product) => {
      const cancelledProduct = await Product.findById(product.productId);
      cancelledProduct.stock += product.quantity;
      await cancelledProduct.save();
    });
    await user.save();
    res.status(200);
    if (source == "orders") {
      return res.redirect("/admin/orders");
    } else if (source == "user") {
      return res.redirect("/user/orders");
    }
    res.redirect(`/admin/orders/edit/${orderId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getOrders,
  getViewOrder,
  getEditOrder,
  handleEditOrder,
  handleCancelOrder,
};
