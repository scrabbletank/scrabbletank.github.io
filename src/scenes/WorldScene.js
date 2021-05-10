import { SceneUIBase } from "./SceneUIBase";
import { WorldData } from "../data/WorldData";
import { ImageButton } from "../ui/ImageButton";
import { ExtendedFloatingTooltip } from "../ui/ExtendedFloatingTooltip";
import { RegionRegistry } from "../data/RegionRegistry";
import { Common } from "../utils/Common";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { DynamicSettings } from "../data/DynamicSettings";
import { Statics } from "../data/Statics";

export class WorldScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.regionIcons = [];
        this.regionPaths = [];
        this.page = 0;
        this.worldData = new WorldData();
    }

    refresh() {
        this._refreshRegions();
    }

    rebirth() {
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.floatingText = undefined;

        this._refreshRegions();

    }

    _setupRegionTile(x, y, region, index) {
        var diff = (region.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease) + "-" +
            ((region.regionLevel + 1) * DynamicSettings.getInstance().regionDifficultyIncrease);
        var explorePercent = Math.floor(region.getExplorePercent() * 100) + "%";
        this.regionIcons.push(new ImageButton(this, x, y, 64, 64, { sprite: "icons", tile: 40 })
            .onClickHandler(() => { this._selectRegion(index); })
            .onPointerOverHandler(() => { this._createTooltip(x, y, diff, explorePercent, region); })
            .onPointerOutHandler(() => { this._disableTooltip(); }));
    }
    _setupPotentialRegionTile(x, y, region, index) {
        var diff = (this.worldData.regionList.length * 20) + "-" + (this.worldData.regionList.length * 20 + 20);
        this.regionIcons.push(new ImageButton(this, x, y, 64, 64, { sprite: "icons", tile: 40 })
            .onClickHandler(() => { this._chooseNewRegion(index); })
            .onPointerOverHandler(() => { this._createTooltip(x, y, diff, undefined, region); })
            .onPointerOutHandler(() => { this._disableTooltip(); }));
    }

    _refreshRegions() {
        // super fuckign cursed function
        for (var i = 0; i < this.regionIcons.length; i++) {
            this.regionIcons[i].destroy();
        }
        for (var i = 0; i < this.regionPaths.length; i++) {
            this.regionPaths[i].destroy();
        }
        this.regionIcons = [];
        this.regionPaths = [];

        for (var i = this.page * 8 + 1; i < Math.min(this.worldData.regionList.length, this.page * 8 + 8); i++) {
            var ax = this.relativeX(50 + ((i - 1) % 8) * 100);
            var ay = this.relativeY(this.worldData.regionList[i - 1].worldHeight);
            var bx = this.relativeX(50 + (i % 8) * 100);
            var by = this.relativeY(this.worldData.regionList[i].worldHeight);
            this.regionPaths.push(this.add.line(0, 0, ax, ay, bx, by, 0xaa0000).setOrigin(0).setLineWidth(4));
        }
        if (this.worldData.regionList.length < this.page * 8 + 8) {
            for (var i = 0; i < this.worldData.nextRegions.length; i++) {
                var idx = (this.worldData.regionList.length % 8);
                var ax = this.relativeX(50 + ((idx - 1) % 8) * 100);
                var ay = this.relativeY(this.worldData.regionList[this.worldData.regionList.length - 1].worldHeight);
                var bx = this.relativeX(50 + (idx % 8) * 100);
                var by = this.relativeY(0) + Math.floor((i + 1) * (700 / (this.worldData.nextRegions.length + 1)));
                this.regionPaths.push(this.add.line(0, 0, ax, ay, bx, by, 0x660022).setOrigin(0).setLineWidth(4));
            }
        }
        for (var i = this.page * 8; i < Math.min(this.worldData.regionList.length, this.page * 8 + 8); i++) {
            var x = this.relativeX(50 + (i % 8) * 100) - 32;
            var y = this.relativeY(this.worldData.regionList[i].worldHeight) - 32;
            this._setupRegionTile(x, y, this.worldData.regionList[i], i);
        }

        if (this.worldData.regionList.length < this.page * 8 + 8) {
            for (var i = 0; i < this.worldData.nextRegions.length; i++) {
                var x = this.relativeX(50 + (this.worldData.regionList.length % 8) * 100) - 32;
                var y = this.relativeY(0) + Math.floor((i + 1) * (700 / (this.worldData.nextRegions.length + 1))) - 32;
                this._setupPotentialRegionTile(x, y, this.worldData.nextRegions[i], i);
            }
        }
    }

    _selectRegion(index) {
        this._disableTooltip();
        this.worldData.setCurrentRegion(index);
        this.scene.get("DarkWorld").changeRegion();
        this.scene.get("RegionScene").changeRegion();
        this.scene.get("TownScene").changeRegion();
        this.scene.bringToTop("RegionScene");
        this.scene.bringToTop("DarKWorld");
    }

    _chooseNewRegion(index) {
        this.worldData.addRegion(index);
        this._disableTooltip();
        this._refreshRegions();
    }

    _createTooltip(x, y, difficulty, explorePercent, region) {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        x += x + 400 > 1100 ? -250 : 64;
        this.floatingText = new ExtendedFloatingTooltip(this, x, y, 400, 150);
        this.floatingText.addText(10, 10, "courier20", RegionRegistry.REGION_TYPES[region.type].name);
        this.floatingText.addText(10, 30, "courier16", "Difficulty: " + difficulty);
        if (explorePercent !== undefined) {
            this.floatingText.addText(200, 30, "courier16", "Explored: " + explorePercent);
        }

        var txt = TooltipRegistry.getRegionTooltip(region.type) + "\n\n";
        if (region.traits.length > 0) {
            txt += "Traits: ";
            for (var i = 0; i < region.traits.length; i++) {
                switch (region.traits[i].type) {
                    case Statics.TRAIT_DIRE:
                        txt += "Dire " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_POISONED:
                        txt += "Poisoned " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_MONSTROUS:
                        txt += "Monstrous " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_QUICK:
                        txt += "Quick " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_DEADLY:
                        txt += "Deadly " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_SHIELDED:
                        txt += "Shielded " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_BESERK:
                        txt += "Beserk " + region.traits[i].level;
                        break;
                    case Statics.TRAIT_FIRSTSTRIKE:
                        txt += "First Strike " + region.traits[i].level;
                        break;
                }
                if (i < region.traits.length - 1) {
                    txt += ", ";
                }
            }
        }
        this.floatingText.addText(10, 50, "courier16", Common.processText(txt, 48));
    }
    _disableTooltip() {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
            this.floatingText = undefined;
        }
    }
}