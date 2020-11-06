import { Common } from "../utils/Common";

export class ExportDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 350, 200, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 2;

        this.titleLabel = scene.add.bitmapText(x + 175, y + 10, "courier20", "Export Save").setOrigin(0.5, 0);
        var txt = Common.processText("Copies your save information to the clipboard so you can backup your save or send " +
            "it to another computer.", 32);
        this.descLabel = scene.add.bitmapText(x + 10, y + 30, "courier16", txt);


        this.exportButton = new TextButton(scene, x + 10, y + 170, 160, 20, "Copy to Clipboard")
            .onClickHandler(() => { scene.scene.get("DarkWorld").copyToClipboard(); });
        this.closeButton = new TextButton(scene, x + 180, y + 170, 160, 20, "Back");
    }


    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}