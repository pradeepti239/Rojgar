var mongoose = require("mongoose");

const HireAnySchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    max: 9999999999,
    min: 0000000,
  },
  dateOfHire: {
    type: Date,
    required: true,
  },
  durationOfHire: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfApplication: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HireAny", HireAnySchema);
