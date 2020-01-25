
var c = canvas.getContext('2d');

var board = new Board();

board.init();

var score = 0;
function mainloop() {

    // if (key === "p") {
    //     console.log("Checks__ S = " + board.currentPiece.isDownBlocked + " | A = " + board.currentPiece.isLeftBlocked + " | D = " + board.currentPiece.isRightBlocked+ " |");
    //     key = undefined;
    // }

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.stroke();
    c.beginPath();
    c.fillStyle = `rgba(160,160,160,0.5)`;
    c.fillRect(0, 0, CELLSIZE * GRIDWIDTH, CELLSIZE * GRIDHEIGHT);
    c.stroke();

    board.update(); //update the board and pieces
    board.draw();
    if (board.isGameOver) {
        board = new Board();
    }

    c.beginPath();
    c.font = "30px Arial";
    c.fillStyle = "gray";
    c.fillText(`Score: ${score}`, 400, 50);

    key = undefined;

    scoreboard.innerText = score;
    requestAnimationFrame(mainloop);
}

requestAnimationFrame(mainloop);
