let isRunning = false;
let isBreak = false;
let timer;
let timeLeft = 25 * 60; // Default 25 minutes for Pomodoro
let pomodoroDuration = 25 * 60;
let breakDuration = 5 * 60;
let sessionCount = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const pomodoroInput = document.getElementById("pomodoro-duration");
const breakInput = document.getElementById("break-duration");
const sessionCountDisplay = document.getElementById("session-count");

// Load audio elements for voice prompts
const workEndSound = document.getElementById("workEndSound");
const breakEndSound = document.getElementById("breakEndSound");

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// Start timer function
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(countdown, 1000);
    }
}

// Pause timer function
function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

// Reset timer function
function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    isBreak = false;
    timeLeft = pomodoroDuration;
    updateDisplay();
}

// Countdown logic
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        if (isBreak) {
            // Play work start voice sound
            workEndSound.play();
            timeLeft = pomodoroDuration;
            isBreak = false;
        } else {
            // Play break start voice sound
            breakEndSound.play();
            timeLeft = breakDuration;
            isBreak = true;
            sessionCount++;
            sessionCountDisplay.textContent = sessionCount;
        }
        updateDisplay();
    }
}

// Update custom durations
function updateDurations() {
    pomodoroDuration = parseInt(pomodoroInput.value) * 60;
    breakDuration = parseInt(breakInput.value) * 60;
    timeLeft = pomodoroDuration;
    updateDisplay();
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
pomodoroInput.addEventListener("change", updateDurations);
breakInput.addEventListener("change", updateDurations);

// Initial display update
updateDisplay();

