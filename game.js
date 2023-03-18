import { columns, bingoValues } from "./constants.js";

const usedNumbers = [];
let loadedValues = [];
const game = {
  player: "",
  loadedValues: [],
};

export const CreateBingo = () => {
  removeAllElements();

  const bingo = document.getElementById("bingo");

  bingo.style.setProperty(
    "grid-template-columns",
    "repeat(" + columns + ", 1fr )"
  );

  if (localStorage.getItem("game")) {
    loadedValues = JSON.parse(localStorage.getItem("game")).loadedValues;
  }

  for (let i = 0; i < columns * columns; i++) {
    const element = document.createElement("div");
    element.classList.add("element");
    element.id = i;
    element.addEventListener("click", () => {
      clickElement(i);
    });

    if (i === 0) {
      element.classList.add("element--first-edge");
    } else if (i === columns - 1) {
      element.classList.add("element--second-edge");
    } else if (i === columns * columns - columns) {
      element.classList.add("element--third-edge");
    } else if (i === columns * columns - 1) {
      element.classList.add("element--fourth-edge");
    }

    const value = document.createElement("p");
    value.classList.add("value");
    value.innerText = bingoValues[getValue(i)];

    if(localStorage.getItem("game")) {
      const localElements = JSON.parse(localStorage.getItem("game"));
      if(localElements.loadedValues[i].status) {
        const statuses = localElements.loadedValues[i].status.replace(/^\s+/g, '').split(" ");
        statuses.forEach(status => {
          element.classList.add(status);
        })
      }
    }



    element.append(value);
    bingo.append(element);
  }

  changeLocalStorage();
};

function changeLocalStorage () {
  const playerInformation = document.getElementById("player-information");
  game.player = playerInformation.textContent;
  
  for (let i = 0; i < columns * columns; i++) {
    const element = document.getElementById(i);
    let status = "";
    if(element.classList) {
    for (let j = 1; j < element.classList.length; j++) {
      status = status + " " + element.classList[j].replace(/^\s+/g, '');
    }
    loadedValues[i].status = status
    }
  }

  game.loadedValues = loadedValues;
  localStorage.setItem("game", JSON.stringify(game));
}

function getValue(id) {
  const elementsLength = bingoValues.length;

  while (usedNumbers.length < elementsLength) {
    if (!localStorage.getItem("game")) {
      const value = Math.floor(Math.random() * elementsLength);

      if (!usedNumbers.includes(value)) {
        usedNumbers.push(value);
        game.loadedValues.push({value: bingoValues[value], status: ""});
        loadedValues.push({value: bingoValues[value], status: ""})
        return value;
      }
    } else {
      const value = bingoValues.indexOf(loadedValues[id].value);
      return value;
    }
  }
}

function clickElement(id) {
  const element = document.getElementById(id);

  if (element.classList.contains("element--selected")) {
    element.classList.remove("element--selected");
    if (element.classList.contains("element--winning")) {
      element.classList.remove("element--winning");
    }
  } else {
    element.classList.add("element--selected");
  }
  checkGame();

  changeLocalStorage();

}

function checkGame() {
  const winningId = [];

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < columns; j++) {
      const id = i + j * columns;

      const element = document.getElementById(id);
      if (!element.classList.contains("element--selected")) {
        break;
      }

      if (j === columns - 1) {
        for (let k = 0; k < columns; k++) {
          const newId = i + k * columns;
          if (!winningId.includes(newId)) {
            winningId.push(newId);
          }
        }
      }
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < columns; j++) {
      const id = i * columns + j;

      const element = document.getElementById(id);

      if (!element.classList.contains("element--selected")) {
        break;
      }

      if (j === columns - 1) {
        for (let k = 0; k < columns; k++) {
          const newId = i * columns + k;
          if (!winningId.includes(newId)) {
            winningId.push(newId);
          }
        }
      }
    }
  }
  selectWinningElements(winningId);
}

function selectWinningElements(winningId) {
  for (let i = 0; i < columns * columns; i++) {
    const element = document.getElementById(i);
    if (
      element.classList.contains("element--winning") &&
      !winningId.includes[i]
    ) {
      element.classList.remove("element--winning");
      
    }
  }

  for (let i = 0; i < winningId.length; i++) {
    const id = winningId[i];
    const element = document.getElementById(id);
    element.classList.add("element--winning");
  }
  game.loadedValues = loadedValues;
  localStorage.setItem("game", JSON.stringify(game));
}

function removeAllElements() {
  const elements = document.querySelectorAll(".element");
  if (elements) {
    usedNumbers.length = 0;
    elements.forEach((element) => element.remove());
  }
}

export function clearLoadedValues() {
  loadedValues = [];
  localStorage.clear();
}
