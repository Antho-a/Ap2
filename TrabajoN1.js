const readline = require("readline");

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu(){
    console.log("1. Crear tarea");
    console.log("2. Cambiar estado de una tarea");
    console.log("3. Buscar tarea");
    console.log("4. Salir");
}

function buscarTarea(tareas, titulo) {
    return tareas.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
}; // funcion que se ejecuta en el caso 2 de el switch


function cambiarEstado(tarea, nuevoEstado) {
    if (ESTADOS.includes(nuevoEstado)) {
        tarea.estado = nuevoEstado;
    }
} 

function mostrarDetalle(tarea) {
    console.log('Título:', tarea.titulo);
    console.log('Descripción:', tarea.descripcion);
    console.log('Estado:', tarea.estado);
    console.log('Fecha de creación:', tarea.fechaCreacion.toLocaleString());
    console.log('Vencimiento:', tarea.vencimiento.toLocaleString());
    console.log('Dificultad:', DIFICULTADES[tarea.dificultad] || DIFICULTADES[1]);
} 


function crearTarea(titulo, opciones = {}) {
        let ahora = new Date();
        let tarea = {
            titulo: titulo,
            descripcion: opciones.descripcion || '',
            estado: 'pendiente',
            fechaCreacion: ahora,
            vencimiento: opciones.vencimiento || null,
            dificultad: opciones.dificultad || 1 // 1: fácil, 2: medio, 3: difícil
        };
        
    return tarea;
} // funcion que se utilizara en el caso 1 







const bloqueTrabajo = function (tareas , ESTADOS, DIFICULTADES){

    menu();

    rl.question("Ingrese una opcion: ", (opcion) =>{
       opcion = parseInt(opcion);

       if (typeof opcion !== 'number'){
        console.log("Opcion no valida");
        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
       }

        switch(opcion){
            case 1:            
            break;

            case 2:
                 rl.question("Ingrese el titulo de la tarea a buscar: ", (titulo) =>{
                    let tarea = buscarTarea(tareas, titulo);    
                    if (tarea) {
                        console.log("\nTarea encontrada:");
                        rl.question("Ingrese el nuevo estado (pendiente, en curso, terminada, cancelada): ", (nuevoEstado) => {
                            if (ESTADOS.includes(nuevoEstado)) {
                                cambiarEstado(tarea, nuevoEstado);
                                console.log("Estado actualizado:");
                                mostrarDetalle(tarea);
                            }else{
                                console.log("Estado no válido. No se realizaron cambios.");
                            }});
                    } else {
                        console.log("Tarea no encontrada");
                    }
                });
            break;

            case 3:
                rl.question("Ingrese el titulo de la tarea a buscar: ", (titulo) =>{
                    let tarea = buscarTarea(tareas, titulo);    
                    if (tarea) {
                        console.log("\nTarea encontrada:");
                        mostrarDetalle(tarea);
                    } else {
                        console.log("Tarea no encontrada");
                    }
                });
            break;




            case 4:
                console.log("Saliendo...");
                rl.close();
            break;

        };            
    });











}










main = function (){

    let tareas = []; //arreglo el cual contiene las tareas

    const ESTADOS = ['pendiente', 'en curso', 'terminada', 'cancelada']; // arreglo de estados
    
    const DIFICULTADES = { // objeto con las dificultades y su representación
    1: "🙂 Facil",
    2: "😬 Medio",
    3: "😡 Dificil"};










}
