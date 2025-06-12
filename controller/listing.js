const Listing=  require("../modules/listing.js")
const opencage = require('opencage-api-client');
let api_key=process.env.MAP_KEY

module.exports.index=async(req,res,next)=>{
    const Listings=await Listing.find({})
    res.render("./listings/index.ejs",{Listings})
}
module.exports.rederNewform=(req,res)=>{
    res.render("./listings/new.ejs")
}
module.exports.createNewListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let newListing=new Listing(req.body.listing)
    newListing.owner=req.user._id
    let location=newListing.location
    const data = await opencage.geocode({ q: location, key: api_key });

    if (data.status.code === 200 && data.results.length > 0) {
    let coordinates=data.results[0].geometry;
    let {lat,lng}=coordinates;
    newListing.geometry={type:'Point',
        coordinates:[lng,lat]}
    } else {
        req.flash("error", "Geocoding failed. Please check the location.");
        return res.redirect('/listings/new');
    }
    newListing.image={url,filename};
   await newListing.save()
   req.flash("success","New listing created!")
    res.redirect("/listings")
}

module.exports.renderEditform=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let ogurl=listing.image.url;
    ogurl=ogurl.replace("/upload","/upload/h_300,w_250")
    // console.log(ogurl)
    res.render("./listings/edit.ejs",{listing,ogurl})

}

module.exports.updateListing=async(req,res,next)=>{
    let {id}=req.params
   let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(req.file){
    let url=req.file.path;
    let filename=req.file.filename;
        listing.image={url,filename}
       await listing.save()
    }
    let location=listing.location
    const data = await opencage.geocode({ q: location, key: api_key });

    if (data.status.code === 200 && data.results.length > 0) {
    let coordinates=data.results[0].geometry;
    let {lat,lng}=coordinates;
    listing.geometry={type:'Point',
        coordinates:[lng,lat]}
        await listing.save()
    } else {
        req.flash("error", "Geocoding failed. Please check the location.");
        return res.redirect('/listings/new');
    }
   req.flash("success","Listing updated!")
   res.redirect(`/listings/${id}`)
}

module.exports.destroyListing=async(req,res,next)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id)
    // console.log(deletedListing)
req.flash("success","Listing deleted!")
    res.redirect("/listings");
}

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
       populate:{path:"author"}
    }).populate("owner")
    if(!listing){
   req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("./listings/show.ejs",{listing})
}

module.exports.filter=async(req,res)=>{
    let {id}=req.params;
    const Listings=await Listing.find({category:id})
    res.render("./listings/index.ejs",{Listings})
}
module.exports.search=async(req,res)=>{
    let input=req.query.searchinput;    
    if (!input) {
        req.flash("error","Enter location or title")
        return res.render("./listings/index.ejs", { Listings: [] });
      }
      let regex=new RegExp(input,'i')
    let Listings=await Listing.find({$or:[{title:regex},{location:regex},{country:regex},{category:regex}]})
    if(!Listings){
        req.flash("error","Listing you requested for does not exist!")
        return res.render("./listings/index.ejs", { Listings: [] });
    }
    res.render("./listings/index.ejs",{Listings})
}