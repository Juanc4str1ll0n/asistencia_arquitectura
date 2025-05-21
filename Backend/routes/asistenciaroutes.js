const express = require("express");
const router = express.Router();
const asistenciasController = require("../controllers/asistenciascontroller");

router.get("/", asistenciasController.consultar);
router.post("/", asistenciasController.crear);
router.put("/", asistenciasController.actualizar);
router.patch("/", asistenciasController.modificar);

module.exports = router;

//hola