var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log(req.flash("hireMessage"));
  res.render("index", { hireMessage: req.flash("hireMessage") ,isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});  
});

router.get("/serviceinfo", function (req, res, next) {
  res.render("serviceinfo", { hireMessage: req.flash("hireMessage") ,isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
});

module.exports = router;
