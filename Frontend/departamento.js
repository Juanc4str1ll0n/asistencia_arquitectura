// Dirección base según el nombre de tu función en Netlify
const URL_BASE = "../netlify/functions/departamento";

// Función para consultar el nombre del departamento
async function consultarDep() {
  try {
    const response = await fetch(URL_BASE);
    if (!response.ok) throw new Error("Error al consultar el departamento");

    const data = await response.json();
    document.getElementById("nombre").value = data.nombre;
    alert("Consulta exitosa: " + data.nombre);
  } catch (error) {
    console.error("Error consultando:", error);
    alert("Hubo un problema al consultar el departamento");
  }
}

// Función para editar el nombre del departamento
async function editarDep() {
  const nuevoNombre = document.getElementById("nombre").value.trim();

  if (!nuevoNombre) {
    alert("Por favor ingresa un nombre válido");
    return;
  }

  try {
    const response = await fetch(URL_BASE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });

    if (!response.ok) throw new Error("Error al modificar el departamento");

    const data = await response.json();
    alert("Departamento actualizado: " + data.nombre);
  } catch (error) {
    console.error("Error editando:", error);
    alert("Hubo un problema al modificar el departamento");
  }
}



// function editarDep() {
//   const nuevoDep = document.getElementById("nombre").value;

//   if (!nuevoDep || nuevoDep.trim() === "") {
//     alert("Ingrese un departamento");
//     return;
//   }

//   //PARAEMTRO DEL CODIGO DEL DEPARTAMENTO
//   fetch('/.netlify/functions/departamento', {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ nombre: nuevoDep }),
//   })
//   .then(res => {
//     if (!res.ok) return res.text().then(text => { throw new Error(text) });
//     return res.json();
//   })
//   .then(data => {
//     alert(data.mensaje);
//   })
//   .catch(err => {
//     alert("Error al actualizar: " + err.message);
//     console.error(err);
//   });
// }

// //esto
// function consultarDep() {
//   fetch('/.netlify/functions/departamento')
//     .then(res => {
//       if (!res.ok) {
//         throw new Error("No se pudo consultar el departamento");
//       }
//       return res.json();
//     })
//     .then(data => {
//       // Cargar el nombre actual directamente en el input
//       document.getElementById("nombre").value = data.nombre;
//     })
//     .catch(err => {
//       alert("Error al consultar departamento");
//       console.error(err);
//     });
// }

// function consultarEstudiantePorId() {
//   const documento = document.getElementById("documento").value.trim();

//   if (!documento) {
//     alert("Por favor ingresa un documento para consultar.");
//     return;
//   }

//   const datos = localStorage.getItem("estudiantes");
//   if (!datos) {
//     alert("No hay estudiantes registrados.");
//     return;
//   }

//   const estudiantes = JSON.parse(datos);
//   const estudiante = estudiantes.find(est => est.numeroId === documento);

//   if (estudiante) {
//     alert(`Estudiante encontrado:\nNombres: ${estudiante.nombres}\nTipo de ID: ${estudiante.tipoId}\nNúmero: ${estudiante.numeroId}`);
//   } else {
//     alert("Estudiante no encontrado en la facultad.");
//   }
// }

