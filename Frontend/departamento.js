function editarDep() {
  const nuevoDep = document.getElementById("nombre").value;

  if (!nuevoDep || nuevoDep.trim() === "") {
    alert("Ingrese un departamento");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nuevoDep }),
  })
  .then(res => {
    if (!res.ok) return res.text().then(text => { throw new Error(text) });
    return res.json();
  })
  .then(data => {
    alert(data.mensaje);
  })
  .catch(err => {
    alert("Error al actualizar: " + err.message);
    console.error(err);
  });
}

//esto
function consultarDep() {
  fetch('/.netlify/functions/departamento')
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo consultar el departamento");
      }
      return res.json();
    })
    .then(data => {
      // Cargar el nombre actual directamente en el input
      document.getElementById("nombre").value = data.nombre;
    })
    .catch(err => {
      alert("Error al consultar departamento");
      console.error(err);
    });
}

function consultarEstudiantePorId() {
  const documento = document.getElementById("documento").value.trim();

  if (!documento) {
    alert("Por favor ingresa un documento para consultar.");
    return;
  }

  const datos = localStorage.getItem("estudiantes");
  if (!datos) {
    alert("No hay estudiantes registrados.");
    return;
  }

  const estudiantes = JSON.parse(datos);
  const estudiante = estudiantes.find(est => est.numeroId === documento);

  if (estudiante) {
    alert(`Estudiante encontrado:\nNombres: ${estudiante.nombres}\nTipo de ID: ${estudiante.tipoId}\nNúmero: ${estudiante.numeroId}`);
  } else {
    alert("Estudiante no encontrado en la facultad.");
  }
}

