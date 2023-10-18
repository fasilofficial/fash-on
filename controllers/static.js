const get404 = (req, res) => {
  res.render("misc/404");
};
const getRoot = (req, res) => {
  res.redirect("/login");
};

module.exports = {
  get404,
  getRoot,
};
