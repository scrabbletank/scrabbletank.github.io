import { PlayerData } from "../data/PlayerData";
import { WorldData } from "../data/WorldData";
import { NewRegionWindow } from "../ui/NewRegionWindow";
import { RegionButton } from "../ui/RegionButton";
import { Common } from "../utils/Common";

export class WorldView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.regionIcons = [];
        this.regionPaths = [];
        this.elements = [];

        WorldData.getInstance().registerEvent('invasionPowerChanged', () => { this._onInvasionPowerChanged(); });
        PlayerData.getInstance().registerEvent("onTalentChanged", () => { this._onInvasionPowerChanged(); });
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
        this.backRect = this.scene.add.rectangle(this.x, this.y, 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();
        this.regionSelectWindow = undefined;

        this.invasionPowerLabel = this.scene.add.bitmapText(this.x + 300, this.y + 30, "courier20",
            "Invasion Power\n" + Common.numberString(Math.floor(WorldData.getInstance().invasionPower * 100)) + "%", 20, 1);
        this.invasionPowerLabel.setTint(Phaser.Display.Color.GetColor(255, 128, 255));
        this.invasionRewardLabel = this.scene.add.bitmapText(this.x + 600, this.y + 30, "courier20",
            "Invasion Reward\n" + Common.numberString(Math.floor(WorldData.getInstance().invasionReward * 100)) + "%", 20, 1);
        this.invasionRewardLabel.setTint(Phaser.Display.Color.GetColor(255, 0, 255));
        this._refreshRegions();

    }

    _onInvasionPowerChanged() {
        this.invasionPowerLabel.setText("Invasion Power\n" + Common.numberString(Math.floor(WorldData.getInstance().getInvasionPower() * 100)) + "%");
        this.invasionRewardLabel.setText("Invasion Reward\n" + Common.numberString(Math.floor(WorldData.getInstance().invasionReward * 100)) + "%");
    }

    _selectNewRegion(idx) {
        WorldData.getInstance().addRegion(idx);
        this._refreshRegions();
        this._closeRegionSelectWindow();
        this._selectRegion(WorldData.getInstance().regionList.length - 1);
    }

    _showRegionSelectWindow() {
        this._closeRegionSelectWindow();
        this.regionSelectWindow = new NewRegionWindow(this.scene, this.x + 100, this.y + 50, WorldData.getInstance().nextRegions)
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
        this.regionIcons.push(new RegionButton(this.scene, x, y, region)
            .onClickHandler(() => { this._selectRegion(index); }));
    }

    _setupRegionSelect(x, y) {
        this.regionIcons.push(new RegionButton(this.scene, x, y, undefined)
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
        for (var i = 0; i < WorldData.getInstance().regionList.length + (WorldData.getInstance().nextRegions.length > 0 ? 1 : 0); i++) {
            var x = 120 + Math.floor(i / 4) * 128;
            var goUp = Math.floor(i / 4) % 2 === 1;
            var y = (goUp === false ? 150 + (i % 4) * 128 : 534 - (i % 4) * 128);
            regionPositions.push([this.x + x, this.y + y]);
        }

        for (var i = 0; i < regionPositions.length - 1; i++) {
            this.regionPaths.push(this.scene.add.line(0, 0, regionPositions[i][0], regionPositions[i][1],
                regionPositions[i + 1][0], regionPositions[i + 1][1], Phaser.Display.Color.GetColor(255, 0, 0)).setOrigin(0).setLineWidth(4));
        }
        for (var i = 0; i < regionPositions.length; i++) {
            if (i >= WorldData.getInstance().regionList.length) {
                this._setupRegionSelect(regionPositions[i][0] - 48, regionPositions[i][1] - 48);
            } else {
                this._setupRegionTile(regionPositions[i][0] - 48, regionPositions[i][1] - 48, WorldData.getInstance().regionList[i], i);
            }
        }

        this.elements = this.elements.concat(this.regionIcons, this.regionPaths);
        this.elements.push(this.backRect, this.invasionPowerLabel, this.invasionRewardLabel);
    }

    _selectRegion(index) {
        WorldData.getInstance().setCurrentRegion(index);
        this.scene.scene.get("DarkWorld").changeRegion();
        this.scene.scene.get("RegionScene").changeRegion();
        this.scene.scene.get("TownScene").changeRegion();
        this.scene.scene.bringToTop("RegionScene");
        this.scene.scene.bringToTop("DarKWorld");
    }

    setVisible(visible) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].setVisible(visible);
        }

        if (visible === false) {
            this._closeRegionSelectWindow();
        }
    }
}