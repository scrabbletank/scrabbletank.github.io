
export class SceneUIBase extends Phaser.Scene {

    constructor(position = [0, 0], name = "myScene") {
        super(name);
        this.position = position;
    }

    relativeX(x = 0) {
        return this.position[0] + x;
    }
    relativeY(y = 0) {
        return this.position[1] + y;
    }

    enableScene() {

    }

    disableScene() {

    }

    registerEvent(name, callback) {
        
    }

    preload() {
    }


    create() {
    }
}