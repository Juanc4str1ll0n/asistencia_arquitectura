var express = require('express');
var cors = require("cors");
var serverless = require ('serverless-http');
var port = process.env.PORT || 5000;
var app = express();
var asignaturaroutes = require("../../Backend/routes/asignaturaroutes.js");
app.use(express.json());
app.use(cors());

var router = express.Router();
router.use ("/asignatura",asignaturaroutes);
var handler = app.use ('/.netlify/functions',router);
exports.handler = serverless (app);

//hola