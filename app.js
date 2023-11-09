require("express-async-errors");
require("dotenv").config();
require("./src/database/databaseConnection");

const express = require("express");
const port = process.env.PORT || 5001;
const router = require("./src/routes");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api", router);
app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Server is running in ${port} port`);
});
