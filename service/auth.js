const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
};
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    return null;
  }
};
const setAdmin = (admin) => {
  return jwt.sign(
    {
      _id: admin._id,
      email: admin.email,
    },
    secret
  );
};
const getAdmin = (token) => {
  if (!token) return null;
  return jwt.verify(token, secret);
};

module.exports = {
  setUser,
  getUser,
  setAdmin,
  getAdmin,
};