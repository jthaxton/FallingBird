let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
ctx.scale(2, 2);


// load images
let speedDiff;
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";



// pipe gaps
let gap = 90;
let constant;

//  bird position
let bX = 10;
let bY = 150;
let paused = false;

let gravity = 1.5;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// use enter keydown

function pause() {
    let d = document.getElementById('pause');
    let s = document.getElementById('status');
    if (paused === false && d.innerHTML == 'Pause') {
        paused = true;
        s.innerHTML = 'Paused';
        d.innerHTML = 'Unpause';
    }
    else{
        paused = false;
        d.innerHTML = 'Pause';
        s.innerHTML = ' ';
    }
}

function gameOver() {
    let s = document.getElementById('status');
    let d = document.getElementById('status2');
    if (paused === false) {
        paused = true;
        s.innerHTML = 'Game Over';
        d.innerHTML = '<div id="continue" onclick="location.reload()">Try Again?</div>';

    }

}
document.addEventListener('keydown', keyDownTextField, false);
let direction = true;

function keyDownTextField(e) {
    let keyCode = e.keyCode;
    if (keyCode == 90 && !paused && direction === true) {
        direction = false;
        
        // flySound();
    } else if (!paused && direction === false) {
        direction = true;
        // muted? null : fly.play();
    }
}

function move() {
    if (direction === true && !paused) {
        bX += 3;
    } else if (paused) {
        bX += 0;
    } else {
        bX -= 3;
    }
}


// pipe coordinates

let pipe = [];

pipe[0] = {
    x : -100,
    y : 500
};


let muted = true; 
function mute() {
    // let d = document.getElementById('mute')
    // if (paused === false && d.innerHTML == 'mute') {
    //     paused = true 
    //     d.innerHTML = 'unmute'
    // }
    // else{
    //     paused = false
    //     d.innerHTML = 'mute'

    // }
}

// draw all images

function draw(){
    ctx.drawImage(bg,0,0);
    move();
    if (paused === false) {
    for(let i = 0; i < pipe.length; i++){
        // draw pipes with gap
        constant = pipeNorth.width+gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x + constant,pipe[i].y );
        //  move pipes up
        pipe[i].y--;
        // randomly generate pipe position
        if( pipe[i].y == 0){
            pipe.push({
                x: Math.floor(Math.random() * 185) - pipeNorth.width,
                y : 500
            }); 
        }

        
        
        if(pipe[i].y == 0){
            score++;
            // muted ? null : scor.play();
        } 

        
        // if collision, reload page
        if ((bX <= pipe[i].x + pipeNorth.width &&
            (bY + bird.height <= pipe[i].y + pipeNorth.height) &&
            (bY + bird.height >= pipe[i].y)) ||
            ((bX + bird.width >= pipe[i].x + constant) &&
            (bY + bird.height <= pipe[i].y + pipeNorth.height) &&
            (bY + bird.height >= pipe[i].y )) ||
            bX + bird.width >= 285 ||
            bX <= 0 ) {
            gameOver();
            // location.reload();
        }
    }
}

    ctx.drawImage(fg,0,425);
    
    ctx.drawImage(bird,bX,bY);
    
    // show sore
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,15);
    
    requestAnimationFrame(draw);  
}

draw();