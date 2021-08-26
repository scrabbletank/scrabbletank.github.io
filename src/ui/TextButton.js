export class TextButton {
    constructor(sceneContext, x, y, width, height, text, depth = 0) {
        this.backgroundRect = sceneContext.add.rectangle(x, y, width, height, 0x000000).setOrigin(0, 0).setDepth(depth);
        this.backgroundRect.isStroked = true;
        this.backgroundRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backgroundRect.lineWidth = 1;
        this.rawText = text;
        this.text = sceneContext.add.bitmapText(x + width / 2, y + height / 2 - 1, "courier20", text).setOrigin(0.5).setDepth(depth);
        this.enabled = true;
        this.width = width;
        this.height = height;
        this.isNotifying = false;
        this.textClr = 0xffffff;
        this.clickHandlers = [];
        this.backgroundRect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { this._onClick() });
    }

    setNotification() {
        this.isNotifying = true;
        this.text.setText("!" + this.rawText + "!");
        this.text.setTint(Phaser.Display.Color.GetColor(255, 255, 0));
        return this;
    }

    setBorderTint(clr) {
        this.backgroundRect.strokeColor = clr;
    }

    setPosition(x, y) {
        this.backgroundRect.setPosition(x, y);
        this.text.setPosition(x + this.width / 2, y + this.height / 2);
        return this;
    }

    setVisible(visible) {
        this.backgroundRect.setVisible(visible);
        this.text.setVisible(visible);
        this.text.setTint(visible === true ? this.textClr : 0x999999);
        return this;
    }

    setEnable(enabled) {
        this.enabled = enabled;
        this.text.setTint(enabled === true ? this.textClr : 0x999999);
        return this;
    }

    setText(text) {
        this.text.setText(text);
        return this;
    }
    setTextColor(clr) {
        this.text.setTint(clr);
        this.textClr = clr;
        return this;
    }
    setBackgroundColor(clr) {
        this.backgroundRect.fillColor = clr;
    }

    _onClick() {
        if (this.isNotifying === true) {
            this.isNotifying = false;
            this.text.setText(this.rawText);
            this.text.setTint(this.textClr);
        }
        if (this.enabled === true) {
            for (var i = 0; i < this.clickHandlers.length; i++) {
                this.clickHandlers[i]();
            }
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
        this.clickHandlers.push(callback);
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
        this.text.destroy();
    }
}