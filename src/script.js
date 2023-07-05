let currentPlayerMove = '';
let currentComputerMove = '';
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

const MOVESET_BUTTONS = document.querySelectorAll('[data-moveset]');
const PLAYER_MOVE_ICON = document.querySelector('.p-icon');
const COMPUTER_MOVE_ICON = document.querySelector('.c-icon');
const ROUND_RESULT = document.querySelector('.display-result');
const ROUND_SUMMARY = document.querySelector('.display-result-info');
const PLAYER_SCORE = document.querySelector('.player-score');
const COMPUTER_SCORE = document.querySelector('.computer-score');

MOVESET_BUTTONS.forEach((button) => {
    button.addEventListener('click', () => {
        if(gameOver == true) {
            resetGame();
        }
        currentPlayerMove = button.id;
        playRound(currentPlayerMove);
    });
});


/* Resets the display and score once either the player or the 
computer reaches a score of 5. */
function resetGame() {
    ROUND_RESULT.textContent = '';
    ROUND_SUMMARY.textContent = '';
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
}

/* Take the user and computer moves for a single round and 
compare them to find a winner. */
function playRound(playerMove) {
    let result = '';
    currentComputerMove = getComputerChoice();
    updateRoundMovesetIcons(playerMove);

    if(playerMove == 'Rock') {
        if(currentComputerMove == 'Scissors') {
            result = 'win';
        } else if(currentComputerMove == 'Paper') {
            result = 'lose';
        } else {
            result = 'draw';
        }
    } else if(playerMove == 'Paper') {
        if(currentComputerMove == 'Rock') {
            result = 'win';
        } else if(currentComputerMove == 'Scissors') {
            result = 'lose';
        } else {
            result = 'draw';
        }
    } else {
        if(currentComputerMove == 'Paper') {
            result = 'win';
        } else if(currentComputerMove == 'Rock') {
            result = 'lose';
        } else {
            result = 'draw';
        }
    }

    updateRoundResultSummary(result, playerMove);
    updateGameScore(result);
}

/* Updates the score at the end of each round. */
function updateGameScore(roundResult) {
    if(roundResult == 'win') {
        playerScore++;
    } else if(roundResult == 'lose') {
        computerScore++;
    }

    PLAYER_SCORE.textContent = `Player: ${playerScore}`;
    COMPUTER_SCORE.textContent = `Computer: ${computerScore}`;

    checkForWinner(playerScore, computerScore);
}

function checkForWinner(pScore, cScore) {
    if(playerScore === 5) {
        ROUND_RESULT.textContent = 'You won the game!';
        ROUND_SUMMARY.textContent = `The final score was ${pScore} : ${cScore}`;
        gameOver = true;
    } else if(computerScore === 5) {
        ROUND_RESULT.textContent = 'You lost the game!';
        ROUND_SUMMARY.textContent = `The final score was ${cScore} : ${pScore}`;
        gameOver = true;
    }
}

/* Updates the round summary to indicate if the player won or lost 
and how that conclusion was reached. */
function updateRoundResultSummary(roundResult, playerMove) {
    if(roundResult == 'win')  {
        ROUND_RESULT.textContent = 'You win!';
        ROUND_SUMMARY.textContent = `${playerMove} bests ${currentComputerMove}`;
    } else if(roundResult == 'lose') {
        ROUND_RESULT.textContent = 'You lose!';
        ROUND_SUMMARY.textContent = `${currentComputerMove} bests ${playerMove}`;
    } else {
        ROUND_RESULT.textContent = 'Draw!';
        ROUND_SUMMARY.textContent = 'This round is a tie'
    }
}

/* Updates the displayed icon indicating the move for each player 
in the latest round played. */
function updateRoundMovesetIcons(playerMove) {
    PLAYER_MOVE_ICON.src = "../img/" + playerMove + ".svg";
    COMPUTER_MOVE_ICON.src = "../img/" + currentComputerMove + ".svg";
}

/* Takes a number 1-3, and returns the corresponding move that 
the computer will make against the player. */
function getComputerChoice() {
    computerMove = getRandNum1To3Inclusive();
    switch(computerMove) {
        case 1:
            return 'Rock';
        case 2:
            return 'Paper';
        case 3:
            return 'Scissors';
    }
}

/* Generates a random number, 1-3 inclusive that will be used to 
select the moveset for the computer in a further function. */
function getRandNum1To3Inclusive() {
    min = Math.ceil(1);
    max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}