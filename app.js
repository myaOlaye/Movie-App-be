const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./routes/api-router");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:8081", // Replace with your allowed origin
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization header
    credentials: true 
  };
app.use(cors(corsOptions));
app.use("/api", apiRouter);

module.exports = app;
