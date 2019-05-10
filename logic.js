// 1.0 ARRAY OF WORDS
var gameWords = ["alf", "cheers", "fullhouse", "mash","roseanne","seinfeld", "webster"];
var validChar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// 1.1 Random word function
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}


// 1.2 isCorrectGuess function                
function isCorrectGuess(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            correctClick.play();
            return true;     
        }
    }
    wrongClick.play();
    return false;
}

// 1.3 getBlanks function
function getBlanks(word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}

// 1.4 fillBlanks function
function fillBlanks(word, puzzleState, letter) {
    if (isCorrectGuess(word, letter)) {
        for (var i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                puzzleState[i] = letter;
            }
        }
    } 
    return puzzleState;
}

// 1.5 setUpRound function
function setupRound(word) {
    var setup = {
        word : word,
        guessesLeft : 9,
        wrongGuesses : [],
        puzzleState : getBlanks(word),
    }
    return setup;
}

// 1.6 updateRound function
function updateRound(setup, letter) {
        if (isCorrectGuess(setup.word, letter) === false) {
            --setup.guessesLeft;
            setup.wrongGuesses.push(letter);
        }
        else {
            fillBlanks(setup.word, setup.puzzleState, letter);
        }   
       
    return setup;
}

// 1.7 If player wins
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

// 1.8 If players loses
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}


// 1.9 isEndofRound function
function isEndOfRound(setup) {
    if (setup.guessesLeft === 0) {
        return true;
    }
    if (hasWon(setup.puzzleState)) {
        return true;
    }
    return false;
}

// 1.10 setupGame function
function setupGame(gameWords, wins, losses) {
    var game = {
        words : gameWords,
        wins : wins,
        losses : losses,
        round : setupRound(randomWord(gameWords)),
    }
    return game;
}


// 1.11 startNewRound function
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
        ++game.wins;
        winRound.play();
        alert( "You got it! This 80s popular show was "+ game.round.word + "!");
    }
    else {
        ++game.losses;
        alert(" Sorry, this popular 80s show was called " + game.round.word + ". You have to watch it though. It's great! Play again to see more popular 80s shows you know!");
    }
    return game; 
}

// 1.12 Word Guess Game (based on 80s popular shows)
var myGame = setupGame(gameWords, 0, 0);


// USER INTERACTIONS


window.onload = function () {
    // var puzzleState = 
    document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(" ");
};

// logs the object for this game round
console.log(myGame);

// Variables - Sounds to Play when certain occurences happen 
var winRound = new Audio('');
var wrongClick = new Audio('');
var correctClick = new Audio('');
var myShot = new Audio('');

 // Updates the HTML IDs 
 
function updateHTML() {
    
    document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

    
    document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses.join(" ");

    // Shows total wins
    document.getElementById("win-counter").innerText = myGame.wins;

    // Shows total losses
    document.getElementById("loss-counter").innerText = myGame.losses;

    // Shows guesses left
    document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;
};

// Variable 
var keyPressed;

//When key is pressed, the event is initiated
 
document.onkeyup = function (evt) {
    keyPressed = evt.key.toLowerCase() 
    var flag = false
    for (var i = 0; i < validChar.length; i++) {   
        if (keyPressed === validChar[i]) {
            flag = true          
        }
    }
    if (flag === false) {
        alert("Oops. Try again!");
    }


    console.log(keyPressed + " key was pressed");


    // Then you would call back the logic
    isCorrectGuess(myGame.round.word, keyPressed);
    fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
    updateRound(myGame.round, keyPressed);
    hasWon(myGame.round.puzzleState);
    hasLost(myGame.round.guessesLeft);

    
    // This function would check to see if there are guesses left or the player has won
    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
    
    updateHTML();

    displayCard1();
    
};


// gameReset function
function gameReset() {
    myGame.round.guessesLeft = 0;
    hasLost(myGame.round.guessesLeft);

    // isEndofRound function determines if anymore guesses are left or if player has won
    if (isEndOfRound(myGame.round)) {
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
    

    myShot.play();

    updateHTML();

}; 


// make display cards show
function displayCard1() {
    if (myGame.wins >= 1) {
        document.getElementById("card1-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 2) {
        document.getElementById("card2-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 3) {
        document.getElementById("card3-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 4) {
        document.getElementById("card4-eb").classList.add("display-visible-eb");
    }
};

