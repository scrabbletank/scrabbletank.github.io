import { TextButton } from "./TextButton";
import { ImageButton } from "./ImageButton";
import { Statics } from "../data/Statics";
import { ProgressionStore } from "../data/ProgressionStore";
import { ExtendedFloatingTooltip } from "./ExtendedFloatingTooltip";
import { BuildingRegistry } from "../data/BuildingRegistry";
import { Common } from "../utils/Common";
import { WorldData } from "../data/WorldData";
import { Building } from "../data/Building";
import { FloatingTooltip } from "./FloatingTooltip";
import { DynamicSettings } from "../data/DynamicSettings";
import { MoonlightData } from "../data/MoonlightData";

export class TileSelectWindow {
    constructor(scene, x, y, tile) {
        var progression = new ProgressionStore();
        var region = new WorldData().getCurrentRegion();

        this.backRect = scene.add.rectangle(x, y, 500, 220, Phaser.Display.Color.GetColor(0, 0, 0))
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
            txt += "Explored\n" +
                "Defense: " + Math.floor(tile.defense) + "\n";
        }
        var yieldSum = tile.yields.reduce((a, b) => { return a + b; });
        if (tile.explored === true && yieldSum > 0) {
            txt += "Yields:\n"
            for (var i = 0; i < tile.yields.length; i++) {
                if (tile.yields[i] > 0) {
                    txt += " " + Statics.RESOURCE_NAMES[i] + ": " +
                        (Math.floor(tile.yields[i] * 100) / 100) + "\n";
                }
            }
        }
        this.infoLabel = scene.add.bitmapText(x + 10, y + 25, "courier16", txt);

        this.buildingLabel = undefined;
        this.floatingText = undefined;
        this.buildingDesc = undefined;
        this.buildingCosts = undefined;
        this.upgradeButton = undefined;
        this.destroyButton = undefined;
        this.buildingButtons = [];

        if (progression.unlocks.buildings === true && tile.explored === true) {
            if (tile.building === undefined) {
                this.buildingLabel = scene.add.bitmapText(x + 180, y + 5, "courier20", "Buildings:");
                var bld = [];
                if (yieldSum !== 0 && tile.roadBuildable === true) {
                    bld.push("road");
                }
                if (DynamicSettings.getInstance().buildingsAllowed === true) {
                    if (tile.yields[0] > 0) {
                        bld.push("wood");
                    }
                    if (tile.yields[1] > 0) {
                        bld.push("leather");
                    }
                    if (tile.yields[2] > 0) {
                        bld.push("metal");
                    }
                    if (tile.yields[3] > 0) {
                        bld.push("fiber");
                    }
                    if (tile.yields[4] > 0) {
                        bld.push("stone");
                    }
                    if (tile.yields[5] > 0) {
                        bld.push("crystal");
                    }
                }
                if (tile.dockBuildable === true) {
                    bld.push("docks");
                }
                if (yieldSum > 0) {
                    if (tile.houseBuildable) {
                        bld.push("house");
                        if (region.townData.getMarketLevel() > 0) {
                            bld.push("market");
                        }
                        if (region.townData.alchemyEnabled === true) {
                            bld.push("alchemy");
                        }
                        if (MoonlightData.getInstance().challenges.buildings.completions > 0) {
                            bld.push("warehouse");
                        }
                    }
                    if (region.townData.getTavernLevel() > 0) {
                        bld.push("tavern");
                    }
                    bld.push("watchtower");
                }
                for (var i = 0; i < bld.length; i++) {
                    var a = x + 180 + (i % 9) * 34;
                    var b = y + 30 + Math.floor(i / 9) * 34;
                    var building = BuildingRegistry.getBuildingByName(bld[i]);
                    this.buildingButtons.push(this._makeBuildingBtn(scene, a, b, tile, building));
                }
            } else {
                this.buildingLabel = scene.add.bitmapText(x + 150, y + 5, "courier20", tile.building.name);
                var desc = Common.processText(Building.getTooltip(tile, tile.building.name, tile.building.tier), 27);
                this.buildingDesc = scene.add.bitmapText(x + 150, y + 25, "courier16", desc);
                if (this._canUpgrade(tile.building)) {
                    var txt = "Upgrade:\n";
                    for (var i = 0; i < tile.building.resourceCosts.length; i++) {
                        if (tile.building.resourceCosts[i] > 0) {
                            txt += Statics.RESOURCE_NAMES[i] + ": " + Common.numberString(tile.building.resourceCosts[i]) + "\n";
                        }
                    }
                    txt += "Gold: " + tile.building.goldCost;
                    this.buildingCosts = scene.add.bitmapText(x + 395, y + 25, "courier16", txt);
                    this.upgradeButton = new TextButton(scene, x + 175, y + 195, 140, 20, "Upgrade")
                        .onClickHandler(() => { this._onAction("upgrade", { tile: tile }); });
                }
                this.destroyButton = new ImageButton(scene, x + 130, y + 5, 16, 16, { sprite: "icons", tile: 23 })
                    .onClickHandler(() => { this._onAction("destroy", { tile: tile }); })
                    .onPointerOverHandler(() => {
                        var txt = "Remove the building from this tile. Costs " + (tile.building.tier * Statics.DESTROY_BUILDING_COST) + "g.";
                        var px = x + 130;
                        var py = y + 5;
                        this.floatingText = new FloatingTooltip(scene, Common.processText(txt, 25),
                            px + 16, py - 60, 220, 60, "courier16", 16);
                    })
                    .onPointerOutHandler(() => { this._clearTooltip(); });
            }
        }

        this.exploreButton = new TextButton(scene, x + 30, y + 195, 140, 20, "Explore")
            .onClickHandler(() => { this._onAction("explore", { tile: tile }); });
        this.cancelButton = new TextButton(scene, x + 320, y + 195, 140, 20, "Cancel")
            .onClickHandler(() => { this._onAction("cancel"); });

        this.onActionHandlers = [];
    }

    _canUpgrade(bld) {
        if (bld.name === "Market") {
            return bld.tier < WorldData.instance.getCurrentRegion().townData.getMarketLevel();
        } else if (bld.name === "Tavern") {
            return bld.tier < WorldData.instance.getCurrentRegion().townData.getTavernLevel();
        } else {
            return bld.tier < 3;
        }
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
                var descTxt = Common.processText(Building.getTooltip(tile, building.name, building.tier, true), 24);
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
        if (this.destroyButton !== undefined) {
            this.destroyButton.destroy();
        }
    }
}