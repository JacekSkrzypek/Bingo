import { CreateBingo, clearLoadedValues } from "./game.js";
import { specialTitle, bingoValues } from "./constants.js";

const bingo = document.getElementById("bingo");
const input = document.getElementById("nick-input");
const newGameModal = document.getElementById("new-game-modal");
const restartButton = document.getElementById("restart-game");
const showValuesButton = document.getElementById("show-values");
const startButton = document.getElementById("start-button");
const playerInformation = document.getElementById("player-information");
const closeButton = document.getElementById("close-button");
const confirmNoButton = document.getElementById("confirm-no");
const confirmYesButton = document.getElementById("confirm-yes");
const header = document.getElementById("header");

startButton.addEventListener("click", () => StartGame());
showValuesButton.addEventListener("click", () => ShowValues());
closeButton.addEventListener("click", () => HideValues());
restartButton.addEventListener("click", () => ShowConfirmModal());
confirmNoButton.addEventListener("click", () => HideConfirmModal());
confirmYesButton.addEventListener("click", () => RestartGame());

if (!localStorage.getItem("game")) {
  newGameModal.classList.add("active");
} else {
  StartGame();
}


if (specialTitle) {
  const elements = document.querySelectorAll(".title");

  document.title = specialTitle;
  elements.forEach((element) => (element.textContent = specialTitle));
}

function StartGame() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let player;

  if(localStorage.getItem("game")) {
    player = JSON.parse(localStorage.getItem("game")).player
  } else {
    player = `${input.value} ${time}`;
  }

  playerInformation.textContent = player;

  header.classList.add("active");
  newGameModal.classList.remove("active");
  bingo.classList.add("active");
  CreateBingo();
  showButtons();
}

function hideButtons() {
  restartButton.classList.remove("active");
  showValuesButton.classList.remove("active");
}

function showButtons() {
  restartButton.classList.add("active");
  showValuesButton.classList.add("active");
}

function ShowValues() {
  const valueListModal = document.getElementById("value-list-modal");
  const valueList = document.getElementById("value-list");
  valueList.classList.add("active");
  hideButtons();

  bingoValues.forEach((value, id) => {
    const element = document.createElement("p");
    element.textContent = `${id}: ${value}`;

    valueList.append(element);
  });
}

function HideValues() {
  const valueList = document.getElementById("value-list");
  valueList.classList.remove("active");
  showButtons();
}

function ShowConfirmModal() {
  const confirmModal = document.getElementById("confirm-modal");
  confirmModal.classList.add("active");

  hideButtons();
}

function HideConfirmModal() {
  const confirmModal = document.getElementById("confirm-modal");
  confirmModal.classList.remove("active");
  showButtons();
}

function RestartGame() {
  bingo.classList.remove("active");
  newGameModal.classList.add("active");
  header.classList.remove("active");
  HideConfirmModal();
  hideButtons();
  clearLoadedValues();
}
