#!/usr/bin/env node

let humanScore = 0;
let computerScore = 0;
let choiceMap = {
    0: "rock",
    1: "scissors",
    2: "paper"
};

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
    const resultArray = resultMap[humanChoice];
    const computerChoiceIndex = reversedChoiceMap[computerChoice];
    return resultArray[computerChoiceIndex];
}

// function that gets the choice from human:
function getHumanChoice() {
    const userInput = prompt(message="Choose among rock/paper/scissors: ");
    return userInput.toLowerCase();
}

// this function will be invoked each round to process the result:
function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const roundResult = getResult(humanChoice, computerChoice);
    switch (roundResult) {
        case "tie":
            console.log("Tie.")
            break;
        case "win":
            humanScore++;
            console.log(`You win! "${humanChoice}" beats "${computerChoice}".`);
            break;
        case "lose":
            computerScore++;
            console.log(`You lose! "${computerChoice}" beats "${humanChoice}".`);
            break;
    }
}

// main function to play the game.
function playGame(roundCount=5) {
    for (let i = 0; i < roundCount; i++) {
        const fetchedHumanInput = getHumanChoice();
        playRound(fetchedHumanInput);
    }
    console.log(`Round ended. Score: ${humanScore} - ${computerScore}`);
    if (humanScore > computerScore) {
        console.log("You won!");
    } else if (humanScore < computerScore) {
        console.log("You lose.")
    } else {
        console.log("It's a tie.")
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
[] Fix the header, align it.
[] push to robotomono subdomain
[] add robotomono main page a link
*/