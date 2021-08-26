import { Blueprint } from "../data/Blueprint";
import { MoonlightData } from "../data/MoonlightData";
import { PlayerData } from "../data/PlayerData";
import { ProgressionStore } from "../data/ProgressionStore";
import { ImageButton } from "../ui/ImageButton";
import { TextButton } from "../ui/TextButton";

const WIDTH = 50;
const HEIGHT = 50;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
const BLD_TO_TEXTURE = {
    town: { sprite: "roadicons", tile: 54, w: 50, h: 50 },
    road: { sprite: "roadicons", tile: 14, w: 50, h: 50 },
    prod: { sprite: "bldicons", tile: 2, w: 32, h: 32 },
    house: { sprite: "bldicons", tile: 6, w: 32, h: 32 },
    watchtower: { sprite: "bldicons", tile: 7, w: 32, h: 32 },
    tavern: { sprite: "bldicons", tile: 9, w: 32, h: 32 },
    market: { sprite: "bldicons", tile: 8, w: 32, h: 32 },
    alchemy: { sprite: "bldicons", tile: 51, w: 32, h: 32 },
    dojo: { sprite: "bldicons", tile: 54, w: 32, h: 32 },
    garrison: { sprite: "bldicons", tile: 53, w: 32, h: 32 },
    warehouse: { sprite: "bldicons", tile: 52, w: 32, h: 32 },
    none: { sprite: "icons", tile: 23, w: 32, h: 32 }
}

