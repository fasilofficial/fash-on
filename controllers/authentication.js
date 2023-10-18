const bcrypt = require("bcrypt");

const { setUser, setAdmin } = require("../service/auth");

const { Admin, User } = require("../models");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let generatedOtp, user, admin;

const client = require("twilio")(accountSid, authToken);

// GET REQUESTS
const getUserSignup = async (req, res) => {
  const error = "";
  res.render("auth/signup", { error });
};
const getUserLogin = async (req, res) => {
  const error = "";
  res.render("auth/login", { error });
};
const getUserLoginVerify = async (req, res) => {
  const error = "";
  res.render("auth/login-verify", { error });
};
const getAdminLogin = async (req, res) => {
  const error = "";
  res.render("auth/admin-login", { error });
};
const getAdminLoginVerify = async (req, res) => {
  const error = "";
  res.render("auth/admin-login-verify", { error });
};

// HANDLE USER SIGNUP, LOGIN, LOGIN OTP, AND LOGOUT
const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("auth/signup", {
        error: "Email already exists, please use a different email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
// const handleUserSignupOtpVerification = async (req, res) => {
//   try {
//     const enteredOtp = req.body.otp;

//     const isMatch = enteredOtp === generatedOtp;
//     if (!isMatch) {
//       return res.render("auth/signup-verify", {
//         error: "Entered OTP is incorrect, try again",
//       });
//     }

//     user.save();
//     res.redirect("/login");
//   } catch (error) {
//     console.log(error);
//     res.render("auth/signup-verify", { error });
//   }
// };
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    user = await User.findOne({ email: email });
    if (!user) {
      return res.render("auth/login", {
        email,
        error: "No user with the given email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      if (user.blocked) {
        return res.render("auth/login", {
          email,
          error: "Blocked: You can't login",
        });
      } else {
        generatedOtp = "";
        let digits = "0123456789";
        for (let i = 0; i < 4; i++) {
          generatedOtp += digits[Math.floor(Math.random() * 10)];
        }

        await client.messages
          .create({
            from: "+18564520062",
            to: "+91" + user.phone,
            body: `Your OTP is: ${generatedOtp}. Please use this code to verify your account.`,
          })
          .then(() => res.redirect("/login/verify"))
          .done();
      }
    } else {
      return res.render("auth/login", { email, error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
  }
};
const handleUserLoginOtpVerification = async (req, res) => {
  try {
    const enteredOtp = req.body.otp;
    const isMatch = enteredOtp === generatedOtp;
    if (!isMatch) {
      return res.render("auth/login-verify", {
        error: "Entered OTP is incorrect, try again",
      });
    }

    const token = setUser(user);
    res.cookie("userToken", token);
    res.redirect("/user");
  } catch (error) {
    console.log(error);
    res.render("auth/login-verify", { error });
  }
};
const handleUserLogout = async (req, res) => {
  res.cookie("userToken", "", { maxAge: 1 });
  res.redirect("/login");
};

// HANDLE ADMIN LOGIN, LOGIN OTP, AND LOGOUT
const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.render("auth/admin-login", {
        email,
        error: "No admin with the given email",
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      generatedOtp = "";
      let digits = "0123456789";
      for (let i = 0; i < 4; i++) {
        generatedOtp += digits[Math.floor(Math.random() * 10)];
      }

      await client.messages
        .create({
          from: "+18564520062",
          to: "+91" + admin.phone,
          body: `Your OTP is: ${generatedOtp}. Please use this code to verify your account.`,
        })
        .then(() => res.redirect("/login/admin/verify"))
        .done();
    } else {
      return res.render("auth/admin-login", { email, error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
  }
};
const handleAdminLoginOtpVerification = async (req, res) => {
  try {
    const enteredOtp = req.body.otp;
    const isMatch = enteredOtp === generatedOtp;
    if (!isMatch) {
      return res.render("auth/admin-login-verify", {
        error: "Entered OTP is incorrect, try again",
      });
    }
    const token = setAdmin(admin);
    res.cookie("adminToken", token);
    return res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.render("auth/login-verify", { error });
  }
};
const handleAdminLogout = async (req, res) => {
  res.cookie("adminToken", "", { maxAge: 1 });
  res.redirect("/login/admin");
};

module.exports = {
  getUserSignup,
  getUserLogin,
  getUserLoginVerify,
  getAdminLogin,
  getAdminLoginVerify,
  handleUserSignup,
  handleUserLogin,
  handleUserLoginOtpVerification,
  handleUserLogout,
  handleAdminLogin,
  handleAdminLoginOtpVerification,
  handleAdminLogout,
};
