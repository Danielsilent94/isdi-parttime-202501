//Declaramos dos arrays identicos

var arrTest = ['Iron Man', 'Thor', 'Hulk', 'Black Widow'];
var arrControl = ['Iron Man', 'Thor', 'Hulk', 'Black Widow'];
var thingToPush = 'Captain America';

//Ejecutamos el método push() nativo de js

var result1 = arrControl.push(thingToPush);

//Creamos función personalizada que hace lo mismo que push() y el return pasa la longitud del array

function myPush(array, elementToPush) {
    array[array.length] = elementToPush;
    return array.length; 
}

//Ejecutamos la función que hemos creado

var result2 = myPush(arrTest, thingToPush);

//Se comparan los resultados de result1 y result2 y si son diferents te lo imprime en consola

console.assert(result1 === result2, 'both functions are different');

//Como ambos arrays hacen lo mismo, se pasa el test y la consola no imprime nada

for (var i = 0; i < arrControl.length; i++) {
    console.assert(arrTest[i] === arrControl[i], `index ${i} is diferent in both arrays. ${arrTest[i]} !== ${arrControl[i]}`);
}
