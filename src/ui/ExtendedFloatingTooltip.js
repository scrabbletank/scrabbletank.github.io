
export class ExtendedFloatingTooltip {
    constructor(sceneContext, x, y, width, height) {
        this.boundingBox = sceneContext.add.rectangle(x, y, width, height, 0x222222).setOrigin(0);
        this.boundingBox.strokeColor = 0xbbbbbb;
        this.boundingBox.isStroked = true;
        this.boundingBox.lineWidth = 2;
        this.x = x;
        this.y = y;
        this.context = sceneContext;
        this.textList = [];
    }

    addText(x, y, font, text, clr=undefined) {
        var label = this.context.add.bitmapText(this.x + x, this.y + y, font, text);
        if (clr !== undefined) {
            label.setTint(clr);
        }
        this.textList.push(label);
        return this;
    }

    setVisible(visible) {
        this.boundingBox.setVisible(visible);
        for (var i = 0; i < this.textList.length; i++) {
            this.textList[i].setVisible(visible);
        }
    }

    destroy(){
        this.boundingBox.destroy();
        for (var i = 0; i < this.textList.length; i++) {
            this.textList[i].destroy();
        }
    }
}