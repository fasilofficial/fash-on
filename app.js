require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

const {adminRouter, userRouter } = require("./routes");
const connectDB = require("./config/db");

const {
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
  get404,
  getRoot,
} = require("./controllers");

const {
  isUserAuthenticated,
  isAdminAuthenticated,
  isNotUserAuthenticated,
  isNotAdminAuthenticated,
} = require("./middlewares");

// const flash = require("express-flash");

connectDB();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/admin", isAdminAuthenticated, adminRouter);
app.use("/user", isUserAuthenticated, userRouter);

// GET
app.get("/", getRoot);
app.get("/signup", getUserSignup);
app.get("/login", isNotUserAuthenticated, getUserLogin);
app.get("/login/verify", isNotUserAuthenticated, getUserLoginVerify);
app.get("/login/admin", isNotAdminAuthenticated, getAdminLogin);
app.get("/login/admin/verify", isNotAdminAuthenticated, getAdminLoginVerify);

// POST
app.post("/signup", handleUserSignup);
app.post("/login", handleUserLogin);
app.post("/login/verify", handleUserLoginOtpVerification);
app.post("/logout", handleUserLogout);
app.post("/login/admin", handleAdminLogin);
app.post("/login/admin/verify", handleAdminLoginOtpVerification);
app.post("/logout/admin", handleAdminLogout);

app.get("*", get404);

app.listen(PORT, (err) => {
  if (err)
    console.log(
      "Something went wrong. Couldn't start the server\nError: ",
      err
    );
  else console.log("Server running on: http://localhost:" + PORT);
});
