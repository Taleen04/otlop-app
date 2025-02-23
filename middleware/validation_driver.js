const { body } = require("express-validator");



const validateDriver = [
   body("name" && "username")
         .notEmpty()
         .withMessage(" name is required")
         .isLength({ min: 3 })
         .withMessage(" name must be at least 3 characters long"),
   
       body("password")
         .notEmpty()
         .withMessage(" username is required")
         .isLength({ min: 8 })
         .withMessage("Password must be at least 8 characters long")
         .matches(/[A-Z]/)
         .withMessage("Password must contain at least one uppercase letter")
         .matches(/[a-z]/)
         .withMessage("Password must contain at least one lowercase letter")
         .matches(/[0-9]/)
         .withMessage("Password must contain at least one number")
         .matches(/[@#$%^&*]/)
         .withMessage(
           "Password must contain at least one special character (@#$%^&*)"
         ),
  ];
  
  module.exports = validateDriver;