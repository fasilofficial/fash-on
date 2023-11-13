const bcrypt = require("bcrypt");

const { sendGeneratedOtp, setUser, setAdmin } = require("../service");
const { generateReferralCode } = require("../helper");

const { Admin, User, Offer } = require("../models");

let user, admin;

// GET REQUESTS
const getUserSignup = async (req, res) => {
  try {
    const error = "";
    res.render("auth/signup", { error });
  } catch (error) {
    console.log(error);
  }
};
const getUserLogin = async (req, res) => {
  try {
    const error = "";
    res.render("auth/login", { error });
  } catch (error) {
    console.log(error);
  }
};
const getUserLoginVerify = async (req, res) => {
  try {
    const error = "";
    res.render("auth/login-verify", { error });
  } catch (error) {
    console.log(error);
  }
};
const getAdminLogin = async (req, res) => {
  try {
    const error = "";
    res.render("auth/admin-login", { error });
  } catch (error) {
    console.log(error);
  }
};
const getAdminLoginVerify = async (req, res) => {
  try {
    const error = "";
    res.render("auth/admin-login-verify", { error });
  } catch (error) {
    console.log(error);
  }
};

// HANDLE USER SIGNUP, LOGIN, LOGIN OTP, AND LOGOUT
const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, referral } = req.body;
    const existingUser = await User.findOne({ email });
    const referredUser = await User.findOne({ referralCode: referral });
    if (referredUser) {
      const referralOffer = await Offer.findOne({ offerName: "referral" });
      referredUser.walletBalance += referralOffer.offerAmount;
      await referredUser.save();
    }
    if (existingUser) {
      return res.render("auth/signup", {
        error: "Email already exists, please use a different email",
      });
    }
    const referralCode = generateReferralCode(6);
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      referralCode,
      password: hashedPassword,
    });

    await user.save();
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

//     await user.save();
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
        await sendGeneratedOtp(user, res);
        res.cookie("_id", user._id);
        return res.render("auth/login-verify");
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
    const generatedOtp = req.cookies.generatedOtp;
    // const isMatch = enteredOtp === generatedOtp;
    const isMatch = bcrypt.compare(enteredOtp, generatedOtp);
    if (!isMatch) {
      return res.render("auth/login-verify", {
        error: "Entered OTP is incorrect, try again",
      });
    }
    const token = setUser(user);
    res.cookie("userToken", token);
    res.cookie("generatedOtp", "", { maxAge: 1 });
    res.cookie("_id", "", { maxAge: 1 });
    res.redirect("/user");
  } catch (error) {
    console.log(error);
    res.render("auth/login-verify", { error });
  }
};
const handleUserLogout = async (req, res) => {
  try {
    res.cookie("userToken", "", { maxAge: 1 });
    res.cookie("userId", "", { maxAge: 1 });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
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
      await sendGeneratedOtp(admin, res);
      res.cookie("_id", admin._id);
      res.redirect("/login/admin/verify");
    } else {
      return res.render("auth/admin-login", {
        email,
        error: "Invalid password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const handleAdminLoginOtpVerification = async (req, res) => {
  try {
    const enteredOtp = req.body.otp;
    const generatedOtp = req.cookies.generatedOtp;
    // const isMatch = enteredOtp === generatedOtp;
    const isMatch = bcrypt.compare(enteredOtp, generatedOtp);
    if (!isMatch) {
      return res.render("auth/admin-login-verify", {
        error: "Entered OTP is incorrect, try again",
      });
    }
    const token = setAdmin(admin);
    res.cookie("adminToken", token);
    res.cookie("generatedOtp", "", { maxAge: 1 });
    res.cookie("_id", "", { maxAge: 1 });
    return res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.render("auth/login-verify", { error });
  }
};
const handleAdminLogout = async (req, res) => {
  try {
    res.cookie("adminToken", "", { maxAge: 1 });
    res.redirect("/login/admin");
  } catch (error) {
    console.log(error);
  }
};

// HANDLE RESEND OTP
const handleResendOtp = async (req, res) => {
  try {
    res.cookie("generatedOtp", "", { maxAge: 1 });
    const user = await User.findById(req.cookies._id);
    if (user) {
      await sendGeneratedOtp(user, res);
    } else {
      const admin = await Admin.findById(req.cookies._id);
      await sendGeneratedOtp(admin, res);
      return res.redirect("/login/admin/verify");
    }
    return res.redirect("/login/verify");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserSignup,
  getUserLogin,
  handleResendOtp,
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
