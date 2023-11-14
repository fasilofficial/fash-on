const { Category, Product, User, Order } = require("../../models");
const { generateChart, generateExcelReport } = require("../../helper");

const fs = require("fs").promises;
const path = require("path");

const getAdminDashboard = async (req, res) => {
  try {
    const path = req.route.path;
    const latestOrders = await Order.find({}).sort({ createdAt: -1 }).limit(6);
    const newUsers = await User.find({}).sort({ createdAt: -1 }).limit(3);
    const products = await Product.find({});
    const categories = await Category.find({});
    const orders = await Order.find({});
    const cancelledOrders = await Order.find({ status: "cancelled" });
    const totalRevenue = orders.reduce(
      (currentTotal, order) => currentTotal + order.totalAmount,
      0
    );
    const aov = Math.floor(totalRevenue / orders.length);

    const totalSales = await Order.find({ status: "delivered" });

    const { yearlySales, monthlySales, weeklySales } =
      generateChart(totalSales);

    res.status(200);
    res.render("admin/admin", {
      path,
      latestOrders,
      newUsers,
      products,
      categories,
      orders,
      cancelledOrders,
      totalRevenue,
      aov,
      yearlySales,
      monthlySales,
      weeklySales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleExcelDownload = async (req, res) => {
  try {
    const totalSales = await Order.find({ status: "delivered" });
    const excelBuffer = await generateExcelReport(totalSales);
    const tempDir = path.join(__dirname, "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const tempFilePath = path.join(tempDir, "SalesReport.xlsx");
    await fs.writeFile(tempFilePath, excelBuffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.status(200);
    res.sendFile(
      tempFilePath,
      {
        headers: {
          "Content-Disposition": `attachment; filename=SalesReport.xlsx`,
        },
      },
      (error) => {
        if (error) console.log(error);
        else {
          fs.rm(tempDir, { recursive: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAdmin404 = async (req, res) => {
  try {
    res.status(400);
    res.render("admin/404");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAdminDashboard,
  getAdmin404,
  handleExcelDownload,
};
