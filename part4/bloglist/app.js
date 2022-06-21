const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const logger = require("./utils/logger");

const app = express();

logger.info("connecting to MongoDB");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((e) => logger.error("error connecting to MongoDB", e.message));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
