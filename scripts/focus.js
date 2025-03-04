const music = new Audio("./assets/songs/music.mp3");
const playSong = new Audio("./assets/songs/play.wav");
const pauseSong = new Audio("./assets/songs/pause.mp3");
music.loop = true;

const musicInput = document.querySelector(".button-play");
const button = document.querySelector(".timer-button-start");
const inputElement = document.getElementById("timer");
const labelElement = document.querySelector('label[for="timer"]');
const alertUser = document.querySelector(".alert");
const timerText = document.querySelector(".timer-text");

let time = 0;
let intervaloId = null;
let isRunning = false;
let initialSet = false;

function toggleMusic(button) {
  if (music.paused) {
    music.play();
    playSong.play();
    button.setAttribute("src", "./assets/img/pause.svg");
  } else {
    music.pause();
    pauseSong.play();
    button.setAttribute("src", "./assets/img/play.svg");
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerText.textContent = formatTime(time);
}

function timerRegress() {
  if (time <= 0) {
    stopCounter();
    resetTimer();
    return;
  }
  time--;
  updateTimerDisplay();
}

function startCounter() {
  if (!intervaloId) {
    intervaloId = setInterval(timerRegress, 1000);
  }
}

function stopCounter() {
  if (intervaloId) {
    clearInterval(intervaloId);
    intervaloId = null;
  }
}

function resetTimer() {
  stopCounter();
  isRunning = false;
  initialSet = false; // Reseta a flag
  time = 0;
  inputElement.style.display = "block";
  button.textContent = "Start";
  updateTimerDisplay();
  alertUser.textContent = "";
}

function validateInput(value) {
  const numValue = parseInt(value);
  return value !== "" && numValue >= 1 && numValue <= 60;
}

musicInput.addEventListener("click", () => toggleMusic(musicInput));

labelElement.addEventListener("click", () => {
  if (isRunning) {
    stopCounter();
    button.textContent = "Start";
    isRunning = false;
  } else {
    if (!initialSet) {
      const inputValue = inputElement.value;
      if (!validateInput(inputValue)) {
        alertUser.textContent = "Please insert a valid value between 1 and 60!";
        return;
      }
      time = parseInt(inputValue) * 60;
      initialSet = true;
      inputElement.style.display = "none";
    }

    alertUser.textContent = "";
    button.textContent = "Pause";
    startCounter();
    isRunning = true;
    updateTimerDisplay();
  }
});

updateTimerDisplay();
