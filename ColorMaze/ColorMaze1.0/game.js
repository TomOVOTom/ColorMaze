const grid = document.getElementById('grid');
let level = 1;

function generateColors(level) {
    const size = level + 2;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const baseColor = getRandomColor();
    const differentColor = getDifferentColor(baseColor, level);

    const cells = [];
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = baseColor;
        cell.addEventListener('click', () => handleCellClick(cell, differentColor));
        cells.push(cell);
    }

    const differentCellIndex = Math.floor(Math.random() * cells.length);
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

generateColors(level);