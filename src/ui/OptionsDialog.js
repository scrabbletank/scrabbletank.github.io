import { DynamicSettings } from "../data/DynamicSettings";
import { ProgressionStore } from "../data/ProgressionStore";
import { Statics } from "../data/Statics";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class OptionsDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 400, 500, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 2;
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.titleLabel = scene.add.bitmapText(x + 200, y + 10, "courier20", "Import/Export Save").setOrigin(0.5, 0);
        var txt = Common.processText("Copies your save information to/from the clipboard so you can backup your save or send " +
            "it to another computer.", 46);
        this.descLabel = scene.add.bitmapText(x + 15, y + 40, "courier16", txt, 16, 1);

        this.manualSaveLabel = scene.add.bitmapText(x + 10, y + 150, "courier20", "Manual Save");
        txt = Common.processText("Click to manually save your game.", 42);
        this.mSaveDescLabel = scene.add.bitmapText(x + 10, y + 180, "courier16", txt);

        this.exportButton = new TextButton(scene, x + 63, y + 100, 110, 20, "Export")
            .onClickHandler(() => { this._export(); });
        this.importButton = new TextButton(scene, x + 236, y + 100, 110, 20, "Import")
            .onClickHandler(() => { this._import(); });
        this.saveButton = new TextButton(scene, x + 280, y + 180, 110, 20, "Save")
            .onClickHandler(() => { this._save(); });

        this.optLabel = scene.add.bitmapText(x + 10, y + 220, "courier20", "Options");
        this.combatLabel = scene.add.bitmapText(x + 10, y + 245, "courier16", "Show Combat Tab on Explore");
        txt = DynamicSettings.getInstance().openCombatOnExplore ? "True" : "False";
        this.combatBtn = new TextButton(scene, x + 260, y + 245, 110, 20, txt)
            .onClickHandler(() => { this._toggleCombatOnExplore(); });
        this.exploreLabel = scene.add.bitmapText(x + 10, y + 270, "courier16", "Auto Explore Mode");
        var txt = "";
        switch (DynamicSettings.getInstance().autoExploreOptions) {
            case Statics.AUTOEXPLORE_WEAKEST:
                txt = "Weakest";
                break;
            case Statics.AUTOEXPLORE_HOLD:
                txt = "Hold";
                break;
            case Statics.AUTOEXPLORE_STRONGEST:
                txt = "Strongest";
                break;
        }
        this.exploreBtn = new TextButton(scene, x + 260, y + 270, 110, 20, txt)
            .onClickHandler(() => { this._toggleAutoExploreMode(); });
        this.exploreLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
        this.exploreBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);

        this.defaultTownLabel = scene.add.bitmapText(x + 10, y + 295, "courier16", "Default Auto Town Upgrade");
        txt = DynamicSettings.getInstance().autoTownUpgradeDefault ? "True" : "False";
        this.defaultTownBtn = new TextButton(scene, x + 260, y + 295, 110, 20, txt)
            .onClickHandler(() => { this._toggleDefaultTown(); });
        this.defaultTownLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoTown);
        this.defaultTownBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoTown);

        this.regionExploreLabel = scene.add.bitmapText(x + 10, y + 320, "courier16", "Auto Explore's new Regions");
        txt = DynamicSettings.getInstance().autoExploreRegions ? "True" : "False";
        this.regionExploreBtn = new TextButton(scene, x + 260, y + 320, 110, 20, txt)
            .onClickHandler(() => { this._toggleRegionExplore(); });
        this.regionExploreLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore2);
        this.regionExploreBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore2);

        this.closeButton = new TextButton(scene, x + 280, y + 470, 110, 20, "Back");

        this.elements = [this.titleLabel, this.descLabel, this.manualSaveLabel, this.mSaveDescLabel, this.exportButton,
        this.importButton, this.saveButton, this.optLabel, this.combatLabel, this.combatBtn, this.exploreLabel,
        this.exploreBtn, this.defaultTownLabel, this.defaultTownBtn, this.regionExploreLabel, this.regionExploreBtn,
        this.closeButton, this.backingRect];
    }

    _toggleCombatOnExplore() {
        DynamicSettings.getInstance().openCombatOnExplore = DynamicSettings.getInstance().openCombatOnExplore === true ? false : true;
        var txt = DynamicSettings.getInstance().openCombatOnExplore ? "True" : "False";
        this.combatBtn.setText(txt);
    }

    _toggleDefaultTown() {
        DynamicSettings.getInstance().autoTownUpgradeDefault = DynamicSettings.getInstance().autoTownUpgradeDefault === true ? false : true;
        var txt = DynamicSettings.getInstance().autoTownUpgradeDefault ? "True" : "False";
        this.defaultTownBtn.setText(txt);
    }

    _toggleRegionExplore() {
        DynamicSettings.getInstance().autoExploreRegions = DynamicSettings.getInstance().autoExploreRegions === true ? false : true;
        var txt = DynamicSettings.getInstance().autoExploreRegions ? "True" : "False";
        this.regionExploreBtn.setText(txt);
    }

    _toggleAutoExploreMode() {
        DynamicSettings.getInstance().autoExploreOptions = (DynamicSettings.getInstance().autoExploreOptions + 1) % 3;
        var txt = "";
        switch (DynamicSettings.getInstance().autoExploreOptions) {
            case Statics.AUTOEXPLORE_WEAKEST:
                txt = "Weakest";
                break;
            case Statics.AUTOEXPLORE_HOLD:
                txt = "Hold";
                break;
            case Statics.AUTOEXPLORE_STRONGEST:
                txt = "Strongest";
                break;
        }
        this.exploreBtn.setText(txt);
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
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
    }

    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}