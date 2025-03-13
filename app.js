const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./routes/api-router");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "*", // Allow all origins (for testing)
  credentials: true, // Allow cookies
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions)); // Use only this one
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);

module.exports = app;
