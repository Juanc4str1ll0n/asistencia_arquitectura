class EstudiantesController{
    constructor(){
    }
    consultar(req,res){
        try{
            let arreglo=[];
            let myObj = {Nombre: "Daniel Esteban", Tipo_Documento: "CC", Codigo: "1077112696"};
            let myObj2 = {Nombre: "Pedro Gónzales", Tipo_Documento: "CC", Codigo: "1037112636"};

            arreglo.push (myObj);
            arreglo.push (myObj2);

            let myJSON = JSON.stringify(arreglo);

            res.status(200).send (myJSON);
        }catch (err){
            res.status(500).send(err.message);
        }
    }
    ingresar(req,res){
        try{
            const {Nombre, Tipo_Documento, Codigo} = req.body;
            console.log ("Documento de identidad: " + Codigo);
            console.log ("Nombre: "+Nombre);
            console.log ("Tipo de Documento: "+ Tipo_Documento);
            res.status(200).send ("Funciono ok");
        }catch (err){
            res.status(500).send(err.message);
        }
    }
}
module.exports = new EstudiantesController();

//hola