function guessNumber() {
    var number = Math.floor(Math.random() * 10) + 1; 
     while (guess !== number) {
        guess = prompt('¿En qué número crees que estoy pensando? (1-10)');
        if (guess === null || guess === '') {
            alert('Por favor, ingresa un número.');
            continue; 
        }

        guess = Number(guess); 

        if (guess === number) {
            alert('¡Enhorabuena! Has adivinado el número.');
        } else {
            alert('Buuuh! Perdedor!');
        }
    }
}

var isGameOn = confirm('¿Quieres jugar a un juego?');

if (isGameOn) {
    guessNumber();
} else {
    alert('Pues vete.');
}
