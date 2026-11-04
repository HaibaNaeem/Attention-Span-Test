let characterSpeed = 800; // milliseconds
let targetFrequency = 20; // percentage
let sessionDuration = 30000; // 30 seconds in milliseconds

let totalCharacters = 0; // Total characters shown on screen
let correctScore = 0;    // Correct actions (Pressed normal chars, avoided targets)
let incorrectScore = 0;  // Incorrect actions (Missed normals, pressed targets)
let currentLetter = '';  // Currently displayed letter
let userPressedThisTurn = false; // Tracks if user pressed during current letter's window
let popping = null;

// --- Setting speed according to user's choice ---
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");

easyBtn.addEventListener("click", () => characterSpeed = 1000);
mediumBtn.addEventListener("click", () => characterSpeed = 800);
hardBtn.addEventListener("click", () => characterSpeed = 500);

// --- Setting frequency of target characters as user's choice ---
const lowFreqBtn = document.querySelector("#low");
const mediumFreqBtn = document.querySelector("#mediumf");
const highFreqBtn = document.querySelector("#high");

lowFreqBtn.addEventListener("click", () => targetFrequency = 20);
mediumFreqBtn.addEventListener("click", () => targetFrequency = 25);
highFreqBtn.addEventListener("click", () => targetFrequency = 30);

const normalChars = ['a','c','d','e','f','g','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const targetChars = ['h', 'b'];

function getRandomCharacter() {
    let chance = Math.random() * 100;
    if (chance < targetFrequency) {
        let randomIndex = Math.floor(Math.random() * targetChars.length);
        return targetChars[randomIndex];
    } else {
        let randomIndex = Math.floor(Math.random() * normalChars.length);
        return normalChars[randomIndex];
    }
}

// --- User Input Handling ---
// When user presses space or clicks button, just mark that they responded for the *current* letter
function handleUserAction() {
    if (!currentLetter) return; 
    userPressedThisTurn = true; 
}

// Global Event Listeners
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.key === " ") {
        event.preventDefault(); 
        handleUserAction();
    }
});

const pressBtn = document.querySelector("#press-button");
if (pressBtn) {
    pressBtn.addEventListener("click", handleUserAction);
}

// --- Main Test Loop ---
function popCharacters() {
    totalCharacters = 0;
    correctScore = 0;
    incorrectScore = 0;
    userPressedThisTurn = false;

    popping = setInterval(() => {
        // 1. EVALUATE PREVIOUS CHARACTER (if one was already on screen)
        if (currentLetter !== '') {
            totalCharacters++;
            let isTarget = (currentLetter === 'h' || currentLetter === 'b');

            if (isTarget) {
                // Target ('h' or 'b'): User should NOT press.
                if (userPressedThisTurn) {
                    incorrectScore++; // False alarm (Pressed when they shouldn't have)
                } else {
                    correctScore++;   // Correct rejection (Stayed silent)
                }
            } else {
                // Normal character: User SHOULD press.
                if (userPressedThisTurn) {
                    correctScore++;   // Hit (Pressed correctly)
                } else {
                    incorrectScore++; // Miss (Failed to press)
                }
            }
        }

        // 2. RESET PRESS FLAG FOR THE NEW CHARACTER WINDOW
        userPressedThisTurn = false;

        // 3. SHOW NEW CHARACTER
        currentLetter = getRandomCharacter(); 
        document.querySelector("#character-container").innerText = currentLetter;

    }, characterSpeed);

    // End session after 30 seconds
    setTimeout(() => {
        clearInterval(popping);

        // Evaluate the final character on screen before ending
        if (currentLetter !== '') {
            totalCharacters++;
            let isTarget = (currentLetter === 'h' || currentLetter === 'b');
            if (isTarget && !userPressedThisTurn) correctScore++;
            else if (!isTarget && userPressedThisTurn) correctScore++;
            else incorrectScore++;
        }

        currentLetter = ''; 
        document.querySelector("#character-container").innerText = "Round completed!";

        // Switch to Results Screen and display true metrics
        document.querySelector("#test-screen").style.display = "none";
        document.querySelector("#results-screen").style.display = "flex";
        
        document.querySelector("#final-total").innerText = totalCharacters;
        document.querySelector("#final-correct").innerText = correctScore;
        document.querySelector("#final-incorrect").innerText = incorrectScore;
          document.querySelector("#character-container").innerText = "";
    }, sessionDuration);
}

// Start Test Button
document.querySelector("#start-button").addEventListener("click", function(event) {
    event.preventDefault(); 
    document.querySelector("#home-screen").style.display = "none";
    document.querySelector("#test-screen").style.display = "flex";
    popCharacters();
});

// Play Again Button (Resets scores and goes back home)
document.querySelector("#play-again-btn").addEventListener("click", function() {
    correctScore = 0;
    incorrectScore = 0;
    totalCharacters = 0;
    currentLetter = '';
    userPressedThisTurn = false; 

    document.querySelector("#results-screen").style.display = "none";
    document.querySelector("#home-screen").style.display = "flex";
});