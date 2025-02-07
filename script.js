document.addEventListener("DOMContentLoaded", () => {
  const colorBox = document.getElementById("colorBox");
  const colorOptions = document.getElementById("colorOptions");
  const gameStatus = document.getElementById("gameStatus");
  const scoreDisplay = document.getElementById("score");
  const newGameButton = document.getElementById("newGameButton");
  const pauseButton = document.getElementById("pauseButton");
  const timerDisplay = document.getElementById("timer");
  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  let targetColor = "";
  let score = 0;
  let timer = 30;
  let interval;
  let gamePaused = false;

  function startGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    colorOptions.innerHTML = "";

    let shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    shuffledColors.forEach((color) => {
      const button = document.createElement("button");
      button.style.backgroundColor = color;
      button.dataset.testid = "colorOption";
      button.addEventListener("click", () => checkGuess(color));
      colorOptions.appendChild(button);
    });

    gameStatus.textContent = "";
    resetTimer();
  }

  function checkGuess(color) {
    if (gamePaused) return;

    if (color === targetColor) {
      gameStatus.textContent = "Correct!";
      gameStatus.style.color = "green";
      score++;
      scoreDisplay.textContent = score;
      correctSound.play();
    } else {
      gameStatus.textContent = "Wrong! Try again.";
      gameStatus.style.color = "red";
      wrongSound.play();
    }
    setTimeout(startGame, 1000);
  }

  function resetTimer() {
    clearInterval(interval);
    timer = 30;
    timerDisplay.textContent = timer;
    interval = setInterval(() => {
      if (!gamePaused) {
        timer--;
        timerDisplay.textContent = timer;
        if (timer === 0) {
          clearInterval(interval);
          gameStatus.textContent = "Time's up!";
          gameStatus.style.color = "black";
        }
      }
    }, 1000);
  }

  newGameButton.addEventListener("click", startGame);

  pauseButton.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseButton.textContent = gamePaused ? "Resume" : "Pause";
  });

  startGame();
});
