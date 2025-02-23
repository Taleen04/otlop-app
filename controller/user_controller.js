const userModel = require("../models/user_model");
const { validationResult } = require("express-validator");
//const asyncWrapper=require('async-wrapper');
const generateJWT = require("../utils/generateJWT");
const httpStatusText = require("../utils/httpStatusText");

const createUser = (req, res) => {
  try {
    const user = new userModel(req.body);
    user.save().then(
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "created successfully", data: user },
      })
    );
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel.find({}, { firstName: false }); //without first name
    return res.json({
      status: httpStatusText.SUCCESS,
      data: { message: "All Users: ", allUsers },
    });
  } catch (error) {
    return res.json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const deleteUserByID = await userModel.findByIdAndDelete(req.params.id);
  if (!deleteUserByID) {
    return res.status(404).json({
      status: httpStatusText.FAILURE,
      data: { user: "User not found " },
    });
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { message: "Delete successfully", deleteUserByID },
  });
};

const updateUser = async (req, res) => {
  try {
    const updateUserByID = await userModel.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body },
    });
    if (!updateUserByID) {
      return res.status(404).json({
        status: httpStatusText.FAILURE,
        data: { user: "User not found " },
      });
    }
    return res.json({
      status: httpStatusText.SUCCESS,
      data: { message: "Update successfully", updateUserByID },
    });
  } catch (error) {
    return res.json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    phoneNumber,
    role,
    address,
    profileImage,
    status,
    preferences,
    lastLogin,
  } = req.body;

  const oldUser = await userModel.findOne({ phoneNumber: phoneNumber });
  if (oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAILURE,
      data: { message: "User already exists with same phone number" },
    });
  }

  const newUser = new userModel({
    firstName,
    lastName,
    phoneNumber,
    role,
    address,
    profileImage,
    status,
    preferences,
    lastLogin,
  });

  // generate token
  const jsonwebtoken = await generateJWT({
    phoneNumber: newUser.phoneNumber,
    id: newUser._id,
  });
  console.log(jsonwebtoken);
  newUser.token = jsonwebtoken;
  await newUser.save();
 return res.json({
    status: httpStatusText.SUCCESS,
    data: {
      message: "Register successfully",
    },
  });
};

const loginUser = async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  
  if (!firstName && !lastName && !phoneNumber) {
    return res.status(400).json({
      status: httpStatusText.FAILURE,
      data: { message: "Please enter all fields" },
    });
  }
  try {
    const user = await userModel.findOne({ phoneNumber: phoneNumber });

    if (!user) {
      return res.status(400).json({
        status: httpStatusText.FAILURE,
        data: { message: "User not found " },
      });
    }
    const jsonwebtoken = await generateJWT({
      phoneNumber: userModel.phoneNumber,
      id: userModel.id
    });
   return res.json({
      status: httpStatusText.SUCCESS,
      data: {
        message: "User logged in successfully",
        token: jsonwebtoken,
      },
    });
  } catch (error) {
    return res.json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
};
