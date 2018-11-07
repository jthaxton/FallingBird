# Falling Bird

[live demo](https://jthaxton.github.io/FallingBird/FallingBird/index.html)

## Background
Falling Bird is a game based on Flappy Bird where users use the arrow keys to control a falling bird and try to avoid platforms on the way down.

## Functionality
* The bird moves right at the start of the game
* Users can press the Z key change the bird's direction
* Platforms generate randomly
* Falling speed increases as time passes
* Game over upon collision

## Technology
* Vanilla JavaScript for game logic 
* HTML5 Canvas for DOM manipulation/rendering 

## Architecture 
* index.html: this contains the canvas
* fallingbird.js: this will handle all logic and ``draw()`` methods involved with the game
* images: contains sprite files
* sounds: contains mp3 files

## Screenshot
![screenshot](fallingbird.PNG "screenshot")

## Sample code
One of the main features differentiating my game from Flappy Bird is that the bird moves from left to right with the press of a button and that it must move continuously. Below is the code I used for its movement pattern: 

```javascript
document.addEventListener('keydown', keyDownTextField, false);
let direction = true;

function keyDownTextField(e) {
    let keyCode = e.keyCode;
    if (keyCode == 90 && !paused && direction === true) {
        direction = false;
        
    } else if (!paused && direction === false) {
        direction = true;
    }
}
```

I used the code below to create game over conditions (i.e. collisions):

```javascript
function draw(){
    ...
    for(let i = 0; i < pipe.length; i++){
    ...
        if (bX <= pipe[i].x + pipeNorth.width && 
        (bY + bird.height <= pipe[i].y + pipeNorth.height) &&
        (bY + bird.height >= pipe[i].y) ||
        (bX + bird.width >= pipe[i].x + constant) &&
        (bY + bird.height <= pipe[i].y + pipeNorth.height) &&
        (bY + bird.height >= pipe[i].y ) || 
        bX + bird.width >= 285 || bX <= 0 ) {
        location.reload();
        }
```
Simply put, this expression checks to see if the bird's coordinates intersect with pipes or with the map borders.
