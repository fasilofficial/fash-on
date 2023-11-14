const { Order, Offer } = require("../../models");

const getOffers = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.query.page || 1;
    const offers = await Offer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.count();
    const pages = Math.ceil(count / perPage);

    const path = req.route.path;
    res.status(200);
    res.render("admin/offerViews/offers", {
      offers,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getAddOffer = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/offerViews/addOffer", { path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getEditOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.status(200);
    res.render("admin/offerViews/editOffer", { offer, path });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAddOffer = async (req, res) => {
  try {
    var { offerName, offerAmount, offerType } = req.body;
    offerName = offerName.toLowerCase();
    offerType = offerType.toLowerCase();
    const existingOffer = await Offer.findOne({ offerName });
    if (existingOffer) {
      await req.flash("error", "Offer already exist.");
      res.status(409);
      return res.redirect("/admin/offers");
    }
    const offer = new Offer({
      offerName,
      offerAmount,
      offerType,
    });
    await offer.save();
    await req.flash("info", "New offer has been added.");
    res.status(200);
    res.redirect("/admin/offers");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleEditOffer = async (req, res) => {
  try {
    await Offer.findByIdAndUpdate(req.params.id, {
      offerName: req.body.offerName.toLowerCase(),
      offerType: req.body.offerType.toLowerCase(),
      offerAmount: req.body.offerAmount,
    });
    res.status(200);
    res.redirect(`/admin/offers/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDeleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    await req.flash("info", "A offer has been deleted.");
    res.status(200);
    res.redirect("/admin/offers");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getOffers,
  getAddOffer,
  getEditOffer,
  handleAddOffer,
  handleEditOffer,
  handleDeleteOffer,
};
