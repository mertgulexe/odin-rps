// variables
let humanScore = 0;
let computerScore = 0;
let choiceMap = {
    0: "rock",
    1: "scissors",
    2: "paper"
};

// event listeners
const gameButtons = document.querySelectorAll("div.button-screen button");
let dynamicText = document.querySelector(".dynamic-text");
gameButtons.forEach(btn => {
    btn.addEventListener("click", playGame)
});

// function that gets random computer choice:
function getComputerChoice() {
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
function getResult(humanChoice, computerChoice) {
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
    const computerChoiceIndex = reversedChoiceMap[computerChoice];
    return roundResultArray[parseInt(computerChoiceIndex)];
}

// function that gets the choice from human:
function getHumanChoice(event) {
    console.log(event.target.tagName);
    return event.target.id.toLowerCase();
}

// this function will be invoked each round to process the result:
function playRound(event) {
    const humanChoice = getHumanChoice(event);
    const computerChoice = getComputerChoice();
    const roundResult = getResult(humanChoice, computerChoice);
    switch (roundResult) {
        case "tie":
            return "Tie.";
        case "win":
            humanScore++;
            return `You win! "${humanChoice}" beats "${computerChoice}".`;
        case "lose":
            computerScore++;
            return `You lose! "${computerChoice}" beats "${humanChoice}".`;
    }
}

// main function to play the game.
function playGame(event) {
    const roundResult = playRound(event);
    dynamicText.textContent = roundResult; ////////////////////////////////////////////

    // update scores on UI
    // end game if max score is reached
    // activate reset button
    if (humanScore > computerScore) {
        console.log("You won!");
    } else if (humanScore < computerScore) {
        console.log("You lose.")
    } else {
        console.log("It's a tie.")
    }
}

function resetTheGame() {
    // disable reset button
    // enable game buttons
    // reset scores
    // reset dynamic text
    return;
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
[] Fix the header, align it.
[] push to robotomono subdomain
[] add robotomono main page a link
*/
