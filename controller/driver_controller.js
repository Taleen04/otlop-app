const driverModel = require("../models/driver_model");
const bcrypt = require("bcrypt");
const vehicle_model = require("../models/vehicle_model");
const httpStatusText = require("../utils/httpStatusText");

const creatDriver = async (req, res) => {
  // const {password}=req.body;
  // const hashedPassword=await bcrypt.hash(password,10)
 try {
   const driver = new driverModel(req.body);
   driver
     .save()
     .then(
       res.status(200).json({
         status: httpStatusText.SUCCESS,
         data: { message: "Driver created successfully", driver: driver },
       }),
      
     );
 } catch (error) {
   return res.json({
        status: httpStatusText.ERROR,
        data: null,
        message: error.message,
      });
 }
};

const getAllDrivers = async (req, res) => {
  try {
    const allDrivers = await driverModel.find();
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { message: "Drivers : ", driver: allDrivers },
    });
  } catch (error) {
    console.error("Error fetching drivers:", error);
   return res.json({
        status: httpStatusText.ERROR,
        data: null,
        message: error.message,
      });
  }
};

const deleteDrivers = async (req, res) => {
  try {
    const deletedDriver = await driverModel.findByIdAndDelete(req.params.id);

    if (!deletedDriver) {
      res.status(404).json({
        status: httpStatusText.FAILURE,
        message: "Driver not found",
      });
    }
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { message: "Driver deleted successfully", driver: deletedDriver },
    });
  } catch (error) {
     return res.json({
          status: httpStatusText.ERROR,
          data: null,
          message: error.message,
        });
  }

  const updateDrivers = async (req, res) => {
    try {
      const updateDriver = await driverModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      if (!updateDriver) {
        res.status(404).json({
          status: httpStatusText.FAILURE,
          message: "Driver not found",
        });
      }

      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Driver updated successfully", data: updateDriver },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  };

  const expiredDrivers = async (req, res) => {
    try {
      const expired = await driverModel
        .find({ licenseExpiry: { $lt: new Date() } })
        .select("-password");

      if (expired.length === 0) {
        res.status(404).json({
          status: httpStatusText.FAILURE,
          message: "No drivers with expired licenses",
        });
      }

      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Driver updated successfully", data: expired },
      });
    } catch (error) {
      console.error("Error fetching expired drivers:", error);

      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  };

  const getDriversWithVehicles = async (req, res) => {
    try {
      const drivers = await driverModel.find().populate("vehicles");
      if (!drivers.length) {
        return res.status(404).json({
          status: httpStatusText.FAILURE,
          message: "Driver not found",
        });
      }

      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Drivers retrieved successfully", data: drivers },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  };

  const checkDriver = async (req, res) => {
    try {
      const availableDrivers = await driverModel.find({
        status: "active",
      });
      if (availableDrivers.length == 0) {
        return res.status(404).json({
          status: httpStatusText.FAILURE,
          data: { message: "No drivers" },
        });
      }
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Available Drivers : ", data: availableDrivers },
      });
    } catch (error) {
      return res.status(500).json({
        status: httpStatusText.FAILURE,
        data: { message: "Something wrong " },
      });
    }
  };

  module.exports = {
    creatDriver,
    getAllDrivers,
    deleteDrivers,
    updateDrivers,
    expiredDrivers,
    getDriversWithVehicles,
    checkDriver,
  };
};
