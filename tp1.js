const readline = require("readline");

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

bloqueTrabajo = function (tareas , ESTADOS, DIFICULTADES){
    menu();
        
    rl.question("Ingrese una opcion: ", (opcion) =>{
       opcion = parseInt(opcion);

       if (isNaN(opcion) && opcion < 1 && opcion > 4){
        console.log("Opcion no valida");
        //bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
       }

        switch(opcion){
            case 1:
                IngresarDatos(function(tarea) {
                // Aquí recibimos la tarea creada y la agregamos al arreglo
                tareas.push(tarea);
                console.log("\nTarea creada:");
                bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                },tareas);
                
            break;
            case 2:
                 rl.question("Ingrese el titulo de la tarea a buscar: ", (titulo) =>{
                    let tarea = buscarTarea(tareas, titulo);    
                    if (tarea) {
                        console.log("\nTarea encontrada:");
                        rl.question("Ingrese el nuevo estado (pendiente, en curso, terminada, cancelada): ", (nuevoEstado) => {
                            if (ESTADOS.includes(nuevoEstado)) {
                                cambiarEstado(tarea, nuevoEstado,ESTADOS);
                                console.log("Estado actualizado:");
                                mostrarDetalle(tarea,DIFICULTADES);
                                bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
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
                        mostrarDetalle(tarea,DIFICULTADES);
                        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
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
//Crea menu
function menu(){
    console.log("1. Crear tarea");
    console.log("2. Cambiar estado de una tarea");
    console.log("3. Buscar tarea");
    console.log("4. Salir");
}
// Crear tarea
function crearTarea(titulo, opciones = {}) {
    let ahora = new Date();
    let tarea = {
        titulo: titulo,
        descripcion: opciones.descripcion || "",
        estado: "pendiente",
        fechaCreacion: ahora,
        vencimiento: opciones.vencimiento || null,
        dificultad: opciones.dificultad || 1 // 1: fácil, 2: medio, 3: difícil
    };
    
    return tarea;
}

 // Mostrar detalle de una tarea
function mostrarDetalle(tarea, DIFICULTADES) {
    console.log("Título:", tarea.titulo);
    console.log("Descripción:", tarea.descripcion);
    console.log("Estado:", tarea.estado);
    console.log("Fecha de creación:", tarea.fechaCreacion.toLocaleString());
    console.log("Vencimiento:", tarea.vencimiento? tarea.vencimiento.toLocaleString(): "No especificado");
    console.log("Dificultad:", DIFICULTADES[tarea.dificultad] || DIFICULTADES[1]);
}    
function IngresarDatos(callback,tareas) {
    // Pregunta el título
        rl.question("Título de la tarea: ", (titulo)=> {
            
            if(buscarTarea(tareas, titulo)) {
                console.log("Ya existe una tarea con ese título. Intenta con otro.");
                return IngresarDatos(callback,tareas); // Vuelve a pedir el título
            }else{
                rl.question("Descripción (opcional): ", (descripcion) => {
                rl.question("Vencimiento (AAAA-MM-DD, opcional): ", (vencimientoStr) => {
                    rl.question("Dificultad (1: fácil, 2: medio, 3: difícil)(opcional): ", (dificultadStr) => {
                        let opciones = {};
                        opciones.descripcion = descripcion;
                        opciones.dificultad = parseInt(dificultadStr) || 1;// se pasa entero o si no puso nada queda 1
                        opciones.vencimiento = vencimientoStr ? new Date(vencimientoStr) : null;//se pasa a un dato Date si se ingresa algo
                        let tarea = crearTarea(titulo, opciones);
                        //rl.close();//cierra  la interfaz
                        callback(tarea);//empieza hacer uso de function(tareas)
                    });
                });
                });
            }            
        });
    };
function buscarTarea(tareas, titulo) {
    return tareas.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
};
function cambiarEstado(tarea, nuevoEstado,ESTADOS) {
    if (ESTADOS.includes(nuevoEstado)) {
        tarea.estado = nuevoEstado;
    }
}
function main() {
    //array dinamico
    let tareas = [];
    // Estados posibles
    const ESTADOS = ["pendiente", "en curso", "terminada", "cancelada"];
    // Dificultad y su representación
    const DIFICULTADES = {
        1: "🙂 Fácil",
        2: "😬 Medio",
        3: "😡 Difícil"
    };

    bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);

       
}

main();