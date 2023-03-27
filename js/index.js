

function startgame(){
    //Game constant and variables

let inputDir={x:0,y:0};
const foodSound=new Audio('eatsound.mp3');
const gameOverSound=new Audio('Game Over.mp3');
const moveSound=new Audio('Pop Pop.mp3');
const musicSound=new Audio('Snake Song.mp3');
let speed=5;
let lastPaintTime=0;
let score=0;
let tempscroe=100;
let snakeArr=[{x:13, y:15}];
// snakeArr[0]='- :';
musicSound.play();
let food={x:6,y:7};
//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
   gameEngine();
}
function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){

        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bumb to the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>18 || snake[0].y<=0){
        return true;
    }
    return false;
}

 function gameEngine(){
        //Part 1: updating the snake array

        if(isCollide(snakeArr)){
            console.log(hiscore);
            gameOverSound.play(); 
            alert("Game over. Pres any key to play again!");
            board.innerHTML="Loading...";
            // setTimeout('',3000);
            musicSound.pause();
            inputDir={x:0,y:0};
           
            
            
            snakeArr=[{x:13, y:15}];
            musicSound.play();
            score=0;
            speed=5;
            document.getElementById('spee').innerHTML="Speed: 2";
            document.getElementById('score').innerHTML="Score: "+score;
            
        }
        //If you have eaten the food, increment the socre and regenerate the food
         
        if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
            foodSound.play();
            score+=10;
            if(score===tempscroe){
                tempscroe+=100;
                speed+=2;
                document.getElementById('spee').innerHTML="Speed: "+(speed-3);
            }

            if(score>hiscoreval){
                hiscoreval=score;
                localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
                document.getElementById('highscore').innerHTML="High-Score: "+hiscoreval;
            }
            document.getElementById('score').innerHTML="Score: "+score;
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
            let a=2;
            let b=16;
            food ={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
            //can modify the food possition ... comming food on the sanke body ...BUG
        }

        //Moving the snake

        for(let i=snakeArr.length-2;i>=0;i--){
            snakeArr[i+1]={...snakeArr[i]};
        }
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;

        //Part 2: Display the snake and Food 

        //Display the snake
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart=e.y;
            snakeElement.style.gridColumnStart=e.x;
            
            if(index===0){
                snakeElement.classList.add('head');
                // document.getElementById('head').innerHTML='-:';
            }else{
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
        });
        
        //Display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    }
//main logic starts here

let hiscore=localStorage.getItem("highscoreval");
let hiscoreval=0;
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval=JSON.parse(hiscore);
    document.getElementById('highscore').innerHTML="High-Score: "+hiscore;
    console.log(hiscore);
}


window.requestAnimationFrame(main);//for all animation needs and mantain the game look

window.addEventListener('keydown',e=>{//taking input from the keyboard
    inputDir={x:0, y:1} //Start the game
    moveSound.play(); 

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;//changing the direction
            inputDir.y=-1;
        
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})

}