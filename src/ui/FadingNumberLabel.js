import { Common } from "../utils/Common";

export class FadingNumberLabel {
    constructor(sceneContext, x, y, duration, clr, negativeClr, font, fontsize) {
        this.textLabel = sceneContext.add.bitmapText(x, y, font, "", fontsize);
        this.textLabel.setTint(clr);

        this.x = x;
        this.y = y;
        this.clr = clr;
        this.negativeClr = negativeClr;
        this.maxDuration = duration;
        this.curDuration = 0;
        this.activeClr = clr;
    }

    setValue(value) {
        this.textLabel.setVisible(true);
        this.textLabel.setText((value > 0 ? "+" : "") + Common.numberString(value));
        this.activeClr = value < 0 ? this.negativeClr : this.clr;
        this.textLabel.setTint(this.activeClr);
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
            this.textLabel.setTint(Common.colorLerp(Phaser.Display.Color.GetColor32(0, 0, 0, 0), this.activeClr, this.curDuration / this.maxDuration));
        } else {
            this.textLabel.setVisible(false);
        }
    }
}