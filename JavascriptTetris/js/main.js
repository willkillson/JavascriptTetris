
//console.log(timer.getTimeValues().toString());


// Your code here!
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;


var c = canvas.getContext('2d');

var mouse = {
    x: undefined, y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x + " " + mouse.y);
});
//////////////////////////////////////////line drawing
//line
//c.beginPath();
//c.moveTo(0, 0);
//c.lineTo(canvas.width, canvas.height);
//c.strokeStyle = "rgba(255,255,0,1)";
//c.stroke();


////////////////////////////////////////PutPixelFunction

//function PutPixel(x, y, r, g, b, a) {
//    c.beginPath();
//    c.moveTo(x, y);
//    c.lineTo(x+1, y+1);
//    c.strokeStyle = `rgba(${r},${g},${b},${a})`;
//    c.stroke();
//}


//for (var i = 0; i < 300; i++) {
//    PutPixel(canvas.width*Math.random(), canvas.height * Math.random(), 255, 255, 0, 1);
//}


//////////////////////////////////////////Arc Circle
//for (var i = 0; i < 10000; i++) {
//    var r = Math.floor(256 * Math.random());
//    var g = Math.floor(256 * Math.random());
//    var b = Math.floor(256 * Math.random());
//    var a = 1;
//    var x = Math.floor(canvas.width * Math.random());
//    var y = Math.floor(canvas.height * Math.random());
//    c.beginPath();
//    c.strokeStyle = `rgba(${r},${g},${b},${a})`;
//    c.arc(x, y, 30, 0, 2 * Math.PI, false);
//    c.stroke();
//}
const GRIDHEIGHT = 25;
const GRIDWIDTH = 12;

