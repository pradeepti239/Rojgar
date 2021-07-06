var mongoose = require("mongoose");

const ValidEmployeesSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
    gender: {
    type: String,
    required: true,
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


  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ValidEmployees", ValidEmployeesSchema);


  // documentimage: {
  //   data: Buffer,
  //   contentType: String
  // },
