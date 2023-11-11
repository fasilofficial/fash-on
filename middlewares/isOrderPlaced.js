const { get404 } = require("../controllers");

const isOrderPlaced = (req, res, next) => {
  if (req.query.address) return next();
  get404(req, res);
};

module.exports = { isOrderPlaced };