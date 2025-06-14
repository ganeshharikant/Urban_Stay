require("dotenv").config();
const express= require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const LocalStratergy=require("passport-local")
const User=require("./modules/user.js")
const MongoStore = require('connect-mongo');
const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")
const expressLayouts = require('express-ejs-layouts');
const bookingRouter = require("./routes/booking.js");

// const MONGO_URL='mongodb://127.0.0.1:27017/wanderLust'
const dbURL=process.env.ATLAS_DB_URL

main().then((res)=>{
    console.log("Connection Success")
}).catch((err)=>{
console.log("Connection Failed")
})
async function main() {
    await mongoose.connect(dbURL)
    
}
app.engine('ejs', ejsMate);
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
})
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE:",err)
})
const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:1000*60*60*24*3,
        httpOnly:true,
    }
};

//flash and session middleware
app.use(session(sessionOption))
app.use(flash());

//passport middleaware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
//routes   
app.get("/", (req, res) => {
    res.redirect("/listings"); // 👈 Redirects root to your main page
}); 
app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)
app.use("/listings", bookingRouter);
app.use("/listings/:id/booking", bookingRouter); // For creating a booking
app.use("/booking", bookingRouter); // For viewing user bookings


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err
    // res.status(statusCode).send(message)
    res.render("error.ejs",{err})
})
app.listen(8080,(req,res)=>{
    console.log("Listening at 8080")
})




