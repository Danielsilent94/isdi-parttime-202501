//Juego activo nada más empezar. Puedes salir del juego si pulsas cancelar. tienes 5 vidas.
//Te pregunta una letra, te va a validar si es una letra o no. Es indiferente si es Mayus o minus.
//Si no es una letra, no da fallo. Si es una letra que no está, resta una vida.
//Te muestra con guiones el numero de letras (-----). Sí aciertas una letra, te la pinta en los guiones (--l--)
//Si pierdes no pasa nada y si ganas te da un mensajito.

var word = 'charmander';  
var guessedWordArray = []; 
var guessedWord = ''; 
var lifes = 5; 
var alphabet = 'abcdefghijklmnopqrstuvwxyz'; 
var alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 


for (var i = 0; i < word.length; i++) { 
    if (word[i] === ' ') {
        guessedWordArray[guessedWordArray.length] = ' '; 
    } else {
        guessedWordArray[guessedWordArray.length] = '-'; 
    }
}

guessedWordToString(); 


function validateInputLetter(letter) {
    if (letter.length !== 1 || letter === ' ') { 
        alert('Make sure you put a single letter');
        return;
    }
    for (var i = 0; i < alphabet.length; i++) { 
        if (letter === alphabet[i] || letter === alphabetUpper[i]) { 
            return alphabet[i]; 
        }
    }
    return; 
}


function checkLetterIncluded(letter) { 
    var isLetterInWord = false; 
    for (var i = 0; i < word.length; i++) { 
        if (letter === word[i]) { 
            isLetterInWord = true; 
            guessedWordArray[i] = letter; 
        }
    }
    if (!isLetterInWord) { 
        lifes--; 
    }
}


function guessedWordToString() { 
    guessedWord = ''; 
    for (var i = 0; i < guessedWordArray.length; i++) { 
        guessedWord += guessedWordArray[i]; 
    }
}


alert('Welcome to the Hangman game, try to guess the word!');


while (guessedWord !== word && lifes !== 0) {
    var guessedLetter = prompt(`This is all you know about the word so far: \n   ${guessedWord} \nYou have ${lifes} lifes`);
    
    if (guessedLetter === null) { 
        lifes = 0; 
        alert('Ok, bye');
    } else {
        var validatedLetter = validateInputLetter(guessedLetter); 
        if (validatedLetter !== undefined) { 
            checkLetterIncluded(validatedLetter); 
            guessedWordToString(); 
        }
    }
}


if (lifes === 0) {
    alert('Ooooh! You lose, better luck next time');
}

if (guessedWord === word) {
    alert(`Congrats, you win! The word was: ${word}`);
}
