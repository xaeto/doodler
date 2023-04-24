import GameObject from "game_object.js";

export default class Platform extends GameObject {
    constructor(x, y, width, height, rotation = 0, color = "white") {
        super(x, y);
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.color = color;
    }
}