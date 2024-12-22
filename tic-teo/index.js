// two players

// const cells = document.querySelectorAll('.cell');
// const winner = document.getElementById('winner');

// let turn = true;


// const winningPattern = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8]
// ]

// cells.forEach((cell) => {
//     cell.addEventListener('click', () => {
//         if(turn) {
//             cell.innerText = 'X';
//             turn = false;
//         } else {
//             cell.innerText = 'O';
//             turn = true;
//         }
//         cell.disabled = true;

//         showWinner();
//     })
// })


// const showWinner = () => {
//     for(i = 0; i < winningPattern.length; i++) {
//         const p = winningPattern[i];
//         const p1 = cells[p[0]].innerText;
//         const p2 = cells[p[1]].innerText;
//         const p3 = cells[p[2]].innerText;
//         if(p1 && p2 && p3 && (p1 === p2) && (p2 === p3)) {
//             // console.log("winer", cells[p[0]]);
//             winner.innerText = `winner is ${p1}`
//         }
//     }
// }


// one player and ai player


const cells = document.querySelectorAll('.cell');
const winner = document.getElementById('winner');

let turn = true; // true means it's the player's turn, false means it's the AI's turn.

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Add event listeners for player's move
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (turn && cell.innerText === '') {
            cell.innerText = 'X';
            turn = false;
            cell.disabled = true;

            // Check if the player wins
            if (!showWinner()) {
                setTimeout(aiMove, 500); // AI makes a move after a delay
            }
        }
    });
});

// Function for AI's move
const aiMove = () => {
    const emptyCells = Array.from(cells).filter(cell => cell.innerText === '');
    if (emptyCells.length === 0) return;

    // AI chooses a random empty cell
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = 'O';
    randomCell.disabled = true;
    turn = true;

    // Check if the AI wins
    showWinner();
};

// Function to check for a winner
const showWinner = () => {
    for (let i = 0; i < winningPattern.length; i++) {
        const p = winningPattern[i];
        const p1 = cells[p[0]].innerText;
        const p2 = cells[p[1]].innerText;
        const p3 = cells[p[2]].innerText;
        if (p1 && p2 && p3 && (p1 === p2) && (p2 === p3)) {
            winner.innerText = `Winner is ${p1}`;
            disableAllCells();
            return true; // Game over
        }
    }

    // Check for a draw
    if (Array.from(cells).every(cell => cell.innerText !== '')) {
        winner.innerText = `It's a draw!`;
        return true; // Game over
    }

    return false; // Game continues
};

// Function to disable all cells
const disableAllCells = () => {
    cells.forEach(cell => {
        cell.disabled = true;
    });
};