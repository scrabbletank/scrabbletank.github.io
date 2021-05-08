import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class ExportDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 350, 300, Phaser.Display.Color.GetColor(0, 0, 0))
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
        this.descLabel = scene.add.bitmapText(x + 10, y + 40, "courier16", txt);

        this.manualSaveLabel = scene.add.bitmapText(x + 175, y + 150, "courier20", "Manual Save").setOrigin(0.5, 0);
        var txt = Common.processText("Click to manually save your game.", 42);
        this.mSaveDescLabel = scene.add.bitmapText(x + 10, y + 180, "courier16", txt);

        this.exportButton = new TextButton(scene, x + 43, y + 100, 110, 20, "Export")
            .onClickHandler(() => { this._export(); });
        this.importButton = new TextButton(scene, x + 196, y + 100, 110, 20, "Import")
            .onClickHandler(() => { this._import(); });
        this.saveButton = new TextButton(scene, x + 120, y + 210, 110, 20, "Save")
            .onClickHandler(() => { this._save(); });
        this.closeButton = new TextButton(scene, x + 230, y + 270, 110, 20, "Back");
    }

    _save() {
        this.scene.scene.get("DarkWorld").save();
        this.saveButton.setText("Saved!")
    }

    _export() {
        this.scene.scene.get("DarkWorld").copyToClipboard();
        this.exportButton.setText("Copied!")
    }
    _import() {
        this.scene.scene.get("DarkWorld").copyFromClipboard();
        this.importButton.setText("Loaded!")
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.descLabel.destroy();
        this.manualSaveLabel.destroy();
        this.mSaveDescLabel.destroy();
        this.exportButton.destroy();
        this.importButton.destroy();
        this.saveButton.destroy();
        this.closeButton.destroy();
    }

    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}