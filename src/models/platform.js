import GameObject from "./game_object.js";

export default class Platform extends GameObject {
    constructor(x, y, width, height, rotation = 0, color = "black") {
        const platform_element = document.createElement("div");
        super(x, y, platform_element);
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.color = color;
    }

    draw() {
        this.element.style.backgroundColor = this.color;
        this.element.style.width = this.width + "px"
        this.element.style.height = this.height + "px";
        this.element.style.position = "absolute";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px"
    }
}