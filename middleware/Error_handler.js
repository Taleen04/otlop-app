const httpStatusText = require("../utils/httpStatusText");


const notFoundHandler = (req, res, next) => {
    return res.status(404).json({
      status: httpStatusText.ERROR,
      data: null,
      message: "This resource is not available",
    });
  };
  

  module.exports = { notFoundHandler };