export class BlueprintView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.map = [];
        this.images = [];
        this.icons = [];
        this.offsetX = 360 - 11 * WIDTH / 2;
        this.offsetY = 370 - 13 * HEIGHT / 2;
        this.selectedBuilding = 0;
        this.selectedBp = 0;
    }

    _handleClearBPClick() {
        PlayerData.getInstance().blueprints[this.selectedBp] = new Blueprint();
        this.refreshBlueprint();
    }

    _handleBPClick(idx) {
        this.selectedBp = idx;
        this.refreshBlueprint();
    }

    _handleIconClick(val) {
        this.selectedBuilding = val;
    }

    _handleTileClick(x, y) {
        if (this.scene.input.activePointer.leftButtonDown() === false) {
            return;
        }
        var player = PlayerData.getInstance();
        if (this.selectedBuilding === -1 || player.blueprints[this.selectedBp].map[y][x] === 'town') {
            return;
        }
        if (this.images[y][x] !== undefined) {
            this.images[y][x].destroy();
        }
        if (this.selectedBuilding === "none") {
            player.blueprints[this.selectedBp].map[y][x] = 0;
        } else {
            player.blueprints[this.selectedBp].map[y][x] = this.selectedBuilding;

            if (this.selectedBuilding !== 0) {
                var texture = BLD_TO_TEXTURE[this.selectedBuilding];
                var img = this.scene.add.image(this.x + (x + 0.5) * WIDTH + this.offsetX,
                    this.y + (y + 0.5) * HEIGHT + this.offsetY, texture.sprite, texture.tile);
                img.displayWidth = texture.w;
                img.displayHeight = texture.h;
                this.images[y][x] = img;
            }
        }
    }

    _setupTile(x, y) {
        var rect = this.scene.add.rectangle(this.x + (x + 0.5) * WIDTH + this.offsetX,
            this.y + (y + 0.5) * HEIGHT + this.offsetY, WIDTH - 1, HEIGHT - 1, Phaser.Display.Color.GetColor(80, 90, 160));
        rect.strokeColor = Phaser.Display.Color.GetColor(220, 255, 220);
        rect.isStroked = true;
        rect.lineWidth = 1.5;
        rect.setInteractive({ useHandCursor: true })
            .on("pointerover", () => { this._handleTileClick(x, y); })
            .on("pointerdown", () => { this._handleTileClick(x, y); });
        return rect;
    }

    _setupBuildingIcon(x, y, val) {
        var icon = new ImageButton(this.scene, x, y, 32, 32, BLD_TO_TEXTURE[val]);
        icon.onClickHandler(() => this._handleIconClick(val));
        return icon;
    }

    create() {
        this.map = [];
        for (var i = 0; i < 13; i++) {
            for (var t = 0; t < 11; t++) {
                this.map.push(this._setupTile(t, i));
            }
        }
        // X/Y GUIDES
        this.guides = [];
        for (var i = 0; i < 13; i++) {
            this.map.push(this.scene.add.bitmapText(this.x + this.offsetX - WIDTH / 2,
                this.y + this.offsetY + ((i + 0.5) * HEIGHT), "courier20", LETTERS[i]).setOrigin(0.5));
        }
        for (var i = 0; i < 11; i++) {
            this.map.push(this.scene.add.bitmapText(this.x + this.offsetX + ((i + 0.5) * WIDTH),
                this.y + this.offsetY - HEIGHT / 2, "courier20", "" + (i + 1)).setOrigin(0.5));
        }
        this.refreshBlueprint();
        this.refreshIcons();
    }

    refreshBlueprint() {
        for (var i = 0; i < this.images.length; i++) {
            for (var t = 0; t < this.images[0].length; t++) {
                if (this.images[i][t] !== undefined) {
                    this.images[i][t].destroy();
                }
            }
        }
        this.images = [];
        var bp = PlayerData.getInstance().blueprints[this.selectedBp];
        for (var i = 0; i < bp.map.length; i++) {
            var row = []
            for (var t = 0; t < bp.map[0].length; t++) {
                if (bp.map[i][t] !== 0) {
                    var texture = BLD_TO_TEXTURE[bp.map[i][t]];
                    var img = this.scene.add.image(this.x + (t + 0.5) * WIDTH + this.offsetX,
                        this.y + (i + 0.5) * HEIGHT + this.offsetY, texture.sprite, texture.tile);
                    img.displayWidth = texture.w;
                    img.displayHeight = texture.h;
                    row.push(img);
                } else {
                    row.push(undefined);
                }
            }
            this.images.push(row);
        }
    }
    refreshIcons() {
        for (var i = 0; i < this.icons.length; i++) {
            this.icons[i].destroy();
        }
        this.icons = [];

        this.icons.push(this.scene.add.bitmapText(this.x + 650, this.y + 50, "courier20", "Blueprint:"));
        this.icons.push(new TextButton(this.scene, this.x + 650, this.y + 70, 30, 20, "1").onClickHandler(() => { this._handleBPClick(0); }));
        this.icons.push(new TextButton(this.scene, this.x + 685, this.y + 70, 30, 20, "2").onClickHandler(() => { this._handleBPClick(1); }));
        this.icons.push(new TextButton(this.scene, this.x + 720, this.y + 70, 30, 20, "3").onClickHandler(() => { this._handleBPClick(2); }));
        this.icons.push(new TextButton(this.scene, this.x + 755, this.y + 70, 30, 20, "4").onClickHandler(() => { this._handleBPClick(3); }));
        this.icons.push(new TextButton(this.scene, this.x + 790, this.y + 70, 30, 20, "5").onClickHandler(() => { this._handleBPClick(4); }));

        this.icons.push(this.scene.add.bitmapText(this.x + 650, this.y + 100, "courier20", "Building:"));
        var bld = ["road", "prod", "house", "watchtower", "tavern", "market", "alchemy"];
        if (ProgressionStore.getInstance().persistentUnlocks.dungeons === true) {
            bld.push("dojo");
            bld.push("garrison");
        }
        if (MoonlightData.getInstance().challenges.buildings.completions > 0) {
            bld.push("warehouse");
        }
        bld.push("none");
        for (var i = 0; i < bld.length; i++) {
            var x = this.x + 650 + (i % 7) * 34;
            var y = this.y + 120 + Math.floor(i / 7) * 34;
            this.icons.push(this._setupBuildingIcon(x, y, bld[i]));
        }

        this.icons.push(new TextButton(this.scene, this.x + 650, this.y + 200, 180, 20, "Clear Blueprint")
            .onClickHandler(() => { this._handleClearBPClick(); }));
    }

    setVisible(visible) {
        for (var i = 0; i < this.icons.length; i++) {
            this.icons[i].setVisible(visible);
        }
        for (var i = 0; i < this.images.length; i++) {
            for (var t = 0; t < this.images[i].length; t++) {
                if (this.images[i][t] !== undefined) {
                    this.images[i][t].setVisible(visible);
                }
            }
        }
        for (var i = 0; i < this.map.length; i++) {
            this.map[i].setVisible(visible);
        }
        for (var i = 0; i < this.guides.length; i++) {
            this.guides[i].setVisible(visible);
        }
    }
}