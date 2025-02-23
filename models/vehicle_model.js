const mongoose = require("mongoose");
const { isBoolean } = require("validator");
const { Schema } = mongoose;
//const validate=require('validator');

const vehicleModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  operationalID: {
    type: String,
    required: true,
    unique: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    unique: true,
  },
  model: {
    type: String,
  },
  makeYear: {
    type: Number,
  },
  plateNumber: {
    type: String,
    unique: true,
  },
  color: {
    type: String,
  },
  features: {
    type: [String],
  },
  licenseExpiry: {
    type: Date,
  },
  daysUntilInspectionExpiry: {
    type: Number,
  },
  licenseStatus: {
    type: String,
    enum:["valid","expired"]
  },
  numberOfSeats: {
    type: Number,
  },
  available: {
    type: Boolean,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    unique: true,
  },
});

module.exports = mongoose.model("Vehicle", vehicleModel);
