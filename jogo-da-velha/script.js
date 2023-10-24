// Declaração de variáveis
const cells = document.querySelectorAll('.cell');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset-button');
const playerXWins = document.getElementById('player-x-wins');
const playerOWins = document.getElementById('player-o-wins');
const gameHistory = document.getElementById('game-history');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;
let playerXScore = 0;
let playerOScore = 0;
let history = [];

// Combinações vencedoras
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Atualiza as estatísticas iniciais
function updateStats() {
    playerXWins.textContent = playerXScore;
    playerOWins.textContent = playerOScore;
}

// Adiciona resultado ao histórico
function addToHistory(winner) {
    const result = winner ? `Vencedor: Jogador ${winner}` : 'Empate';
    history.unshift(result);

    if (history.length > 5) {
        history.pop();
    }

    updateHistory();
}

// Atualiza o histórico
function updateHistory() {
    gameHistory.innerHTML = '';
    history.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Partida ${index + 1}: ${entry}`;
        gameHistory.appendChild(listItem);
    });
}

// Verifica se há um vencedor
function checkForWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            winnerText.textContent = `Jogador ${currentPlayer} venceu!`;
            gameEnded = true;

            if (currentPlayer === 'X') {
                playerXScore++;
            } else {
                playerOScore++;
            }

            updateStats();
            addToHistory(currentPlayer);

            return;
        }
    }
    if (!board.includes('')) {
        winnerText.textContent = 'Empate!';
        gameEnded = true;
        addToHistory(null);
    }
}

// Realiza uma jogada
function makeMove(row, col) {
    if (board[row * 3 + col] || gameEnded) return;
    board[row * 3 + col] = currentPlayer;
    cells[row * 3 + col].textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Reinicia o jogo
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    winnerText.textContent = '';
    gameEnded = false;
    currentPlayer = 'X';
}

// Adiciona event listeners
updateStats();
updateHistory();
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(Math.floor(index / 3), index % 3));
});
resetButton.addEventListener('click', resetBoard);
