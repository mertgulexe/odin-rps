// variables
let humanScore = 0;
let deviceScore = 0;
let choiceMap = {
    0: "rock",
    1: "scissors",
    2: "paper"
};
let reversedChoiceMap = Object.fromEntries(
    Object.entries(choiceMap).map(
        ([k, v]) => [v, parseInt(k)]
    )
);

let resultMap = {
    "rock": ["tie", "win", "lose"],
    "scissors": ["lose", "tie", "win"],
    "paper": ["win", "lose", "tie"],
};

// select elements
const gameButtons = document.querySelectorAll("div.button-screen button");
const resetButton = document.querySelector("button.reset-button");
const humanScoreElement = document.querySelector(".score-row .player-score");
const deviceScoreElement = document.querySelector(".score-row .device-score");
const dynamicText = document.querySelector(".dynamic-text");
const maxScoreSelect = document.querySelector("#max-score-select");
let maxScoreValue = parseInt(
    maxScoreSelect.value
    //document.querySelector("h2 select").selectedOptions[0].value  // redundant because it appears already selected.
);
// event listeners
gameButtons.forEach(btn => {
    btn.addEventListener("click", playGame)
});
resetButton.addEventListener("click", resetTheGame);
maxScoreSelect.addEventListener("change", setMaxScore);

const DYNAMIC_TEXT_DEFAULT = "To start the game,<br>hit the buttons below!";
dynamicText.innerHTML = DYNAMIC_TEXT_DEFAULT;

String.prototype.toTitleCase = function() {
    return this.charAt(0).toUpperCase() + this.substring(1, );
}

// function that gets random computer choice:
function getDeviceChoice() {
    const randomInteger = Math.floor((Math.random() * 3));
    switch (randomInteger) {
        case 0:
            return choiceMap[0];
        case 1:
            return choiceMap[1];
        case 2:
            return choiceMap[2];
    }
}

// function that gets the result: tie/win/lose.
function getResult(humanChoice, deviceChoice) {
    const roundResultArray = resultMap[humanChoice];
    const deviceChoiceIndex = reversedChoiceMap[deviceChoice];
    return roundResultArray[parseInt(deviceChoiceIndex)];
}

// function that gets the choice from human:
function getHumanChoice(event) {
    return event.target.id.toLowerCase();
}

// this function will be invoked each round to process the result:
function playRound(event) {
    const humanChoice = getHumanChoice(event);
    const deviceChoice = getDeviceChoice();
    const roundResult = getResult(humanChoice, deviceChoice);
    switch (roundResult) {
        case "tie":
            return "Tie.";
        case "win":
            humanScore++;
            return `You win! "${humanChoice.toTitleCase()}" beats "${deviceChoice}".`;
        case "lose":
            deviceScore++;
            return `You lose! "${deviceChoice.toTitleCase()}" beats "${humanChoice}".`;
    }
}

// main function to play the game.
function playGame(event) {
    const roundResult = playRound(event);
    dynamicText.innerHTML = roundResult;
    dynamicText.style.color = "#ff9900";
    humanScoreElement.textContent = humanScore;
    deviceScoreElement.textContent = deviceScore;
    if (humanScore === maxScoreValue || deviceScore === maxScoreValue) {
        endTheGame();
    }
}

function resetTheGame() {
    resetButton.disabled = true;
    gameButtons.forEach(btn => {
        btn.disabled = false;
    });
    humanScore = 0;
    deviceScore = 0;
    humanScoreElement.textContent = humanScore;
    deviceScoreElement.textContent = deviceScore;
    dynamicText.innerHTML = DYNAMIC_TEXT_DEFAULT;
    dynamicText.setAttribute("style", '');
}

function endTheGame() {
    resetButton.disabled = false;
    gameButtons.forEach(btn => {
        btn.disabled = true;
    });
    if (humanScore > deviceScore) {
        dynamicText.innerHTML = "You have won the game!";
        dynamicText.setAttribute("style",
            "color: #90ee90; font-weight: 900;"
        );
    } else if (humanScore < deviceScore) {
        dynamicText.innerHTML = "You have lost the game.";
        dynamicText.setAttribute("style",
            "color: #dc143c; font-weight: 900;"
        );
    }
}

function setMaxScore(event) {
    maxScoreValue = parseInt(event.target.value);
    resetTheGame();
}


/*
To-do:
[] Put a header.
[x] Connect the events to the buttons.
[x] Player chooses the max num of rounds (slider 1-20)
    * dont forget to change the <span> tag for the number
[x] Add "Restart the game" feature.
* When game ends:
    [x] enable the reset button
    [x] disable the game buttons
[x] Fix the footer, align it.
*/
