"use strict";
window.addEventListener("load", ready);

// globale variabler
let points = 0;
let lives = 0;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
}
function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  // displayPoints();
}

function startGame() {
  resetLives();
  resetPoints();
  showGameScreen();
  // bagrundsmusik
  document.querySelector("#Trampersang").play();

  // start alle animationer
  startAllAnimations();

  // start timer
  startTimer();

  // Registrer click
  document
    .querySelector("#energydrink1_container")
    .addEventListener("click", clickenergy);
  document
    .querySelector("#energydrink2_container")
    .addEventListener("click", clickenergy);
  document
    .querySelector("#energydrink3_container")
    .addEventListener("click", clickenergy);
  document
    .querySelector("#soda_container")
    .addEventListener("click", clickSoda);
  document
    .querySelector("#heart_container")
    .addEventListener("click", clickHeart);

  // Registrer når bunden rammes
  document
    .querySelector("#energydrink1_container")
    .addEventListener("animationiteration", energyRestart);
  document
    .querySelector("#energydrink2_container")
    .addEventListener("animationiteration", energyRestart);
  document
    .querySelector("#energydrink3_container")
    .addEventListener("animationiteration", energyRestart);
}

function startAllAnimations() {
  // Start falling animationer
  document.querySelector("#energydrink1_container").classList.add("falling");
  document.querySelector("#energydrink2_container").classList.add("falling");
  document.querySelector("#energydrink3_container").classList.add("falling");
  document.querySelector("#soda_container").classList.add("falling");
  document.querySelector("#heart_container").classList.add("falling");

  // Sæt position klasser
  document.querySelector("#energydrink1_container").classList.add("position1");
  document.querySelector("#energydrink2_container").classList.add("position2");
  document.querySelector("#energydrink3_container").classList.add("position3");
  document.querySelector("#soda_container").classList.add("position4");
  document.querySelector("#heart_container").classList.add("position5");
}
function clickenergy() {
  console.log("Click energy");
  // Brug en energy variabel i stedet for gentagne querySelectors
  const energy = this; // document.querySelector("#Energydrink1_container");

  // Forhindr gentagne clicks
  energy.removeEventListener("click", clickenergy);

  // Stop energy container
  energy.classList.add("paused");

  // sæt forsvind-animation på sprite
  energy.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  energy.addEventListener("animationend", energyGone);

  // Giv point
  incrementPoints();

  // document.querySelector("#Energi").currentTime = 0;
  document.querySelector("#Energi").play();
}
function energyGone() {
  console.log("energy gone");
  // Brug en energy variabel i stedet for gentagne querySelectors
  const energy = this; //document.querySelector("#Energydrink1_container");
  // fjern event der bringer os herind
  energy.removeEventListener("animationend", energyGone);

  // fjern forsvind-animation på sprite
  energy.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  energy.classList.remove("paused");

  energyRestart.call(this);

  // gør det muligt at klikke på energy igen
  energy.addEventListener("click", clickenergy);
}
function energyRestart() {
  console.log("energy restart");
  const energy = this;

  // genstart falling animation
  energy.classList.remove("falling");
  energy.offsetWidth;
  energy.classList.add("falling");

  // fjern alle positioner
  energy.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sæt position til en ny klasse
  const p = Math.ceil(Math.random() * 5);
  energy.classList.add(`position${p}`);
}
function clickSoda() {
  console.log("Click Soda");
  // Forhindr gentagne clicks
  document
    .querySelector("#soda_container")
    .removeEventListener("click", clickSoda);

  // Stop coin container
  document.querySelector("#soda_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#soda_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document
    .querySelector("#soda_container")
    .addEventListener("animationend", sodaGone);
  decrementLives();
  document.querySelector("#sodavand").play();
}
function sodaGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#soda_container")
    .removeEventListener("animationend", sodaGone);

  // fjern forsvind-animation
  document.querySelector("#soda_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#soda_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#soda_container").classList.remove("falling");
  document.querySelector("#soda_container").offsetWidth;
  document.querySelector("#soda_container").classList.add("falling");

  // gør det muligt at klikke på bomb igen
  document
    .querySelector("#soda_container")
    .addEventListener("click", clickSoda);
}
function clickHeart() {
  console.log("Click heart");
  // Forhindr gentagne clicks
  document
    .querySelector("#heart_container")
    .removeEventListener("click", clickHeart);

  // Stop heart container
  document.querySelector("#heart_container").classList.add("paused");

  // sæt forsvind-animation på heart
  document.querySelector("#heart_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: heatGone
  document
    .querySelector("#heart_container")
    .addEventListener("animationend", heartGone);

  if (lives < 3) {
    incrementLives();
  }
  document.querySelector("#Liv").play();
}
function heartGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#heart_container")
    .removeEventListener("animationend", heartGone);

  // fjern forsvind-animation
  document.querySelector("#heart_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#heart_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#heart_container").classList.remove("falling");
  document.querySelector("#heart_container").offsetWidth;
  document.querySelector("#heart_container").classList.add("falling");

  // gør det muligt at klikke på heart igen
  document
    .querySelector("#heart_container")
    .addEventListener("click", clickHeart);
}
function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();

  if (points >= 10) {
    levelComplete();
  }
}
function displayPoints() {
  console.log("vis point");
  document.querySelector("#energy_count").textContent = points;
}
function decrementLives() {
  console.log("mist et liv");
  if (lives <= 1) {
    gameOver();
  }
  showDecrementedLives();
  lives--;
}
function incrementLives() {
  console.log("få et liv");
  lives++;
  showIncrementedLives();
}
function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}
function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}
function gameOver() {
  console.log("Game Over");
  document.querySelector("#Trampersang").pause();
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#Game_done").play();

  stopGame();
  document.querySelector("#energycount").textContent = points;
}
function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#Trampersang").pause();
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#Færdig").play();

  stopGame();

  document.querySelector("#energy_count").textContent = points;
}
function startTimer() {
  console.log("start timer");

  document.querySelector("#time_sprite").classList.add("shrink");
  document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);


}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function stopGame() {
  // Stop animationer
  document.querySelector("#energydrink1_container").classList.remove("falling");
  document.querySelector("#energydrink2_container").classList.remove("falling");
  document.querySelector("#energydrink3_container").classList.remove("falling");
  document.querySelector("#soda_container").classList.remove("falling");
  document.querySelector("#heart_container").classList.remove("falling");

  // Fjern click
  document
    .querySelector("#energydrink1_container")
    .removeEventListener("click", clickenergy);
  document
    .querySelector("#energydrink2_container")
    .removeEventListener("click", clickenergy);
  document
    .querySelector("#energydrink3_container")
    .removeEventListener("click", clickenergy);
  document
    .querySelector("#soda_container")
    .removeEventListener("click", clickSoda);
  document
    .querySelector("#heart_container")
    .removeEventListener("click", clickHeart);

  // // Stop og nulstil lyde, fx baggrundsmusik
  // document.querySelector("#Trampersang").pause();
  // document.querySelector("#Trampersang").currentTime = 0;
  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
}
