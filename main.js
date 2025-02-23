require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const notFoundHandler = require("./middleware/Error_handler");
const userRouter = require("./router/user_router");
const driverRouter = require("./router/driver_router");
const vehicleRouter = require("./router/vehicle_router");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/users", userRouter);
app.use("/api/driver", driverRouter);
app.use("/api/vehicle", vehicleRouter);

app.all("*", notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 1000");
});
