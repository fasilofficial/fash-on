const { User } = require("../../models");

const getUsers = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await User.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.render("admin/userViews/users", {
      users,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAddUser = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/userViews/addUser", { path });
  } catch (error) {
    console.log(error);
  }
};
const handleAddUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    await user.save();
    await req.flash("info", "New user has been added.");
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users");
  }
};
const handleBlockAndUnblock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.blocked = !user.blocked;
    await user.save();
    if (user.blocked) await req.flash("info", "A user has been blocked");
    if (!user.blocked) await req.flash("info", "A user has been unblocked");
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getAddUser,
  handleAddUser,
  handleBlockAndUnblock,
};
