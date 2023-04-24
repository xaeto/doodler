import GameObject from "./game_object.js";

export default class Character extends GameObject {
    constructor(name, color = "green", size = 64) {

        const character_element = document.createElement("div");
        character_element.style.backgroundColor = "green";
        character_element.style.width = size + "px"
        character_element.style.height = size + "px"
        character_element.style.borderRadius = "50%";
        character_element.style.position = "absolute";
        character_element.style.top = 0;
        character_element.style.left = 0;

        super(0, 0, character_element);
        this.name = name;
        this.color = color;
        this.jump_interval_id = null;
    }

    moveLeft () {
        this.x -= 10;
    }

    moveRight () {
        this.x += 10;
    }

    jump(){

    }

    fall() {

    }

    draw() {
        this.html_element.style.left = this.x + "px";
    }
}