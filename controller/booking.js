const Booking = require("../modules/booking");
const Listing = require("../modules/listing");

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    const booking = new Booking({
        listing: id,
        user: req.user._id,
        date: new Date(date)
    });

    await booking.save();
    req.flash("success", "Booking confirmed!");
    res.redirect(`/listings/${id}`);
};

module.exports.showUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ date: -1 });

    res.render("dashboard/bookings", { bookings });
};