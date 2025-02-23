const { json } = require("body-parser");
const vehicleModel = require("../models/vehicle_model");
const httpStatusText = require("../utils/httpStatusText");

const createVehicle = async (req, res) => {
  try {
    const vehicle = new vehicleModel(req.body);
    await vehicle.save();

   return res.json({
        status: httpStatusText.SUCCESS,
        data: { message: "Vehicle saved successfully",data: vehicle },
      });
   
  } catch (error) {
    return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
  }
};
const getAllVehicles = async (req, res) => {
  try {
    const allVehicles = await vehicleModel.find();

    if (allVehicles.length === 0) {
       return res.status(404).json({
             status: httpStatusText.FAILURE,
             data: { user: "No Vehicle found " },
           });
    }

     return res.json({
          status: httpStatusText.SUCCESS,
          data: { message: "Vehicle retrived successfully",data: allVehicles },
        });
  } catch (error) {
   
    return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
  }
};

const deleteAllVehicles = async (req, res) => {
 try {
   const deleteVehicles = await vehicleModel.findByIdAndDelete({
     _id: req.params.id,
   });
   if (!deleteVehicles) {
       return res.status(404).json({
             status: httpStatusText.FAILURE,
             data: { user: "Vehicle not found " },
           });
   }
    return res.json({
         status: httpStatusText.SUCCESS,
         data: { message: "Delete successfully", deleteAllVehicles },
       });
 } catch (error) {
  return res
  .status(500)
  .json({ status: "error", message: "Internal Server Error" });
 }
};

const updateAllVehicles = async (req, res) => {
 try {
   const updateVehicles = await vehicleModel.findByIdAndUpdate(
     { _id: req.params.id },
     { $set: { ...req.body } }
   );
   if (!updateVehicles) {
      return res.status(404).json({
            status: httpStatusText.FAILURE,
            data: { user: "Vehicle not found " },
          });
   }
   return res.json({
        status: httpStatusText.SUCCESS,
        data: { message: "Update successfully", updateVehicles },
      });
 } catch (error) {
  return res
  .status(500)
  .json({ status: "error", message: "Internal Server Error" });
 }
};

const expiredVehicle = async (req, res) => {
 try {
   const expire = await vehicleModel.find({
     licenseExpiry: { $lt: new Date() },
   });
   if (expire.length === 0) {
     return res.status(404).json({
       status: httpStatusText.FAILURE,
       data: { user: "Vehicle not found " },
     });
   }
   return res.json({
        status: httpStatusText.SUCCESS,
        data: { message: "Expire Vehicle", expire },
      });
 } catch (error) {
  return res
  .status(500)
  .json({ status: "error", message: "Internal Server Error" });
 }
};

const getVehiclesWithDrivers = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find().populate("driver");
     return res.json({
          status: httpStatusText.SUCCESS,
          data: { message: "Vehicles: ", vehicles },
        });
  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
  }
};

const getSpecificVehicle = async (req, res) => {
  const { make, model, color, serviceType, numberOfSeats } = req.body;
  const findVehicle = await vehicleModel.findOne({
    make: make,
    model: model,
    color: color,
    serviceType,
    numberOfSeats: numberOfSeats,
    available: true,
    "license.isValid": true,
  });

  if (!findVehicle) {
    return res.status(404).json({
      status: httpStatusText.FAILURE,
      data: { user: "Vehicle not found for service  " },
    });
  }
  if (findVehicle) {
     return res.json({
          status: httpStatusText.SUCCESS,
          data: { message: "Find Vehicle successfully", findVehicle },
        });
  } else {
    return res.status(404).json({
      status: httpStatusText.FAILURE,
      data: { user: " Find Vehicle Failed  " },
    });
  }
};

const getDriverwithExpiredVehicle = () => {
  const vehicle = vehicleModel.find({
    licenseStatus: "expired",
    licenseExpiry: { $lt: new Date.now() },
  });
  const drivers = [];
  for (let i = 0; i < vehicle.length; i++) {
    drivers.push(vehicle[i].drivers);
  }
   return res.json({
        status: httpStatusText.SUCCESS,
        data: { message: "Drivers: ", drivers },
      });
};

module.exports = {
  createVehicle,
  getAllVehicles,
  deleteAllVehicles,
  updateAllVehicles,
  expiredVehicle,
  getVehiclesWithDrivers,
  getSpecificVehicle,
  getDriverwithExpiredVehicle,
};
