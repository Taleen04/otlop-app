const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const validateUser = require("../middleware/validation_user");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

router
  .route("/")
  .get(userController.getAllUser)
  .post(validateUser, handleValidationErrors, userController.createUser);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

router.post("/api/register", userController.registerUser);

router.post("/api/login", userController.loginUser);

module.exports = router;
