var express = require("express");
var router = express.Router();
let User = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* Login Begins */
router.get("/login", function (req, res) {
  res.render("login", {
    title: "Login",
    signinMessage: req.flash("signinMessage"),
  });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "You have logged in successfully!",
    failureRedirect: "/users/login",
    failureMessage: "government or password incorrect. Please try again!",
    failureFlash: true,
  })(req, res, next);
});
// Login Ends


//SignUp Begins
router.get("/signup", function (req, res) {
  res.render("signup", { title: "SignUp" });
});


router.post("/signup", function (req, res) {
  // console.log(req.body);
  const {
    username,
    email,
    gender,
    mainskill,
    otherskills,
    governmentid,
    address,
    phonenumber,
    password,
    password2,
  } = req.body;
  let errors = [];
  //Check required fields
  if (
    !username ||
    !governmentid ||
    !phonenumber ||
    !address||
    !password ||
    !password2 ||
    !gender
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  console.log("after empty check");
  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  console.log("after password match");
  //Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
  console.log("after pass length match");
  if (errors.length > 0) {
    console.log(errors);
    res.render("signup", {
      errors,
      username,
      email,
      gender,
      mainskill,
      otherskills,
      governmentid,
      address,
      phonenumber,
      password,
      password2,
    });
    console.log("after wrong msg")
  } else {
    console.log("before gov check");
    User.findOne({ username: username }).then((user) => {
      if (user) {
        console.log(user);
        errors.push({ msg: "Government Id already exists" });
        console.log("before render");
        res.render("signup", {
          errors,
          username,
          email,
          gender, 
          mainskill,
          otherskills,
          governmentid,
          address,
          phonenumber,
          password,
          password2,
        });
        console.log("after render");
      } else {
        const newUser = new User({
          username,
          email,
          gender,
          mainskill,
          otherskills,
          governmentid,
          address,
          phonenumber,
          password,
        });
        console.log("before hash");
        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "signinMessage",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
                // res.redirect("/");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});
//SignUp Ends


// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("logoutmessage", "You are logged out");
  res.redirect("/");
});

module.exports = router;
