const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../modules/user.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controller/user.js");
const dashboardController = require("../controller/dashboard.js"); // ✅ added

// Signup
router
  .route("/signup")
  .get(wrapAsync(userController.renderSignup))
  .post(wrapAsync(userController.signup));

// Login
router
  .route("/login")
  .get(wrapAsync(userController.renderLogin))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

// Logout
router.get("/logout", userController.logout);

// ✅ Dashboard Route
router.get("/dashboard", isLoggedIn, dashboardController.showDashboard);

module.exports = router;