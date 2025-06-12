const Listing = require("../modules/listing");

module.exports.showDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const myListings = await Listing.find({ owner: userId });
    res.render("dashboard.ejs", { myListings });
  } catch (err) {
    console.error("Dashboard Error:", err);
    req.flash("error", "Something went wrong while loading your dashboard.");
    res.redirect("/listings");
  }
};