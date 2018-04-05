
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

        }
        if (this.currentPiece._isSet === true) {

            this.currentPiece.generateNewPiece();
        }
        this.currentPiece._command = this.command;// pass the command to the piece
        this.masterCheckCollision(); // check the collision of the piece vs the board
        this.currentPiece.masterMove(board.command); // if everything is good, then move the current piece
        this.currentPiece.update();
        this.draw(); //redraw everything
    }
    this.draw = function () {



        for (let i = 0; i < this._gridWidth; i++) {
            for (let j = 0; j < this._gridHeight; j++) {
                //we need to set the specific color depending on what is in the array

                //so this is where we pick different colors
                c.beginPath();
                c.fillStyle = 'red';

                if (this._board[i][j] === "boarder") {
                    c.fillStyle = 'blue';
                }
                if (this._board[i][j] === "empty") {
                    c.fillStyle = 'black';
                }
                if (this._board[i][j] === "block") {
                    c.fillStyle = 'green';
                }

                if (this.currentPiece._boardCheck[i][j] === "orange") {
                    c.fillStyle = 'orange';
                }
                if (this.currentPiece._boardCheck[i][j] === "teal") {
                    c.fillStyle = 'teal';
                }
                if (this.currentPiece._boardCheck[i][j] === "red") {
                    c.fillStyle = 'red';
                }
                if (this.currentPiece._boardCheck[i][j] === "blue") {
                    c.fillStyle = 'blue';
                }
                if (this.currentPiece._boardCheck[i][j] === "purple") {
                    c.fillStyle = 'purple';
                }
                if (this.currentPiece._boardCheck[i][j] === "green") {
                    c.fillStyle = 'green';
                }
                if (this.currentPiece._boardCheck[i][j] === "yellow") {
                    c.fillStyle = 'yellow';
                }
                c.fillRect(i * this._cellSize + this._cellPadding * i, j * this._cellSize + j * this._cellPadding, this._cellSize, this._cellSize);
                c.stroke();
            }
        }




    }

    this.masterCheckCollision = function () {
        //checks the collisions between  this._board[][] and _currentPiece._boardCheck[][]
        //then flags either 
            switch (this.currentPiece._pieceType) {
                case "I":
                    this.currentPiece = checkCollisionI(this.currentPiece);
                    break;
                case "J":
                    this.currentPiece = checkCollisionJ(this.currentPiece);
                    break;
                case "L":
                    this.currentPiece = checkCollisionL(this.currentPiece);
                    break;
                case "O":
                    this.currentPiece = checkCollisionO(this.currentPiece);
                    break;
                case "S":
                    this.currentPiece = checkCollisionS(this.currentPiece);
                    break;
                case "Z":
                    this.currentPiece = checkCollisionZ(this.currentPiece);
                    break;
                case "T":
                    this.currentPiece = checkCollisionT(this.currentPiece);
                    break;
            }

        }
    function checkCollisionI(piece) {
        //piece._isSet = true;
        return piece;
    }
    function checkCollisionJ(piece) {
        piece._isSet = true;
        return piece;
    }
    function checkCollisionL(piece) {
        piece._isSet = true;
        return piece;
    }
    function checkCollisionO(piece) {
        piece._isSet = true;
        return piece;
    }
    function checkCollisionS(piece) {
        piece._isSet = true;
        return piece;
    }
    function checkCollisionZ(piece) {
        piece._isSet = true;
        return piece;
    }
    function checkCollisionT(piece) {
        piece._isSet = true;
        return piece;
    }

}
function Piece() {

    this._pieceType = undefined;//0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
    this._xPosition = undefined;// in relation to the main board
    this._yPosition = undefined;// in relation to the main board
    this._rotation = undefined;
    this._gridHeight = 25;
    this._gridWidth = 12;

    this._isDownBlocked = false;
    this._isLeftBlocked = false;
    this._isRightBlocked = false;
    this._isUpBlocked = false;
    this._isSet = false;
    this._command = undefined;

    this._boardCheck = new Array(this._gridWidth);//creating the multidem array in javascript <3
    for (let i = 0; i < this._boardCheck.length; i++) {
        this._boardCheck[i] = new Array(this._gridHeight);
    }


    
    this.generateNewPiece = function () {
        let num = Math.floor(7 * Math.random());
        //let num = 0;

        for (let i = 0; i < this._gridWidth; i++) {
            //////board set up
            //assigns whole _board array with empty
            for (let j = 0; j < this._gridHeight; j++) {
                this._boardCheck[i][j] = "empty";
            }
        }

        //reset collision
        this._isDownBlocked = false;
        this._isLeftBlocked = false;
        this._isRightBlocked = false;
        this._isUpBlocked = false;
        this._isSet = false;

        //reset current command
        this._currentCommand = undefined;


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
                this._rotation = 0;//2 rotations
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
    this.masterMove = function () {

        switch (this._pieceType) {
            case "I":
                this.moveI();
                break;
            case "J":
                break;
            case "L":
                break;
            case "O":
                break;
            case "S":
                break;
            case "Z":
                break;
            case "T":
                break;
        }
    }
    this.moveI = function () {
        switch (this._command) {
            case "d":
                switch (this._rotation) {
                    case 0:
                        console.log("dasdf");        
                        this._boardCheck = clearBoard(this._boardCheck);
                        this._yPosition += 1; 
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
                break;
            case "l":
                break;

        }
    }

    this.update = function () {
        switch (this._pieceType) {//0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
            case "I"://red
                switch (this._rotation) {
                    case 0:
                        console.log("this.update I,0");
                        this._boardCheck[this._xPosition][this._yPosition] = "red";
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
                break;
            case "T":
                break;
            case "L":
                break;
            case "J":
                break;
            case "S":
                break;
            case "Z":
                break;
            case "O":
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
    board.command = "d";//get command
    board.update(); //update the board and pieces


    if (board.currentPiece._isSet === false) {
        console.log(board.currentPiece._isSet);
    }
    if (board.currentPiece._pieceType === "I") {
        console.log("I");
    }




}

animate();