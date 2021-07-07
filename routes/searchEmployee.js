var express = require("express");
var router = express.Router();
let ValidEmployees = require("../models/validemployees");


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


router.get("/searchemployee", async function (req, res, next) {
  var noMatch = 0;
  var noMatchmsg = "";
//Search location and service
  if (req.query.service && req.query.location) {
      const regex = new RegExp(escapeRegex(req.query.service), "gi"); //for service
      const regex2 = new RegExp(escapeRegex(req.query.location), "gi"); //for location
//get searched service and location from db
    ValidEmployees.find()
        .and({ address: regex2 })
        .or([ { mainskill: regex }, { otherskills: regex }])
      .exec(function (err, employeeSearched) {
        if (err) {
          console.log(err);
        } else {
          if (employeeSearched.length < 1) {
            console.log("No employee match your query, Please try again!!");
            noMatchmsg = "No employee match your query, Please try again!";
            noMatch = 1;
            res.render("searchEmployee", {
              title: "Search Results",
              employeeList: employeeSearched,
              noMatch: noMatch,
              noMatchmsg: noMatchmsg,
              isLoggedIn: req.isAuthenticated(),
              logoutMessage: req.flash("logoutmessage")
            
            });
            // eval(require("locus"));
          } else {
            res.render("searchEmployee", {
              title: "Search Results",
              employeeList: employeeSearched,
              noMatch: noMatch,
              noMatchmsg: noMatchmsg,
              isLoggedIn: req.isAuthenticated(),
              logoutMessage: req.flash("logoutmessage")
            });
          }
        }
      });
  } 
});

module.exports = router;