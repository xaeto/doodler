import GameObject from "./game_object.js";

export default class Character extends GameObject {
    constructor(name, color = "green", size = 64) {
        const character_element = document.createElement("div");
        super(0, 0, character_element);
        this.name = name;
        this.color = color;
        this.size = size;
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
        this.element.style.backgroundColor = this.color;
        this.element.style.width = this.size + "px"
        this.element.style.height = this.size + "px"
        this.element.style.borderRadius = "50%";
        this.element.style.position = "absolute";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px"
    }
}