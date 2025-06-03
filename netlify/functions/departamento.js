
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Importar el controlador directamente para debugging
const departamentoController = require('../../Backend/controllers/departamentocontroller.js');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Log para debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Rutas directas para debugging
app.get('/.netlify/functions/departamento', departamentoController.consultarDepartamento);
app.put('/.netlify/functions/departamento', departamentoController.editarDepartamento);

// Ruta alternativa sin prefijo para testing
app.get('/', departamentoController.consultarDepartamento);
app.put('/', departamentoController.editarDepartamento);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error en departamento function:', err);
  res.status(500).json({ error: err.message });
});

module.exports.handler = serverless(app);


/* const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const departamentoroutes = require('../../Backend/routes/departamentoroutes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('../netlify/functions/departamento', departamentoroutes); // ✅

module.exports.handler = serverless(app); */

// let departamento = { nombre: "Ingeniería de Sistemas y Computación" };

// exports.handler = async (event) => {
//   try {
//     if (event.httpMethod === "GET") {
//       return {
//         statusCode: 200,
//         body: JSON.stringify(departamento),
//       };
//     }

//     if (event.httpMethod === "POST") {
//       if (!event.body) {
//         return { statusCode: 400, body: "Falta el cuerpo de la solicitud" };
//       }

//       let data;
//       try {
//         data = JSON.parse(event.body);
//       } catch (e) {
//         return { statusCode: 400, body: "JSON inválido" };
//       }

//       if (!data.nombre || data.nombre.trim() === "") {
//         return { statusCode: 400, body: "Falta nombre en el cuerpo" };
//       }

//       departamento.nombre = data.nombre.trim();

//       return {
//         statusCode: 200,
//         body: JSON.stringify({ mensaje: "Departamento actualizado con éxito", departamento }),
//       };
//     }

//     return {
//       statusCode: 405,
//       body: "Método no permitido",
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: "Error interno del servidor",
//     };
//   }
// };

// const fs = require("fs");
// const path = require("path");

// const filePath = path.resolve(__dirname, "departamento.txt");

// // Función para leer el valor actual
// function leerDepartamento() {
//   try {
//     return fs.readFileSync(filePath, "utf8") || "Ingeniería de Sistemas y Computación";
//   } catch {
//     return "Ingeniería de Sistemas y Computación";
//   }
// }

// exports.handler = async (event) => {
//   try {
//     if (event.httpMethod === "GET") {
//       const nombre = leerDepartamento();
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ nombre }),
//       };
//     }

//     if (event.httpMethod === "POST") {
//       if (!event.body) {
//         return { statusCode: 400, body: "Falta el cuerpo de la solicitud" };
//       }

//       let data;
//       try {
//         data = JSON.parse(event.body);
//       } catch (e) {
//         return { statusCode: 400, body: "JSON inválido" };
//       }

//       if (!data.nombre || data.nombre.trim() === "") {
//         return { statusCode: 400, body: "Falta nombre en el cuerpo" };
//       }

//       fs.writeFileSync(filePath, data.nombre.trim());

//       return {
//         statusCode: 200,
//         body: JSON.stringify({ mensaje: "Departamento actualizado con éxito", nombre: data.nombre.trim() }),
//       };
//     }

//     return {
//       statusCode: 405,
//       body: "Método no permitido",
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: "Error interno del servidor",
//     };
//   }
// };
