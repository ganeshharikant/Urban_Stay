const mongoose=require("mongoose")
const Review=require("./review.js")
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
    category:{
        type:String,
        enum:["Trending","Rooms","City","Mountain","AmazingPools","Camp","Beachfront","Farm","Boat","Lakeview"]
    }
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
}})
let Listing=new mongoose.model("Listing",listingSchema)

module.exports=Listing;









// let newListing= new Listing({
    //         title: "Cozy Beachfront Cottage",
    //         description:
    //           "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    //         price: 1500,
    //         location: "Malibu",
    //         country: "United States",
    // })
    // newListing.save().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err)
    // })