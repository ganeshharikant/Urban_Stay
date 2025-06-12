const Review=  require("../modules/review.js");
const Listing=  require("../modules/listing.js");

module.exports.createReview=async(req,res,next)=>{
    let listing=  await Listing.findById(req.params.id)
    let newReview=await new Review(req.body.review)
    newReview.author=res.locals.currUser._id
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
    req.flash("success","New review created!")
    res.redirect(`/listings/${listing._id}`)
  }

  module.exports.destroyReview=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review deleted!")
    res.redirect(`/listings/${id}`);
  }