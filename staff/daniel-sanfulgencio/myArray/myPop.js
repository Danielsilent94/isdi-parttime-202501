//Declaro mis variables para comparar pop en array nativo js y array creado por mi

var countriesArray = ['Spain', 'Netherlands', 'Germany', 'USA', 'Argentina', 'Brazil', 'Japan'];
var countriesTest = ['Spain', 'Netherlands', 'Germany', 'USA', 'Argentina', 'Brazil', 'Japan'];
var controlCountries;
var testCountries;

/*Ejecutamos la funcion nativa js para almacenar el contenido eliminado del countriesArray en la variable 
controlCountries */

controlCountries = countriesArray.pop();

//Creamos funcion personalizada que hace lo mismo que haría el método pop()

function myArray(arr) {
    if (arr.length === 0) return undefined;
    var lastValue = arr[arr.length - 1];
    --arr.length;
    return lastValue;
}

/*Ejecutamos la funcion que hemos creado, en la que myArray(countriesTest) hace los mismo que el método pop()
 y lo almacena en testCountries*/

testCountries = myArray(countriesTest);

//Iniciamos los test

console.info('running test'); 

//Se calcula lengthToTest para asegurarse de recorrer el array más largo en caso de diferencias

var lengthToTest = countriesArray.length > countriesTest.length ? countriesArray.length : countriesTest.length;

//Compara elemento por elemento de countriesArray y countriesTest. Si un elemento no coincide, console.assert muestra un error.

for (var i = 0; i < lengthToTest; i++) { // Corregida la condición del for
    console.assert(countriesTest[i] === countriesArray[i],  `index ${i} is diferent in both arrays. ${countriesTest[i]} !== ${countriesArray[i]}`);
}

//Se comparan los elementos eliminados en pop() y en myArray()

console.assert(controlCountries === testCountries, `does not return the correct value. ${controlCountries} !== ${testCountries}`);

//Los dos metodos deberían devolver undefined

console.assert([].pop() === myArray([]), `should return undefined but returns: ${myArray([])}`);






