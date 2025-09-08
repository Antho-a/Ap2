let readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,   
  output: process.stdout, 
});


function menuNumero2(num1){
    console.log("Seleccione el numero de la operacion: ");
    console.log("1. Suma");
    console.log("2. Resta");
    console.log("3. Multiplicacion");
    console.log("4. Division");
    console.log("5. Salir"); 

    rl.question("Ingrese una opcion: ", (opcion) =>{
       opcion = parseInt(opcion);

       if (typeof opcion !== 'number'){
        console.log("Opcion no valida");
        menuNumero2(num1);
       }

        if (opcion < 1 || opcion > 5){
        console.log("Opcion no valida");
        menuNumero2(num1);
        } 

        switch(opcion){
            case 1:
                rl.question("Ingrese el numero que va a sumar con " + num1 + ": ", (num2) =>{
                    num2 = parseFloat(num2);
                    if (isNaN(num2)) {
                    console.log("El valor ingresado no es un número");
                    menuNumero2(num1);
                    return;
                    }
                    menuNumero2(suma(num1, num2));
                });
                break;
            case 2:
                rl.question("Ingrese el numero que va a restar con " + num1 + ": ", (num2) =>{
                    num2 = parseFloat(num2);
                    if (isNaN(num2)) {
                        console.log("El valor ingresado no es un número");
                        menuNumero2(num1);
                        return;
                    }
                    menuNumero2(resta(num1, num2));
                });
                break;
            case 3:
                rl.question("Ingrese el numero que va a multiplicar con " + num1 + ": ", (num2) =>{
                    num2 = parseFloat(num2);
                    if (isNaN(num2)) {
                        console.log("El valor ingresado no es un número");
                        menuNumero2(num1);
                        return;
                    }
                    menuNumero2(multiplicacion(num1, num2));
                });
                break;
            case 4:
                rl.question("Ingrese el numero que va a dividir con " + num1 + ": ", (num2) =>{
                    num2 = parseFloat(num2);
                    if (isNaN(num2)) {
                        console.log("El valor ingresado no es un número");
                        menuNumero2(num1);
                        return;
                    }
                    let resultado = division(num1, num2);
                    if (resultado != null){
                        menuNumero2(resultado);
                    } else {
                        menuNumero2(num1);
                    }
                });
                break;
            case 5:
                console.log("Gracias por usar la calculadora");
                rl.close();
                break; 
        };            
    }
    );
}

function suma(num1, num2){

    let resultado = num1 + num2;

    console.log("El resultado de la suma es: " + resultado);

    return resultado;

} 

function resta(num1, num2){
    let resultado = num1 - num2;
    console.log("El resultado de la resta es: " + resultado);
    return resultado;
}

function multiplicacion(num1, num2){
    let resultado = num1 * num2;
    console.log("El resultado de la multiplicacion es: " + resultado);
    return resultado;

}

function division(num1, num2){  
    if (num2 == 0){
        console.log("No se puede dividir entre 0");
        return null;
    }
    
    let resultado = num1 / num2;
    console.log("El resultado de la division es: " + resultado);
    return resultado;
}


const main = function (){

    console.log("Bienvenido a la calculadora");

    rl.question("Ingrese el numero que le hara una operacion ", (num1) =>{

        num1 = parseFloat(num1);

        if (typeof num1 !== 'number'){
            console.log("El valor ingresado no es un numero");
            main();
        } 
    
        menuNumero2(num1);
        }
        
    );
    
}



main();











