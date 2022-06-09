
//            //----------VARIABLES----------\\

const gameBoard = document.querySelector("#gameBoard");

const context = gameBoard.getContext("2d");

const scoreText = document.querySelector("#score");

const reset = document.getElementById("ResetGame");

const gameBoardWidth = gameBoard.width;

const gameBoardHeight = gameBoard.height;

const bgColor = "lightgreen";

const snakeColor = "green";

const snakeBodyBorder = "darkgreen";

const foodColor = "red";

const UnitSize = 25;

let running = false;

let xSpeed = UnitSize;

let ySpeed = 0;

let xFood;

let yFood;

let score = 0;

let snake = [
    {x:UnitSize * 4,y:0},
    {x:UnitSize * 3,y:0},
    {x:UnitSize * 2,y:0},
    {x:UnitSize, y:0},
    {x:0, y:0}
];

//                //----------FUNCTIONS----------\\

window.addEventListener("keydown",changeDirection);

reset.addEventListener("click",resetGame);

gameStart();

function gameStart(){

    running = true;

    scoreText.textContent = score;
    
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75); //speed
    }else{
        displayGameOver();
    }

};

function clearBoard(){

    context.fillStyle = bgColor;
    context.fillRect(0,0,gameBoardWidth,gameBoardHeight);

};

function createFood(){

    function randFood(min,max){

        const randNumber = Math.round((Math.random()*(max - min)+min) / UnitSize) * UnitSize;
        return randNumber;
    
    }

    xFood = randFood(0,gameBoardWidth - UnitSize);
    yFood = randFood(0,gameBoardWidth - UnitSize);

};

function drawFood(){

context.fillStyle = foodColor;

context.fillRect(xFood,yFood,UnitSize,UnitSize);

};

function moveSnake(){
    const head ={x:snake[0].x + xSpeed,
                 y:snake[0].y + ySpeed};

                 snake.unshift(head);
        // if food is eaten
    if(snake[0].x == xFood && snake[0].y == yFood){
            score += 1;
            scoreText.textContent = score;
            createFood();
        }
    else{
        snake.pop();
    }

};

function drawSnake(){

    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBodyBorder;

    snake.forEach(bodyParts=>{

        context.fillRect(bodyParts.x,bodyParts.y,UnitSize,UnitSize);
        context.strokeRect(bodyParts.x,bodyParts.y,UnitSize,UnitSize);
    });

};

function changeDirection(event){

    const keyPressed = event.keyCode;

    const ALEFT = 65;
    const DRIGHT = 68;
    const WUP = 87;
    const SDOWN = 83;

    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (ySpeed == -UnitSize);
    const goingLeft = (xSpeed == -UnitSize);
    const goingDown = (ySpeed == UnitSize);
    const goingRight = (xSpeed == UnitSize);

    switch(true){

        case (keyPressed == LEFT && !goingRight) || (keyPressed == ALEFT && !goingRight):
              xSpeed = -UnitSize;
              ySpeed = 0;
        break;

                case (keyPressed == UP && !goingDown) || (keyPressed == WUP && !goingDown):
                    xSpeed = 0;
                    ySpeed = -UnitSize;
                break;

                        case (keyPressed == RIGHT && !goingLeft) || (keyPressed == DRIGHT && !goingLeft):
                            xSpeed = UnitSize;
                            ySpeed = 0;
                        break;
                                case (keyPressed == DOWN && !goingUp) || (keyPressed == SDOWN && !goingUp):
                                    xSpeed = 0;
                                    ySpeed = UnitSize;
                                break;
    }
    
};

function checkGameOver(){

    switch(true){

        case(snake[0].x < 0 ):
        running = false;
        break;

            case(snake[0].x >= gameBoardWidth):
            running = false;
            break;

                case(snake[0].y < 0 ):
                running = false;
                break;

                    case(snake[0].y >= gameBoardHeight):
                    running = false;
                    break;

    }

    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
                running = false;
        }
    }

};

function displayGameOver(){

context.font = "50px MV Boli";
context.fillStyle = "black";
context.textAlign = "center";
context.fillText("GAME OVER!",gameBoardWidth / 2,gameBoardHeight / 2);
running = false;

};

function resetGame(){

    score = 0;
    xSpeed = UnitSize;
    ySpeed = 0;

    snake = [
        {x:UnitSize * 4,y:0},
        {x:UnitSize * 3,y:0},
        {x:UnitSize * 2,y:0},
        {x:UnitSize, y:0},
        {x:0, y:0}
    ];

    gameStart();
 
};