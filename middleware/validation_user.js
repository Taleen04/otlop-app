const { body } = require("express-validator");



const validateUser = [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
  
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
  
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(/^07[789]\d{7}$/)
      .withMessage("Phone number must start with 079, 078, or 077 and be exactly 10 digits"),
  ];
  
  module.exports = validateUser;