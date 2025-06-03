const { db } = require('../Confi/FirebaseCofj'); 
const { collection, addDoc, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

const COLLECTION_NAME = 'asistencias';

// Registrar asistencia
exports.llenar = async (req, res) => {
  try {
    const { codigo, fecha, horaInicio, estudiantes } = req.body;

    if (!codigo || !fecha || !horaInicio || !Array.isArray(estudiantes)) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const nuevaAsistencia = {
      codigo,
      fecha,
      horaInicio,
      estudiantes,
      fechaRegistro: new Date()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), nuevaAsistencia);
    res.status(201).json({ mensaje: "Asistencia registrada exitosamente", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consultar asistencia
exports.consultar = async (req, res) => {
  try {
    const { codigo, fecha, horaInicio } = req.query;

    if (!codigo || !fecha || !horaInicio) {
      return res.status(400).json({ mensaje: "Faltan parámetros de consulta" });
    }

    const q = query(
      collection(db, COLLECTION_NAME),
      where("codigo", "==", codigo),
      where("fecha", "==", fecha),
      where("horaInicio", "==", horaInicio)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ mensaje: "No se encontró la lista de asistencia" });
    }

    const asistencia = snapshot.docs[0].data();
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar asistencia
exports.modificar = async (req, res) => {
  try {
    const { codigo, fecha, horaInicio, estudiantes } = req.body;

    if (!codigo || !fecha || !horaInicio || !Array.isArray(estudiantes)) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const q = query(
      collection(db, COLLECTION_NAME),
      where("codigo", "==", codigo),
      where("fecha", "==", fecha),
      where("horaInicio", "==", horaInicio)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ mensaje: "No se encontró la lista de asistencia para modificar" });
    }

    const asistenciaDoc = snapshot.docs[0];
    const asistenciaRef = doc(db, COLLECTION_NAME, asistenciaDoc.id);

    await updateDoc(asistenciaRef, {
      estudiantes,
      fechaModificacion: new Date()
    });

    res.status(200).json({ mensaje: "Asistencia modificada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/* exports.consultar = async (req, res) => {
    try {
        const { codigo, fecha, horaInicio, grupo, semestre } = req.query;
        // Lógica para consultar lista de asistencia
        res.json({
            estudiantes: [
                { tipoDocumento: "CC", numeroDocumento: "123", estado: "Asistió" }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.ingresar = async (req, res) => {
//     try {
//         const { codigo, fecha, horaInicio, grupo, semestre } = req.body;
//         // Lógica para crear una nueva lista de asistencia
//         res.status(201).send("Lista de asistencia creada exitosamente");
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
exports.llenar = async (req, res) => {
    try {
        const { codigo, fecha, horaInicio, estudiantes } = req.body;
        // Lógica para registrar la asistencia
        res.send("Asistencia registrada exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { codigo, fecha, horaInicio, estudiantes } = req.body;
        // Lógica para modificar la asistencia
        res.send("Asistencia modificada exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; */

