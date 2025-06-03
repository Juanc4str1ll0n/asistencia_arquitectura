const { db } = require('../Confi/firebase');
const { doc, getDoc, setDoc } = require('firebase/firestore');
const DEPARTAMENTO_DOC_ID = 'departamento';
const COLLECTION_NAME = 'configuracion';

// Consultar nombre del departamento
exports.consultarDepartamento = async (req, res) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DEPARTAMENTO_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ mensaje: "Departamento no configurado" });
    }

    res.json({ nombre: docSnap.data().nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar nombre del departamento
exports.editarDepartamento = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ mensaje: "El nombre del departamento es requerido" });
    }

    const docRef = doc(db, COLLECTION_NAME, DEPARTAMENTO_DOC_ID);
    await setDoc(docRef, { nombre: nombre.trim(), fechaModificacion: new Date() });

    res.json({ mensaje: "Departamento actualizado con éxito", nombre: nombre.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* let departamentoActual = {
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
}; */