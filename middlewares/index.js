const {
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("./isAuthenticated");
const {
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
} = require("./isNotAuthenticated");
const { isNotUserBlocked } = require("./isNotUserBlocked");
const { isOrderPlaced } = require("./isOrderPlaced");
const { setAdminAvatar } = require("./setAdminAvatar");
const { setUserSeo, setAdminSeo } = require("./setSeo");

module.exports = {
  isUserAuthenticated,
  isNotUserBlocked,
  isAdminAuthenticated,
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
  isOrderPlaced,
  setAdminAvatar,
  setUserSeo,
  setAdminSeo,
};
