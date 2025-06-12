const mongoose=require("mongoose")
const Review=require("./review.js")
const Schema=mongoose.Schema;
const Listing=require("./listing.js");
const User=require("./user.js");
const bookingSchema = new Schema({
  listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Booking", bookingSchema);