/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';


function showWinner(player){
    /*function to declare winniner of the game*/
    if (player=="user")
        msg = "Congrats! You Won!";
    else if (player=="computer")
        msg = "Game Over!!";
    else if (player=="tie")
        msg = "Draw!";
    document.getElementById("message").innerHTML = msg;
}
function findAvailableBox() {
    /*function to identify available slots in game board*/
    var availGrid = [];
    for (let rowIdx = 0;rowIdx < GRID_LENGTH;rowIdx++)
        for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
            if (grid[rowIdx][colIdx]==0)
                availGrid.push([rowIdx,colIdx]);
        }
    return availGrid;
}
function getCount(element){
    /* find no of occurences of given element in GRID */
    let count = 0;
    for (let item of grid)
        for (let innerItem of item)
            if (element==innerItem)
                count++;       
    return count;
}
function getRandomIndex() {
    /* returns a random slot from available slots*/
    let availGrid = findAvailableBox();
    var item = availGrid[Math.floor(Math.random()*availGrid.length)];
    return {"x":item[0],"y":item[1]}
}
function winningMove(){
    /* function to identify best move */
    availGrid = findAvailableBox();
    for (let moveIndex of availGrid){ //monitors winning chance of user
        let dup_val = 1;
        let dup_grid = JSON.parse(JSON.stringify(grid));
         dup_grid[moveIndex[0]][moveIndex[1]] = dup_val;
        if (checkBoard("user",dup_grid,null)=="user"){
            return {"x":moveIndex[0],"y":moveIndex[1]};
        }
    }
    for (let moveIndex of availGrid){ //monitors winning chance of computer
        let dup_val = 2;
        let dup_grid = JSON.parse(JSON.stringify(grid));
        dup_grid[moveIndex[0]][moveIndex[1]] = dup_val;
        if (checkBoard("computer",dup_grid,null)=="computer"){
            return {"x":moveIndex[0],"y":moveIndex[1]};
        }
    }
    return getRandomIndex(); //returns random move if above cases fail
}
function computerPlay(){
    availGrid = findAvailableBox();
    if (availGrid.length == 0){ //declare tie of all slots are filled
        showWinner("tie");
    }
    let moveIndex = winningMove();
    let newValue = 2;
    grid[moveIndex.x][moveIndex.y] = newValue;
    renderMainGrid();
    addClickHandlers();
    if (checkBoard("computer",grid,null)=="computer")
        showWinner("computer")
}
function checkBoard(player,board,status){
    if(player == "user")
        grid_val = 1;
    else
        grid_val = 2;
    for (var i=0; i<3; i++) 
    {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] == grid_val)//row check
            return player;
        else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] == grid_val)//col check
            return player;
        else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] &&  board[0][0] == grid_val)//diagnol check
            return player;
        else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] == grid_val)//diagnol check
             return player;
    }
    return null;
}

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;    
    renderMainGrid();
    addClickHandlers();
    if (checkBoard("user",grid,null)=="user")
        showWinner("user");
    else
        computerPlay();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
