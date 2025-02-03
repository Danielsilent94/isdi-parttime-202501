function guessNumber() {
    var number = Math.floor(Math.random() * 10) + 1; 
    var guess = prompt('¿En qué número crees que estoy pensando? (1-10)');

     while (guess !== number) {
        
        if (guess === null || guess === '') {
            alert('Por favor, ingresa un número.');
            continue; 
        }

        guess = Number(guess); 

        if (guess === number) {
            alert('¡Enhorabuena! Has adivinado el número.');
            guess;
        } else {
            alert('Buuuh! Perdedor!');
            guess;
        }
    }
}

var isGameOn = confirm('¿Quieres jugar a un juego?');

if (isGameOn) {
    guessNumber();
} else {
    alert('Pues vete.');
}
