import { FloatingTooltip } from "./FloatingTooltip";
import { Common } from "../utils/Common";

export class TooltipImage {
    constructor(scene, x, y, width, height, texture, tooltip, tooltipSize = [350, 100], textWidth = 40) {
        this.backRect = scene.add.rectangle(x, y, width, height, 0x000000).setOrigin(0, 0);
        this.backRect.isStroked = true;
        this.backRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backRect.lineWidth = 1;
        this.img = scene.add.image(x + width / 2, y + height / 2, texture.sprite, texture.tile).setOrigin(0.5);
        this.img.displayWidth = width;
        this.img.displayHeight = height;
        this.scene = scene;
        this.floatingText = undefined;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tooltipSize = tooltipSize;
        this.textWidth = textWidth;
        this.tooltip = Common.processText(tooltip, this.textWidth);
        this.clickCallback = undefined;

        this.backRect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { if (this.clickCallback !== undefined) { this.clickCallback(); } })
            .on("pointerover", () => { this._showTooltip(); })
            .on("pointerout", () => { this._removeTooltip(); });
    }

    onClickHandler(callback) {
        this.clickCallback = callback;
        return this;
    }

    setImage(img) {
        this.img.setTexture(img.sprite, img.tile);
    }

    setTint(clr) {
        this.img.setTint(clr);
    }
    clearTint() {
        this.img.clearTint();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.backRect.setPosition(x, y);
        this.img.setPosition(x + this.width / 2, y + this.height / 2);
    }

    setTooltip(tooltip) {
        this.tooltip = Common.processText(tooltip, this.textWidth);
    }

    _showTooltip() {
        if (this.tooltip == "") {
            return;
        }
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        var x = this.x + 20 + (this.x + this.tooltipSize[0] > 1090 ? -this.tooltipSize[0] : 0);
        var y = this.y + (this.y - this.tooltipSize[1] < 100 ? 0 : -this.tooltipSize[1]);
        this.floatingText = new FloatingTooltip(this.scene, this.tooltip, x, y, this.tooltipSize[0],
            this.tooltipSize[1], "courier16", 16, 999);
    }

    _removeTooltip() {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
            this.floatingText = undefined;
        }
    }

    setVisible(visible) {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        this.backRect.setVisible(visible);
        this.img.setVisible(visible);
    }

    destroy() {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        this.backRect.destroy();
        this.img.destroy();
    }
}