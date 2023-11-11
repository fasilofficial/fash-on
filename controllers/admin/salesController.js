const { Order } = require("../../models");
const {
  filterOrdersByYear,
  filterOrdersByMonth,
  filterOrdersByDate,
  filterOrdersByWeek,
} = require("../../helper");

const getSales = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const path = req.route.path;

    const filterBy = req.query.filterBy;
    if (filterBy) {
      switch (filterBy) {
        case "year": {
          const year = new Date().getFullYear();
          const totalSales = await Order.find({
            status: { $eq: "delivered" },
          }).sort({ createdAt: -1 });
          const filteredSales = filterOrdersByYear(totalSales, year);
          return res.render("admin/salesViews/sales", {
            path,
            sales: filteredSales,
          });
        }
        case "month": {
          const year = new Date().getFullYear();
          const month = new Date().getMonth();
          const totalSales = await Order.find({
            status: { $eq: "delivered" },
          }).sort({ createdAt: -1 });
          const filteredSales = filterOrdersByMonth(totalSales, year, month);
          return res.render("admin/salesViews/sales", {
            path,
            sales: filteredSales,
          });
        }
        case "week": {
          const year = new Date().getFullYear();
          const month = new Date().getMonth();
          const week = new Date().getDate();
          const totalSales = await Order.find({
            status: { $eq: "delivered" },
          }).sort({ createdAt: -1 });
          const filteredSales = filterOrdersByWeek(
            totalSales,
            year,
            month,
            week
          );
          return res.render("admin/salesViews/sales", {
            path,
            sales: filteredSales,
          });
        }
      }
    }
    const sales = await Order.find({
      status: { $eq: "delivered" },
    })
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Order.find({
      status: { $eq: "delivered" },
    }).count();
    const pages = Math.ceil(count / perPage);

    res.render("admin/salesViews/sales", {
      path,
      sales,
      current: page,
      pages,
    });
  } catch (error) {
    console.log(error);
  }
};
const getViewSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Order.findById(saleId);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/salesViews/viewSale", { sale, path });
  } catch (error) {
    console.log();
  }
};
const handleFilterByDate = async (req, res) => {
  try {
    const { deliveredAt } = req.body;
    const totalSales = await Order.find({ status: { $eq: "delivered" } });
    let [date, month, year] = deliveredAt.split("/");
    date = parseInt(date, 10);
    month = parseInt(month, 10) - 1;
    year = parseInt(year, 10);
    const filteredSales = filterOrdersByDate(totalSales, year, month, date);
    const path = req.route.path;
    res.render("admin/salesViews/sales", { sales: filteredSales, path });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSales,
  getViewSale,
  handleFilterByDate,
};
