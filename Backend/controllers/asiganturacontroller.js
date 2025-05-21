exports.consultar = async (req, res) => {
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
};

//hola