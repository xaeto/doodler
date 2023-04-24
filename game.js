import Character from "./src/models/character.js";

const debug = true;
const fps = 60;
const character_size = 64;

const width = 480;
const height = 800;

const character = new Character("test");

const game_body = document.getElementById("game_body");

game_body.addEventListener('mousemove', function(event) {
    character.html_element.style.left = event.clientX + 'px';
})

window.onkeydown = function(evt) {
    console.log(evt);
    if(evt.key ==  " ") {
        console.log("jump")
    }
    if(evt.key ==  "ArrowLeft) {
    }
}

game_body.appendChild(character.html_element);

function setup() {
    if (debug) {
        console.log("screen_width: ", width);
        console.log("screen_height: ", height);
    }

    character.html_element.style.left = (width  - character_size)/2 + "px";
    character.html_element.style.bottom = 0 + 'px';
    character.y = 0;
    character.x = (width  - character_size)/2;
}


function draw() {
    if (debug) {
        console.log("draw")
    }
    requestAnimationFrame(step)
}

function step(timestamp) {
    if (debug) {
        // console.log(timestamp / 1000);
    }

    // handle inputs
    setTimeout(requestAnimationFrame(step), fps / 1000);
}

setup();
draw();