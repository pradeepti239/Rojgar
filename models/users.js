var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mainskill: {
    type: String,
    required: true
  },
   otherskills: {
    type: String,
  
  },
  governmentid: {
    type: String,
    required: true,
  },

   address: {
    type: String,
    required: true
  },
    phonenumber: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
