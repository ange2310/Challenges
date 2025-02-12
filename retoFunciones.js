//Angelica Marcillo

//Reto: Hacer que la funcion reciba un número y determine si es par o impar

//Regular Functions

function numPar(num){
    if(num%2 == 0){
        console.log(`El número ${num} es par`)
    } else{
        console.log(`El número ${num} es impar`)
    }
}
numPar(7) //Se debe poner un argumento para que funcione- En este caso 7 es impar

const numsPar = (num) => num%2==0 ? `El número ${num} es par` : `El número ${num} es impar`;
console.log(numsPar(4))//Se debe poner un argumento para que funcione- En este caso 4 es par