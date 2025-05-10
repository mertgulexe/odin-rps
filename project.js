// variables
let humanScore = 0;
let deviceScore = 0;
let choiceMap = {
    0: "rock",
    1: "scissors",
    2: "paper"
};

// event listeners and elements
const gameButtons = document.querySelectorAll("div.button-screen button");
const resetButton = document.querySelectorAll("button.reset-button");
const humanScoreElement = document.querySelector(".score-row .player-score");
const deviceScoreElement = document.querySelector(".score-row .device-score");
const dynamicText = document.querySelector(".dynamic-text");
gameButtons.forEach(btn => {
    btn.addEventListener("click", playGame)
});
resetButton.addEventListener("click", resetTheGame);

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
    const resultMap = {
        "rock": ["tie", "win", "lose"],
        "scissors": ["lose", "tie", "win"],
        "paper": ["win", "lose", "tie"],
    };
    const reversedChoiceMap = Object.fromEntries(
        Object.entries(choiceMap).map(
            ([k, v]) => [v, parseInt(k)]
        )
    );
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
            return `You win! "${humanChoice}" beats "${deviceChoice}".`;
        case "lose":
            deviceScore++;
            return `You lose! "${deviceChoice}" beats "${humanChoice}".`;
    }
}

// main function to play the game.
function playGame(event) {
    const roundResult = playRound(event);
    dynamicText.textContent = roundResult;
    humanScoreElement.textContent = humanScore;
    deviceScoreElement.textContent = deviceScore;
    if (humanScore === 5) || (deviceScore === 5) {
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
    // reset dynamic text
    // dynamicText.textContent
}

function endTheGame() {
    resetButton.disabled = false;
    gameButtons.forEach(btn => {
        btn.disabled = true;
    });
    if (humanScore > deviceScore) {
        dynamicText.textContent = "You have won the game!";
    } else if (humanScore < deviceScore) {
        dynamicText.textContent = "You have lost the game.";
    }
}

/*
To-do:
[] Put a header.
[] Connect the events to the buttons.
[] Player chooses the max num of rounds (slider 1-20)
    * dont forget to change the <span> tag for the number
[] Add "Restart the game" feature.
* When game ends:
    [] enable the reset button
    [] disable the game buttons
[] Fix the footer, align it.
[] push to robotomono subdomain
[] add robotomono main page a link
*/
