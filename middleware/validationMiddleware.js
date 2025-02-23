
const { validationResult } = require("express-validator");
const { httpStatusText } = require("../utils/httpStatusText");



const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({
      status: httpStatusText.FAILURE,
      data: { errors: errors.array() },
    });
  }
  next();
};
module.exports = { handleValidationErrors };