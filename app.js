require("express-async-errors");
require("dotenv").config();
require("./src/database/databaseConnection");

const express = require("express");
const port = process.env.PORT || 5001;
const router = require("./src/routes");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const app = express();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(corsOptions));

app.use("/api", router);
app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Server is running in ${port} port`);
});
