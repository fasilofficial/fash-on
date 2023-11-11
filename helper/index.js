const {
  filterOrdersByYear,
  filterOrdersByMonth,
  filterOrdersByDate,
  filterOrdersByWeek,
  getWeekNumber,
} = require("./filterOrders");
const { generateChart } = require("./generateChart");
const { generateReferralCode } = require("./generateRefferalCode");
const { generateExcelReport } = require("./generateSalesReports");

module.exports = {
  filterOrdersByYear,
  filterOrdersByMonth,
  filterOrdersByWeek,
  filterOrdersByDate,
  getWeekNumber,
  generateChart,
  generateReferralCode,
  generateExcelReport,
};