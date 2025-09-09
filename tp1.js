const readline = require("readline");

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
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
            descripcion: opciones.descripcion || '',
            estado: 'pendiente',
            fechaCreacion: ahora,
            vencimiento: opciones.vencimiento || null,
            dificultad: opciones.dificultad || 1 // 1: fácil, 2: medio, 3: difícil
        };
        
        return tarea;
    }
// Esta función pide los datos de la tarea por teclado y usa un callback para "devolver" la tarea creada
function crearTareaPorTeclado(callback) {
    // Pregunta el título
    rl.question('Título de la tarea: ', function(titulo) {
        // Pregunta la descripción
        rl.question('Descripción (opcional): ', function(descripcion) {
            // Pregunta el vencimiento
            rl.question('Vencimiento (YYYY-MM-DD, opcional): ', function(vencimientoStr) {
                // Pregunta la dificultad
                rl.question('Dificultad (1: fácil, 2: medio, 3: difícil)(opcional): ', function(dificultadStr) {
                    // Armamos el objeto opciones con los datos ingresados
                    let opciones = {};
                    opciones.descripcion = descripcion;
                    opciones.dificultad = parseInt(dificultadStr) || 1;
                    opciones.vencimiento = vencimientoStr ? new Date(vencimientoStr) : null;
                    // Creamos la tarea usando los datos
                    let tarea = crearTarea(titulo, opciones);
                    // Aquí "devolvemos" la tarea usando el callback
                    callback(tarea);
                });
            });
        });
    });
}
function buscarTarea(tareas, titulo) {
    return tareas.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
};
function cambiarEstado(tarea, nuevoEstado) {
    if (ESTADOS.includes(nuevoEstado)) {
        tarea.estado = nuevoEstado;
    }
}
function main() {
    let tareas = [];
    // Estados posibles
    const ESTADOS = ['pendiente', 'en curso', 'terminada', 'cancelada'];
    // Dificultad y su representación
    const DIFICULTADES = {
        1: "🙂 Fácil",
        2: "😬 Medio",
        3: "😡 Difícil"
    };
    menu();
    rl.question("Ingrese una opcion: ", (opcion) =>{
       opcion = parseInt(opcion);

       if (typeof opcion !== 'number'){
        console.log("Opcion no valida");
        main();
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
    // Cambiar estado de una tarea
  

    // Mostrar detalle de una tarea
    function mostrarDetalle(tarea) {
        console.log('Título:', tarea.titulo);
        console.log('Descripción:', tarea.descripcion);
        console.log('Estado:', tarea.estado);
        console.log('Fecha de creación:', tarea.fechaCreacion.toLocaleString());
        console.log('Vencimiento:', tarea.vencimiento.toLocaleString());
        console.log('Dificultad:', DIFICULTADES[tarea.dificultad] || DIFICULTADES[1]);
    }

    // Ejemplo de uso con entrada por teclado
    crearTareaPorTeclado(function(tarea) {
        // Aquí recibimos la tarea creada y la agregamos al arreglo
        tareas.push(tarea);
        // Mostramos el detalle de la tarea
        console.log('\nTarea creada:');
        mostrarDetalle(tarea);
        // Cerramos la interfaz de entrada
        rl.close();
    });
}

main();