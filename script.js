
let boxes = document.querySelectorAll(".box");
let winnerEle = document.querySelector("#show-winner");

let resetGameButton = document.querySelector("#reset-btn");

let player = "o"; // player1, player2;
let trunO = true;
let boxesClicked = 0;

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach(
    node => {
        node.addEventListener("click", (evnt) => {
            if(!trunO) {
                player = "x";
                trunO = true;
                node.style.color = "red";
            } else {
                trunO = false
                player = "o";
                node.style.color = "yellow";
            }
            node.innerText = player;
            node.disabled = true;
            boxesClicked ++;
            let isWinner = checkWinner();
            if (isWinner || boxesClicked===9) {
                stopGame();
            }
        });
    }
);

const checkWinner = () => {
    for(pattern of winningPattern) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if(val1 && val2 && val3 && val1===val2 && val1===val3) {
            showWinner(val1)
            return true;
        }
    }
};

const showWinner  = (winner) => {
    winnerEle.innerText = `hurrey ${winner} is winned!`;
}

const resetGame = () => {
    boxes.forEach(node => {
        node.innerText = "";
        node.disabled = false;
    });
    winnerEle.innerText = "";
    boxesClicked = 0;
}

const stopGame = () => {
    boxes.forEach(node => {
        node.disabled = true;
    });
    boxesClicked = 0;
}

resetGameButton.addEventListener("click", resetGame);