const { escape } = require("querystring");
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


function editar (tarea ,tareas , ESTADOS , DIFICULTADES){
    console.log(`ESTA EDITANDO LA TAREA ${tarea.titulo}\n`);

    console.log("Que desea modificar ? \n\n");


    console.log("[1] Descripcion ");
    console.log("[2] Estado");
    console.log("[3] Dificultad");
    console.log("[4] Vencimiento");
    console.log("[5] Volver al menu principal");
    
    rl.question("", (op)=>{

        if(isNaN(op) || (op<1 || op>5) ){
            console.log("Ha ingresado una opcion incorrecta \n\n")
            editar(tarea , tareas , ESTADOS, DIFICULTADES);
        }

        else{
			op = parseInt(op);
            switch(op){

                case 1:
                    rl.question("Ingrese la nueva descripcion de la tarea" , (NewDescrip) =>{

                        NewDescrip.toLocaleString;

                        tarea.descripcion = NewDescrip;

                        console.log("Volviendo al menu principal");

                        tarea.ultimaEdicion = new Date();

                        bloqueTrabajo(tareas,ESTADOS,DIFICULTADES);
                        
                    });

                    break;
                
                case 2 : 
                    
                    console.log(`los estados disponibles son` )
                    for ( i = 0 ; ESTADOS[i] != undefined ; i++){

                        console.log(`[${i+1}] ${ESTADOS[i]}`)

                    }
                    
                    rl.question("Ingrese el nuevo estado de la tarea" , (newEstado) =>{



                        if(isNaN(newEstado) || (newEstado < 0 || newEstado > 4) ){

                            console.log("Volviendo al menu de edicion");

                            editar(tarea, tareas , ESTADOS , DIFICULTADES);

                        }

                        tarea.estado = ESTADOS[newEstado-1];

                        console.log("Volviendo al menu principal");

                        tarea.ultimaEdicion = new Date();

                        bloqueTrabajo(tareas,ESTADOS,DIFICULTADES);
                        
                    });
                    break;
                    case 3 :
                    console.log(`Las dificultades posibles son:`);
                    for (var key in DIFICULTADES) {
                        if (DIFICULTADES.hasOwnProperty(key)) {
                            console.log(`[${key}] ${DIFICULTADES[key]}`);
                        }
                    }


                    rl.question("Elija la dificultad ", (newDificulty) => {

                        if(isNaN(newDificulty) || (newDificulty < 0 || newDificulty > 3 ) ){

                        console.log("Volviendo al menu de edicion");

                        editar(tarea, tareas , ESTADOS , DIFICULTADES);

                        }
                        else{

                            tarea.dificultad = DIFICULTADES[newDificulty];

                            console.log("Volviendo al menu principal");

                            tarea.ultimaEdicion = new Date();

                            bloqueTrabajo(tareas,ESTADOS,DIFICULTADES);

                        }

                    });

                break;
                case 4:
                    rl.question("Ingrese la nueva fecha de vencimiento (formato: AAAA-MM-DD) ", (newDate) => {

                        let fecha = new Date(newDate);
                        if (isNaN(fecha.getTime())) {
                            console.log("Fecha no válida. Volviendo al menú de edición.");
                            editar(tarea, tareas, ESTADOS, DIFICULTADES);
                            return;
                        }   
                        tarea.vencimiento = fecha;
                        console.log("Fecha de vencimiento actualizada.");
                        tarea.ultimaEdicion = new Date();
                        bloqueTrabajo(tareas, ESTADOS, DIFICULTADES);
                    });
                break;
                case 5:
                    bloqueTrabajo(tareas,ESTADOS,DIFICULTADES);
            }
        }
    });

}



function titulosTareas(tareas , estadoEligido, ESTADOS, DIFICULTADES) {
   console.log(`\nTAREAS`);
   let tarea;
   let a=0;
	for(let i=0; i < tareas.length; i++) {
        tarea = tareas[i];
		if (tarea.estado.toLowerCase() == estadoEligido) {
			console.log(`[${i + 1}]. ${tarea.titulo}`);
            a++;
		}else if (estadoEligido == 'todas'){
            console.log(`[${i + 1}]. ${tarea.titulo}`);
            a++;
        }
	}
    if(a!=0){
        rl.question("ingrese el nombre de la tarea para ver su detalle\n",(i)=>{
		tarea=buscarTarea(tareas, i)
		if (tarea) {
			
            mostrarDetalle(tarea, DIFICULTADES);

	        rl.question("Ingrese E para editar una tarea o 0 para volver al menu principal\n", (input) => {
		        if (input.toLowerCase() === 'e') {

                    editar(tarea, tareas,ESTADOS,DIFICULTADES);
			
		        } else{
			    bloqueTrabajo(tareas, ESTADOS, DIFICULTADES);
		        }
	        });
 
		} else {
			console.log("Dato de tarea inválido. Volviendo al menu");
            bloqueTrabajo(tareas, ESTADOS, DIFICULTADES);
		}
	});
    }else{
        console.log("No hay tareas de ese estado para mostrar");
        bloqueTrabajo(tareas, ESTADOS, DIFICULTADES);
    }
	
	
}

function mostrarDetalle(tarea, DIFICULTADES) {
    console.log('Título:', tarea.titulo);
    console.log('Descripción:', tarea.descripcion);
    console.log('Estado:', tarea.estado);
    console.log('Fecha de creación:', tarea.fechaCreacion.toLocaleString());
    console.log('Vencimiento:', tarea.vencimiento.toLocaleString() || "No establecido");
    console.log('Dificultad:', DIFICULTADES[tarea.dificultad]|| DIFICULTADES[1]);
}

function buscarTarea(tareas, titulo) {
    return tareas.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
}; // funcion que se ejecuta en el caso 2 de el switch


function cambiarEstado(tarea, nuevoEstado) {
   
        tarea.estado = nuevoEstado;
		console.log("Estado actualizado:");
		

} 




function crearTareaPorTeclado(tareas, ESTADOS, DIFICULTADES) {
    let tarea = {
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        fechaCreacion: new Date(),
        vencimiento: "",
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
                    return;
                }

                menuBuscar();
                rl.question("Ingrese una opcion: ", (opcion) =>{
                    if (isNaN(opcion)){
                        console.log("Opcion no valida");
                        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
						return;
                    }
                    opcion = parseInt(opcion);
                    if (opcion < 1 || opcion > 6){
                        console.log("Opcion no valida");
                        bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);    
                    }
                    if(opcion == 1){
                            titulosTareas(tareas , "todas", ESTADOS, DIFICULTADES);
                    }
                    else{
                        titulosTareas(tareas , ESTADOS[opcion - 2], ESTADOS, DIFICULTADES);
                    }
                    
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
                                mostrarDetalle(tarea,DIFICULTADES);
                                bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                            }else{
                                console.log("Estado no válido. No se realizaron cambios.");
                                bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);
                            }});
                    } else {
                        console.log("Tarea no encontrada");
						bloqueTrabajo(tareas , ESTADOS, DIFICULTADES);

                    }
                    
                });

            break;

            case 3:
                
           crearTareaPorTeclado(tareas, ESTADOS, DIFICULTADES);

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