// 🔁 Obtener asignaturas desde localStorage
function obtenerAsignaturas() {
  const data = localStorage.getItem("asignaturas");
  return data ? JSON.parse(data) : [];
}

// 💾 Guardar asignaturas en localStorage
function guardarAsignaturas(asignaturas) {
  localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
}

// ✅ Crear o actualizar una asignatura
function guardarAsignatura() {
  const nombre = document.getElementById("nombreAsig").value.trim();
  const grupo = document.getElementById("grupoAsig").value.trim();
  const codigo = document.getElementById("codigoAsig").value.trim();
  const semestre = document.getElementById("semestreAsig").value.trim();
  const creditos = parseInt(document.getElementById("creditosAsig").value);

  if (!nombre || !grupo || !codigo || !semestre || isNaN(creditos)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const asignaturas = obtenerAsignaturas();
  const index = asignaturas.findIndex(
    (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
  );

  if (index !== -1) {
    alert("Ya existe una asignatura con esos datos.");
    return;
  }

  asignaturas.push({ nombre, grupo, codigo, semestre, creditos });
  guardarAsignaturas(asignaturas);
  alert("Asignatura guardada correctamente.");
}

// ✏️ Modificar asignatura
function modificarAsignatura() {
  const codigo = document.getElementById("codAsigEdit").value.trim();
  const grupo = document.getElementById("grupoAsigEdit").value.trim();
  const semestre = document.getElementById("semestreAsigEdit").value.trim();
  const nuevoNombre = document.getElementById("nuevoNombreAsig").value.trim();
  const nuevosCreditos = parseInt(document.getElementById("nuevosCreditosAsig").value);

  if (!codigo || !grupo || !semestre || !nuevoNombre || isNaN(nuevosCreditos)) {
    alert("Completa todos los campos para modificar.");
    return;
  }

  const asignaturas = obtenerAsignaturas();
  const index = asignaturas.findIndex(
    (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
  );

  if (index === -1) {
    alert("Asignatura no encontrada.");
    return;
  }

  asignaturas[index].nombre = nuevoNombre;
  asignaturas[index].creditos = nuevosCreditos;

  guardarAsignaturas(asignaturas);
  alert("Asignatura modificada correctamente.");
}

// 🔎 Consultar asignatura
function consultarAsignatura() {
  const codigo = document.getElementById("codigoAsigBuscar").value.trim();
  const grupo = document.getElementById("grupoAsigBuscar").value.trim();
  const semestre = document.getElementById("semestreAsigBuscar").value.trim();

  if (!codigo || !grupo || !semestre) {
    alert("Completa todos los campos para consultar.");
    return;
  }

  const asignaturas = obtenerAsignaturas();
  const asignatura = asignaturas.find(
    (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
  );

  const info = document.getElementById("infoAsig");

  if (asignatura) {
    info.textContent = `Nombre: ${asignatura.nombre} | Créditos: ${asignatura.creditos}`;
  } else {
    info.textContent = "";
    alert("Asignatura no encontrada.");
  }
}

