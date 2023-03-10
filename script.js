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
 
}

function startGame() {
  resetLives();
  resetPoints();
  showGameScreen();
  // baggrundsmusik
  document.querySelector("#Trampersang").play();

  // starter alle animationer
  startAllAnimations();

  // starter timer
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

  // Registrer når bunden rammes så alle animationer restarter
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
  // Starter falling animationer
  document.querySelector("#energydrink1_container").classList.add("falling");
  document.querySelector("#energydrink2_container").classList.add("falling");
  document.querySelector("#energydrink3_container").classList.add("falling");
  document.querySelector("#soda_container").classList.add("falling");
  document.querySelector("#heart_container").classList.add("falling");

  // Sætter positions klasser
  document.querySelector("#energydrink1_container").classList.add("position1");
  document.querySelector("#energydrink2_container").classList.add("position2");
  document.querySelector("#energydrink3_container").classList.add("position3");
  document.querySelector("#soda_container").classList.add("position4");
  document.querySelector("#heart_container").classList.add("position5");
}
function clickenergy() {
  console.log("Click energy");
  // Bruger nu  en energy variabel i stedet for gentagne querySelectors
  const energy = this; // document.querySelector("#Energydrink1_container");

  // Forhindr gentagne clicks
  energy.removeEventListener("click", clickenergy);

  // Stopper energy container
  energy.classList.add("paused");

  // sætter en forsvind-animation på sprite
  energy.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdige så forsvinder min energy 
  energy.addEventListener("animationend", energyGone);

  // Giver point ved click 
  incrementPoints();

  // sætter lydeffekt på click af energy
  document.querySelector("#Energi").play();
}
function energyGone() {
  // tester om energygone functionen reagere i mit spil 
  console.log("energy gone");
  // Bruger  en energy variabel i stedet for gentagne querySelectors
  const energy = this; //document.querySelector("#Energydrink1_container");

  // fjerner nu en event der bringer os herind
  energy.removeEventListener("animationend", energyGone);

  // fjerner forsvind-animation på enegy 
  energy.querySelector("img").classList.remove("zoom_out");

  // fjerner pause functionen 
  energy.classList.remove("paused");

  // restarter nu hele procesen igen 
  energyRestart.call(this);

  // gør det muligt at klikke på energy igen
  energy.addEventListener("click", clickenergy);
}
function energyRestart() {
 // tester consolen om den reagere på functionen 
  console.log("energy restart");
 // Bruger nu  en energy variabel i stedet for gentagne querySelectors
  const energy = this;

  // genstarter falling animations
  energy.classList.remove("falling");
  energy.offsetWidth;
  energy.classList.add("falling");

  // fjerner alle positioner
  energy.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sætter nu  positioner til en ny klasse
  const p = Math.ceil(Math.random() * 5);
  energy.classList.add(`position${p}`);
}
function clickSoda() {
  // bruger console.log til at teste min function i consolen 
  console.log("Click Soda");

  // Forhindr gentagne clicks
  document
    .querySelector("#soda_container")
    .removeEventListener("click", clickSoda);

  // Stopper soda container
  document.querySelector("#soda_container").classList.add("paused");

  // sæt forsvind-animation på soda
  document.querySelector("#soda_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig så forsvinder min
  document
    .querySelector("#soda_container")
    .addEventListener("animationend", sodaGone);
  // mister liv ved click af soda 
    decrementLives();
    // lydeffekt til click af soda
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

  // ved click får man nyt liv
  if (lives < 3) {
    incrementLives();
  }
  // lydeffekt til click af heart 
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
  // ved click opnå point 
  points++;
  // tester functionerne i consolen 
  console.log("har nu " + points + " point");
  // viser point i højre hjørne 
  displayPoints();

  // starter levelcomplet skærm når 10 point er opnået 
  if (points >= 10) {
    levelComplete();
  }
}
function displayPoints() {
  // tester den i consolen 
  console.log("vis point");
  // ved click af energy = point 
  document.querySelector("#energy_count").textContent = points;
}
function decrementLives() {
  // tester i consolen 
  console.log("mist et liv");
  // viser gameover skærm hvis liv erunder 1
  if (lives <= 1) {
    gameOver();
  }
  // viser antal liv i hjørnet 
  showDecrementedLives();
  lives--;
}
function incrementLives() {
  // tester functionen i consolen 
  console.log("få et liv");
  
  lives++;
  // viser de opnået liv 
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
  // sætter baggrundssangen på pause 
  document.querySelector("#Trampersang").pause();
  // fjerner hidden fra min gameover skærm så den er synlig 
  document.querySelector("#game_over").classList.remove("hidden");
  // afspiller gameover lydeffekt
  document.querySelector("#Game_done").play();
  //  stopper spillet
  stopGame();
  // viser opnået point i alt
  document.querySelector("#energycount").textContent = points;
}
function levelComplete() {
  // tester consolen 
  console.log("Level Complete");
  // sætter bagrundsmusik på pause
  document.querySelector("#Trampersang").pause();
  // gør min levelcomplet skærm synlig 
  document.querySelector("#level_complete").classList.remove("hidden");
  // afspiller min levelcomplet lydeffekt
  document.querySelector("#Færdig").play();
  // stopper spillet
  stopGame();
  // viser det opnået antal point 
  document.querySelector("#energy_count").textContent = points;
}
function startTimer() {
  // tester min function i consolen 
  console.log("start timer");
  // indsætter min animtaion shrink til min sprite 
  document.querySelector("#time_sprite").classList.add("shrink");

  document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);


}

function timeIsUp() {
  // tester function i consolen 
  console.log("Tiden er gået!");
  // hvis point over 10 når tiden er gået så skal levelcomplete skærm vises 
  if (points >= 10) {
    levelComplete();
    // ellers så skal gameover skærm vises 
  } else {
    gameOver();
  }
}

function stopGame() {
  // Stop alle animationer
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


  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
}