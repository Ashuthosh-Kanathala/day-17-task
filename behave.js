const numbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; // 6 pairs of numbers
numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers

const gameBoard = document.getElementById("gameBoard");
const resetBtn = document.getElementById("reset");

function resetGame() {
  // Shuffle the numbers again
  numbers.sort(() => Math.random() - 0.5);

  // Reset each square
  const squares = document.querySelectorAll(".square");
  squares.forEach((square, index) => {
    square.innerText = "?";
    square.dataset.value = numbers[index];
  });
}

// Add event listener to the reset button
resetBtn.addEventListener("click", resetGame);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const squares = [];
numbers.forEach((num) => {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.value = num;
  square.innerText = "?";

  // Card flip logic
  square.addEventListener("click", () => {
    if (lockBoard || square.innerText !== "?") return; // Prevent clicking more than 2 cards

    square.innerText = num;

    if (!firstCard) {
      firstCard = square;
    } else {
      secondCard = square;
      lockBoard = true; // Prevent clicking more cards

      // Check for a match
      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedPairs++;

        // Check if all pairs are matched
        if (matchedPairs === numbers.length / 2) {
          setTimeout(() => alert("Game Won!"), 300);
        }
      } else {
        // Flip back unmatched cards
        setTimeout(() => {
          firstCard.innerText = "?";
          secondCard.innerText = "?";
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 800);
      }
    }
  });

  squares.push(square);
  gameBoard.appendChild(square);
});
