document.getElementsByTagName("h1")[0].style.fontSize = "6vw";const container = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-btn');

let pieces = [...Array(15).keys()].map(x => x + 1); // Create array from 1 to 15
pieces.push(''); // Add an empty space for the 16th piece

function createPuzzle() {
    container.innerHTML = '';
    pieces.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.className = 'puzzle-piece';
        pieceElement.textContent = piece;
        pieceElement.dataset.value = piece;

        if (piece === '') {
            pieceElement.classList.add('empty');
        }

        container.appendChild(pieceElement);
    });

    addClickEvent();
}

function shufflePuzzle() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    createPuzzle();
}

function addClickEvent() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach(piece => {
        piece.addEventListener('click', () => {
            movePiece(piece);
        });
    });
}

function movePiece(piece) {
    const index = pieces.indexOf(parseInt(piece.dataset.value) || '');
    const emptyIndex = pieces.indexOf('');
    const rowDiff = Math.floor(emptyIndex / 4) - Math.floor(index / 4);
    const colDiff = (emptyIndex % 4) - (index % 4);

    // Only allow movement if the piece is adjacent to the empty space
    if ((Math.abs(rowDiff) === 1 && colDiff === 0) || (Math.abs(colDiff) === 1 && rowDiff === 0)) {
        pieces[emptyIndex] = pieces[index];
        pieces[index] = '';
        createPuzzle();

        if (checkWin()) {
            setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
        }
    }
}

function checkWin() {
    const winState = [...Array(15).keys()].map(x => x + 1).concat(['']);
    return pieces.every((val, index) => val === winState[index]);
}

shuffleButton.addEventListener('click', shufflePuzzle);
createPuzzle();
