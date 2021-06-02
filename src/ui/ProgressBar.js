export class ProgressBar {
    constructor(sceneContext, x, y, width, height, barColor, barBackgroundColor, text) {
        this.backgroundRect = sceneContext.add.rectangle(x, y, width, height, barBackgroundColor).setOrigin(0, 0);
        this.fillRect = sceneContext.add.rectangle(x + 1, y + 1, width - 2, height - 2, barColor).setOrigin(0, 0);
        this.fillRect2 = sceneContext.add.rectangle(x + 1, y + 1, width - 2, height - 2, Phaser.Display.Color.GetColor(100, 75, 200)).setOrigin(0, 0);
        this.fillRect2.displayWidth = 0;
        this.width = width;
        this.height = height;
        this.progressText = sceneContext.add.bitmapText(x + width / 2, y + height / 2, "courier16", text).setOrigin(0.5, 0.5);
    }

    setPosition(x, y) {
        this.backgroundRect.setPosition(x, y);
        this.fillRect.setPosition(x + 1, y + 1);
        this.fillRect2.setPosition(x + 1, y + 1);
        this.progressText.setPosition(x + this.width / 2, y + this.height / 2);
    }

    setVisible(visible) {
        this.backgroundRect.setVisible(visible);
        this.fillRect.setVisible(visible);
        this.fillRect2.setVisible(visible);
        this.progressText.setVisible(visible);
    }

    setTextColor(clr) {
        this.progressText.setTint(clr);
    }

    setFillPercent(percent, text = "") {
        percent = Math.max(0, Math.min(1, percent));
        this.fillRect.displayWidth = Math.floor(percent * (this.width - 2));
        this.progressText.setText(text);
    }

    setSecondaryFillPercent(percent) {
        percent = Math.max(0, Math.min(1, percent));
        this.fillRect2.displayWidth = Math.floor(percent * (this.width - 2));
    }

    destroy() {
        this.backgroundRect.destroy();
        this.fillRect.destroy();
        this.fillRect2.destroy();
        this.progressText.destroy();
    }
}