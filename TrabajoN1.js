const readline = require("readline");

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu(){
    console.log("1. Buscar tarea");
    console.log("2. Cambiar estado de una tarea");
    console.log("3. Crear tarea");
    console.log("4. Salir");
}

function menuBuscar(){
    console.log("[1] Ver todas las tareas");
    console.log("[2] Ver tareas pendientes");
    console.log("[3] Ver tareas en curso");
    console.log("[4] Ver tareas terminadas");
    console.log("[5] Ver tareas canceladas");
    console.log("[6] Volver al menu principal");
}

function titulosTareas(tareas , estadoEligido) {

    estados = ['todas', 'pendientes', 'en curso', 'terminadas', 'canceladas'];

    console.log("Tareas:");
    tareas.forEach((tarea, index) => {
        if(tareas.estado.toLowerCase() == estadoEligido  && estadoEligido != 'todas'){
        console.log(`[${index + 1}]. ${tarea.titulo} - Estado: ${tarea.estado}`);
        }
        else if (estadoEligido == 'todas'){
            console.log(`[${index + 1}]. ${tarea.titulo} - Estado: ${tarea.estado}`);
        }
    });
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


function crearTareaPorTeclado(titulo,tareas , ESTADOS, DIFICULTADES) {
    let tarea = {
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        fechaCreacion: new Date(),
        vencimiento: null,
        dificultad: 1, // 1: fácil, 2: medio, 3: difícil
        ultimaEdicion: new Date(),

    };

    rl.question('Título de la tarea: ', (titulo) => {
        if (!titulo.trim()) {
            console.log("El título no puede estar vacío.");
            bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
            return;
        }
        else if (titulo.length > 101) {
            console.log("El título no puede tener más de 100 caracteres.");
            bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
            return;
        }
        tarea.titulo = titulo;
        rl.question('Descripción (opcional): ', (descripcion) => {

            if(descripcion.length > 501) {
                console.log("La descripción no puede tener más de 500 caracteres.");
                bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                return;
            }

            tarea.descripcion = descripcion;

            tareas.push(tarea);
            console.log("Tarea creada exitosamente.");

            bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);

        });
    });

    
}





const bloqueTrabajo = function (tareas, ESTADOS, DIFICULTADES){

    menu();

    rl.question("Ingrese una opcion: ", (opcion) =>{
       opcion = parseInt(opcion);

       if (typeof opcion !== 'number'){
        console.log("Opcion no valida");
        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
       }

        switch(opcion){
            case 1:
                if(tareas.length === 0){
                    console.log("No hay tareas para mostrar.");
                    bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                    break;
                }

                menuBuscar();
                rl.question("Ingrese una opcion: ", (opcion) =>{
                    if (isNaN(opcion)){
                        console.log("Opcion no valida");
                        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                    }
                    opcion = parseInt(opcion);
                    if (opcion < 1 || opcion > 6){
                        console.log("Opcion no valida");
                        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                    }
                    titulosTareas(tareas , estados[opcion - 1]);
                });
                        
            break;

            case 2:
                if (tareas.length === 0) {
                    console.log("No hay tareas para mostrar.");
                    bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                    break;
                }



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
                
           crearTareaPorTeclado(tareas , ESTADOS, DIFICULTADES);

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

    bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);


}


main();