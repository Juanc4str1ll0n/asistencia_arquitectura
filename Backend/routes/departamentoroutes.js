const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentocontroller");

router.get("/", departamentoController.consultarDepartamento);
router.put("/", departamentoController.editarDepartamento);

module.exports = router;