const grid = document.getElementById('grid');
const hintButton = document.getElementById('hint-button');
const showColorsButton = document.getElementById('show-colors-button');
let level = 1;
let differentCellIndex;

function generateColors(level) {
    const size = level + 2;
    const gap = 10; // 网格间隙
    const maxGridWidth = window.innerWidth * 0.9 - (size - 1) * gap;
    const maxGridHeight = window.innerHeight * 0.9 - (size - 1) * gap;
    const cellSize = Math.min(50, Math.floor(Math.min(maxGridWidth / size, maxGridHeight / size)));

    grid.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;
    grid.style.gap = `${gap}px`;

    const baseColor = getRandomColor();
    const differentColor = getDifferentColor(baseColor, level);

    const cells = [];
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.backgroundColor = baseColor;
        cell.addEventListener('click', () => handleCellClick(cell, differentColor));
        cells.push(cell);
    }

    differentCellIndex = Math.floor(Math.random() * cells.length);
    cells[differentCellIndex].style.backgroundColor = differentColor;

    grid.innerHTML = '';
    cells.forEach(cell => grid.appendChild(cell));
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getDifferentColor(baseColor, level) {
    const colorDiff = Math.max(10, 256 - level * 10);
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    const newR = Math.min(255, Math.max(0, r + Math.floor(Math.random() * colorDiff) - colorDiff / 2));
    const newG = Math.min(255, Math.max(0, g + Math.floor(Math.random() * colorDiff) - colorDiff / 2));
    const newB = Math.min(255, Math.max(0, b + Math.floor(Math.random() * colorDiff) - colorDiff / 2));
    return `rgb(${newR}, ${newG}, ${newB})`;
}

function handleCellClick(cell, differentColor) {
    const cellColor = rgbToHex(cell.style.backgroundColor);
    const targetColor = rgbToHex(differentColor);
    if (cellColor === targetColor) {
        level++;
        generateColors(level);
    } else {
        alert('Incorrect! Try again.');
    }
}

function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (rgbValues[0] << 16) + (rgbValues[1] << 8) + rgbValues[2]).toString(16).slice(1).toUpperCase()}`;
}

function showHint() {
    const cells = document.querySelectorAll('.cell');
    cells[differentCellIndex].classList.add('hint-highlight');
    setTimeout(() => {
        cells[differentCellIndex].classList.remove('hint-highlight');
    }, 1000);
}

function showColors() {
    const cells = document.querySelectorAll('.cell');
    const differentCell = cells[differentCellIndex];
    const differentColor = differentCell.style.backgroundColor;
    const baseColor = cells[0].style.backgroundColor;

    alert(`Different Color: ${differentColor}\nBase Color: ${baseColor}`);
}

hintButton.addEventListener('click', showHint);
showColorsButton.addEventListener('click', showColors);

generateColors(level);