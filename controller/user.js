const User=require("../modules/user.js");
module.exports.renderSignup=async(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    let {username,email,password}=req.body;
    let newUser=await new User({username,email});
    let registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings");
    })
}

module.exports.renderLogin=async(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust")
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl)
    }
    else{
        res.redirect("/listings")
    }
}

module.exports.logout=(req,res,next)=>{req.logout((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Logout successful")
    res.redirect("/listings")
})}
