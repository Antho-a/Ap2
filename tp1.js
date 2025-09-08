const readline = require("readline");

// Crear interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
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
            rl.question('Vencimiento (YYYY-MM-DD HH:MM, opcional): ', function(vencimientoStr) {
                // Pregunta la dificultad
                rl.question('Dificultad (1: fácil, 2: medio, 3: difícil): ', function(dificultadStr) {
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

    
    tareas.push(crearTarea('Título de la tarea', { descripcion: 'Texto de la descripción' }));
    // Cambiar estado de una tarea
    function cambiarEstado(tarea, nuevoEstado) {
        if (ESTADOS.includes(nuevoEstado)) {
            tarea.estado = nuevoEstado;
        }
    }

    // Mostrar detalle de una tarea
    function mostrarDetalle(tarea) {
        console.log('Título:', tarea.titulo);
        if (tarea.descripcion) console.log('Descripción:', tarea.descripcion);
        console.log('Estado:', tarea.estado);
        console.log('Fecha de creación:', tarea.fechaCreacion.toLocaleString());
        if (tarea.vencimiento) console.log('Vencimiento:', tarea.vencimiento.toLocaleString());
        console.log('Dificultad:', DIFICULTADES[tarea.dificultad] || DIFICULTADES[1]);
    }

    // Ejemplo de uso
    let t1 = crearTarea('Estudiar para el examen', {
        descripcion: 'Repasar los temas de la unidad 2',
        vencimiento: new Date('2025-09-10T23:59:00'),
        dificultad: 2
    });
    let t2 = crearTarea('Comprar materiales');
    cambiarEstado(t1, 'en curso');
    mostrarDetalle(t1);
    mostrarDetalle(t2);
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