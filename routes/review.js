const express= require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js")

const { isLoggedIn,isReviewAuthor,validateReview } = require("../middleware.js");
const reviewController=require("../controller/review.js")




//post route for Reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
//delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports=router; 