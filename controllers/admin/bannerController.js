const { Banner } = require("../../models");

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
    const path = req.route.path;
    res.status(200);
    res.render("admin/bannerViews/banners", { banners, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAddBanner = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/bannerViews/addBanner", { path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getEditBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/bannerViews/editBanner", { banner, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAddBanner = async (req, res) => {
  try {
    const { title, subtitle, description, type } = req.body;
    const image = req.file;
    const banner = new Banner({
      title,
      subtitle,
      description,
      type,
      image: {
        image: image.buffer,
        contentType: image.mimetype,
      },
    });
    await banner.save();
    req.flash("info", "A new banner added");
    res.status(200);
    res.redirect("/admin/banners");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const { title, subtitle, description, type } = req.body;
    const image = req.file;
    if (image) {
      await Banner.findByIdAndUpdate(bannerId, {
        title,
        subtitle,
        description,
        type,
        image: { image: image.buffer, contentType: image.mimetype },
      });
      res.status(200);
      return res.redirect(`/admin/banners/edit/${bannerId}`);
    }
    await Banner.findByIdAndUpdate(bannerId, {
      title,
      subtitle,
      description,
      type,
    });
    res.status(200);
    res.redirect(`/admin/banners/edit/${bannerId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    await Banner.findByIdAndDelete(bannerId);
    req.flash("error", "A banner has been deleted");
    res.status(200);
    res.redirect("/admin/banners");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getBanners,
  getAddBanner,
  getEditBanner,
  handleAddBanner,
  handleEditBanner,
  handleDeleteBanner,
};
