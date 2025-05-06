const timerDisplay = document.getElementById("timer-display");
const scoreDisplay = document.getElementById("score-display");
const cpsDisplay = document.getElementById("cps-display");

const clicker = document.getElementById("clicker");
const resetButton = document.getElementById("reset-button");
resetButton.disabled = true;

const timeSetters = Array.from(document.getElementsByClassName("time-setters"));
timeSetters[0].classList.add("active");

let running = false;
let timeLimit = 5;
let score = 0;
let cps = 0;
let time;

function countdown(timeLeft) {
  time = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(time);
      displayResults();
      running = false;
      return;
    }
    timeLeft--;
    cps = score / (timeLimit - timeLeft);
    cps = Math.round(cps * 10) / 10;

    timerDisplay.textContent = timeLeft;
    cpsDisplay.textContent = cps;
  }, 1000);
}

function start() {
  if (running) return;

  running = true;
  let timeLeft = timeLimit;

  reset();
  setTimeButtonState(false);
  clicker.textContent = "CLICK!!!";
  clicker.style.fontStyle = "italic";
  countdown(timeLeft);
}

clicker.addEventListener("click", () => {
  if (running == false) return;
  score++;
  scoreDisplay.textContent = score;
});

for (let i = 0; i < timeSetters.length; i++) {
  timeSetters[i].addEventListener("click", () => {
    timeLimit = parseInt(timeSetters[i].textContent.split(" ")[0]);
    timerDisplay.textContent = timeLimit;

    timeSetters.forEach((button) => {
      button.classList.remove("active");
    });
    timeSetters[i].classList.add("active");
  });
}

function displayResults() {
  clicker.disabled = true;
  resetButton.disabled = false;
  setTimeButtonState(true);
  cps = Math.round((score / timeLimit) * 10) / 10;
  cpsDisplay.textContent = cps;
  clicker.textContent = `You Clicked At ${cps} Clicks Per Second!`;
  clicker.classList.add("result");
  resetButton.classList.add("active");
}

function reset() {
  clicker.disabled = false;
  resetButton.disabled = true;

  clicker.classList.remove("result");
  resetButton.classList.remove("active");

  score = 0;
  cps = 0;
  timerDisplay.textContent = timeLimit;
  scoreDisplay.textContent = score;
  cpsDisplay.textContent = cps;

  clicker.textContent = "CLICK HERE TO START";
}

function setTimeButtonState(enabled) {
  timeSetters.forEach((button) => {
    button.disabled = !enabled;
  });
}
