//Rehacemos el código del HangMan pero más limpio y optimizado

var word = 'charmander';  
var guessedWordArray = Array(word.length).fill('-'); //Crea un array con la misma longitud que word y lo llena de guiones
var guessedWord = ''; 
var lifes = 5; 
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Convertimos guessedWordArray a string
function updateGuessedWord() { 
    guessedWord = guessedWordArray.join(''); //Evita el bucle for
}

// Inicializamos el guessedWordArray respetando los espacios
for (var i = 0; i < word.length; i++) { 
    if (word[i] === ' ') guessedWordArray[i] = ' '; 
}
updateGuessedWord();

// Validamos que la entrada sea una letra válida
function validateInputLetter(letter) {
    letter = letter.toLowerCase(); // Convertimos a minúscula directamente
    if (letter.length !== 1 || !alphabet.includes(letter)) {
        alert('Make sure you put a single letter');
        return null;
    }
    return letter;
}

// Verificamos si la letra está en la palabra y actualizar guessedWordArray
function checkLetterIncluded(letter) { 
    if (word.includes(letter)) {
        for (var i = 0; i < word.length; i++) {
            if (word[i] === letter) guessedWordArray[i] = letter; 
        }
    } else {
        lifes--; 
    }
}

alert('Welcome to the Hangman game, guess a word or die on the 5th attempt!');

while (guessedWord !== word && lifes > 0) {
    var guessedLetter = prompt(`This is all you know about the word so far: \n   ${guessedWord} \nYou have ${lifes} lifes`);
    
    if (guessedLetter === null) {
        lifes = 0;
        alert('Well, you lose it. BYE!');
        break;
    }
    
    var validatedLetter = validateInputLetter(guessedLetter);
    if (validatedLetter) {
        checkLetterIncluded(validatedLetter);
        updateGuessedWord();
    }
}

alert(lifes > 0 ? `Congratulations, you win! The word was: ${word}` : 'You are a LOOSER. You better go home.');