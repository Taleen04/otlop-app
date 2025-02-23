const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicle_controllerr ");
const validateVehicle = require("../middleware/validation_vehicle");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

router
  .route("/")
  .get(vehicleController.getAllVehicles)
  .post(
    validateVehicle,
    handleValidationErrors,
    vehicleController.createVehicle
  );

router
  .route("/:id")
  .delete(vehicleController.deleteAllVehicles)
  .patch(vehicleController.updateAllVehicles);

router.get("/expire", vehicleController.expiredVehicle),
  router.get("/withDrivers", vehicleController.getVehiclesWithDrivers);

router.get("/api/availableVehicles", vehicleController.getSpecificVehicle);

module.exports = router;
