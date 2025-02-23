const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const jsonwebtoken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "20 mins",
  });
  return jsonwebtoken;
};
