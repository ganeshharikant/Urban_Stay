const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controller/listing.js");
const multer = require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage})


//"/"
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createNewListing))

router.get("/new",isLoggedIn,listingController.rederNewform)
router.get("/search",wrapAsync(listingController.search))
router.get("/filter/:id",wrapAsync(listingController.filter))


//"/id"
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


//Edit get Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditform))

module.exports=router;