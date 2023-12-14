var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var serviceRouter = require("./routes/services");
var usersRouter = require("./routes/users");

mongoose.connect(
  "mongodb+srv://ayush:" +
    process.env.MONGO_ATLAS_PW +
    "@osm.fkbligp.mongodb.net/?retryWrites=true&w=majority",
  {}
);

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/services", serviceRouter);
app.use("/user", usersRouter);

module.exports = app;
