let estudiantes = [];

function guardarEstudiante(req, res) {
  const { nombres, tipoId, numeroId } = req.body;

  if (!nombres || !tipoId || !numeroId) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  const existe = estudiantes.find(est => est.numeroId === numeroId);
  if (existe) {
    return res.status(409).json({ mensaje: "Ya existe un estudiante con ese número de ID" });
  }

  estudiantes.push({ nombres, tipoId, numeroId });
  return res.status(200).json({ mensaje: "Estudiante guardado con éxito" });
}

function editarEstudiante(req, res) {
  const { numeroId, nombres, tipoId } = req.body;

  const estudiante = estudiantes.find(est => est.numeroId === numeroId);
  if (!estudiante) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  estudiante.nombres = nombres;
  estudiante.tipoId = tipoId;

  return res.status(200).json({ mensaje: "Estudiante modificado con éxito" });
}

function consultarEstudiante(req, res) {
  const { numeroId } = req.query;

  const estudiante = estudiantes.find(est => est.numeroId === numeroId);
  if (!estudiante) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  return res.status(200).json(estudiante);
}

module.exports = {
  guardarEstudiante,
  editarEstudiante,
  consultarEstudiante
};
