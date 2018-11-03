var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
let speedDiff;
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";



// pipe gaps
var gap = 100;
var constant;

//  bird position
var bX = 10;
var bY = 150;
let paused = false;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// use enter keydown

function pause() {
    let d = document.getElementById('pause');
    let s = document.getElementById('status');
    if (paused === false && d.innerHTML == 'pause') {
        paused = true;
        s.innerHTML = 'Paused';
        d.innerHTML = 'unpause';
    }
    else{
        paused = false;
        d.innerHTML = 'pause';
        s.innerHTML = ' ';
    }
}
document.addEventListener('keydown', keyDownTextField, false);
let direction = true;

function keyDownTextField(e) {
    var keyCode = e.keyCode;
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

var pipe = [];

pipe[0] = {
    x : -100,
    y : cvs.height
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
    
    for(var i = 0; i < pipe.length; i++){
        // draw pipes with gap
        constant = pipeNorth.width+gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x + constant,pipe[i].y );
        //  move pipes up
        paused === false ? pipe[i].y-- : null
        // randomly generate pipe position
        if( pipe[i].y == 125 ){
            pipe.push({
                x: Math.floor(Math.random() * 185) - pipeNorth.width,
                y : cvs.height
            }); 
        }

        console.log(pipe[i].y);
        
        
        if(pipe[i].y == 0){
            score++;
            // muted ? null : scor.play();
        } 

        
        // if collision, reload page
        if (bX <= pipe[i].x + pipeNorth.width && (bY + bird.height <= pipe[i].y + pipeNorth.height) && (bY + bird.height >= pipe[i].y) || (bX + bird.width >= pipe[i].x + constant) && (bY + bird.height <= pipe[i].y + pipeNorth.height) && (bY + bird.height >= pipe[i].y ) || bX + bird.width >= 285 || bX <= 0 ) {
            location.reload();
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    // show sore
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);  
}

draw();
























