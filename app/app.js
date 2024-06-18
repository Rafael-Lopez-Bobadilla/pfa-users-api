const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./utils/errorHandler");
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);
module.exports = app;
