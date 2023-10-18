const {
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("./isAuthenticated");
const {
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
} = require("./isNotAuthenticated");

module.exports = {
  isUserAuthenticated,
  isAdminAuthenticated,
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
};