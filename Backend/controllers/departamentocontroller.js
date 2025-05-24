let departamentoActual = {
  nombre: "Ingeniería de Sistemas y Computación"
};

exports.consultarDepartamento = (req, res) => {
  res.json({ nombre: departamentoActual.nombre });
};

exports.editarDepartamento = (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre del departamento es requerido" });
  }

  departamentoActual.nombre = nombre.trim();
  res.json({ mensaje: "Actualizado con éxito", nombre: departamentoActual.nombre });
};