import Character from "./src/models/character.js";

const debug = true;
const fps = 60;
const character_size = 64;

const width = 480;
const height = 800;

const character = new Character("test");

const game_body = document.getElementById("game_body");

game_body.addEventListener('mousemove', function(event) {
    character.element.style.left = event.clientX + 'px';
})

window.onkeydown = function(evt) {
    console.log(evt);
    if(evt.key ==  " ") {
        console.log("jump")
    }
    if(evt.key ==  "ArrowLeft") {
        character.moveLeft();
    }
    if(evt.key ==  "ArrowRight") {
        character.moveRight();
    }
}

game_body.appendChild(character.element);

function setup() {
    if (debug) {
        console.log("screen_width: ", width);
        console.log("screen_height: ", height);
    }

    character.element.style.left = (width  - character_size)/2 + "px";
    character.element.style.bottom = 0 + 'px';
    character.y = 0;
    character.x = (width  - character_size)/2;
}


function draw() {
    if (debug) {
        console.log("draw")
    }
    character.draw();
    requestAnimationFrame(step)
}

function step(timestamp) {
    if (debug) {
        // console.log(timestamp / 1000);
    }

    character.draw();
    // handle inputs
    setTimeout(requestAnimationFrame(step), fps / 1000);
}

setup();
draw();