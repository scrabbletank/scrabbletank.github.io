import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class ExportDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 350, 200, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 2;
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.titleLabel = scene.add.bitmapText(x + 175, y + 10, "courier20", "Import/Export Save").setOrigin(0.5, 0);
        var txt = Common.processText("Copies your save information to/from the clipboard so you can backup your save or send " +
            "it to another computer.", 42);
        this.descLabel = scene.add.bitmapText(x + 10, y + 50, "courier16", txt);

        this.resultLabel = undefined;

        this.exportButton = new TextButton(scene, x + 10, y + 170, 110, 20, "Export")
            .onClickHandler(() => { this._export(); });
        this.importButton = new TextButton(scene, x + 120, y + 170, 110, 20, "Import")
            .onClickHandler(() => { this._import(); });
        this.closeButton = new TextButton(scene, x + 230, y + 170, 110, 20, "Back");
    }

    _export() {
        this.scene.scene.get("DarkWorld").copyToClipboard();
        if (this.resultLabel !== undefined) {
            this.resultLabel.destroy();
        }
        this.resultLabel = this.scene.add.bitmapText(this.x + 175, this.y + 110, "courier20", "Copied!").setOrigin(0.5, 0);
    }
    _import() {
        this.scene.scene.get("DarkWorld").copyFromClipboard();
        if (this.resultLabel !== undefined) {
            this.resultLabel.destroy();
        }
        this.resultLabel = this.scene.add.bitmapText(this.x + 175, this.y + 110, "courier20", "Loaded!").setOrigin(0.5, 0);
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.descLabel.destroy();
        this.exportButton.destroy();
        this.importButton.destroy();
        this.closeButton.destroy();
        if (this.resultLabel !== undefined) {
            this.resultLabel.destroy();
        }
    }

    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}