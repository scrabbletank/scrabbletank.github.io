import { TextButton } from "./TextButton";
import { ImageButton } from "./ImageButton";
import { Statics } from "../data/Statics";
import { ProgressionStore } from "../data/ProgressionStore";
import { ExtendedFloatingTooltip } from "./ExtendedFloatingTooltip";
import { BuildingRegistry } from "../data/BuildingRegistry";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { WorldData } from "../data/WorldData";

export class TileSelectWindow {
    constructor(scene, x, y, tile) {
        var progression = new ProgressionStore();
        var region = new WorldData().getCurrentRegion();

        this.backRect = scene.add.rectangle(x, y, 400, 200, Phaser.Display.Color.GetColor(0, 0, 0))
            .setInteractive()
            .setOrigin(0, 0);
        this.backRect.isStroked = true;
        this.backRect.strokeColor = Phaser.Display.Color.GetColor(128, 128, 128);
        this.backRect.lineWidth = 2;

        this.titleLabel = scene.add.bitmapText(x + 5, y + 5, "courier20", tile.name);
        var txt = "";
        if (tile.difficulty < 1) {
            txt += "Difficulty: Weak\n";
        } else {
            txt += "Difficulty: " + tile.difficulty + '\n';
        }
        if (tile.explored === false) {
            txt += "Explored: " + Math.floor(tile.amountExplored / tile.explorationNeeded * 100) + '%\n';
        } else {
            txt += "Explored\n";
        }
        if (tile.explored === true) {
            txt += "Yields:\n"
            for (var i = 0; i < tile.yields.length; i++) {
                if (tile.yields[i].rate > 0) {
                    txt += " " + Statics.RESOURCE_NAMES[tile.yields[i].type] + ": " + tile.yields[i].rate + "\n";
                }
            }
        }
        this.infoLabel = scene.add.bitmapText(x + 10, y + 25, "courier16", txt);

        this.buildingLabel = undefined;
        this.floatingText = undefined;
        this.buildingDesc = undefined;
        this.buildingCosts = undefined;
        this.upgradeButton = undefined;
        this.buildingButtons = [];

        if (progression.unlocks.buildings === true && tile.explored === true) {
            if (tile.building === undefined) {
                this.buildingLabel = scene.add.bitmapText(x + 180, y + 5, "courier20", "Buildings:");
                var bld = [];
                for (var i = 0; i < tile.yields.length; i++) {
                    switch (tile.yields[i].type) {
                        case Statics.RESOURCE_WOOD:
                            bld.push("wood");
                            break;
                        case Statics.RESOURCE_LEATHER:
                            bld.push("leather");
                            break;
                        case Statics.RESOURCE_METAL:
                            bld.push("metal");
                            break;
                        case Statics.RESOURCE_FIBER:
                            bld.push("fiber");
                            break;
                        case Statics.RESOURCE_STONE:
                            bld.push("stone");
                            break;
                        case Statics.RESOURCE_CRYSTAL:
                            bld.push("crystal");
                            break;
                    }
                }
                bld.push("house");
                bld.push("watchtower");
                if (region.tradeHouseUnlocked === true) {
                    bld.push("tradehouse");
                }
                if (region.tavernUnlocked === true) {
                    bld.push("tavern");
                }
                for (var i = 0; i < bld.length; i++) {
                    var a = x + 180 + (i % 6) * 34;
                    var b = y + 30 + Math.floor(i / 6) * 34;
                    var building = BuildingRegistry.getBuildingByName(bld[i]);
                    this.buildingButtons.push(this._makeBuildingBtn(scene, a, b, tile, building));
                }
            } else {
                this.buildingLabel = scene.add.bitmapText(x + 150, y + 5, "courier20", tile.building.name);
                var desc = Common.processText(TooltipRegistry.getBuildingTooltip(tile.building.name, tile.building.tier), 16);
                this.buildingDesc = scene.add.bitmapText(x + 150, y + 25, "courier16", desc);
                if (tile.building.tier < 3) {
                    var txt = "Upgrade:\n";
                    for (var i = 0; i < tile.building.resourceCosts.length; i++) {
                        if (tile.building.resourceCosts[i] > 0) {
                            txt += Statics.RESOURCE_NAMES[i] + ": " + Common.numberString(tile.building.resourceCosts[i]) + "\n";
                        }
                    }
                    txt += "Gold: " + tile.building.goldCost;
                    this.buildingCosts = scene.add.bitmapText(x + 295, y + 25, "courier16", txt);
                    this.upgradeButton = new TextButton(scene, x + 140, y + 175, 120, 20, "Upgrade")
                        .onClickHandler(() => { this._onAction("upgrade", { tile: tile }); });
                }
            }
        }

        this.exploreButton = new TextButton(scene, x + 10, y + 175, 120, 20, "Explore")
            .onClickHandler(() => { this._onAction("explore", { tile: tile }); });
        this.cancelButton = new TextButton(scene, x + 270, y + 175, 120, 20, "Cancel")
            .onClickHandler(() => { this._onAction("cancel"); });

        this.onActionHandlers = [];
    }

    _makeBuildingBtn(scene, x, y, tile, building) {
        return new ImageButton(scene, x, y, 32, 32, building.texture)
            .onClickHandler(() => { this._onAction("build", { tile: tile, building: building }); })
            .onPointerOverHandler(() => {
                var costTxt = "";
                for (var i = 0; i < building.resourceCosts.length; i++) {
                    if (building.resourceCosts[i] > 0) {
                        costTxt += Statics.RESOURCE_NAMES[i] + ": " + building.resourceCosts[i] + "\n";
                    }
                }
                costTxt += "Gold: " + building.goldCost;
                if (this.floatingText !== undefined) {
                    this.floatingText.destroy();
                }
                var descTxt = Common.processText(TooltipRegistry.getBuildingTooltip(building.name, building.tier), 24);
                this.floatingText = new ExtendedFloatingTooltip(scene, x + (x + 350 > 1100 ? -350 : 0), y - 150, 350, 150)
                    .addText(5, 5, "courier20", building.name)
                    .addText(230, 5, "courier20", "Costs:")
                    .addText(235, 25, "courier16", costTxt)
                    .addText(10, 25, "courier16", descTxt);
            })
            .onPointerOutHandler(() => { this._clearTooltip(); });
    }

    _clearTooltip() {
        this.floatingText.destroy();
        this.floatingText = undefined;
    }

    addOnActionHandler(callback) {
        this.onActionHandlers.push(callback);
    }

    _onAction(action, blob = {}) {
        for (var i = 0; i < this.onActionHandlers.length; i++) {
            this.onActionHandlers[i](action, blob);
        }
    }

    destroy() {
        this.backRect.destroy();
        this.titleLabel.destroy();
        this.infoLabel.destroy();
        this.exploreButton.destroy();
        this.cancelButton.destroy();

        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        if (this.buildingLabel !== undefined) {
            this.buildingLabel.destroy();
        }
        for (var i = 0; i < this.buildingButtons.length; i++) {
            this.buildingButtons[i].destroy();
        }
        if (this.buildingDesc !== undefined) {
            this.buildingDesc.destroy();
        }
        if (this.buildingCosts !== undefined) {
            this.buildingCosts.destroy();
        }
        if (this.upgradeButton !== undefined) {
            this.upgradeButton.destroy();
        }
    }
}