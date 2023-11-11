const { Seo } = require("../../models");

const getSettings = async (req, res) => {
  try {
    const seo = await Seo.findOne();
    const path = req.route.path;
    res.render("admin/settingsViews/settings", { seo, path });
  } catch (error) {
    console.log(error);
  }
};
const handleEditSeo = async (req, res) => {
  try {
    const { userTitle, adminTitle, userDescription } = req.body;
    await Seo.findOneAndUpdate({
      userTitle,
      adminTitle,
      userDescription,
    });
    res.redirect("/admin/settings");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSettings,
  handleEditSeo,
};
