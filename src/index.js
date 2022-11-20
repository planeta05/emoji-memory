import "./styles.css";

const htmlEntityCodeRange = [128512, 129488];
const emojiArray = [];
const fieldContainer = document.querySelector(".field");

fillEmojiArray();

const memoryArray = duplicateArrayElements(emojiArray);
let cardsChoosen = [];
let choosenCardIds = [];

memoryArray.sort(() => 0.5 - Math.random());

createBoard();

function fillEmojiArray() {
  for (let i = htmlEntityCodeRange[0]; i <= htmlEntityCodeRange[0] + 9; i++) {
    emojiArray.push("&#" + i + ";");
  }
}

function createBoard() {
  memoryArray.forEach((element, i) => {
    const card = document.createElement("div");
    card.classList.add("card", "closed");
    card.innerHTML = "&#128173;";
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    fieldContainer.append(card);
  });
}

function duplicateArrayElements(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
    newArr.push(arr[i]);
  }
  return newArr;
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChoosen.push(memoryArray[cardId]);
  choosenCardIds.push(cardId);
  this.classList.remove("closed");
  this.innerHTML = memoryArray[cardId];
  if (cardsChoosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  console.log("check for a match!");
  const cards = document.querySelectorAll(".card");
  const [firstId, secondId] = choosenCardIds;
  const [firstCardEmoji, secondCardEmoji] = cardsChoosen;
  if (firstId === secondId) {
    alert("You clicked the same card twice...");
    cards[firstId].innerHTML = "&#128173;";
    cards[firstId].classList.add("closed");
  } else if (firstCardEmoji === secondCardEmoji) {
    alert("its a match!");
    cards[firstId].innerHTML = "&#9989;";
    cards[secondId].innerHTML = "&#9989;";
    cards[firstId].removeEventListener("click", flipCard);
    cards[secondId].removeEventListener("click", flipCard);
  } else {
    cards[firstId].innerHTML = "&#128173;";
    cards[secondId].innerHTML = "&#128173;";
    cards[firstId].classList.add("closed");
    cards[secondId].classList.add("closed");
    alert("Leider nein, leider gar nicht");
  }
  cardsChoosen = [];
  choosenCardIds = [];
}
