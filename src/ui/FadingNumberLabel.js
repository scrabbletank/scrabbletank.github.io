import { Common } from "../utils/Common";

export class FadingNumberLabel {
    constructor(sceneContext, x, y, duration, clr, font, fontsize) {
        this.textLabel = sceneContext.add.bitmapText(x, y, font, "", fontsize);
        this.textLabel.setTint(clr);

        this.x = x;
        this.y = y;
        this.clr = clr;
        this.maxDuration = duration;
        this.curDuration = 0;
    }

    setValue(value) {
        this.textLabel.setVisible(true);
        this.textLabel.setText("+" + Common.numberString(value));
        this.curDuration = this.maxDuration;
    }

    setColor(clr) {
        this.clr = clr;
    }

    setPosition(x, y) {
        this.textLabel.setPosition(x, y);
    }

    destroy() {
        this.textLabel.destroy();
    }

    update(delta) {
        this.curDuration -= delta;
        if (this.curDuration > 0) {
            this.textLabel.setTint(Common.colorLerp(Phaser.Display.Color.GetColor32(0, 0, 0, 0), this.clr, this.curDuration / this.maxDuration));
        } else {
            this.textLabel.setVisible(false);
        }
    }
}