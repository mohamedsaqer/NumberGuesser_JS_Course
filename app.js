/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listner
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})


// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate 
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        // Check if Won
        if (guess === winningNum) {
            //Game over - won
            gameOver(true, `${winningNum} is correct, you WIN!`);
        } else {
            // Worng number
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //Game over - lost
                gameOver(false, `Sorry, game over, the correct answer was ${winningNum}`);
            } else {
                // Game continue - answer wrong
                setMessage(`${guessInput.value} is not correct, you have ${guessesLeft} guesses left`, 'red');
                guessInput.value = '';
                guessInput.style.borderColor = 'red';
            }
        }
    }
})

// Set Message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;

    setMessage(msg, color);
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
