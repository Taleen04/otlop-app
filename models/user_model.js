const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [3, "must be at least 3"],
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [3, "must be at least 3"],
      required: [true, "last name required"],
    },
    phoneNumber: {
      type: String,
      required: [true, " phone number required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "driver"],
      default: "admin",
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    profileImage: String, //url
    status: String,
    preferences: {
      userSitteing: String,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
