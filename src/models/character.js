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

    jump () {
        const start_pos_y = this.y;
        const max_y = this.y - 200;

        if(this.jump_interval_id != null) 
            clearInterval(this.jump_interval_id);
        this.jump_interval_id = setInterval(() => {
            this.y -= 20;

            if(this.y < max_y) {
                this.fall();
            }
            this.html_element.style.top = this.y + "px";
        }, 60);
    }

    fall() {
        const max_y = this.y + 200;

        if(this.jump_interval_id == null) {
            return;
        }
        clearInterval(this.jump_interval_id)
        const t = setInterval(() => {
            this.y += 20;
            console.log(this.y)
            if(this.y > 1080) {
                clearInterval(t);
                this.y = 1080 - 64;
                this.html_element.style.top = this.y + "px";
                console.log("debug")
            } else {
                this.html_element.style.top = this.y - 33 + "px";
            }
        }, 60);
    }
}