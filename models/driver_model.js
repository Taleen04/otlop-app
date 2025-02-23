const mongoose = require("mongoose");
const vehicle_model = require("./vehicle_model");
const { Schema } = mongoose;

const driverModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    employeedId: {
      type: String,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    status: {
      type: String,
      enum:[
        "active","inactive"
      ]
    },
    licenseNumber: {
      type: String,
      unique: true,
    },
    licenseImage: {
      type: String,
    },
    licenseStatus: {
      type: String,
    },
    licenseExpiry: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    languages: {
      type: [String],
    },
    vehicles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverModel);
