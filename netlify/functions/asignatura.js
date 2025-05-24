let asignaturas = [];

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);
      const { nombre, grupo, codigo, semestre, creditos } = data;

      if (!nombre || !grupo || !codigo || !semestre || creditos == null) {
        return {
          statusCode: 400,
          body: JSON.stringify({ mensaje: "Faltan campos obligatorios" }),
        };
      }

      const index = asignaturas.findIndex(
        (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
      );

      if (index !== -1) {
        asignaturas[index] = { nombre, grupo, codigo, semestre, creditos };
        return {
          statusCode: 200,
          body: JSON.stringify({ mensaje: "Asignatura modificada con éxito" }),
        };
      }

      asignaturas.push({ nombre, grupo, codigo, semestre, creditos });
      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Asignatura guardada con éxito" }),
      };
    }

    if (event.httpMethod === "GET") {
      const params = event.queryStringParameters;
      const { codigo, grupo, semestre } = params;

      if (!codigo || !grupo || !semestre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ mensaje: "Faltan parámetros para consultar" }),
        };
      }

      const asignatura = asignaturas.find(
        (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
      );

      if (!asignatura) {
        return {
          statusCode: 404,
          body: JSON.stringify({ mensaje: "Asignatura no encontrada" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ asignatura }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ mensaje: "Método no permitido" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: "Error interno", error: error.message }),
    };
  }
};
