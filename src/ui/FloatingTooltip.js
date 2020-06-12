
export class FloatingTooltip {
    constructor(sceneContext, tooltipMessage, x, y, width, height, font = "courier20", fontSize = 20) {
        this.boundingBox = sceneContext.add.rectangle(x, y, width, height, 0x222222).setOrigin(0).setDepth(999);
        this.boundingBox.strokeColor = 0xbbbbbb;
        this.boundingBox.isStroked = true;
        this.boundingBox.lineWidth = 2;
        this.text = sceneContext.add.bitmapText(x + width / 2, y + height / 2, font, tooltipMessage, fontSize, 1).setOrigin(0.5).setDepth(999);
    }

    setVisible(visible) {
        this.boundingBox.setVisible(visible);
        this.text.setVisible(visible);
    }

    destroy(){
        this.boundingBox.destroy();
        this.text.destroy();
    }
}