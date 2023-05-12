import Character from "./src/models/character.js";
import Platform from "./src/models/platform.js";

const debug = true;
const fps = 1000 / 60; //fps berechnung angepasst (zahl hinter dem / ist die anzahl der frames pro sekunde)
const character_size = 64;
const platformCount = 5
let platforms = []
let gameOver = true;
let highscore = 0 // zählt die "zerstörten" platformen
let jumpState = false;

const width = 480;
const height = 800;

const character = new Character("test");

const game_body = document.getElementById("game_body");

let uptime; // interval variable für jump() und fall()




// bewegung des Char mit boundarys
game_body.addEventListener('mousemove', function (event) {
    const cursor = event.clientX

    if (cursor < character_size / 2) {
        const x = 0;
        character.x = x;
    } else if (cursor > width - character_size / 2) {
        const x = width - character_size;
        character.x = x;
    } else {
        const x = cursor;
        character.x = x - character_size / 2;
    }


})


// erste 5 platformen      TODO passende variablen für 100(start der ersten platform) und 85/10 finden (breite und höhe einer platform)
function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
        let platGap = height / platformCount;
        let newPlatBottom = 100 + platGap * i;
        let newPosition = Math.random() * (width - 85)
        let newPlatform = new Platform(newPosition, newPlatBottom, 85, 15);
        game_body.appendChild(newPlatform.element);
        newPlatform.draw();
        platforms.push(newPlatform)
    }
}



// sprungfunktion  TODO passende variable für 500 (max höhe des charakters)
function jump() {

    clearInterval(uptime)
    uptime = setInterval(function () {
        if (character.y < 500) {
            character.y += fps
        }
        else {
            if (jumpState == true) {
                jumpState = false
                fall()
            }
        }
    }, fps)
}


function fall() {
    clearInterval(uptime)
    uptime = setInterval(function () {
        character.y -= 10
        if (character.y < 0) {
            gameOver = true
            console.log(highscore)
        }
    }, fps)
}

window.onkeydown = function (evt) {
    console.log(evt);
    if (evt.key == " " && gameOver != false) {
        gameOver = false
        jumpState = true;
        console.log(jumpState);
        highscore = 0
        jump();
        console.log("jump");
    }
    if (evt.key == "ArrowLeft") {
        character.moveLeft();
    }
    if (evt.key == "ArrowRight") {
        character.moveRight();
    }
}

game_body.appendChild(character.element);


function setup() {
    if (debug) {
        console.log("screen_width: ", width);
        console.log("screen_height: ", height);
    }

    createPlatforms()

    character.element.style.left = (width - character_size) / 2 + "px";
    character.element.style.bottom = 0 + 'px';
    character.y = 0;
    character.x = (width - character_size) / 2;
}


function draw() {
    if (debug) {
        console.log("draw")
    }
    character.draw();
    requestAnimationFrame(step)
}
let blub = false
let fallvelo = 3

async function step(timestamp) {
    if (debug) {
        // console.log(timestamp / 1000);
    }

    await platBewegung()

    await veloReset()

    //kollisionsabfrage 
    await kollision()

    character.draw();

    if (gameOver == true) {
        clearInterval(uptime)
    }
    // handle inputs
    setTimeout(requestAnimationFrame(step), fps);
}

async function kollision() {
    platforms.forEach(platform => {
        if ((character.y >= platform.y) &&
            (character.y <= (platform.y + platform.height)) &&
            (character.x + character_size >= platform.x) &&
            character.x <= platform.x + platform.width) {
            //TODO fallgeschwindigkeit der platformen anpassen an maxhöhe des sprungs
            fallvelo = character.y

            if (jumpState != true) {
                jumpState = true
                jump()
                console.log("hit")
            }
        }
    });
}

async function veloReset (){
    if (fallvelo >= 3) {
        fallvelo = fallvelo/3
    } else {
        fallvelo = 3
    }
}

async function platBewegung() {
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].y -= fallvelo
        platforms[i].draw();

        //entfernt platformen aus dem div und array und erzeugt am oberen ende eine neue
        if (platforms[i].y < 0) {
            console.log(platforms[i].y)
            let newPosition = Math.random() * (width - 85)
            let newPlatform = new Platform(newPosition, height + platforms[i].y, 85, 15);
            game_body.appendChild(newPlatform.element);
            newPlatform.draw();
            platforms.push(newPlatform)
            console.log(newPlatform.y)
            const platformElem = platforms[i].element;
            platformElem.parentNode.removeChild(platformElem);
            platforms.splice(i, 1);
            highscore++
        }
    }
}

setup();
draw();

