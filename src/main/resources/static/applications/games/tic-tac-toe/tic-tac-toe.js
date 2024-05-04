const board = [[null, null, null], [null, null, null], [null, null, null]];
let currentPlayer = 'X';

function handleClick(row, col) {
    if (!board[row][col]) {
        board[row][col] = currentPlayer;
        render();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function render() {
    const cells = document.querySelectorAll('.cell');
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            cells[index].textContent = cell;
        });
    });
}

function checkWinner() {
    // 横方向
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            alert(`${board[i][0]} の勝利！`);
            return;
        }
    }
    // 縦方向
    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            alert(`${board[0][i]} の勝利！`);
            return;
        }
    }
    // 斜め方向
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        alert(`${board[0][0]} の勝利！`);
        return;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        alert(`${board[0][2]} の勝利！`);
        return;
    }
    // 引き分け
    if (board.every(row => row.every(cell => cell))) {
        alert('引き分け！');
    }
}
