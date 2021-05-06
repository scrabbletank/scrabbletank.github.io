export class ImageButton {
    constructor(sceneContext, x, y, width, height, texture) {
        this.backgroundRect = sceneContext.add.rectangle(x, y, width, height, 0x000000).setOrigin(0, 0);
        this.backgroundRect.isStroked = true;
        this.backgroundRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backgroundRect.lineWidth = 1;
        this.img = sceneContext.add.image(x + width / 2, y + height / 2, texture.sprite, texture.tile).setOrigin(0.5);
        this.img.displayWidth = width;
        this.img.displayHeight = height;
        this.enabled = true;
        this.width = width;
        this.height = height;
    }

    setPosition(x, y) {
        this.backgroundRect.setPosition(x, y);
        this.img.setPosition(x + this.width / 2, y + this.height / 2);
    }

    setVisible(visible) {
        this.backgroundRect.setVisible(visible);
        this.img.setVisible(visible);
    }

    setEnable(enabled) {
        this.enabled = enabled;
    }

    setTint(clr) {
        this.img.setTint(clr);
    }
    clearTint() {
        this.img.clearTint();
    }

    setBorderTint(clr) {
        this.backgroundRect.strokeColor = clr;
    }

    removeBackground() {
        this.backgroundRect.alpha = 0.01;
    }

    _onClick(callback) {
        if (this.enabled === true) {
            callback();
        }
    }
    _onPointerUp(callback) {
        if (this.enabled === true) {
            callback();
        }
    }
    _onPointerOut(callback) {
        if (this.enabled === true) {
            callback();
        }
    }
    _onPointerOver(callback) {
        if (this.enabled === true) {
            callback();
        }
    }

    onClickHandler(callback) {
        this.backgroundRect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { this._onClick(callback) });
        return this;
    }
    onPointerOutHandler(callback) {
        this.backgroundRect.setInteractive({ useHandCursor: true })
            .on("pointerout", () => { this._onPointerOut(callback) });
        return this;
    }
    onPointerUpHandler(callback) {
        this.backgroundRect.setInteractive({ useHandCursor: true })
            .on("pointerup", () => { this._onPointerUp(callback) });
        return this;
    }
    onPointerOverHandler(callback) {
        this.backgroundRect.setInteractive({ useHandCursor: true })
            .on("pointerover", () => { this._onPointerOver(callback) });
        return this;
    }

    destroy() {
        this.backgroundRect.destroy();
        this.img.destroy();
    }
}