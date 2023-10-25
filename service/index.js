const { sendGeneratedOtp } = require("./sendGeneratedOtp");
const { setUser, getUser, setAdmin, getAdmin } = require("./auth");

module.exports = {
  sendGeneratedOtp,
  setUser,
  getUser,
  setAdmin,
  getAdmin,
};
