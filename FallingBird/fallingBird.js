var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
let diff;
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
var gap = 75;
var constant;

//  bird position
var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// use 'a' and 'd' keydown

document.addEventListener('keydown', keyDownTextField, false);

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 68) {
        bX += 10;
        fly.play();
    } else if (keyCode == 65) {
        bX -= 10
        fly.play();
    }
}


// pipe coordinates

var pipe = [];

pipe[0] = {
    x : 0,
    y : cvs.height
};

// draw all images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        // draw pipes with gap
        diff = score/10;
        constant = pipeNorth.width+gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x + constant,pipe[i].y );
        //  move pipe up
        pipe[i].y--;
        // randomly generate pipe position
        if( pipe[i].y == 125 ){
            pipe.push({
                x: Math.floor(Math.random() * pipeNorth.width) - pipeNorth.width,
                y : cvs.height
            }); 
        }

        
        
        if(pipe[i].y == 5){
            score++;
            scor.play();
        } 

        
        // if collision, reload page
        if (bX <= pipe[i].x + pipeNorth.width && (bY + bird.height <= pipe[i].y + pipeNorth.height) && (bY + bird.height >= pipe[i].y) || (bX >= pipe[i].x + constant) && (bY + bird.height <= pipe[i].y + pipeNorth.height) && (bY + bird.height >= pipe[i].y )) {
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
























