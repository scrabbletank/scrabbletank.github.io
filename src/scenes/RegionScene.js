import { SceneUIBase } from "./SceneUIBase";
import { Region } from "../data/Region";
import { FloatingTooltip } from "../ui/FloatingTooltip";
import { ProgressionStore } from "../data/ProgressionStore";
import { Statics } from "../data/Statics";
import { WorldData } from "../data/WorldData";
import { Common } from "../utils/Common";
import { TileSelectWindow } from "../ui/TileSelectWindow";
import { PlayerData } from "../data/PlayerData";
import { RebirthDialog } from "../ui/RebirthDialog";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "../ui/TextButton";


export class RegionScene extends SceneUIBase {

    constructor(position, name) {
        super(position, name);
        this.WIDTH = 40;
        this.HEIGHT = 40;
        this.tileClickHandlers = [];
        var worldData = new WorldData();
        this.region = worldData.getCurrentRegion();
        this.offsetX = 450 - this.region.width * this.WIDTH / 2;
        this.offsetY = 350 - this.region.height * this.HEIGHT / 2;

        this.progression = new ProgressionStore();
        this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
        this.sightingVal = 0;

        this.tileSelectWindow = undefined;
        this.rebirthDialog = undefined;

        this.autoExploreActive = false;
    }

    preload() {

    }

    registerEvent(name, callback) {
        if (name === 'onTileClick') {
            this.tileClickHandlers.push(callback);
        }
    }

    _handleProgressionEvent(type, __count, __text) {
        if (type === Statics.UNLOCK_BUILDING_UI) {
            this.invasionLabel.setVisible(true);
        }
    }

