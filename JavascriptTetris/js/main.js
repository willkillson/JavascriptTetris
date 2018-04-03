
// Your code here!
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;


var c = canvas.getContext('2d');


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
const GRIDWIDTH = 11;
function Board() {

    this._gridHeight = 25;
    this._gridWidth = 12;
    this._cellSize = 30;
    this._cellPadding = 1;
    this.isEmpty = true;//this will invoke a place piece function
    this.currentPiece = undefined;



    /////////////////MAIN BOARD

    this._board = new Array(this._gridWidth);//creating the multidem array in javascript <3
    for (let i = 0; i < this._board.length; i++) {
        this._board[i] = new Array(this._gridHeight);
    }
    for (let i = 0; i < this._gridWidth; i++) {
        //////board set up
        //assigns whole _board array with empty
        for (let j = 0; j < this._gridHeight; j++) {
            this._board[i][j] = "empty";
        }
    }







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


    this.update = function () {
        if (this.currentPiece === undefined) {
            this.currentPiece = new Piece();
            this.currentPiece.generateNewPiece();

        }


        //Attempt to move the piece
        //Verify legal move
        //Verify piece is not being set
        //Place the piece into the boardcheck
        //this._boardCheck[this.currentPiece._xPosition][this.currentPiece._yPosition] = "block";



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

}

function Piece() {
    this._pieceType = undefined;//0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===BLOCK
    this._xPosition = undefined;// in relation to the main board
    this._yPosition = undefined;// in relation to the main board
    this._rotation = undefined;
    this._gridHeight = 25;
    this._gridWidth = 12;

    this._boardCheck = new Array(this._gridWidth);//creating the multidem array in javascript <3
    for (let i = 0; i < this._boardCheck.length; i++) {
        this._boardCheck[i] = new Array(this._gridHeight);
    }



    this.generateNewPiece = function () {
        let num = Math.floor(7 * Math.random());

        for (let i = 0; i < this._gridWidth; i++) {
            //////board set up
            //assigns whole _board array with empty
            for (let j = 0; j < this._gridHeight; j++) {
                this._boardCheck[i][j] = "empty";
            }
        }



        //0===I , 1===T , 2===L , 3===J , 4===S , 5===Z , 6===O
        this._xPosition = 5;// 
        this._yPosition = 3;// 
        switch (num) {
            case 0://I piece
                this._boardCheck[this._xPosition][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "red";
                this._boardCheck[this._xPosition + 2][this._yPosition] = "red";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "red";
                this._rotation = 0;//2 rotations
                break;
            case 1://T
                this._boardCheck[this._xPosition][this._yPosition] = "teal";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "teal";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "teal";
                break;
            case 2://L
                this._boardCheck[this._xPosition][this._yPosition] = "orange";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "orange";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "orange";
                break;
            case 3://J
                this._boardCheck[this._xPosition][this._yPosition] = "blue";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "blue";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "blue";
                break;
            case 4://S
                this._boardCheck[this._xPosition][this._yPosition] = "purple";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "purple";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "purple";
                this._boardCheck[this._xPosition - 1][this._yPosition + 1] = "purple";
                break;
            case 5://Z
                this._boardCheck[this._xPosition][this._yPosition] = "green";
                this._boardCheck[this._xPosition - 1][this._yPosition] = "green";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "green";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "green";
                break;
            case 6://O
                this._boardCheck[this._xPosition][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition] = "yellow";
                this._boardCheck[this._xPosition + 1][this._yPosition + 1] = "yellow";
                this._boardCheck[this._xPosition][this._yPosition + 1] = "yellow";
                break;
        }




    }
}



var mouse = {
    x: undefined, y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x + " " + mouse.y);
});




var board = new Board();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    board.update();
    board.draw();
}

animate();