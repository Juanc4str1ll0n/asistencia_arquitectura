const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantescontrollers");

// ✅ CORREGIDO
router.post("/", estudiantesController.guardarEstudiante);    // CREATE
router.get("/", estudiantesController.consultarEstudiante);   // READ  
router.put("/", estudiantesController.editarEstudiante);      // UPDATE

module.exports = router;
