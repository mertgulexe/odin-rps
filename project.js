#!/usr/bin/env node

let humanScore = 0;
let computerScore = 0;
// created an object not to write the names over and over again:
let choiceMap = {
    0: "rock",
    1: "scissors",
    2: "paper"
};

// reversed keys & values for ease of use in upcoming functions:
let reversedChoiceMap = Object.fromEntries(
    Object.entries(choiceMap).map(
        ([k, v]) => [v, parseInt(k)]
    )
);

// created an object for the results:
let resultMap = {
    [choiceMap[0]]: ["tie", "win", "lose"],  // rock
    [choiceMap[1]]: ["lose", "tie", "win"],  // scissors
    [choiceMap[2]]: ["win", "lose", "tie"],  // paper
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
function getResult(choice1, choice2) {
    const resultArray = resultMap[choice1];  // array for the related result
    const resultIndex = reversedChoiceMap[choice2];  // index for the result
    const final_result = resultArray[resultIndex];  // final result fetched from the array
    return final_result;
}

// function that gets the choice from human:
function getHumanChoice() {
    const userInput = prompt(message="Choose among rock/paper/scissors: ");
    return userInput.toLowerCase();  // standartised result
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

// main function to play the game. it'll be 5 rounds by default but can be changed:
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