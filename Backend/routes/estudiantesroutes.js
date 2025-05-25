const express = require("express");
const router = express.Router();
const {
  guardarEstudiante,
  editarEstudiante,
  consultarEstudiante
} = require("../controllers/estudiantescontrollers");

router.post("/", async (req, res) => {
  try {
    await guardarEstudiante(req, res);
  } catch (err) {
    res.status(500).json({ mensaje: "Error en POST: " + err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    await editarEstudiante(req, res);
  } catch (err) {
    res.status(500).json({ mensaje: "Error en PUT: " + err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    await consultarEstudiante(req, res);
  } catch (err) {
    res.status(500).json({ mensaje: "Error en GET: " + err.message });
  }
});

module.exports = router;
