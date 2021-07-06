var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const port = process.env.PORT || 3000;
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
require("./config/passport")(passport);

const util = require("util");
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");

//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var hireRouter = require("./routes/hire");
var termspolicyRouter = require("./routes/termspolicy");
var searchemployeeRouter = require("./routes/searchEmployee");

const { Mongoose } = require("mongoose");

var app = express();



//connection to db
mongoose.connect(
  "mongodb://localhost/Rojgar",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to db");
  }
);
mongoose.set("useCreateIndex", true);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Expression session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hire", hireRouter);
app.use("/termspolicy", termspolicyRouter);
app.use("/search", searchemployeeRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
process.on("warning", (warning) => {
  console.log(warning.stack);
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
module.exports = app;
