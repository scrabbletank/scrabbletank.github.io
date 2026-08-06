import { BuildingRegistry } from "../data/BuildingRegistry";
import { DynamicSettings } from "../data/DynamicSettings";
import { MoonlightData } from "../data/MoonlightData";
import { PlayerData } from "../data/PlayerData";
import { ProgressionStore } from "../data/ProgressionStore";
import { RegionRegistry } from "../data/RegionRegistry";
import { Statics } from "../data/Statics";
import { WorldData } from "../data/WorldData";
import { FloatingTooltip } from "../ui/FloatingTooltip";
import { HighlightElementGroup } from "../ui/HighlightElementGroup";
import { MyrahTileDialog } from "../ui/MyrahTileDialog";
import { ProgressBar } from "../ui/ProgressBar";
import { RebirthDialog } from "../ui/RebirthDialog";
import { TextButton } from "../ui/TextButton";
import { TileSelectWindow } from "../ui/TileSelectWindow";
import { Common } from "../utils/Common";

const toPhaserColor = (clr) => { return Phaser.Display.Color.GetColor(clr[0], clr[1], clr[2]); };

const WIDTH = 50;
const HEIGHT = 50;

export class RegionView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.tileClickHandlers = [];
        this.region = WorldData.getInstance().getCurrentRegion();
        this.offsetX = 360 - this.region.width * WIDTH / 2;
        this.offsetY = 370 - this.region.height * HEIGHT / 2;
        this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
        this.sightingVal = 0;

        this.tileSelectWindow = undefined;
        this.rebirthDialog = undefined;

        this.updateBuildings = false;

        this.upgradeKey = undefined;
        this.houseKey = undefined;
        this.roadKey = undefined;
        this.productionKey = undefined;
        this.exploreKey = undefined;
        this.woodKey = undefined;
        this.leatherKey = undefined;
        this.metalKey = undefined;
        this.fiberKey = undefined;
        this.stoneKey = undefined;
        this.crystalKey = undefined;
        this.marketKey = undefined;
        this.tavernKey = undefined;
        this.warehouseKey = undefined;
        this.alchemyKey = undefined;
        this.destroyKey = undefined;
        this.docksKey = undefined;
        this.dojoKey = undefined;
        this.garrisonKey = undefined;
        this.watchtowerKey = undefined;
        this.hoveredTile = [-1, -1];
        this.regionTiles = [];
        this.regionStats = undefined;
        this.activeTile = undefined;
        this.lastTileHotkeyed = [-1, -1];

        this.detailsContainer = [];
        this.tileElements = [];
        this.guides = [];
    }

    registerEvent(name, callback) {
        if (name === 'onTileClick') {
            this.tileClickHandlers.push(callback);
        }
    }

    _setupRegionButton(idx, x, y) {
        return new TextButton(this.scene, x, y, 24, 20, (idx + 1) + "").onClickHandler(() => {
            WorldData.getInstance().setCurrentRegion(idx);
            this.scene.scene.get("DarkWorld").changeRegion();
        });
    }

    _nextToConnector(x, y) {
        return this.region.map[y][x].name === "Town" || (this.region.map[y][x].building !== undefined && this.region.map[y][x].building.name === "Docks");
    }
    _getRoadTexture(x, y) {
        var l = x > 0 && (this.region.map[y][x - 1].roadDist === 0 || this._nextToConnector(x - 1, y)) ? '1' : '0';
        var r = x < this.region.width - 1 && (this.region.map[y][x + 1].roadDist === 0 || this._nextToConnector(x + 1, y)) ? '1' : '0';
        var u = y > 0 && (this.region.map[y - 1][x].roadDist === 0 || this._nextToConnector(x, y - 1)) ? '1' : '0';
        var d = y < this.region.height - 1 && (this.region.map[y + 1][x].roadDist === 0 || this._nextToConnector(x, y + 1)) ? '1' : '0';
        return { sprite: "roadicons", tile: Statics.ROADTYPES[l + r + u + d] + (this.region.map[y][x].building.tier - 1) * 20, w: 50, h: 50 };
    }

    _getBuildingImage(x, y) {
        if (this.region.map[y][x].building.name === "Road") {
            return this._getRoadTexture(x, y);
        } else {
            return {
                sprite: this.region.map[y][x].building.texture.sprite,
                tile: this.region.map[y][x].building.texture.tile + 10 * (this.region.map[y][x].building.tier - 1),
                w: this.region.map[y][x].building.texture.w,
                h: this.region.map[y][x].building.texture.h
            };
        }
    }

    _setupTile(x, y) {
        var clr = toPhaserColor(this.region.map[y][x].color);
        var border = toPhaserColor(this.region.map[y][x].borderColor);
        if (this.region.map[y][x].revealed === false) {
            clr = Phaser.Display.Color.GetColor(0, 0, 0);
            border = Phaser.Display.Color.GetColor(40, 80, 40);
        } else if (this.region.map[y][x].explored === false && this.region.map[y][x].revealed === true) {
            clr = Common.colorLerp(clr, Phaser.Display.Color.GetColor(0, 0, 0), 0.65);
        }
        if (this.region.map[y][x].hasShard === true && this.region.map[y][x].revealed === true) {
            border = Phaser.Display.Color.GetColor(177, 100, 169);
            clr = Common.colorLerp(clr, Phaser.Display.Color.GetColor(177, 100, 169), 0.65);
        }
        var rect = this.scene.add.rectangle(this.x + (x + 0.5) * WIDTH + this.offsetX,
            this.y + (y + 0.5) * HEIGHT + this.offsetY, WIDTH - 2, HEIGHT - 2, clr);
        rect.isStroked = true;
        rect.strokeColor = border;
        rect.lineWidth = 1.5;
        rect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { this._handleTileClick(x, y); })
            .on('pointerover', () => { this.hoveredTile = [x, y]; this._setTooltip(x, y); })
            .on('pointerout', () => { this.hoveredTile = [-1, -1]; this._disableTooltip(); });

        var bld = undefined;
        if (this.region.map[y][x].building !== undefined && this.region.map[y][x].revealed === true) {
            var texture = this._getBuildingImage(x, y);
            bld = this.scene.add.image(this.x + (x + 0.5) * WIDTH + this.offsetX,
                this.y + (y + 0.5) * HEIGHT + this.offsetY, texture.sprite, texture.tile);
            bld.displayWidth = texture.w;
            bld.displayHeight = texture.h;
        }
        return { rect: rect, building: bld };
    }

    _setTooltip(x, y) {
        if (this.floatingText !== undefined) {
            this._disableTooltip();
        }
        var txt = "Tile " + this.letters[y] + (x + 1) + '\n';

        if (this.region.map[y][x].revealed === true) {
            if (this.region.map[y][x].hasShard === true) {
                txt += "Starlight ";
            }
            txt += this.region.map[y][x].name + '\n';
            if (this.region.map[y][x].difficulty < 1) {
                txt += "Difficulty: Weak\n";
            } else {
                txt += "Difficulty: " + this.region.map[y][x].difficulty + '\n';
            }
            if (this.region.map[y][x].explored === false) {
                txt += "Explored: " + Math.floor(this.region.map[y][x].amountExplored / this.region.map[y][x].explorationNeeded * 100) + '%\n';
            } else {
                txt += "Explored\n";
            }
        } else {
            txt += "Unknown";
        }

        var xAdj = this.x + x * WIDTH + this.offsetX;
        xAdj += xAdj + 190 > 1100 ? -150 : 0;
        var yAdj = this.y + y * HEIGHT + this.offsetY - 82;
        yAdj += yAdj < 100 ? 115 : 0;
        this.floatingText = new FloatingTooltip(this.scene, txt, xAdj, yAdj, 190, 82);
    }
    _disableTooltip() {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
            this.floatingText = undefined;
        }
    }

    _exploreTown(x, y) {
        this.region.map[y][x].explore(1000);
        // this.scene.scene.get("DarkWorld").townButton.setVisible(true);
    }

    _handleTileClick(x, y) {
        if (this.region.map[y][x].explored === false && this.region.map[y][x].revealed === false) {
            return;
        }
        if (this.region.map[y][x].name === "Town") {
            this._exploreTown(x, y);
            return;
        }
        if (this.region.map[y][x].name === "Mystic Gate" && this.region.map[y][x].explored === true) {
            this.rebirthDialog = new RebirthDialog(this.scene, this.x + 250, this.y + 215, this.region.regionLevel)
                .onRebirthHandler(() => { this._rebirthClickedHandler(); })
                .onLeaveHandler(() => { this._leaveClickedHandler(); });
            return;
        }
        if (this.region.map[y][x].name === "Starlight Palace") {
            this.rebirthDialog = new MyrahTileDialog(this.scene, this.x + 250, this.y + 215)
                .onRebirthHandler(() => { this._myrahTileClickedHandler(this.region.map[y][x]); })
                .onLeaveHandler(() => { this._leaveClickedHandler(); });
            return;
        }
        if (this.tileSelectWindow !== undefined) {
            this.tileSelectWindow.destroy();
            this.tileSelectWindow = undefined;
        }

        this.tileSelectWindow = new TileSelectWindow(this.scene, this.x + 190, this.y + 240, this.region.map[y][x]);
        this.tileSelectWindow.addOnActionHandler((action, blob) => { this._tileActionHandler(action, blob); });
    }

    _tileActionHandler(action, blob) {
        switch (action) {
            case "explore":
                this._exploreTile(blob.tile, false);
                break;
            case "build":
                if (this.region._canBuild(blob.tile, blob.building)) {
                    this.region.placeBuilding(blob.tile.x, blob.tile.y, blob.building);
                    blob.tile.building = blob.building;
                    this.scene.scene.get("TownScene")._updateStatus();
                }
                break;
            case "upgrade":
                if (blob.tile.building === undefined) {
                    break;
                }
                if (this.region._canUpgrade(blob.tile) === true) {
                    this.region.upgradeBuilding(blob.tile.x, blob.tile.y);
                    var texture = this._getBuildingImage(blob.tile.x, blob.tile.y)
                    this.tileElements[blob.tile.y][blob.tile.x].building.setTexture(texture.sprite, texture.tile);
                    this.scene.scene.get("TownScene")._updateStatus();
                }
                break;
            case "destroy":
                if (blob.tile.building !== undefined && blob.tile.building.name !== "Town" &&
                    PlayerData.getInstance().gold >= blob.tile.building.tier * Statics.DESTROY_BUILDING_COST) {
                    PlayerData.getInstance().addGold(-blob.tile.building.tier * Statics.DESTROY_BUILDING_COST);
                    this.region.destroyBuilding(blob.tile.x, blob.tile.y);
                }
                break;
        }
        this.refreshDetails();
        if (this.tileSelectWindow !== undefined) {
            this.tileSelectWindow.destroy();
            this.tileSelectWindow = undefined;
        }
    }
    _rebirthClickedHandler() {
        this.rebirthDialog.destroy();
        this.rebirthDialog = undefined;

        WorldData.getInstance().handleRunCompletion();
        this.scene.scene.get("MoonlightScene").refresh();
        this.scene.scene.get("MoonlightScene").enableLeveling();
        this.scene.scene.bringToTop("MoonlightScene");
    }
    _leaveClickedHandler() {
        if (this.rebirthDialog !== undefined) {
            this.rebirthDialog.destroy();
            this.rebirthDialog = undefined;
        }
    }
    _myrahTileClickedHandler(tile) {
        this.rebirthDialog.destroy();
        this.rebirthDialog = undefined;
        this.scene.scene.bringToTop("MyrahScene");
        this.scene.scene.get("MyrahScene").initFight(tile);
    }
    _changeBlueprintHandler(index) {
        this.region.blueprint = index;
        this.refreshDetails();
    }

    _exploreTile(tile, fromAutoExplore) {
        if (tile.parent.isExplorable(tile.x, tile.y) === false) {
            return;
        }
        this.activeTile = tile;
        if (ProgressionStore.getInstance().unlocks.combatTab === false) {
            ProgressionStore.getInstance().registerFeatureUnlocked(Statics.UNLOCK_COMBAT_TAB,
                "Well this isn't so bad, walking aimlessly through this fog covered wilderness.\n" +
                "I wonder if I'll meet a new friend.\n");
        }
        for (var i = 0; i < this.tileClickHandlers.length; i++) {
            this.tileClickHandlers[i](tile, fromAutoExplore);
        }
    }

    _updateTile(tile) {
        this.scene.scene.get("TownScene").refresh();
        var clr = toPhaserColor(tile.color);
        var border = toPhaserColor(tile.borderColor);
        if (tile.revealed === false) {
            clr = Phaser.Display.Color.GetColor(0, 0, 0);
            border = Phaser.Display.Color.GetColor(40, 80, 40);
        } else if (tile.explored === false && tile.revealed === true) {
            clr = Common.colorLerp(clr, Phaser.Display.Color.GetColor(0, 0, 0), 0.65);
        }
        if (tile.hasShard === true && tile.revealed === true) {
            border = Phaser.Display.Color.GetColor(177, 100, 169);
            clr = Common.colorLerp(clr, Phaser.Display.Color.GetColor(177, 100, 169), 0.65);
        }
        this.tileElements[tile.y][tile.x].rect.fillColor = clr;
        this.tileElements[tile.y][tile.x].rect.strokeColor = border;
        if (tile.building !== undefined && tile.revealed === true) {
            this.updateBuildings = true;
            var texture = this._getBuildingImage(tile.x, tile.y);
            if (this.tileElements[tile.y][tile.x].building !== undefined) {
                this.tileElements[tile.y][tile.x].building.setTexture(texture.sprite, texture.tile);
            } else {
                this.tileElements[tile.y][tile.x].building = this.scene.add.image(this.x + (tile.x + 0.5) * WIDTH + this.offsetX,
                    this.y + (tile.y + 0.5) * HEIGHT + this.offsetY, texture.sprite, texture.tile);
                this.tileElements[tile.y][tile.x].building.displayWidth = texture.w;
                this.tileElements[tile.y][tile.x].building.displayHeight = texture.h;
            }

            // if this is a road we need to update neighbouring roads
            if (tile.building.name === "Road") {
                if (tile.x > 0 && this.region.map[tile.y][tile.x - 1].building !== undefined &&
                    this.tileElements[tile.y][tile.x - 1].building !== undefined &&
                    this.region.map[tile.y][tile.x - 1].building.name === "Road") {
                    var rtxt = this._getBuildingImage(tile.x - 1, tile.y);
                    this.tileElements[tile.y][tile.x - 1].building.setTexture(rtxt.sprite, rtxt.tile);
                }
                if (tile.x < this.region.width - 1 && this.region.map[tile.y][tile.x + 1].building !== undefined &&
                    this.tileElements[tile.y][tile.x + 1].building !== undefined &&
                    this.region.map[tile.y][tile.x + 1].building.name === "Road") {
                    var rtxt = this._getBuildingImage(tile.x + 1, tile.y);
                    this.tileElements[tile.y][tile.x + 1].building.setTexture(rtxt.sprite, rtxt.tile);
                }
                if (tile.y > 0 && this.region.map[tile.y - 1][tile.x].building !== undefined &&
                    this.tileElements[tile.y - 1][tile.x].building !== undefined &&
                    this.region.map[tile.y - 1][tile.x].building.name === "Road") {
                    var rtxt = this._getBuildingImage(tile.x, tile.y - 1);
                    this.tileElements[tile.y - 1][tile.x].building.setTexture(rtxt.sprite, rtxt.tile);
                }
                if (tile.y < this.region.height - 1 && this.region.map[tile.y + 1][tile.x].building !== undefined &&
                    this.tileElements[tile.y + 1][tile.x].building !== undefined &&
                    this.region.map[tile.y + 1][tile.x].building.name === "Road") {
                    var rtxt = this._getBuildingImage(tile.x, tile.y + 1);
                    this.tileElements[tile.y + 1][tile.x].building.setTexture(rtxt.sprite, rtxt.tile);
                }
            }
        } else {
            if (this.tileElements[tile.y][tile.x].building !== undefined) {
                this.tileElements[tile.y][tile.x].building.destroy();
                this.tileElements[tile.y][tile.x].building = undefined;
            }
        }
    }

    triggerAutoExplore(tile, tier) {
        var activeRegion = WorldData.getInstance().regionList[tier];
        if (DynamicSettings.getInstance().autoInvade !== -1 && activeRegion.invasions.length > 0 &&
            activeRegion.invasionStrength >= DynamicSettings.getInstance().autoInvade) {
            var pos = activeRegion.invasions[0];
            this._exploreTile(activeRegion.map[pos[0]][pos[1]], true);
            return;
        }
        if (DynamicSettings.getInstance().autoExplore === true) {
            var pos = activeRegion.nextWeakestTile(DynamicSettings.getInstance().autoInvade);
            if (pos[0] !== -1) {
                if (activeRegion.map[pos[1]][pos[0]].name === "Town") {
                    this._exploreTown(tile.x, tile.y);
                    var pos = activeRegion.nextWeakestTile(DynamicSettings.getInstance().autoInvade);
                    if (pos[0] === -1) {
                        return;
                    }
                }
                this._exploreTile(activeRegion.map[pos[1]][pos[0]], true);
            } else if (ProgressionStore.getInstance().persistentUnlocks.autoExplore2 === true &&
                DynamicSettings.getInstance().autoExploreRegions === true &&
                WorldData.getInstance().nextRegions.length > 0) {
                WorldData.getInstance().addRegion(0);
                WorldData.getInstance().setCurrentRegion(WorldData.getInstance().regionList.length - 1);
                this.scene.scene.get("DarkWorld").changeRegion();
                this.scene.scene.get("WorldScene").refresh();
                this.triggerAutoExplore(tile, WorldData.getInstance().regionList.length - 1);
            }
        }
    }

    refresh() {
        this.rebirth();
    }

    changeRegion() {
        this.rebirth();
    }

    create() {
        //add handlers
        this.region.onTileChanged((x) => { this._updateTile(x); });
        WorldData.getInstance().onRegionChanged(() => { this.changeRegion(); });

        //hotkeys
        this.upgradeKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.houseKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.roadKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.productionKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.exploreKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.marketKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.tavernKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.warehouseKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.alchemyKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.destroyKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.docksKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.dojoKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.garrisonKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.watchtowerKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.woodKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.leatherKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.metalKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.fiberKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.stoneKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.crystalKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);

        //background
        this.scene.add.rectangle(this.x + 0, this.y + 0, 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.refreshMap();
        this.refreshDetails();
    }

    rebirth() {
        // we need to ensure we're only updating when the current region is changed
        this.region.removeHandlers();
        this.region = WorldData.instance.getCurrentRegion();
        this.region.onTileChanged((x) => { this._updateTile(x); });
        this.offsetX = 360 - this.region.width * WIDTH / 2;
        this.offsetY = 370 - this.region.height * HEIGHT / 2;

        this._destroyPopups();
        this.refreshMap();
        this.refreshDetails();
    }

    _toggleAutoExplore() {
        DynamicSettings.getInstance().autoExplore = !DynamicSettings.getInstance().autoExplore;
        if (DynamicSettings.getInstance().autoExplore === true) {
            this.autoExploreButton.setText("ON");
            this.autoExploreButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
        } else {
            this.autoExploreButton.setText("OFF");
            this.autoExploreButton.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));
        }
    }
    _updateAutoInvade() {
        switch (DynamicSettings.getInstance().autoInvade) {
            case -1:
                this.autoInvadeButton.setText("OFF");
                this.autoInvadeButton.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));
                break;
            case 0:
                this.autoInvadeButton.setText("ALL");
                this.autoInvadeButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
                break;
            case 1:
                this.autoInvadeButton.setText("1+");
                this.autoInvadeButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
                break;
            case 2:
                this.autoInvadeButton.setText("2+");
                this.autoInvadeButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
                break;
            case 3:
                this.autoInvadeButton.setText("3+");
                this.autoInvadeButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
                break;
        }
    }
    _toggleAutoInvade() {
        DynamicSettings.getInstance().toggleAutoInvade();
        this._updateAutoInvade();
    }
    _toggleAutoUpgrade() {
        this.region.autoUpgrade = !this.region.autoUpgrade;
        if (this.region.autoUpgrade === true) {
            this.autoUpgradeButton.setText("ON");
            this.autoUpgradeButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
        } else {
            this.autoUpgradeButton.setText("OFF");
            this.autoUpgradeButton.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));
        }
    }

    _destroyPopups() {
        this._disableTooltip();
        if (this.rebirthDialog !== undefined) {
            this.rebirthDialog.destroy();
            this.rebirthDialog = undefined;
        }
        if (this.tileSelectWindow !== undefined) {
            this.tileSelectWindow.destroy();
            this.tileSelectWindow = undefined;
        }
    }

    refreshMap() {
        for (var i = 0; i < this.tileElements.length; i++) {
            for (var t = 0; t < this.tileElements[0].length; t++) {
                this.tileElements[i][t].rect.destroy();
                if (this.tileElements[i][t].building !== undefined) {
                    this.tileElements[i][t].building.destroy();
                }
            }
        }
        this.tileElements = [];
        for (var i = 0; i < this.region.height; i++) {
            var row = []
            for (var t = 0; t < this.region.width; t++) {
                row.push(this._setupTile(t, i));
            }
            this.tileElements.push(row);
        }
        // X/Y GUIDES
        for (var i = 0; i < this.guides.length; i++) {
            this.guides[i].destroy();
        }
        this.guides = [];
        for (var i = 0; i < this.region.height; i++) {
            this.guides.push(this.scene.add.bitmapText(this.x + this.offsetX - WIDTH / 2,
                this.y + this.offsetY + ((i + 0.5) * HEIGHT), "courier20", this.letters[i]).setOrigin(0.5));
        }
        for (var i = 0; i < this.region.width; i++) {
            this.guides.push(this.scene.add.bitmapText(this.x + this.offsetX + ((i + 0.5) * WIDTH),
                this.y + this.offsetY - HEIGHT / 2, "courier20", "" + (i + 1)).setOrigin(0.5));
        }
    }

    refreshDetails() {
        for (var i = 0; i < this.detailsContainer.length; i++) {
            this.detailsContainer[i].destroy();
        }
        this.detailsContainer = [];
        var h = this.y + 40;

        if (WorldData.getInstance().regionList.length > 1) {
            this.detailsContainer.push(this.scene.add.bitmapText(this.x + 660, h, "courier20", "Regions:"));
            this.regionTabGroup = new HighlightElementGroup(Phaser.Display.Color.GetColor(255, 255, 0), Phaser.Display.Color.GetColor(0, 0, 0),
                Phaser.Display.Color.GetColor(0, 0, 0), Phaser.Display.Color.GetColor(255, 255, 255));
            for (var i = 0; i < WorldData.getInstance().regionList.length; i++) {
                var x = this.x + 660 + (i % 10) * 24;
                var y = h + 25 + Math.floor(i / 10) * 20;
                var btn = this._setupRegionButton(i, x, y);
                this.detailsContainer.push(btn);
                this.regionTabGroup.addElement(btn);
            }
            this.regionTabGroup._updateHighlights(WorldData.getInstance().currentRegion);
        }
        h += 55 + Math.floor(WorldData.getInstance().regionList.length / 10) * 20;

        this.invasionBar = new ProgressBar(this.scene, this.x + 660, h, 160, 20,
            Phaser.Display.Color.GetColor(255, 128, 255), Phaser.Display.Color.GetColor(32, 32, 64), "Invasion Strength");
        this.invasionBar.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
        this.invasionBar.setFillPercent(this.region.invasionCounter / this.region.invasionCounterMax, "Invasion Strength");
        this.invasionLabel = this.scene.add.bitmapText(this.x + 825, h + 2, "courier16", "Lv " + this.region.invasionStrength);
        h += 25;

        this.offlineLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Offline Time: " + WorldData.instance.time.getOfflineTimeString());
        h += 25;
        this.speed0xButton = new TextButton(this.scene, this.x + 690, h, 30, 20, "0x")
            .onClickHandler(() => { this._setTimeScale(0); });
        this.speed1xButton = new TextButton(this.scene, this.x + 725, h, 30, 20, "1x")
            .onClickHandler(() => { this._setTimeScale(1); });
        this.speed2xButton = new TextButton(this.scene, this.x + 760, h, 30, 20, "2x")
            .onClickHandler(() => { this._setTimeScale(2); });
        this.speed5xButton = new TextButton(this.scene, this.x + 795, h, 30, 20, "5x")
            .onClickHandler(() => { this._setTimeScale(5); });
        this.speed10xButton = new TextButton(this.scene, this.x + 830, h, 30, 20, "10x")
            .onClickHandler(() => { this._setTimeScale(5, 2); });
        this.speed25xButton = new TextButton(this.scene, this.x + 865, h, 30, 20, "25x")
            .onClickHandler(() => { this._setTimeScale(5, 5); });
        this.speedTabGroup = new HighlightElementGroup(Phaser.Display.Color.GetColor(255, 255, 0), Phaser.Display.Color.GetColor(0, 0, 0),
            Phaser.Display.Color.GetColor(0, 0, 0), Phaser.Display.Color.GetColor(255, 255, 255));
        this.speedTabGroup.addElement(this.speed0xButton);
        this.speedTabGroup.addElement(this.speed1xButton);
        this.speedTabGroup.addElement(this.speed2xButton);
        this.speedTabGroup.addElement(this.speed5xButton);
        this.speedTabGroup.addElement(this.speed10xButton);
        this.speedTabGroup.addElement(this.speed25xButton);
        switch (WorldData.getInstance().time.timescale) {
            case 0:
                this.speedTabGroup._updateHighlights(0);
                break;
            case 1:
                this.speedTabGroup._updateHighlights(1);
                break;
            case 2:
                this.speedTabGroup._updateHighlights(2);
                break;
            case 5:
                if (WorldData.getInstance().time.fskip == 1) {
                    this.speedTabGroup._updateHighlights(3);
                } else if (WorldData.getInstance().time.fskip == 2) {
                    this.speedTabGroup._updateHighlights(4);
                } else {
                    this.speedTabGroup._updateHighlights(5);
                }
                break;
        }
        h += 30;

        this.autoExploreLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Auto Explore:");
        this.autoExploreButton = new TextButton(this.scene, this.x + 795, h, 40, 20,
            DynamicSettings.getInstance().autoExplore === true ? "ON" : "OFF")
            .onClickHandler(() => { this._toggleAutoExplore() });
        this.autoExploreButton.setTextColor(DynamicSettings.getInstance().autoExplore === true ?
            Phaser.Display.Color.GetColor(255, 255, 255) : Phaser.Display.Color.GetColor(175, 0, 140));
        h += 30;
        this.autoInvadeLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Auto Invade:");
        this.autoInvadeButton = new TextButton(this.scene, this.x + 795, h, 40, 20, "OFF")
            .onClickHandler(() => { this._toggleAutoInvade() });
        this.autoInvadeButton.setTextColor(DynamicSettings.getInstance().autoInvade === true ?
            Phaser.Display.Color.GetColor(255, 255, 255) : Phaser.Display.Color.GetColor(175, 0, 140));
        this._updateAutoInvade();
        h += 30;
        this.autoUpgradeLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Auto Upgrade:");
        this.autoUpgradeButton = new TextButton(this.scene, this.x + 795, h, 40, 20,
            this.region.autoUpgrade === true ? "ON" : "OFF")
            .onClickHandler(() => { this._toggleAutoUpgrade() });
        this.autoUpgradeButton.setTextColor(this.region.autoUpgrade === true ? Phaser.Display.Color.GetColor(255, 255, 255) :
            Phaser.Display.Color.GetColor(175, 0, 140));
        h += 30;
        if (MoonlightData.getInstance().challenges.buildings.completions > 0) {
            this.blueprintLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Blueprint:");
            h += 25;
            this.noBPBtn = new TextButton(this.scene, this.x + 660, h, 35, 20, "OFF")
                .onClickHandler(() => { this._changeBlueprintHandler(-1) });
            this.noBPBtn.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));
            this.bp1Btn = new TextButton(this.scene, this.x + 700, h, 35, 20, "BP1")
                .onClickHandler(() => { this._changeBlueprintHandler(0) });
            this.bp2Btn = new TextButton(this.scene, this.x + 740, h, 35, 20, "BP2")
                .onClickHandler(() => { this._changeBlueprintHandler(1) });
            this.bp3Btn = new TextButton(this.scene, this.x + 780, h, 35, 20, "BP3")
                .onClickHandler(() => { this._changeBlueprintHandler(2) });
            this.bp4Btn = new TextButton(this.scene, this.x + 820, h, 35, 20, "BP4")
                .onClickHandler(() => { this._changeBlueprintHandler(3) });
            this.bp5Btn = new TextButton(this.scene, this.x + 860, h, 35, 20, "BP5")
                .onClickHandler(() => { this._changeBlueprintHandler(4) });
            this.bpTabGroup = new HighlightElementGroup(Phaser.Display.Color.GetColor(255, 255, 0), Phaser.Display.Color.GetColor(0, 0, 0),
                Phaser.Display.Color.GetColor(0, 0, 0), Phaser.Display.Color.GetColor(255, 255, 255));
            this.bpTabGroup.addElement(this.noBPBtn);
            this.bpTabGroup.addElement(this.bp1Btn);
            this.bpTabGroup.addElement(this.bp2Btn);
            this.bpTabGroup.addElement(this.bp3Btn);
            this.bpTabGroup.addElement(this.bp4Btn);
            this.bpTabGroup.addElement(this.bp5Btn);
            this.bpTabGroup._updateHighlights(this.region.blueprint + 1);

            this.detailsContainer.push(this.blueprintLabel, this.noBPBtn, this.bp1Btn, this.bp2Btn, this.bp3Btn, this.bp4Btn, this.bp5Btn);
        }

        this.autoExploreLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
        this.autoExploreButton.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
        this.autoInvadeLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
        this.autoInvadeButton.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
        this.autoUpgradeLabel.setVisible(MoonlightData.getInstance().challenges.outcast.completions > 0);
        this.autoUpgradeButton.setVisible(MoonlightData.getInstance().challenges.outcast.completions > 0);

        h = this.y + 450;
        this.exploreLabel = this.scene.add.bitmapText(this.x + 660, h, "courier20", "Exploring:");
        this.exploreProgressBar = new ProgressBar(this.scene, this.x + 765, h, 130, 20,
            Phaser.Display.Color.GetColor(0, 0, 255), Phaser.Display.Color.GetColor(32, 32, 64));
        this.exploreProgressBar.setFillPercent(0);
        h += 30;

        var txt = "Daily Production:\n"
        var resources = this.region._getResourcesPerDay();
        for (var i = 0; i < resources.length; i++) {
            if (resources[i] > 100) {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + Common.numberString(Math.floor(resources[i])) + "\n";
            } else {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + (Math.floor(resources[i] * 100) / 100) + "\n";
            }
        }
        if (ProgressionStore.getInstance().persistentUnlocks.starshards === true) {
            txt += '\nStar Shard Chance: ' + ((this.region.getStarShardChance() * 100) / 1).toString().substr(0, 4) + "%\n" +
                "Star Shard Amount: " + Common.numberString(this.region.starshardsPerTile);
        }
        this.regionStats = this.scene.add.bitmapText(this.x + 660, h, "courier20", txt);
        this.regionStats.setVisible(this.region.townData.townExplored === true);

        this.detailsContainer.push(this.invasionBar, this.invasionLabel, this.offlineLabel, this.speed0xButton, this.speed1xButton, this.speed2xButton,
            this.speed5xButton, this.speed10xButton, this.speed25xButton, this.autoExploreLabel, this.autoExploreButton,
            this.autoInvadeLabel, this.autoInvadeButton, this.autoUpgradeLabel, this.autoUpgradeButton, this.exploreLabel,
            this.exploreProgressBar, this.regionStats);
    }

    _setTimeScale(value, fskip = 1) {
        WorldData.instance.time.setTimeScale(value, fskip);
    }

    update(__time, delta) {
        this.offlineLabel.setText("Offline Time: " + WorldData.instance.time.getOfflineTimeString());
        this.invasionBar.setFillPercent(this.region.invasionCounter / this.region.invasionCounterMax, "Invasion Strength");
        this.invasionLabel.setText("Lv " + this.region.invasionStrength);
        this.sightingVal = (this.sightingVal + delta) % 2000;
        var lerp = Math.sin((this.sightingVal / 2000) * Math.PI * 2) * 0.5 + 0.5;
        if (this.region.invasions.length > 0) {
            for (var i = 0; i < this.region.invasions.length; i++) {
                var s = this.region.invasions[i];
                var clr = toPhaserColor(this.region.map[s[0]][s[1]].color);
                this.tileElements[s[0]][s[1]].rect.fillColor = Common.colorLerp(clr, Phaser.Display.Color.GetColor(255, 0, 255), lerp);
            }
        }

        // console.log([this.hoveredTile, this.lastTileHotkeyed]);
        if (this.upgradeKey.isDown && this.hoveredTile[0] !== -1 &&
            (this.lastTileHotkeyed[0] != this.hoveredTile[0] || this.lastTileHotkeyed[1] != this.hoveredTile[1])) {
            this._tileActionHandler("upgrade", { tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]] });
            this.lastTileHotkeyed = this.hoveredTile;
        } else if (this.upgradeKey.isDown === false) {
            this.lastTileHotkeyed = [-1, -1];
        }
        if (Phaser.Input.Keyboard.JustUp(this.exploreKey) && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("explore", { tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]] });
        } else if (this.houseKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('house')
            });
        } else if (this.roadKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('road')
            });
        } else if (this.productionKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName(RegionRegistry.TILE_TYPES[this.region.map[this.hoveredTile[1]][this.hoveredTile[0]].regName].preferredBuilding)
            });
        } else if (this.woodKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('wood')
            });
        } else if (this.leatherKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('leather')
            });
        } else if (this.metalKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('metal')
            });
        } else if (this.fiberKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('fiber')
            });
        } else if (this.stoneKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('stone')
            });
        } else if (this.crystalKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('crystal')
            });
        } else if (this.marketKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('market')
            });
        } else if (this.tavernKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('tavern')
            });
        } else if (this.warehouseKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('warehouse')
            });
        } else if (this.alchemyKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('alchemy')
            });
        } else if (this.docksKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('docks')
            });
        } else if (this.dojoKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('dojo')
            });
        } else if (this.garrisonKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('garrison')
            });
        } else if (this.watchtowerKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("build", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]],
                building: BuildingRegistry.getBuildingByName('watchtower')
            });
        } else if (this.destroyKey.isDown && this.hoveredTile[0] !== -1) {
            this._tileActionHandler("destroy", {
                tile: this.region.map[this.hoveredTile[1]][this.hoveredTile[0]]
            });
        }

        if (this.updateBuildings === true) {
            this.updateBuildings = false;
            for (var i = 0; i < this.region.roads.length; i++) {
                var road = this.region.roads[i];
                var texture = this._getBuildingImage(road[1], road[0]);
                // this can happen if the town isn't discovered yet and they build a building, skip the town road for now.
                if (this.tileElements[road[0]][road[1]].building !== undefined) {
                    this.tileElements[road[0]][road[1]].building.setTexture(texture.sprite, texture.tile);
                }
            }
        }

        if (this.activeTile !== undefined) {
            const tileName = this.letters[this.activeTile.y] + "" + (this.activeTile.x + 1) + " - " + this.activeTile.name;
            this.exploreProgressBar.setFillPercent(this.activeTile.amountExplored / this.activeTile.explorationNeeded, tileName)
        }
    }

    setVisible(visible) {
        for (var i = 0; i < this.detailsContainer.length; i++) {
            this.detailsContainer[i].setVisible(visible);
        }
        if (visible === true) {
            this.autoExploreLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
            this.autoExploreButton.setVisible(ProgressionStore.getInstance().persistentUnlocks.autoExplore);
            this.autoInvadeLabel.setVisible(MoonlightData.getInstance().challenges.invasion.completions > 0);
            this.autoInvadeButton.setVisible(MoonlightData.getInstance().challenges.invasion.completions > 0);
            this.autoUpgradeLabel.setVisible(MoonlightData.getInstance().challenges.outcast.completions > 0);
            this.autoUpgradeButton.setVisible(MoonlightData.getInstance().challenges.outcast.completions > 0);
        } else {
            this.autoExploreLabel.setVisible(false);
            this.autoExploreButton.setVisible(false);
            this.autoInvadeLabel.setVisible(false);
            this.autoInvadeButton.setVisible(false);
            this.autoUpgradeLabel.setVisible(false);
            this.autoUpgradeButton.setVisible(false);
        }

        for (var i = 0; i < this.tileElements.length; i++) {
            for (var t = 0; t < this.tileElements[0].length; t++) {
                this.tileElements[i][t].rect.setVisible(visible);
                if (this.tileElements[i][t].building !== undefined) {
                    this.tileElements[i][t].building.setVisible(visible);
                }
            }
        }
        for (var i = 0; i < this.guides.length; i++) {
            this.guides[i].setVisible(visible);
        }
    }
}