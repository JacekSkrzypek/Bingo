import { CreateBingo } from "./game.js";
import { specialTitle } from "./constants.js";

const modal = document.getElementById("modal");
const bingo = document.getElementById("bingo");
const button = document.getElementById("start-button");
const input = document.getElementById("nick-input");
const playerInformation = document.getElementById("player-information");

button.addEventListener("click", () => StartGame());

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

  modal.classList.remove("active");
  bingo.classList.add("active");
  CreateBingo();
}
