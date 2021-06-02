import { SceneUIBase } from "./SceneUIBase";
import { WorldData } from "../data/WorldData";
import { NewRegionWindow } from "../ui/NewRegionWindow";
import { RegionButton } from "../ui/RegionButton";
import { Common } from "../utils/Common";

export class WorldScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.regionIcons = [];
        this.regionPaths = [];
        this.worldData = new WorldData();

        this.worldData.registerEvent('invasionPowerChanged', () => { this._onInvasionPowerChanged(); });
    }

    refresh() {
        this._refreshRegions();
    }

    rebirth() {
        this._refreshRegions();
        this._onInvasionPowerChanged();
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();
        this.regionSelectWindow = undefined;

        this.invasionPowerLabel = this.add.bitmapText(this.relativeX(300), this.relativeY(30), "courier20",
            "Invasion Power\n" + Common.numberString(Math.floor(this.worldData.invasionPower * 100)) + "%", 20, 1);
        this.invasionPowerLabel.setTint(Phaser.Display.Color.GetColor(255, 128, 255));
        this.invasionRewardLabel = this.add.bitmapText(this.relativeX(600), this.relativeY(30), "courier20",
            "Invasion Reward\n" + Common.numberString(Math.floor(this.worldData.invasionReward * 100)) + "%", 20, 1);
        this.invasionRewardLabel.setTint(Phaser.Display.Color.GetColor(255, 0, 255));
        this._refreshRegions();

    }

    _onInvasionPowerChanged() {
        this.invasionPowerLabel.setText("Invasion Power\n" + Common.numberString(Math.floor(this.worldData.getInvasionPower() * 100)) + "%");
        this.invasionRewardLabel.setText("Invasion Reward\n" + Common.numberString(Math.floor(this.worldData.invasionReward * 100)) + "%");
    }

    _selectNewRegion(idx) {
        this.worldData.addRegion(idx);
        this._refreshRegions();
        this._closeRegionSelectWindow();
        this._selectRegion(this.worldData.regionList.length - 1);
    }

    _showRegionSelectWindow() {
        this._closeRegionSelectWindow();
        this.regionSelectWindow = new NewRegionWindow(this, this.relativeX(100), this.relativeY(50), this.worldData.nextRegions)
            .onSelectHandler((x) => { this._selectNewRegion(x); })
            .onCancelHandler(() => { this._closeRegionSelectWindow(); });
    }
    _closeRegionSelectWindow() {
        if (this.regionSelectWindow !== undefined) {
            this.regionSelectWindow.destroy();
        }
        this.regionSelectWindow = undefined;
    }

    _setupRegionTile(x, y, region, index) {
        this.regionIcons.push(new RegionButton(this, x, y, region)
            .onClickHandler(() => { this._selectRegion(index); }));
    }

    _setupRegionSelect(x, y) {
        this.regionIcons.push(new RegionButton(this, x, y, undefined)
            .onClickHandler(() => { this._showRegionSelectWindow(); }));
    }

    _refreshRegions() {
        for (var i = 0; i < this.regionIcons.length; i++) {
            this.regionIcons[i].destroy();
        }
        for (var i = 0; i < this.regionPaths.length; i++) {
            this.regionPaths[i].destroy();
        }
        this.regionIcons = [];
        this.regionPaths = [];
        var regionPositions = [];
        for (var i = 0; i < this.worldData.regionList.length + (this.worldData.nextRegions.length > 0 ? 1 : 0); i++) {
            var x = 200 + Math.floor(i / 4) * 128;
            var goUp = Math.floor(i / 4) % 2 === 1;
            var y = (goUp === false ? 150 + (i % 4) * 128 : 534 - (i % 4) * 128);
            regionPositions.push([this.relativeY(x), this.relativeY(y)]);
        }

        for (var i = 0; i < regionPositions.length - 1; i++) {
            this.regionPaths.push(this.add.line(0, 0, regionPositions[i][0], regionPositions[i][1],
                regionPositions[i + 1][0], regionPositions[i + 1][1], Phaser.Display.Color.GetColor(255, 0, 0)).setOrigin(0).setLineWidth(4));
        }
        for (var i = 0; i < regionPositions.length; i++) {
            if (i >= this.worldData.regionList.length) {
                this._setupRegionSelect(regionPositions[i][0] - 48, regionPositions[i][1] - 48);
            } else {
                this._setupRegionTile(regionPositions[i][0] - 48, regionPositions[i][1] - 48, this.worldData.regionList[i], i);
            }
        }
    }

    _selectRegion(index) {
        this.worldData.setCurrentRegion(index);
        this.scene.get("DarkWorld").changeRegion();
        this.scene.get("RegionScene").changeRegion();
        this.scene.get("TownScene").changeRegion();
        this.scene.bringToTop("RegionScene");
        this.scene.bringToTop("DarKWorld");
    }
}