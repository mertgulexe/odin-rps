#!/usr/bin/env node


let humanScore = 0;
let computerScore = 0;
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
    [choiceMap[0]]: ["tie", "win", "lose"],  // rock
    [choiceMap[1]]: ["lose", "tie", "win"],  // scissors
    [choiceMap[2]]: ["win", "lose", "tie"],  // paper
};

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

function getResult(choice1, choice2) {
    const result1 = resultMap[choice1];
    const result2 = result1[reversedChoiceMap[choice2]]
    return result2;
}

function getHumanChoice() {
    const userInput = prompt(message="Choose among rock/paper/scissors: ");
    return userInput.toLowerCase();
}

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

function playGame() {
    for (let i = 0; i < 5; i++) {
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