const { Admin } = require("../models");

const setAdminAvatar = async (req, res, next) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin.avatar) {
    res.locals.adminAvatar = `data:${
      admin.avatar.contentType
    };base64,${admin.avatar.image.toString("base64")}`;
  }
  next();
};

module.exports = {
  setAdminAvatar,
};
