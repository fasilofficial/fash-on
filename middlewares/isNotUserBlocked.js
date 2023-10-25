const { User } = require("../models");

const isNotUserBlocked = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user.blocked) return next();
  res.render("auth/login", {
    error: "Blocked: You can't access the page",
  });
};

module.exports = { isNotUserBlocked };
