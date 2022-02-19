// bring in all inputs
const express = require("express");
const mongoose = require("mongoose");
const ip = require("ip");
require("dotenv").config();

const patientRoutes = require("./routes/patient_routes.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log("MongoDB conection error", err);
    process.exit;
  });

app.use("/api/v1/patients", patientRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${ip.address()}:${port}`);
});