const red = "rgba(255,51,51,0.9)";
const teal = "rgba(51,255,255,0.9)";
const orange = "rgba(255,153,51,0.9)";
const blue = "rgba(51,51,255,0.9)";
const purple = "rgba(153,51,255,0.9)";
const green = "rgba(51,255,51,0.9)";
const yellow = "rgba(255,255,51,0.9)";
const black = "rgba(0,0,0,0.9)";

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
    this._gridHeight = 25;
    this._gridWidth = 12;
    this._cellSize = 30;
    this._cellPadding = 1;
    this.isEmpty = true;//this will invoke a place piece function
    this.currentPiece = undefined;
    this.command = undefined;//d,l,r,rr,rl,u

    /////////////////MAIN BOARD Initialization 
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
    /////////////////MAIN BOARD Initialization

    this.update = function () {
        if (this.currentPiece === undefined) {
            this.currentPiece = new Piece();
            this.currentPiece.generateNewPiece();
            this.command = "d";

        }
        if (this.currentPiece._isSet === true) {
            if (this.currentPiece._canMove === false) {
                console.log("PIECE IS SET!");
                this.currentPiece.generateNewPiece();
                this.isGameOver = true;
            }
            this.currentPiece.generateNewPiece();
            this.command = "d";
        }
        this.currentPiece._command = this.command;// pass the command to the piece
        this.checkCollision(); // check the collision of the piece vs the board

        if (this.currentPiece._canMove === true) {// if everything is good, then move the current piece
            this.isGameOver = false;
            this.currentPiece.move();
        }
        else if (this.currentPiece._canMove===false) {
            this.setBoard();// 
            this.currentPiece._isSet = true;

        }
        this.currentPiece.update();
        this.draw(); //redraw everything
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




    }

    this.checkCollision = function () {
        //checks the collisions between  this._board[][] and _currentPiece._boardCheck[][]
        //then flags either 
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
    this.checkCollisionI = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos + 2][ypos + 1] !== "empty")){
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos+1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
        }



        //piece._isSet = true;
        this.currentPiece._canMove = true;
        return;
    }
    this.checkCollisionT = function () {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 2:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos +2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 3:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
                
        }

    }
    this.checkCollisionJ = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                break;
        }

    }
    this.checkCollisionL = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos+2] !== "empty") || (this._board[xpos - 1][ypos] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 2:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 3:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
        }

    }
    this.checkCollisionO = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos +1][ypos + 2] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                break;
        }

    }
    this.checkCollisionS = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 2] !== "empty") || (this._board[xpos + 1][ypos + 1] !== "empty")) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                break;
        }

    }
    this.checkCollisionZ = function() {
        let xpos = this.currentPiece._xPosition;
        let ypos = this.currentPiece._yPosition;
        switch (this.currentPiece._rotation) {//rotation
            case 0:
                switch (this.currentPiece._command) {//commands
                    case "d":

                        if ((this._board[xpos][ypos + 2] !== "empty") || (this._board[xpos - 1][ypos + 1] !== "empty") || (this._board[xpos + 1][ypos + 2] !== "empty") ) {
                            this.currentPiece._canMove = false;
                            return;
                        }
                        break;
                    case "l":
                        break;
                    case "r":
                        break;
                    case "u":
                        break;
                    case "rr":
                        break;
                    case "rl":
                        break;
                }
                break;
            case 1:
                break;
        }

    }

    this.setBoard = function () {
        for (let i = 0; i < this._gridWidth; i++) {
            for (let j = 0; j < this._gridHeight; j++) {
                if (this.currentPiece._boardCheck[i][j] !== "empty") {
                    this._board[i][j] = this.currentPiece._boardCheck[i][j];
                }
            }
        }
    }



}
function Piece() {
    this._gridHeight = 25;
    this._gridWidth = 12;

    this._pieceType = undefined;//WARNING THIS IS OLD INFORMATION AND THEY USE CHARACTERS NOW 0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
    this._xPosition = undefined;// in relation to the main board
    this._yPosition = undefined;// in relation to the main board
    this._rotation = undefined;
    this._isDownBlocked = undefined;
    this._isLeftBlocked = undefined;
    this._isRightBlocked = undefined;
    this._isUpBlocked = undefined;
    this._canMove = undefined;
    this._isSet = undefined;
    this._command = undefined;



    this._boardCheck = new Array(this._gridWidth);//creating the multidem array in javascript <3
    for (let i = 0; i < this._boardCheck.length; i++) {
        this._boardCheck[i] = new Array(this._gridHeight);
    }
    
    this.generateNewPiece = function () {
        let num = Math.floor(7 * Math.random());
        //num = 0;

        for (let i = 0; i < this._gridWidth; i++) {
            //////board set up
            //assigns whole _board array with empty
            for (let j = 0; j < this._gridHeight; j++) {
                this._boardCheck[i][j] = "empty";
            }
        }

        //reset collision
        this._rotation = 0;

        this._isDownBlocked = false;
        this._isLeftBlocked = false;
        this._isRightBlocked = false;
        this._isUpBlocked = false;
        this._isSet = false;
        this._canMove = true;

        //reset current command
        this._currentCommand = undefined;

        switch (num) {////////////testing rotations
            case 0:
                this._rotation = Math.floor(2 * Math.random());
                break;
            case 1:
                this._rotation = Math.floor(4 * Math.random());
                break;
            case 2:
                this._rotation = Math.floor(4 * Math.random());
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
        }

  
        //0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===O
        this._xPosition = 5;// 
        this._yPosition = 3;// 
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
                this._pieceType = "S";
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




    }

    this.move = function () {

        this.move = function () {
            this._boardCheck = clearBoard(this._boardCheck);
            switch (this._command) {
                //0 === I, 1 === T, 2 === L, 3 === J, 4 === S, 5 === Z, 6 === BLOCK
                case "d":
                    this._yPosition += 1;
                    break;
                case "u":
                    this._yPosition += 1;
                    break;
                case "l":
                    this._xPosition -= 1;
                    break;
                case "r":
                    this._xPosition += 1;
                    break;
            }
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
        switch (this._rotation) {

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
        switch (this._rotation) {
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

        switch (this._rotation) {
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

        switch (this._rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "blue";
                break;
            case 1:
                break;
        }
    }
    this.updateS = function () {
        switch (this._rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "purple";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "purple";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "purple";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "purple";
                break;
            case 1:
                break;
        }
    }
    this.updateZ = function () {
        switch (this._rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "green";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "green";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "green";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "green";
                break;
            case 1:
                break;
        }
    }
    this.updateO = function () {

        switch (this._rotation) {
            case 0:
                this._boardCheck[this._xPosition][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "yellow";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "yellow";
                break;
            case 1:
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



var board = new Board();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width,canvas.height);
    c.stroke();
    c.beginPath();
    c.fillStyle = `rgba(160,160,160,0.5)`;
    c.fillRect(0, 0, 12 * 31-1, (26 * 30)-5);
    c.stroke();




    board.update(); //update the board and pieces
    if (board.isGameOver) {
        board = new Board();
    }

}

animate();