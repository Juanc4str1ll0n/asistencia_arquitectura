const { db } = require('../Confi/FirebaseCofj');
const { collection, addDoc, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

// Crear estudiante
exports.guardarEstudiante = async (req, res) => {
  try {
    const { nombres, tipoId, numeroId } = req.body;

    if (!nombres || !tipoId || !numeroId) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const q = query(collection(db, "estudiantes"), where("numeroId", "==", numeroId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(409).json({ mensaje: "Ya existe un estudiante con ese número de ID" });
    }

    const docRef = await addDoc(collection(db, "estudiantes"), {
      nombres,
      tipoId,
      numeroId,
      fechaCreacion: new Date()
    });

    res.status(201).json({ mensaje: "Estudiante guardado con éxito", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consultar estudiante por número de documento
exports.consultarEstudiante = async (req, res) => {
  try {
    const { numeroId } = req.query;

    if (!numeroId) {
      return res.status(400).json({ mensaje: "Número de documento requerido" });
    }

    const q = query(collection(db, "estudiantes"), where("numeroId", "==", numeroId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    const estudiante = querySnapshot.docs[0].data();
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar estudiante
exports.editarEstudiante = async (req, res) => {
  try {
    const { numeroId, nombres, tipoId } = req.body;

    if (!numeroId || !nombres || !tipoId) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const q = query(collection(db, "estudiantes"), where("numeroId", "==", numeroId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    const estudianteDoc = querySnapshot.docs[0];
    const estudianteRef = doc(db, "estudiantes", estudianteDoc.id);

    await updateDoc(estudianteRef, {
      nombres,
      tipoId,
      fechaModificacion: new Date()
    });

    res.status(200).json({ mensaje: "Estudiante modificado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




/* let estudiantes = [];

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
}; */
