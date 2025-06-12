const express = require("express");
const router = express.Router({ mergeParams: true });
const Booking = require("../modules/booking.js");
const Listing = require("../modules/listing.js");
const { isLoggedIn } = require("../middleware");

// ✅ POST /listings/:id/booking
router.post("/", isLoggedIn, async (req, res) => {
    const { date } = req.body;  // assuming form has <input name="date" ...>
    const listingId = req.params.id;

    // Check if same listing is already booked for the selected date
    const existingBooking = await Booking.findOne({
        listing: listingId,
        date: new Date(date) // match exact date
    });

    if (existingBooking) {
        req.flash("error", "Sorry, this listing is already booked for the selected date.");
        return res.redirect(`/listings/${listingId}`);
    }

    // Save booking
    const booking = new Booking({
        listing: listingId,
        user: req.user._id,
        date: new Date(date)
    });

    await booking.save();
    req.flash("success", "Booking successful!");
    res.redirect("/booking/my");
});
// ✅ GET /booking/my
router.get("/my", isLoggedIn, async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/userBookings", { bookings });
});

module.exports = router;