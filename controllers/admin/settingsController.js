const { Seo } = require("../../models");

const getSettings = async (req, res) => {
  try {
    const seo = await Seo.findOne();
    const path = req.route.path;
    res.status(200);
    res.render("admin/settingsViews/settings", { seo, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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
    res.status(200);
    res.redirect("/admin/settings");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getSettings,
  handleEditSeo,
};
