const isNotUserAuthenticated = async (req, res, next) => {
  const userToken = req.cookies.userToken;
  if (!userToken) return next();
  res.redirect("/user");
};
const isNotAdminAuthenticated = async (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  if (!adminToken) return next();
  res.redirect("/admin");
};

module.exports = {
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
};
