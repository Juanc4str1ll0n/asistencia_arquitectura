let estudiantes = [];

// Función para guardar un estudiante nuevo
function guardarEst() {
  const nombres = document.getElementById("nombresAgregar").value.trim();
  const tipoId = document.getElementById("tipoIdAgregar").value.trim();
  const numeroId = document.getElementById("numeroIdAgregar").value.trim();

  if (!nombres || !tipoId || !numeroId) {
    alert("Por favor, llena todos los campos para agregar estudiante.");
    return;
  }

  // Verificar si el estudiante ya existe por número de documento
  const existe = estudiantes.find(est => est.numeroId === numeroId);
  if (existe) {
    alert("El estudiante ya está registrado.");
    return;
  }

  estudiantes.push({ nombres, tipoId, numeroId });
  alert("Estudiante guardado con éxito.");

  // Limpiar campos
  document.getElementById("nombresAgregar").value = "";
  document.getElementById("tipoIdAgregar").value = "";
  document.getElementById("numeroIdAgregar").value = "";
  mostrarEstudiantes();
}

// Función para editar estudiante existente
function editarEst() {
  const numeroIdBuscar = document.getElementById("numeroIdEditar").value.trim();
  const nuevosNombres = document.getElementById("nuevosNombresEditar").value.trim();
  const nuevoTipoId = document.getElementById("tipoIdEditar").value.trim();

  if (!numeroIdBuscar || !nuevosNombres || !nuevoTipoId) {
    alert("Por favor, llena todos los campos para modificar estudiante.");
    return;
  }

  const index = estudiantes.findIndex(est => est.numeroId === numeroIdBuscar);

  if (index === -1) {
    alert("Estudiante no encontrado para modificar.");
    return;
  }

  estudiantes[index].nombres = nuevosNombres;
  estudiantes[index].tipoId = nuevoTipoId;

  alert("Estudiante modificado con éxito.");

  // Limpiar campos
  document.getElementById("numeroIdEditar").value = "";
  document.getElementById("nuevosNombresEditar").value = "";
  document.getElementById("tipoIdEditar").value = "";

  mostrarEstudiantes();
}

// Función para mostrar estudiantes (solo para verificar)
function mostrarEstudiantes() {
  const parrafo = document.getElementById("parrafo");
  if (estudiantes.length === 0) {
    parrafo.innerText = "No hay estudiantes registrados.";
    return;
  }
  let texto = "Estudiantes registrados:\n";
  estudiantes.forEach(est => {
    texto += `- ${est.nombres} | ${est.tipoId} | ${est.numeroId}\n`;
  });
  parrafo.innerText = texto;
}

// Inicializar lista vacía al cargar
mostrarEstudiantes();
