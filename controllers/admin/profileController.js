const { Admin } = require("../../models");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    const path = req.route.path;
    res.status(200);
    res.render("admin/profileViews/profile", { admin, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditAdminProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    await Admin.findByIdAndUpdate(req.admin._id, {
      firstName,
      lastName,
      email,
      phone,
    });
    if (req.file) {
      const { mimetype: contentType, buffer: image } = req.file;
      await Admin.findByIdAndUpdate(req.admin._id, {
        avatar: {
          contentType,
          image,
        },
      });
    }
    res.status(200);
    res.redirect("/admin/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAdminProfile, handleEditAdminProfile };
