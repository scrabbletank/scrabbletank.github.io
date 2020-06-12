import { Common } from "../utils/Common";

export class LoreLabel {
    constructor(sceneContext, x, y, text, textWidth, font, fontsize) {
        var processedText = Common.processText(text, textWidth);
        this.textLabel = sceneContext.add.bitmapText(x, y, font, processedText, fontsize);

        this.height = this.textLabel.getTextBounds(true).local.height + 5;
        this.separator = sceneContext.add.rectangle(x + 10, y + this.height, x + (textWidth * fontsize) - 20, 4,
            Phaser.Display.Color.GetColor(64, 64, 64)).setOrigin(0, 0);

        this.x = x;
        this.y = y;
    }

    getHeight() { return this.y + this.height + 10; }
    getPosX() { return this.x; }
    getPosY() { return this.y; }

    setPosition(x, y) {
        this.textLabel.setPosition(x, y);
        this.separator.setPosition(x, y + this.height);
    }

    destroy() {
        this.textLabel.destroy();
        this.separator.destroy();
    }
}