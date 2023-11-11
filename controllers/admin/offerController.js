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
    res.render("admin/offerViews/offers", {
      offers,
      current: page,
      pages,
      path,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAddOffer = async (req, res) => {
  try {
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/offerViews/addOffer", { path });
  } catch (error) {
    console.log(error);
  }
};
const getEditOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    const path = "/" + req.route.path.split("/").slice(1, 2);
    res.render("admin/offerViews/editOffer", { offer, path });
  } catch (error) {
    console.log(error);
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
      return res.redirect("/admin/offers");
    }
    const offer = new Offer({
      offerName,
      offerAmount,
      offerType,
    });
    await offer.save();
    await req.flash("info", "New offer has been added.");
    res.redirect("/admin/offers");
  } catch (error) {
    console.log(error);
  }
};
const handleEditOffer = async (req, res) => {
  try {
    await Offer.findByIdAndUpdate(req.params.id, {
      offerName: req.body.offerName.toLowerCase(),
      offerType: req.body.offerType.toLowerCase(),
      offerAmount: req.body.offerAmount,
    });
    res.redirect(`/admin/offers/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    await req.flash("info", "A offer has been deleted.");
    res.redirect("/admin/offers");
  } catch (error) {
    console.log(error);
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
