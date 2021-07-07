var express = require("express");
var router = express.Router();

router.get("/terms", function (req, res, next) {
  res.render("terms",{isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
  
});

router.get("/privacypolicy", function (req, res, next) {
  res.render("privacypolicy", {isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
});

module.exports = router;
