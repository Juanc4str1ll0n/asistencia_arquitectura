/* exports.consultar = async (req, res) => {
    try {
        const { codigo, grupo, semestre } = req.query;
        // Aquí va la lógica para consultar una asignatura específica
        res.json({
            nombre: "Nombre de la asignatura",
            codigo,
            grupo,
            semestre
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ingresar = async (req, res) => {
    try {
        const { nombre, codigo, creditos, grupo, semestre } = req.body;
        // Aquí va la lógica para registrar una nueva asignatura
        res.status(201).send("Asignatura registrada exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; */

const { db } = require('../config/firebase'); // Asumiendo que tienes el archivo de configuración
const { collection, doc, getDoc, addDoc, query, where, getDocs } = require('firebase/firestore');

const COLLECTION_NAME = 'asignaturas';

exports.consultar = async (req, res) => {
    try {
        const { codigo, grupo, semestre } = req.query;
        
        if (!codigo) {
            return res.status(400).json({ error: 'El código de la asignatura es requerido' });
        }

        // Crear query para buscar la asignatura
        const asignaturasRef = collection(db, COLLECTION_NAME);
        let q = query(asignaturasRef, where('codigo', '==', codigo));
        
        // Agregar filtros adicionales si se proporcionan
        if (grupo) {
            q = query(q, where('grupo', '==', grupo));
        }
        if (semestre) {
            q = query(q, where('semestre', '==', semestre));
        }

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return res.status(404).json({ 
                error: 'No se encontró la asignatura con los parámetros especificados' 
            });
        }

        // Si hay múltiples resultados, tomar el primero
        const asignaturaDoc = querySnapshot.docs[0];
        const asignatura = {
            id: asignaturaDoc.id,
            ...asignaturaDoc.data()
        };

        res.json(asignatura);
        
    } catch (error) {
        console.error('Error al consultar asignatura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.ingresar = async (req, res) => {
    try {
        const { nombre, codigo, creditos, grupo, semestre } = req.body;
        
        // Validaciones
        if (!nombre || !codigo || !creditos || !grupo || !semestre) {
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: nombre, codigo, creditos, grupo, semestre' 
            });
        }

        // Verificar si ya existe una asignatura con el mismo código, grupo y semestre
        const asignaturasRef = collection(db, COLLECTION_NAME);
        const q = query(
            asignaturasRef, 
            where('codigo', '==', codigo),
            where('grupo', '==', grupo),
            where('semestre', '==', semestre)
        );
        
        const existeSnapshot = await getDocs(q);
        
        if (!existeSnapshot.empty) {
            return res.status(409).json({ 
                error: 'Ya existe una asignatura con ese código, grupo y semestre' 
            });
        }

        // Crear el objeto de la nueva asignatura
        const nuevaAsignatura = {
            nombre: nombre.trim(),
            codigo: codigo.trim(),
            creditos: parseInt(creditos),
            grupo: grupo.trim(),
            semestre: semestre.trim(),
            fechaCreacion: new Date(),
            activa: true
        };

        // Guardar en Firestore
        const docRef = await addDoc(collection(db, COLLECTION_NAME), nuevaAsignatura);
        
        res.status(201).json({
            mensaje: 'Asignatura registrada exitosamente',
            id: docRef.id,
            asignatura: nuevaAsignatura
        });
        
    } catch (error) {
        console.error('Error al registrar asignatura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función adicional para obtener todas las asignaturas (útil para listados)
exports.listar = async (req, res) => {
    try {
        const { semestre, activa } = req.query;
        
        const asignaturasRef = collection(db, COLLECTION_NAME);
        let q = asignaturasRef;
        
        // Aplicar filtros si se proporcionan
        if (semestre) {
            q = query(q, where('semestre', '==', semestre));
        }
        
        if (activa !== undefined) {
            const activaBool = activa === 'true';
            q = query(q, where('activa', '==', activaBool));
        }
        
        const querySnapshot = await getDocs(q);
        const asignaturas = [];
        
        querySnapshot.forEach((doc) => {
            asignaturas.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        res.json({
            total: asignaturas.length,
            asignaturas
        });
        
    } catch (error) {
        console.error('Error al listar asignaturas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para actualizar una asignatura
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, creditos, activa } = req.body;
        
        if (!id) {
            return res.status(400).json({ error: 'ID de la asignatura es requerido' });
        }
        
        const asignaturaRef = doc(db, COLLECTION_NAME, id);
        const asignaturaDoc = await getDoc(asignaturaRef);
        
        if (!asignaturaDoc.exists()) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        
        // Preparar datos a actualizar
        const datosActualizacion = {
            fechaModificacion: new Date()
        };
        
        if (nombre) datosActualizacion.nombre = nombre.trim();
        if (creditos) datosActualizacion.creditos = parseInt(creditos);
        if (activa !== undefined) datosActualizacion.activa = activa;
        
        await updateDoc(asignaturaRef, datosActualizacion);
        
        res.json({
            mensaje: 'Asignatura actualizada exitosamente',
            id,
            datosActualizados: datosActualizacion
        });
        
    } catch (error) {
        console.error('Error al actualizar asignatura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