    _setupTile(x, y) {
        var clr = this.region.map[y][x].color;
        var rect = this.add.rectangle(this.relativeX((x + 0.5) * this.WIDTH + this.offsetX),
            this.relativeY((y + 0.5) * this.HEIGHT + this.offsetY), this.WIDTH - 1, this.HEIGHT - 1, clr);
        rect.strokeColor = this.region.map[y][x].borderColor;
        rect.isStroked = true;
        rect.lineWidth = 1.5;
        rect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { this._handleTileClick(x, y); })
            .on('pointerover', () => { this._setTooltip(x, y); })
            .on('pointerout', () => { this._disableTooltip() });
        // this.add.bitmapText(this.relativeX(x * this.WIDTH + 120), this.relativeY(y * this.HEIGHT + 70), "courier16", this.region.map[y][x].difficulty + "").setOrigin(0.5);
        return { rect: rect, building: undefined };
    }

    _setTooltip(x, y) {
        if (this.floatingText !== undefined) {
            this._disableTooltip();
        }
        var txt = "Tile " + this.letters[y] + (x + 1) + '\n';

        if (this.region.map[y][x].revealed === true) {
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

        var xAdj = this.relativeX(x * this.WIDTH + this.offsetX);
        xAdj += xAdj + 190 > 1100 ? -150 : 0;
        var yAdj = this.relativeY(y * this.HEIGHT + this.offsetY - 75);
        yAdj += yAdj < 100 ? 115 : 0;
        this.floatingText = new FloatingTooltip(this, txt, xAdj, yAdj, 190, 75);
    }
    _disableTooltip() {
        this.floatingText.destroy();
        this.floatingText = undefined;
    }

    _handleTileClick(x, y) {
        if (this.region.map[y][x].explored === false && this.region.map[y][x].revealed === false) {
            return;
        }
        if (this.region.map[y][x].name === "Town") {
            if (this.progression.unlocks.townTab === false) {
                this.region.map[y][x].amountExplored = this.region.map[y][x].explorationNeeded;
                this.region.exploreTile(x, y);
                this.progression.registerFeatureUnlocked(Statics.UNLOCK_TOWN_TAB,
                    "You've finally made it to the town you saw in the distance, the only square not covered in this " +
                    "horrible fog. As you approach the gate a voice calls to you from the wall.\n\n" +
                    "\"Oh hey, you must be the new hero we've heard about, give me a minute to open the gate.\"\n\n" +
                    "Hero? You woke up naked and alone in the wilderness. Come to think of it, it's amazing you're even " +
                    "still alive. You're still contemplating your existence when the door opens.\n\n" +
                    "\"So hero, you don't mind if I call you hero do you? Just makes things easier. Anyway we have a house " +
                    "laid out for you, don't expect much. The Forge has seen better days and the guilds have all been abandoned " +
                    "but I'm sure you'll see to that, Mr. Hero.\"\n\nYou begin to ask what all this hero nonsense is about " +
                    "when they speak up again.\n\n \"Oh that reminds me, we don't have much, but we can pay you for every one " +
                    "of those monsters you kill. Don't try to lie about how many you've beat, we can tell. Oh, and we'll pay " +
                    "you more when you're clearing new land for us. What were you trying to ask?\"\n\nYou say it was nothing " +
                    "and ask them to lead the way. You don't know about this hero stuff, but money is money. Besides you were " +
                    "already fighting this monsters anyway, might as well make money while you do it.");
                this._updateColors();
            }
            return;
        }
        if (this.region.map[y][x].name === "Mystic Gate" && this.region.map[y][x].explored === true) {
            this.rebirthDialog = new RebirthDialog(this, this.relativeX(250), this.relativeY(215), this.region.difficultyRange[1])
                .onRebirthHandler(() => { this._rebirthClickedHandler(); })
                .onLeaveHandler(() => { this._leaveClickedHandler(); });
            return;
        }
        if (this.tileSelectWindow !== undefined) {
            this.tileSelectWindow.destroy();
            this.tileSelectWindow = undefined;
        }

        this.tileSelectWindow = new TileSelectWindow(this, this.relativeX(200), this.relativeY(200), this.region.map[y][x]);
        this.tileSelectWindow.addOnActionHandler((action, blob) => { this._tileActionHandler(action, blob); });
    }

    _tileActionHandler(action, blob) {
        switch (action) {
            case "explore":
                this._exploreTile(blob.tile.x, blob.tile.y, false);
                break;
            case "build":
                var player = new PlayerData();
                var tier = Math.floor(this.region.difficultyRange[0] / 20);
                if (Common.canCraft(blob.building.resourceCosts, player.resources[tier]) === true &&
                    blob.building.goldCost <= player.gold) {
                    player.spendResource(blob.building.resourceCosts, tier);
                    player.addGold(-blob.building.goldCost);
                    this.region.placeBuilding(blob.tile.x, blob.tile.y, blob.building);
                    blob.tile.building = blob.building;
                    this._updateBuildings();
                    this.scene.get("TownScene")._updateStatus();
                }
                break;
            case "upgrade":
                var player = new PlayerData();
                var tier = Math.floor(this.region.difficultyRange[0] / 20);
                if (Common.canCraft(blob.tile.building.resourceCosts, player.resources[tier]) === true &&
                    blob.tile.building.goldCost <= player.gold) {
                    player.spendResource(blob.tile.building.resourceCosts, tier);
                    player.addGold(-blob.tile.building.goldCost);
                    this.region.upgradeBuilding(blob.tile.x, blob.tile.y);
                    this.tileElements[blob.tile.y][blob.tile.x].building.setTexture(blob.tile.building.texture.sprite,
                        blob.tile.building.texture.tile + 8 * (blob.tile.building.tier - 1));
                    this.scene.get("TownScene")._updateStatus();
                }
                break;
        }
        this.tileSelectWindow.destroy();
        this.tileSelectWindow = undefined;
    }
    _rebirthClickedHandler() {
        this.rebirthDialog.destroy();
        this.rebirthDialog = undefined;

        var player = new PlayerData();
        var moonData = new MoonlightData();
        var moonlightEarned = player.earnableMoonlight(Math.floor(this.region.difficultyRange[1] / 20));

        moonData.moonlight += moonlightEarned;

        var moonScene = this.scene.get("MoonlightScene");
        moonScene._onMoonlightChanged();
        this.scene.bringToTop("MoonlightScene");
    }
    _leaveClickedHandler() {
        this.rebirthDialog.destroy();
        this.rebirthDialog = undefined;
    }

    _exploreTile(x, y, fromAutoExplore) {
        if (this.progression.unlocks.combatTab === false) {
            this.progression.registerFeatureUnlocked(Statics.UNLOCK_COMBAT_TAB,
                "Well this isn't so bad, walking aimlessly through this fog covered wilderness.\n" +
                "I wonder if I'll meet a new friend.\n");
        }
        for (var i = 0; i < this.tileClickHandlers.length; i++) {
            this.tileClickHandlers[i](x, y, fromAutoExplore);
        }
        this._updateColors();
    }

    _onExploredCallback(tile) {
        if (tile.y === 0) {
            //setup new world types
            if (this.progression.unlocks.worldTab === false) {
                this.progression.registerFeatureUnlocked(Statics.UNLOCK_WORLD_TAB,
                    "You did it, you've reached the edge of the world. This is all there is...\n\n" +
                    "Oh wait, it looks like there's a trail over there leading to a new region! there's " +
                    "a whole world out there. I was wondering what that last tab was going to be.");
            }

            if (WorldData.instance.regionList.length - 1 === WorldData.instance.currentRegion &&
                WorldData.instance.nextRegions.length === 0) {
                WorldData.instance.generateRegionChoices();
                this.scene.get("WorldScene")._refreshRegions();
            }
        }
        if (tile.explored === false) {
            this.region.exploreTile(tile.x, tile.y);
            this._updateColors();
            this.progression.registerTileExplored();

            if (this.autoExploreActive === true) {
                var pos = this.region.nextWeakestTile();
                if (pos[0] !== -1) {
                    this._exploreTile(pos[0], pos[1], true);
                }
            }
        }
    }

    _updateColors() {
        for (var i = 0; i < this.region.height; i++) {
            for (var t = 0; t < this.region.width; t++) {
                var clr = this.region.map[i][t].color;
                var border = this.region.map[i][t].borderColor;
                if (this.region.map[i][t].revealed === false) {
                    clr = Phaser.Display.Color.GetColor(0, 0, 0);
                    border = Phaser.Display.Color.GetColor(40, 80, 40);
                } else if (this.region.map[i][t].explored === false && this.region.map[i][t].revealed === true) {
                    clr = Common.colorLerp(clr, Phaser.Display.Color.GetColor(0, 0, 0), 0.65);
                }
                this.tileElements[i][t].rect.fillColor = clr;
                this.tileElements[i][t].rect.strokeColor = border;
            }
        }
    }
    _updateBuildings() {
        for (var i = 0; i < this.region.height; i++) {
            for (var t = 0; t < this.region.width; t++) {
                var bld = this.region.map[i][t].building;
                if (this.tileElements[i][t].building === undefined && bld !== undefined) {

                    this.tileElements[i][t].building = this.add.image(this.relativeX(t * this.WIDTH + this.offsetX + 20),
                        this.relativeY(i * this.HEIGHT + this.offsetY + 20), bld.texture.sprite,
                        bld.texture.tile + 8 * (bld.tier - 1)).setOrigin(0.5);
                } else if (this.tileElements[i][t].building !== undefined && bld === undefined) {
                    this.tileElements[i][t].building.destroy();
                    this.tileElements[i][t].building = undefined;
                }
            }
        }
    }

    changeRegion() {
        this.rebirth();
    }

    rebirth() {
        var worldData = new WorldData();
        this.region = worldData.getCurrentRegion();
        for (var i = 0; i < this.region.height; i++) {
            for (var t = 0; t < this.region.width; t++) {
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
        this._updateColors();
        var invasionPercent = this.region.invasionCounter / Statics.INVASION_THRESHOLD;
        this.invasionLabel.setText("Invasion\n" + Math.floor(invasionPercent * 100) + "%");
        this.invasionLabel.setVisible(this.progression.unlocks.buildings);
        this.autoExploreLabel.setVisible(this.progression.persistentUnlocks.autoExplore);
        this.autoExploreButton.setVisible(this.progression.persistentUnlocks.autoExplore);
    }

    _toggleAutoExplore() {
        this.autoExploreActive = !this.autoExploreActive;
        if (this.autoExploreActive === true) {
            this.autoExploreButton.setText("ON");
            this.autoExploreButton.setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
        } else {
            this.autoExploreButton.setText("OFF");
            this.autoExploreButton.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));
        }
    }

    create() {
        //add handlers
        this.scene.get("CombatScene").registerEvent("onExplore", (a) => { this._onExploredCallback(a); });
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.invasionLabel = this.add.bitmapText(this.relativeX(740), this.relativeY(90), "courier20", "Invasion", 20, 1);
        this.invasionLabel.setVisible(this.progression.unlocks.buildings);
        var invasionPercent = this.region.invasionCounter / Statics.INVASION_THRESHOLD;
        this.invasionLabel.setTint(Phaser.Display.Color.GetColor(40 + invasionPercent * 215, 40 + invasionPercent * 215, 40 + invasionPercent * 215));

        this.autoExploreLabel = this.add.bitmapText(this.relativeX(700), this.relativeY(130), "courier20", "Auto Explore:");
        this.autoExploreButton = new TextButton(this, this.relativeX(835), this.relativeY(130), 40, 20, "OFF")
            .onClickHandler(() => { this._toggleAutoExplore() });
        this.autoExploreButton.setTextColor(Phaser.Display.Color.GetColor(175, 0, 140));

        this.autoExploreLabel.setVisible(this.progression.persistentUnlocks.autoExplore);
        this.autoExploreButton.setVisible(this.progression.persistentUnlocks.autoExplore);

        this.floatingText = undefined;

        this.tileElements = [];
        for (var i = 0; i < this.region.height; i++) {
            var row = []
            for (var t = 0; t < this.region.width; t++) {
                row.push(this._setupTile(t, i));
            }
            this.tileElements.push(row);
        }
        // X/Y GUIDES
        for (var i = 0; i < this.region.height; i++) {
            this.add.bitmapText(this.relativeX(this.offsetX - 20), this.relativeY(this.offsetY + 20 + (i * 40)), "courier20", this.letters[i]).setOrigin(0.5);
        }
        for (var i = 0; i < this.region.width; i++) {
            this.add.bitmapText(this.relativeX(this.offsetX + 20 + (i * 40)), this.relativeY(this.offsetY - 20), "courier20", "" + (i + 1)).setOrigin(0.5);
        }
        this._updateColors();
        this._updateBuildings();


        this.progression.addOnUnlockHandler((a, b, c) => { this._handleProgressionEvent(a, b, c) });
    }

    update(__time, delta) {
        if (this.region.sightings.length > 0) {
            var invasionPercent = this.region.invasionCounter / Statics.INVASION_THRESHOLD;
            this.invasionLabel.setText("Invasion\n" + Math.floor(invasionPercent * 100) + "%");
            this.invasionLabel.setTint(Phaser.Display.Color.GetColor(40 + invasionPercent * 215, 40 + invasionPercent * 215, 40 + invasionPercent * 215));
            this.sightingVal = (this.sightingVal + delta) % 2000;
            var lerp = Math.sin((this.sightingVal / 2000) * Math.PI * 2) * 0.5 + 0.5;
            for (var i = 0; i < this.region.sightings.length; i++) {
                var s = this.region.sightings[i];
                if (this.region.map[s[0]][s[1]].isInvaded === true && this.region.map[s[0]][s[1]].invasionPower >= Statics.SIGHTING_THRESHOLD) {
                    this.tileElements[s[0]][s[1]].rect.strokeColor = Common.colorLerp(this.region.map[s[0]][s[1]].borderColor, Phaser.Display.Color.GetColor(255, 0, 255), lerp);
                }
            }
        }
    }
}