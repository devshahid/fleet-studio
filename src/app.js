// importing express to create express server on node
const express = require("express");

// importing setHeader middleware
const { setHeaders } = require("./middlewares/headers");

// creating the instance of the express server
const app = express();

// added dotenv for GITHUB ACCESS TOKEN
require("dotenv").config();

// imported routes layer to handle app api routes
const routes = require("./routes/index");

// added headers middleware to authenticate the app with proper methods and origins
app.use(setHeaders);

// using routes layer to handle all the /api's
app.use("/api/", routes);

// exporting app to create a http server in the index.js file
module.exports = app;
