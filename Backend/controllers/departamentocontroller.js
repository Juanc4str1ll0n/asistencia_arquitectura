exports.consultar = async (req, res) => {
    try {
        // Lógica para consultar el nombre del departamento
        res.json({ nombre: "Nombre del Departamento" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        // Lógica para modificar el nombre del departamento
        res.send("Departamento modificado exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//hola