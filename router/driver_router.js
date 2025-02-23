const express = require("express");
const router = express.Router();
const driverController = require("../controller/driver_controller");
const validateDriver = require("../middleware/validation_driver");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

router
  .route("/")
  .get(driverController.getAllDrivers)
  .post(validateDriver, handleValidationErrors, driverController.creatDriver);

router
  .route("/:id")
  .delete(driverController.deleteDrivers)
  .patch(driverController.updateDrivers);

router.get("/expire", driverController.expiredDrivers),
  router.get("/withVehicles", driverController.getDriversWithVehicles);
router.get("/availableDriver", driverController.checkDriver);

module.exports = router;
