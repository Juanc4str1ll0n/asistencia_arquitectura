var express = require('express');
var cors = require("cors");
var serverless = require ('serverless-http');
var port = process.env.PORT || 5000;
var app = express();
var estudiantesroutes = require("../../Backend/routes/estudiantesroutes.js");
app.use(express.json());
app.use(cors());

var router = express.Router();
router.use ("/estudiantes",estudiantesroutes);
var handler = app.use ('/.netlify/functions',router);
exports.handler = serverless (app);




// const serverless = require("serverless-http");
// const express = require("express");
// const app = express();
// const estudianteRoutes = require("../../Backend/routes/estudiantesroutes");

// app.use(express.json());
// app.use("/estudiante", estudianteRoutes);

// module.exports.handler = serverless(app);
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.path} - Body:`, req.body);
//   next();
// });