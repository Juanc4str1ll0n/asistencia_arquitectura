const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentocontroller");
const { getGenerativeModel } = require("firebase/ai");

router.get("/", departamentoController.consultarDepartamento);
router.post("/", departamentoController.editarDepartamento);

module.exports = router;