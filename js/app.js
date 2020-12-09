//set up and draw canvas and shapes
//gallows and background
function setup() {
  createCanvas(700, 400);
  background(81, 115, 90);
  noStroke();
  rect(150, 340, 200, 20);
  rect(250, 100, 20, 240);
  rect(270, 120, 200, 20);
  rect(460, 140, 10, 50);
}

//draw the body parts
function draw() {
  if (mistakes == 1) {
    ellipse(465, 220, 100);
  }
  if (mistakes == 2) {
    rect(455, 250, 20, 100);
  }
  if (mistakes == 3) {
    translate(width / 2, height / 2);
    rotate(PI / 3.0);
    rect(120, -60, 15, 50);
  }
  if (mistakes == 4) {
    translate(width / 2, height / 2);
    rotate(PI / -3.0);
    rect(-20, 145, 15, 50);
  }
  if (mistakes == 5) {
    translate(width / 2, height / 2);
    rotate(PI / -3.0);
    rect(-80, 165, 15, 50);
  }
  if (mistakes == 6) {
    translate(width / 2, height / 2);
    rotate(PI / 3.0);
    rect(175, -25, 15, 50);
  }
}

var possibleWords = [
  "music",
  "democracy",
  "lineage",
  "helpless",
  "feline",
  "master",
  "pineapple",
  "zesty",
  "orthodontist",
  "television",
];

//set variables
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

//choose a random word from the array of possible words
function randomWord() {
  answer = possibleWords[Math.floor(Math.random() * possibleWords.length)];

  //This alert is for checking the game
  // alert(answer);
}

//This is how to create the buttons for each of the letters
//Worked with Chris and Noah to get to this part
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    //divide up the string
    .split("")

    //Research this part://what is map? -- makes the buttons appear used

    .map(
      (letter) =>
        `
  <button class = "btn btn-lg btn-primary m-2"
  id = '` +
        letter +
        `'
  onClick = "handleGuess('` +
        letter +
        `')"
  >
  ` +
        letter +
        `
  </button>`
    )

    //gets rid of the commas
    .join("");

  //add the alphabet to the letters keyboard
  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

//check if the letter is in the chosen word and disable the clicked letter button
function handleGuess(chosenLetter) {
  //what does three equal signs and a -1? mean? what is guessed.push(chosenLetter) and why would it be null?

  //if you have less than zero chosen letters then the letters are not pushed
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  //if clicked, then disable the button; though null above is redundant
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    //run guessed word function inside if statement to update the letters
    guessedWord();
    checkIfGameWon();
    //if the letter is not in the word (does not exist)
  } else if (answer.indexOf(chosenLetter) === -1) {
    //add one to the mistakes and run the updateMistakes function
    mistakes++;
    updateMistakes();
    //run the check if game is lost function
    checkIfGameLost();
  }
}

//check if the game is won or lost if it equals the "answer" or the max number of wrong has been reached

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!";
  }
}

//if the number of mistakes matches the maximum attempts of wrong letters then change the blank spaces to let the user know the game is over
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was " + answer;
    document.getElementById("keyboard").innerHTML = "You Lost.";
  }
}

//insert number of letter spaces of the word to be guessed
function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

//updating the mistakes line with span id in html
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

//clears the drawn shapes of the hangman and redraws the original picture
function clearCanvas() {
  clear();
  createCanvas(700, 400);
  background(0, 200, 200);
  rect(150, 340, 200, 20);
  rect(250, 100, 20, 240);
  rect(270, 120, 200, 20);
  rect(460, 140, 10, 50);
}

//reset the game with a new word; run almost all functions again
function reset() {
  mistakes = 0;
  guessed = [];
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  clearCanvas();
}

//adds to the counter of how many wrong
document.getElementById("maxWrong").innerHTML = maxWrong;

//run the functions
randomWord();
generateButtons();
guessedWord();
// handleGuess();
