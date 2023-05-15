const express = require("express");
const morgan = require("morgan");
const Routers = require("./routers/router");
const bodyParser = require("body-parser");
// const multer = require("multer");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());                                                                                                                                                                                                         
app.use("/api",Routers)

module.exports = app;



