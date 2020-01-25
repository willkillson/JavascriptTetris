var canvas = document.querySelector('canvas');
var scoreboard = document.getElementById("score");

canvas.width = 600;
canvas.height = 800;

var key = undefined;
window.addEventListener('keypress', function (e) {
    key = e.key;
}, false);

var milliseconds = 0;
window.setInterval(function addseconds() {
    milliseconds++;
}, 1);

function clearBoard(board) {
    let v = board;
    for (let i = 0; i < GRIDWIDTH; i++) {
        //assigns whole _board array with empty
        for (let j = 0; j < GRIDHEIGHT; j++) {
            v[i][j] = "empty";
        }
    }
    return v;
}

function Board() {
    this.isGameOver = false;
    this.intensity = 1;
    this._gridHeight = GRIDHEIGHT;
    this._gridWidth = GRIDWIDTH;
    this._cellSize = CELLSIZE;
    this._cellPadding = CELLPADDING;
    this.isEmpty = true;//this will invoke a place piece function
    this.currentPiece = undefined;
    //this.command = "s";//d,l,r,rr,rl,u
    this.score = 0;
    this._nextPiece = undefined;


    this.init = function () {
        this._board = new Array(this._gridWidth);//creating the multidem array in javascript <3
        for (let i = 0; i < this._board.length; i++) {
            this._board[i] = new Array(this._gridHeight);
        }
        this._board = clearBoard(this._board);
        for (let i = 0; i < this._gridHeight; i++) {
            //////board set up
            //assigns boarder portions of _board array
            this._board[0][i] = "boarder";
            this._board[this._gridWidth - 1][i] = "boarder";
            if (i < this._gridWidth) {
                this._board[i][0] = "boarder";
                this._board[i][this._gridHeight - 1] = "boarder";
            }
        }

        this._lines = new Array(this._gridHeight);//lines for counting when we have a tetris
        for (let i = 0; i < this._lines.length; i++) {
            this._lines[i] = 0;
        }

        this.currentPiece = new Piece();
        this.currentPiece.init();
        this._nextPiece = this.currentPiece.genNextPiece();
        this.currentPiece.generateNewPiece(this._nextPiece);
        this._nextPiece = this.currentPiece.genNextPiece();

    }
    this.update = function () {

        if (this.currentPiece._isSet === true) {
            this.currentPiece.generateNewPiece(this._nextPiece);
            this._nextPiece = this.currentPiece.genNextPiece();
        }
        this.currentPiece._command = key;



        this.checkCollision();

        if (key !== undefined)
        console.log("Checks__ S = " + board.currentPiece.isDownBlocked + " | A = " + board.currentPiece.isLeftBlocked + " | D = " + board.currentPiece.isRightBlocked + " | RL = " + board.currentPiece.isRotateLeftBlocked + " | RR = " + board.currentPiece.isRotateRightBlocked+ " |");

            if (this.currentPiece._command === "w") {

                if (this.currentPiece.isDownBlocked === true) {
                    this.setBoard();// 
                }

                while (this.currentPiece.isDownBlocked === false) {
                    this.currentPiece.move();
                    this.currentPiece.update();
                    this.checkCollision(); 
                }
            }
            else {
                if ((this.currentPiece._command === "s") && (this.currentPiece.isDownBlocked === true)) {
                    this.setBoard();// 
                }
                else {
                    this.currentPiece.move();
                    this.currentPiece.update();
                }
            }
       

            this.countLineCells();
            this.shiftStackLines();


        
    }
    this.draw = function () {

        for (let i = 0; i < this._gridWidth; i++) {
            for (let j = 0; j < this._gridHeight; j++) {
                //we need to set the specific color depending on what is in the array

                //so this is where we pick different colors
                c.beginPath();
                c.fillStyle = red;


                switch (this._board[i][j]) {
                    case "boarder":
                        c.fillStyle = `rgba(255,51,153,1)`;
                        break;
                    case "empty":
                        c.fillStyle = black;
                        break;
                    case "orange":
                        c.fillStyle = orange;
                        break;
                    case "teal":
                        c.fillStyle = teal;
                        break;
                    case "red":
                        c.fillStyle = red;
                        break;
                    case "blue":
                        c.fillStyle = blue;
                        break;
                    case "purple":
                        c.fillStyle = purple;
                        break;
                    case "green":
                        c.fillStyle = green;
                        break;
                    case "yellow":
                        c.fillStyle = yellow;
                        break;
                }
                switch (this.currentPiece._boardCheck[i][j]) {
                    case "orange":
                        c.fillStyle = orange;
                        break;
                    case "teal":
                        c.fillStyle = teal;
                        break;
                    case "red":
                        c.fillStyle = red;
                        break;
                    case "blue":
                        c.fillStyle = blue;
                        break;
                    case "purple":
                        c.fillStyle = purple;
                        break;
                    case "green":
                        c.fillStyle = green;
                        break;
                    case "yellow":
                        c.fillStyle = yellow;
                        break;
                }


                c.fillRect(i * this._cellSize + this._cellPadding * i, j * this._cellSize + j * this._cellPadding, this._cellSize, this._cellSize);


                c.stroke();





            }
        }






        //////////////////////next piece
        c.beginPath();
        console.log(this._nextPiece);

        switch (this._nextPiece) {
            case 0:
                c.fillStyle = red;

                c.fillRect(475, 100 + this._cellSize, this._cellSize, this._cellSize);
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475, 100 + this._cellSize * 2, this._cellSize, this._cellSize);
                c.fillRect(475, 100 + this._cellSize * 3, this._cellSize, this._cellSize);
                break;
            case 1: 
                c.fillStyle = teal;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475, 100 + this._cellSize, this._cellSize, this._cellSize);
                break;
            case 2:
                c.fillStyle = orange;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100 + this._cellSize, this._cellSize, this._cellSize);
                break;
            case 3:
                c.fillStyle = blue;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100 + this._cellSize, this._cellSize, this._cellSize);
                break;
            case 4:
                c.fillStyle = purple;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475, 100 + this._cellSize, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100 + this._cellSize, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100, this._cellSize, this._cellSize);
    
                break;
            case 5:
                c.fillStyle = green;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475, 100 + this._cellSize, this._cellSize, this._cellSize);
                c.fillRect(475 + this._cellSize, 100 + this._cellSize, this._cellSize, this._cellSize);

                break;
            case 6:
                c.fillStyle = yellow;
                c.fillRect(475, 100, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100, this._cellSize, this._cellSize);
                c.fillRect(475, 100 - this._cellSize, this._cellSize, this._cellSize);
                c.fillRect(475 - this._cellSize, 100 - this._cellSize, this._cellSize, this._cellSize);
                break;

        }
 
        c.stroke();

    }

    this.checkCollision = function () {
        //checks the collisions between  this._board[][] and _currentPiece._boardCheck[][]
        //then flags either 

        this.currentPiece.isDownBlocked = false;
        this.currentPiece.isLeftBlocked = false;
        this.currentPiece.isRightBlocked = false;
        this.currentPiece.isUpBlocked = false;
        this.currentPiece.isRotateRightBlocked = false;
        this.currentPiece.isRotateLeftBlocked = false;

        if (this.currentPiece._command !== undefined) {

            switch (this.currentPiece._pieceType) {
                case "I":
                    this.checkCollisionI();
                    break;
                case "J":
                    this.checkCollisionJ();
                    break;
                case "L":
                    this.checkCollisionL();
                    break;
                case "O":
                    this.checkCollisionO();
                    break;
                case "S":
                    this.checkCollisionS();
                    break;
                case "Z":
                    this.checkCollisionZ();
                    break;
                case "T":
                    this.checkCollisionT();
                    break;
            }

        }
    }
    this.checkCollisionI = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":
                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                        }
                        break;
                    case "a":
                        if (this._board[xpos - 2][ypos] !== "empty" ) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if (this._board[xpos +3][ypos] !== "empty" ) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos + 1][ypos - 1] !== "empty")|| (this._board[xpos + 1][ypos - 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos + 1][ypos - 1] !== "empty") || (this._board[xpos + 1][ypos - 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos+1][ypos + 2] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos][ypos-1] !== "empty") || (this._board[xpos][ypos-2] !== "empty") || (this._board[xpos][ypos+1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                            return;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 2][ypos] !== "empty") || (this._board[xpos + 2][ypos - 1] !== "empty") || (this._board[xpos + 2][ypos - 2] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                            return;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos + 1][ypos + 2] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos + 2][ypos] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos + 2][ypos] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                }
                break;
        }



        //piece._isSet = true;

        return;
    }
    this.checkCollisionT = function () {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos - 1][ypos+1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 2 ][ypos] !== "empty") || (this._board[xpos +1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos+1][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                          
                        }
                        break;
                    case "j":
                        if ((this._board[xpos + 1][ypos] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;

                        }
                        break;
                }
                break;
            case 2:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos +2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos-1][ypos] !== "empty") || (this._board[xpos - 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
           
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;

                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos - 1] !== "empty") || (this._board[xpos + 1][ypos] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 3:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty") || (this._board[xpos - 1][ypos +1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos +2][ypos] !== "empty") || (this._board[xpos +1][ypos - 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if (this._board[xpos-1][ypos] !== "empty") {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos-1][ypos +1] !== "empty") || (this._board[xpos + 1][ypos+1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
                
        }

    }
    this.checkCollisionL = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos-2][ypos+1] !== "empty")){
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 2][ypos] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos-1] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty") || (this._board[xpos][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos-1] !== "empty") || (this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos+2] !== "empty") || (this._board[xpos - 1][ypos] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 2][ypos - 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos +1][ypos] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos+1][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos-1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos + 1][ypos ] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 2:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos - 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos+2][ypos] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos][ypos - 1] !== "empty") || (this._board  [xpos-1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 3:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }

                        break;
                    case "d":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos+1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
        }

    }
    this.checkCollisionJ = function () {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos +2][ypos] !== "empty") || (this._board[xpos+2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos-1] !== "empty") || (this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos - 1] !== "empty") || (this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty") || (this._board[xpos - 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }

                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos-1][ypos] !== "empty") || (this._board[xpos+1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 1][ypos+1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 2:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos - 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty") || (this._board[xpos][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos][ypos] !== "empty") || (this._board[xpos][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 3:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 2][ypos - 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
        }

    }
    this.checkCollisionS = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 2][ypos] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos - 2][ypos - 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos +1][ypos] !== "empty") || (this._board[xpos +1][ypos + 1] !== "empty") || (this._board[xpos][ypos - 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos - 1][ypos+1] !== "empty") || (this._board[xpos + 1][ypos] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
        }

    }
    this.checkCollisionZ = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty") ) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 2][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos +2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos +1][ypos] !== "empty") || (this._board[xpos + 1][ypos-1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos + 1][ypos - 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos +1][ypos+1] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos][ypos - 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }
                        break;
                    case "d":
                        if ((this._board[xpos +2][ypos] !== "empty") || (this._board[xpos+2][ypos - 1] !== "empty") || (this._board[xpos +1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateRightBlocked = true;
                        }
                        break;
                    case "j":
                        if ((this._board[xpos + 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isRotateLeftBlocked = true;
                        }
                        break;
                }
                break;
        }

    }
    this.checkCollisionO = function () {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece.rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }

                        break;
                    case "d":
                        if ((this._board[xpos +2][ypos] !== "empty") || (this._board[xpos +2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                           this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        break;
                    case "j":
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "s":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "a":
                        if ((this._board[xpos - 1][ypos] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece.isLeftBlocked = true;
                        }

                        break;
                    case "d":
                        if ((this._board[xpos + 2][ypos] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")) {
                            this.currentPiece.isRightBlocked = true;
                        }
                        break;
                    case "w":
                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                            this.currentPiece.isDownBlocked = true;
                            return;
                        }
                        break;
                    case "k":
                        break;
                    case "j":
                        break;
                }
                break;
        }

    }

    this.setBoard = function () {
        this.currentPiece._isSet = true;
        for (let i = 0; i < this._gridWidth; i++) {
            for (let j = 0; j < this._gridHeight; j++) {
                if (this.currentPiece._boardCheck[i][j] !== "empty") {
                    this._board[i][j] = this.currentPiece._boardCheck[i][j];
                }
            }
        }
    }

    this.countLineCells= function()
    {
        let count = 0;
        for (i = this._gridHeight; i > 4; i--) {
            for (j = 1; j < this._gridWidth-1; j++) {
                if (this._board[j][i] !== "empty") {		//clear line array 10- = things are in there
                    count++;
                }
            }
            this._lines[i] = count;
            count = 0;
        }
    }
    this.shiftStackLines = function () {

        let i = 0;
        let j = 0;
        let k = 0;
        let zero = 0;
        let one = 1;
        let newscore = 0;

        for (let i = 0; i < board._gridHeight - 1; i++) {
            if (this._lines[i] == 10) {
                k = i;
                k = k - 4;
                while (k != 0) {
                    for (j = 1; j < 11; j++) {
                        if ((i - zero) < 4) {
                            break;
                        }
                        this._board[j][i - zero] = this._board[j][i - one];
                        this._board[j][i - one] = "empty";
                    }
                    zero++;
                    one++;
                    k--;

                }
                newscore++;
            }

        }


        switch (newscore) {
            case 1:
                newscore = newscore * 100;
                break;
            case 2:
                newscore = newscore * 200;
                break;
            case 3:
                newscore = newscore * 300;
                break;
            case 4:
                newscore = newscore * 400;
                break;
        }

        score = score + newscore;




    }
}

function Piece() {
    this._gridHeight = GRIDHEIGHT;//og25
    this._gridWidth = GRIDWIDTH;//og12

    this._pieceType = undefined;//WARNING THIS IS OLD INFORMATION AND THEY USE CHARACTERS NOW 0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
    this._xPosition = undefined;// in relation to the main board
    this._yPosition = undefined;// in relation to the main board
    this.rotation = undefined;
    this.isDownBlocked = undefined;
    this.isLeftBlocked = undefined;
    this.isRightBlocked = undefined;
    this.isUpBlocked = undefined;
    this.isRotateRightBlocked = undefined;
    this.isRotateLeftBlocked = undefined;
    this._isSet = undefined;
    this._command = undefined;




    this.init = function () {
        this._boardCheck = new Array(this._gridWidth);//creating the multidem array in javascript <3
        for (let i = 0; i < this._boardCheck.length; i++) {
            this._boardCheck[i] = new Array(this._gridHeight);
        }
    }
    this.genNextPiece = function () {
        let num = Math.floor(7 * Math.random());
        return num;
    }
    this.generateNewPiece = function (num) {
      
        for (let i = 0; i < this._gridWidth; i++) {
            //////board set up
            //assigns whole _board array with empty
            for (let j = 0; j < this._gridHeight; j++) {
                this._boardCheck[i][j] = "empty";
            }
        }

        //reset collision
        this.rotation = 0;

        this.isDownBlocked = false;
        this.isLeftBlocked = false;
        this.isRightBlocked = false;
        this.isUpBlocked = false;
        this.isRotateRightBlocked = false;
        this.isRotateLeftBlocked = false;
        this._isSet = false;
    

        //reset current command
        //num = 5;

        this._command = undefined;

        switch (num) {////////////testing rotations
            case 0:
                this.rotation = Math.floor(2 * Math.random());
                break;
            case 1:
                this.rotation = Math.floor(4 * Math.random());
                break;
            case 2:
                this.rotation = Math.floor(4 * Math.random());
                break;
            case 3:
                this.rotation = Math.floor(4 * Math.random());
                break;
            case 4:
                this.rotation = Math.floor(2 * Math.random());
                break;
            case 5:
                this.rotation = Math.floor(2 * Math.random());
                break;
            case 6:
                this.rotation = Math.floor(2 * Math.random());
                break;
        }

  
        //0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===O
        this._xPosition = Math.floor(Math.random() * GRIDWIDTH);//og5 
        this._yPosition = 3;// og3

        this._xPosition = 5;
        this._yPosition = 3;// og3
        this.rotation = 0;



        if (this._xPosition < 3) {
            this._xPosition = 3;
        }
        if (this._xPosition > GRIDWIDTH - 3) {
            this._xPosition = GRIDWIDTH - 3;
        }

        switch (num) {
            case 0://I piece
                this._pieceType = "I";
                this._boardCheck[this._xPosition][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 2][this._yPosition] = "red";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "red";

                break;
            case 1://T
                this._pieceType = "T";
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "teal";
                break;
            case 2://L
                this._pieceType = "L";
                this._boardCheck[this._xPosition][this._yPosition] = "orange";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "orange";
                break;
            case 3://J
                this._pieceType = "J";
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "blue";
                break;
            case 4://S
                this._pieceType = "S";
                this._boardCheck[this._xPosition][this._yPosition] = "purple";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "purple";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "purple";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "purple";
                break;
            case 5://Z
                this._pieceType = "Z";
                this._boardCheck[this._xPosition][this._yPosition] = "green";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "green";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "green";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "green";
                break;
            case 6://O
                this._pieceType = "O";
                this._boardCheck[this._xPosition][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "yellow";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "yellow";
                break;
        }



        this._command = undefined;
    }
    

    this.move = function () {
            this._boardCheck = clearBoard(this._boardCheck);
            switch (this._command) {
                //0 === I, 1 === T, 2 === L, 3 === J, 4 === S, 5 === Z, 6 === BLOCK
                case "s":
                    if (this.isDownBlocked === false) {
                        this._yPosition += 1;
                    }
                    break;
                case "w":
                    if (this.isDownBlocked === false) {
                        this._yPosition += 1;
                    }
                    break;
                case "a":
                    if (this.isLeftBlocked === false) {
                        this._xPosition -= 1;
                    }
                    break;
                case "d":
                    if (this.isRightBlocked === false) {
                        this._xPosition += 1;
                    }
                    break;
                case "j":
                    if (this.isRotateLeftBlocked === false) {
                        this.moveRotate("left");
                    }
                    break;
                case "k":
                    if (this.isRotateRightBlocked === false) {
                        this.moveRotate("right");
                    }
                    break;
            }
        

    }
    this.moveRotate = function (dir) {
        switch (this._pieceType) {
            case "I":
                switch (this.rotation) {
                    case 0:
                        this.rotation = 1;
                        break;
                    case 1:
                        this.rotation = 0;
                        break;
                }
                break;
            case "J":
                if (dir === "left") {

                    switch (this.rotation) {
                        case 0:
                            this.rotation = 3;
                            break;
                        case 1:
                            this.rotation = 0;
                            break;
                        case 2:
                            this.rotation = 1;
                            break;
                        case 3:
                            this.rotation = 2;
                            break;
                    }

                }
                else if (dir === "right") {
                    switch (this.rotation) {
                        case 0:
                            this.rotation = 1;
                            break;
                        case 1:
                            this.rotation = 2;
                            break;
                        case 2:
                            this.rotation = 3;
                            break;
                        case 3:
                            this.rotation = 0;
                            break;
                    }
                }

                break;
            case "L":
                if (dir === "left") {

                    switch (this.rotation) {
                        case 0:
                            this.rotation = 3;
                            break;
                        case 1:
                            this.rotation = 0;
                            break;
                        case 2:
                            this.rotation = 1;
                            break;
                        case 3:
                            this.rotation = 2;
                            break;
                    }

                }
                else if (dir === "right") {
                    switch (this.rotation) {
                        case 0:
                            this.rotation = 1;
                            break;
                        case 1:
                            this.rotation = 2;
                            break;
                        case 2:
                            this.rotation = 3;
                            break;
                        case 3:
                            this.rotation = 0;
                            break;
                    }
                }
                break;
            case "O":
                break;
            case "S":
                switch (this.rotation) {
                    case 0:
                        this.rotation = 1;
                        break;
                    case 1:
                        this.rotation = 0;
                        break;
                }
                break;
            case "Z":
                switch (this.rotation) {
                    case 0:
                        this.rotation = 1;
                        break;
                    case 1:
                        this.rotation = 0;
                        break;
                }
                break;
            case "T":
                if (dir === "left") {

                    switch (this.rotation) {
                        case 0:
                            this.rotation = 3;
                            break;
                        case 1:
                            this.rotation = 0;
                            break;
                        case 2:
                            this.rotation = 1;
                            break;
                        case 3:
                            this.rotation = 2;
                            break;
                    }

                }
                else if (dir === "right") {
                    switch (this.rotation) {
                        case 0:
                            this.rotation = 1;
                            break;
                        case 1:
                            this.rotation = 2;
                            break;
                        case 2:
                            this.rotation = 3;
                            break;
                        case 3:
                            this.rotation = 0;
                            break;
                    }
                }
                break;
        }
    }

    this.update = function () {
        switch (this._pieceType) {//0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
            case "I"://red
                this.updateI();
                break;
            case "T":
                this.updateT();
                break;
            case "L":
                this.updateL();
                break;
            case "J":
                this.updateJ();
                break;
            case "S":
                this.updateS();
                break;
            case "Z":
                this.updateZ();
                break;
            case "O":
                this.updateO();
                break;
        }

    }
    this.updateI = function () {
        switch (this.rotation) {

            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "red";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 2][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "red";
                break;
            case 1:
                this._boardCheck[this._xPosition + 1][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition - 1] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition - 2] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "red";
                break;
        }
    }
    this.updateT = function () {
        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "teal";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "teal";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "teal";
                this._boardCheck[this._xPosition][this._yPosition - 1] = "teal";
                break;
            case 2:
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition+1] = "teal";
                this._boardCheck[this._xPosition-1][this._yPosition + 1] = "teal";
                this._boardCheck[this._xPosition+1][this._yPosition + 1] = "teal";
                break;
            case 3:
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition-1] = "teal";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "teal";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "teal";
                break;

        }
    }
    this.updateL = function () {

        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "orange";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "orange";
                this._boardCheck[this._xPosition][this._yPosition-1] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition-1] = "orange";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "orange";
                break;
            case 2:
                this._boardCheck[this._xPosition][this._yPosition+1] = "orange";
                this._boardCheck[this._xPosition-1][this._yPosition +1] = "orange";
                this._boardCheck[this._xPosition +1][this._yPosition +1] = "orange";
                this._boardCheck[this._xPosition+1][this._yPosition] = "orange";
                break;
            case 3:
                this._boardCheck[this._xPosition][this._yPosition] = "orange";
                this._boardCheck[this._xPosition +1][this._yPosition + 1] = "orange";
                this._boardCheck[this._xPosition ][this._yPosition + 1] = "orange";
                this._boardCheck[this._xPosition ][this._yPosition-1] = "orange";
                break;

        }
    }
    this.updateJ = function () {

        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "blue";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition][this._yPosition+1] = "blue";
                this._boardCheck[this._xPosition][this._yPosition-1] = "blue";
                this._boardCheck[this._xPosition-1][this._yPosition+1] = "blue";
                break;
            case 2:
                this._boardCheck[this._xPosition][this._yPosition+1] = "blue";
                this._boardCheck[this._xPosition+1][this._yPosition + 1] = "blue";
                this._boardCheck[this._xPosition-1][this._yPosition + 1] = "blue";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "blue";
                break;
            case 3:
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition+1][this._yPosition-1] = "blue";
                this._boardCheck[this._xPosition][this._yPosition-1] = "blue";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "blue";
                break;

        }
    }
    this.updateS = function () {
        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "purple";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "purple";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "purple";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "purple";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "purple";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "purple";
                this._boardCheck[this._xPosition-1][this._yPosition - 1] = "purple";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "purple";
                break;

        }
    }
    this.updateZ = function () {
        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "green";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "green";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "green";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "green";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "green";
                this._boardCheck[this._xPosition +1][this._yPosition] = "green";
                this._boardCheck[this._xPosition+1][this._yPosition - 1] = "green";
                this._boardCheck[this._xPosition][this._yPosition +1] = "green";
                break;
        }
    }
    this.updateO = function () {

        switch (this.rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "yellow";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "yellow";
                break;
            case 1:
                this._boardCheck[this._xPosition][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "yellow";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "yellow";
                break;
        }
    }

    function clearBoard(board) {
        let v = board;
        for (let i = 0; i < GRIDWIDTH; i++) {
            //assigns whole _board array with empty
            for (let j = 0; j < GRIDHEIGHT; j++) {
                v[i][j] = "empty";
            }
        }
        return v;
    }
}
