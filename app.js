require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const moment = require("moment");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.moment = moment;

const { adminRouter, userRouter, staticRouter } = require("./routes");

const connectDB = require("./config/db");

const { get404 } = require("./controllers");

const {
  isUserAuthenticated,
  isNotUserBlocked,
  isNotUserAuthenticated,
  isAdminAuthenticated,
  setAdminAvatar,
  setUserSeo,
  setAdminSeo,
} = require("./middlewares");

connectDB();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(flash());

app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(express.static("public/assets/css"));

app.use(
  "/admin",
  isAdminAuthenticated,
  setAdminSeo,
  setAdminAvatar,
  adminRouter
);
app.use("/user", isUserAuthenticated, isNotUserBlocked, setUserSeo, userRouter);
app.use("/", isNotUserAuthenticated, setUserSeo, staticRouter);

app.get("*", get404);

app.listen(PORT, (err) => {
  if (err)
    console.log(
      "Something went wrong. Couldn't start the server\nError: ",
      err
    );
  else console.log("Server running on: http://localhost:" + PORT);
});
