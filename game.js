import { columns, bingoValues } from "./constants.js";

const usedNumbers = [];
const winning = [];

export const CreateBingo = () => {
  const bingo = document.getElementById("bingo");
  
  bingo.style.setProperty(
    "grid-template-columns",
    "repeat(" + columns + ", 1fr )"
  );
  
  for (let i = 0; i < columns * columns; i++) {
    const element = document.createElement("div");
    element.classList.add("element");
    element.id = i;
    element.addEventListener("click", () => {
      clickElement(i);
    });
  
    if(i === 0) {
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
    value.innerText = bingoValues[getValue()];
  
    element.append(value);
    bingo.append(element);
  }
}



function getValue() {
  const elementsLength = bingoValues.length;
  
  while (usedNumbers.length < elementsLength) {
    const value = Math.floor(Math.random() * elementsLength);

    if (!usedNumbers.includes(value)) {
        usedNumbers.push(value);
        return value;
    }
  }
}

function clickElement(id) {
  const element = document.getElementById(id);

  if (element.classList.contains("element--selected")) {
    element.classList.remove("element--selected");
    if(element.classList.contains("element--winning")) {
      element.classList.remove("element--winning");}
  } else {
    element.classList.add("element--selected");
  }
  checkGame();
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
    if(element.classList.contains("element--winning") && !winningId.includes[i]) {
        element.classList.remove("element--winning");
    }
  }

  for (let i = 0; i < winningId.length; i++) {
    const id = winningId[i];
    const element = document.getElementById(id);
    element.classList.add("element--winning");
  }
}



