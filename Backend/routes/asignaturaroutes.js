const express = require("express");
const router = express.Router();
const asignaturaController = require("../controllers/asignaturacontroller.js");

router.get("/", asignaturaController.consultar);
router.post("/", asignaturaController.ingresar);

module.exports = router;

//hola