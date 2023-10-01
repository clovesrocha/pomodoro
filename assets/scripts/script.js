const formTimer = document.querySelector('.form-timer');
const timerHours = document.querySelector('.hours');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let intervalId;
let hoursRemaining = 0;
let minutesRemaining = 0;
let secondsRemaining = 0;
let isRunning = false;
let isRestTime = false;

formTimer.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!isRunning) {
    hoursRemaining = parseInt(document.getElementById('study-hours').value) || 0;
    minutesRemaining = parseInt(document.getElementById('study-minutes').value) || 0;
    secondsRemaining = 0;
    updateTimerDisplay();
  }
});

startButton.addEventListener('click', function () {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(updateTimer, 1000);
  }
});

stopButton.addEventListener('click', function () {
  clearInterval(intervalId);
  isRunning = false;
});

resetButton.addEventListener('click', function () {
  clearInterval(intervalId);
  isRunning = false;
  hoursRemaining = 0;
  minutesRemaining = 0;
  secondsRemaining = 0;
  updateTimerDisplay();
});

function updateTimer() {
  if (hoursRemaining === 0 && minutesRemaining === 0 && secondsRemaining === 0) {
    clearInterval(intervalId);
    isRunning = false;
    if (isRestTime) {
        displayStudyMessage(); 
    } else {
        displayRestMessage();
    }
    isRestTime = !isRestTime; 
  } else if (secondsRemaining === 0) {
    if (minutesRemaining > 0) {
      minutesRemaining--;
      secondsRemaining = 59;
    } else if (hoursRemaining > 0) {
      hoursRemaining--;
      minutesRemaining = 59;
      secondsRemaining = 59;
    }
  } else {
    secondsRemaining--;
  }

  updateTimerDisplay();
}

function updateTimerDisplay() {
  timerHours.textContent = formatTime(hoursRemaining);
  timerMinutes.textContent = formatTime(minutesRemaining);
  timerSeconds.textContent = formatTime(secondsRemaining);
}

function formatTime(time) {
  return time < 10 ? '0' + time : time.toString();
}

function displayRestMessage() {
    const restMessage = document.getElementById('rest-message');
    restMessage.textContent = 'É hora de descansar!';
    restMessage.classList.remove('hidden');
}

function displayStudyMessage() {
    const restMessage = document.getElementById('rest-message');
    restMessage.textContent = 'Defina o tempo de estudo';
    restMessage.classList.remove('hidden');
}