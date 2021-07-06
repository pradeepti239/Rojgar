var express = require("express");
var router = express.Router();
let HireMe = require("../models/hireme");
let HireAny = require("../models/hireAny");


//Hire any Services starts
router.get("/hireany", function (req, res, next) {
  res.render("hireany", {isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
});

router.get("/deena", function (req, res, next) {
  res.render("test",{isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
});


router.post("/hireany", function (req, res, next) {
  const {
    address,
    phonenumber,
    dateOfHire,
    durationtime,
    duration,
    payment,
    description,
  } = req.body;
  console.log(req.body);

  let errors = [];
  if (!address || !dateOfHire || !phonenumber || !payment || !description) {
    errors.push({ msg: "Please fill in all required fields" });
  }
  if (errors.length > 0) {
    res.render("hireany", {
      errors,
      address,
      phonenumber,
      dateOfHire,
      durationtime,
      duration,
      payment,
      description,
    });
  }
  const durationOfHire = durationtime + " " + duration;
  const newHireAny = new HireAny({
    address,
    phonenumber,
    dateOfHire,
    durationOfHire,
    payment,
    description,
  });

  newHireAny
    .save()
    .then(() => {
      req.flash(
        "hireMessage",
        "Your request has been saved. We'll soon contact you."
      );
      res.redirect("/serviceinfo");
      })
    .catch((err) => console.log(err));
});
//hire any ends

// HIRE Painter
router.get("/painterHari", function (req, res, next) {
  res.render("painterHari",{isLoggedIn: req.isAuthenticated(),logoutMessage: req.flash("logoutmessage")});
});

router.post("/painterHari", function (req, res, next) {
  const {
    address,
    phonenumber,
    dateOfHire,
    durationtime,
    duration,
    payment,
    description,
  } = req.body;
  console.log(req.body);

  let errors = [];
  if (!address || !dateOfHire || !phonenumber || !payment) {
    errors.push({ msg: "Please fill in all required fields" });
  }
  console.log("before err length")
  if (errors.length > 0) {
    res.render("painterHari", {
      errors,
      address,
      phonenumber,
      dateOfHire,
      durationtime,
      duration,
      payment,
      description,
    });
  }
  console.log("before duration");
  const durationOfHire = durationtime + " " + duration;
  console.log("after duration");
  const newHireme = new HireMe({
    address,
    phonenumber,
    dateOfHire,
    durationOfHire,
    payment,
    description,
  });
  console.log("before newHireme");
  console.log(newHireme);
  newHireme
    .save()
    .then(() => {
      req.flash(
        "hireMessage",
        "Your request has been saved. We'll soon contact you."
      );
      res.redirect("/serviceinfo");
      })
    .catch((err) => console.log(err));

});

module.exports = router;
