const { getUser, getAdmin } = require("../service/auth");

const isUserAuthenticated = async (req, res, next) => {
  const userToken = req.cookies.userToken;
  if (!userToken) return res.redirect("/login");
  const user = getUser(userToken);
  if (!user) return res.redirect("/");
  req.user = user;
  next();
};
const isAdminAuthenticated = async (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  if (!adminToken) return res.redirect("/login/admin");
  const admin = getAdmin(adminToken);
  if (!admin) return res.redirect("/login/admin");
  req.admin = admin;
  next();
};

module.exports = {
  isUserAuthenticated,
  isAdminAuthenticated,
};
