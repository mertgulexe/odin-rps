// variables
let humanScore = 0;
let deviceScore = 0;
let tieCounter = 0;
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

// element related variables
const TRANSITION_CLASS_NAME = "play-button-clicked";
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
    btn.addEventListener("click", playTheGame);
    btn.addEventListener("transitionend", endTransition)
});
resetButton.addEventListener("click", resetTheGame);
maxScoreSelect.addEventListener("change", setMaxScore);

const DYNAMIC_TEXT_DEFAULT = "To start the game,<br>hit the buttons below!";
dynamicText.innerHTML = DYNAMIC_TEXT_DEFAULT;

String.prototype.toTitleCase = function() {
    return this.charAt(0).toUpperCase() + this.substring(1);
}

// function that gets random computer choice:
function getDeviceChoice() {
    const choiceMapLength = Object.entries(choiceMap).length;
    const randomChoiceIndex = Math.floor(Math.random() * choiceMapLength);
    return choiceMap[randomChoiceIndex];
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
function playTheRound(event) {
    const humanChoice = getHumanChoice(event);
    const deviceChoice = getDeviceChoice();
    const roundResult = getResult(humanChoice, deviceChoice);
    switch (roundResult) {
        case "tie":
            tieCounter++;
            return tieCounter > 1 ? `Tie x ${tieCounter}.` : "Tie.";
        case "win":
            humanScore++;
            tieCounter = 0;
            return `You win! "${humanChoice.toTitleCase()}" beats "${deviceChoice}".`;
        case "lose":
            deviceScore++;
            tieCounter = 0;
            return `You lose! "${deviceChoice.toTitleCase()}" beats "${humanChoice}".`;
    }
}

// main function to play the game.
function playTheGame(event) {
    const roundResult = playTheRound(event);
    const btnClicked = event.target;
    btnClicked.classList.add(TRANSITION_CLASS_NAME);
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
    dynamicText.removeAttribute("style");
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

function endTransition(event) {
    if (event.propertyName === "transform") {
        this.classList.remove(TRANSITION_CLASS_NAME);
    }
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
