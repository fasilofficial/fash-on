const { Seo } = require("../models");

const setUserSeo = async (req, res, next) => {
  const { userTitle, userDescription } = await Seo.findOne();
  res.locals.userTitle = userTitle;
  res.locals.userDescription = userDescription;
  next();
};
const setAdminSeo = async (req, res, next) => {
  const { adminTitle } = await Seo.findOne();
  res.locals.adminTitle = adminTitle;
  next();
};

module.exports = { setUserSeo, setAdminSeo };
