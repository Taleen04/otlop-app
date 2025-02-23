const { body } = require("express-validator");



const validateVehicle = [
    body("name")
          .notEmpty()
          .withMessage(" name is required")
          .isLength({ min: 3 })
          .withMessage(" name must be at least 3 characters long"),
    
        body("operationalID")
          .notEmpty()
          .withMessage(" operationalID is required")
          .isNumeric()
          .withMessage(" operationalID must be a number")
          .isLength({ min: 3, max: 10 })
          .withMessage("Operational ID must be between 6 and 10 digits"),
    
        body("plateNumber")
          .notEmpty()
          .withMessage("Plate number is required")
          .isAlphanumeric("en-US", { ignore: " -" })
          .withMessage("Plate number must contain only letters and numbers")
          .isLength({ min: 5, max: 10 })
          .withMessage("Plate number must be between 5 and 10 characters"),
  ];
  
  module.exports = validateVehicle;