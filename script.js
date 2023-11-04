// Constants
const numRows = 30;
const numCols = 50;
const speed = 200; // In milliseconds

let grid = createGrid();
let isPlaying = false;
let intervalId;

// Create the grid
function createGrid() {
    const grid = new Array(numRows);

    for (let i = 0; i < numRows; i++) {
        grid[i] = new Array(numCols).fill(false);
    }

    return grid;
}

// Initialize the grid with random cells
function randomizeGrid() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            grid[i][j] = Math.random() < 0.3; // Adjust the probability as needed
        }
    }
    renderGrid();
}

// Render the grid
function renderGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = grid[i][j] ? "black" : "white";
            cell.addEventListener("click", () => toggleCell(i, j));
            gridContainer.appendChild(cell);
        }
    }
}

// Toggle a cell on click
function toggleCell(row, col) {
    grid[row][col] = !grid[row][col];
    renderGrid();
}

// Calculate the next generation
function nextGeneration() {
    const newGrid = createGrid();

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j]) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[i][j] = neighbors === 3;
            }
        }
    }

    grid = newGrid;
    renderGrid();
}

// Count live neighbors for a cell
function countNeighbors(row, col) {
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;

    for (const [dr, dc] of neighbors) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            if (grid[newRow][newCol]) {
                count++;
            }
        }
    }

    return count;
}

document.getElementById("startButton").addEventListener("click", () => {
    if (!isPlaying) {
        isPlaying = true;
        intervalId = setInterval(nextGeneration, speed);
    }
});

document.getElementById("stopButton").addEventListener("click", () => {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(intervalId);
    }
});

document.getElementById("clearButton").addEventListener("click", () => {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(intervalId);
    }
    grid = createGrid();
    renderGrid();
});

randomizeGrid(); // You can remove this line if you want to start with an empty grid
