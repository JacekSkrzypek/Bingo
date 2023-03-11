import { CreateBingo } from "./game.js";
import { specialTitle, bingoValues } from "./constants.js";

const newGameModal = document.getElementById("new-game-modal");
const bingo = document.getElementById("bingo");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-game");
const showValuesButton = document.getElementById("show-values");
const input = document.getElementById("nick-input");
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

  const nick = input.value;
  playerInformation.textContent = `${nick} ${time}`;

  header.classList.add("active");
  newGameModal.classList.remove("active");
  bingo.classList.add("active");
  CreateBingo();
  showButtons();
}

function hideButtons () {
    restartButton.classList.remove("active")
    showValuesButton.classList.remove("active")
}

function showButtons () {
    restartButton.classList.add("active")
    showValuesButton.classList.add("active")
}

function ShowValues () {
    const valueListModal = document.getElementById("value-list-modal");
    const valueList = document.getElementById("value-list");
    valueList.classList.add("active");
    hideButtons();

    bingoValues.forEach((value, id) => {
        const element = document.createElement("p");
        element.textContent = `${id}: ${value}`;

        valueList.append(element);
    })
}

function HideValues () {
    const valueList = document.getElementById("value-list");
    valueList.classList.remove("active");
    showButtons();
}

function ShowConfirmModal () {
  const confirmModal = document.getElementById("confirm-modal");
  confirmModal.classList.add("active");

  hideButtons();
}

function HideConfirmModal () {
  const confirmModal = document.getElementById("confirm-modal");
  confirmModal.classList.remove("active");
  showButtons();
}

function RestartGame () {
  bingo.classList.remove("active");
  newGameModal.classList.add("active");
  header.classList.remove("active");
  HideConfirmModal();
  hideButtons();
}