let departamentoActual = {
  nombre: "Ingenieria de sistemas y computacion "
}

function editarDep() {
    let nuevoDep = document.getElementById("nombre").value.trim();
    
    if (nuevoDep === "") {
        alert("Ingrese un departamento");
    } else {
        departamentoActual.nombre = nuevoDep;
        alert("Actualizado con éxito");
    }
}

function consultarDep(){
  document.getElementById("nombre").value = departamentoActual.nombre
}