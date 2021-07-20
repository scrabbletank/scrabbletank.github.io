// main scene for game window

import { RegionScene } from "./RegionScene";
import { CombatScene } from "./CombatScene";
import { SceneUIBase } from "./SceneUIBase";
import { ProgressBar } from "../ui/ProgressBar";
import { PlayerData } from "../data/PlayerData";
import { TextButton } from "../ui/TextButton";
import { LoreScene } from "./LoreScene";
import { TownScene } from "./TownScene";
import { GearScene } from "./GearScene";
import { ProgressionStore } from "../data/ProgressionStore";
import { Statics } from "../data/Statics";
import { GearData } from "../data/GearData";
import { TalentScene } from "./TalentScene";
import { WorldData } from "../data/WorldData";
import { TooltipImage } from "../ui/TooltipImage";
import { MoonlightScene } from "./MoonlightScene";
import { MoonlightData } from "../data/MoonlightData";
import { LoreStore } from "../data/LoreStore";
import { WorldScene } from "./WorldScene";
import { Common } from "../utils/Common";
import { ImageButton } from "../ui/ImageButton";
import { DynamicSettings } from "../data/DynamicSettings";
import LZString from "lz-string";
import { OptionsDialog } from "../ui/OptionsDialog";
import { GuideWindow } from "../ui/GuideWindow";
import { WorldTime } from "../data/WorldTime";
import { FadingNumberLabel } from "../ui/FadingNumberLabel";
import { StarData } from "../data/StarData";
import { MyrahScene } from "./MyrahScene";
import { RitualView } from "./RitualView";
import { RitualData } from "../data/RitualData";

export class GameScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        //initialize data
        // DYNAMIC SETTINGS SHOULD BE FIRST ALWAYS
        this.settings = new DynamicSettings();
        this.moonlight = new MoonlightData();
        this.starData = new StarData();
        this.worldData = new WorldData();
        this.player = new PlayerData();
        this.progression = new ProgressionStore();
        this.gearShowTimer = 2000;
        this.infuseStart = 0;
        this.gearStart = 0;
        this.detailsStart = 0;
        this.resourceStart = 0;
        this.resourceTierSelected = 0;
        this.saveTimer = Statics.AUTOSAVE_TIMER;
        this.buyAmount = 1;
        this.talentCost = 0;
        this.statCost = 0;
        this.lastFrame = 0;
        this.showTimeThisRun = false;

        //try loading save data if it exists
        this.loadGame();
    }

    preload() {
        this.load.bitmapFont("courier16", "./../../assets/font/anonpro16.png", "./../../assets/font/anonpro16.xml");
        this.load.bitmapFont("courier20", "./../../assets/font/anonpro20.png", "./../../assets/font/anonpro20.xml");
        this.load.spritesheet("icons", "./../../assets/icons/icons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("icons2", "./../../assets/icons/icons2.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("talenticons", "./../../assets/icons/talenticons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("bldicons", "./../../assets/icons/buildingicons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("roadicons", "./../../assets/icons/roadicons.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet("moonicons", "./../../assets/icons/moonicons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("runeicons", "./../../assets/icons/runeicons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("enemyicons", "./../../assets/enemy/enemyicons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("staricons", "./../../assets/icons/staricons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("title", "./../../assets/title.png");
    }

    create() {
        //base UI
        this.add.bitmapText(10, 10, "courier20", "Stats");
        this.add.rectangle(0, 0, 200, 800, 0x000000)
            .setOrigin(0)
            .setInteractive();
        this.add.rectangle(200, 0, 900, 100, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.statLabels = [];
        this.statIcons = [];
        this.statIncButtons = [];
        this.statIcons.push(new TooltipImage(this, 20, 20, 16, 16, { sprite: "icons", tile: 0 }, this.player.strTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 40, 16, 16, { sprite: "icons", tile: 1 }, this.player.dexTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 60, 16, 16, { sprite: "icons", tile: 2 }, this.player.agiTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 80, 16, 16, { sprite: "icons", tile: 3 }, this.player.endTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 100, 16, 16, { sprite: "icons", tile: 4 }, this.player.recTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 120, 16, 16, { sprite: "icons", tile: 5 }, this.player.defTooltip()));
        this.statIcons.push(new TooltipImage(this, 20, 140, 16, 16, { sprite: "icons", tile: 6 }, this.player.accTooltip()));

        this.statIncButtons.push(new TextButton(this, 150, 20, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('str'); }));
        this.statIncButtons.push(new TextButton(this, 150, 40, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('dex'); }));
        this.statIncButtons.push(new TextButton(this, 150, 60, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('agi'); }));
        this.statIncButtons.push(new TextButton(this, 150, 80, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('end'); }));
        this.statIncButtons.push(new TextButton(this, 150, 100, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('rec'); }));
        this.statIncButtons.push(new TextButton(this, 150, 120, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('def'); }));
        this.statIncButtons.push(new TextButton(this, 150, 140, 16, 16, '+')
            .onClickHandler(() => { this._increaseStat('acc'); }));

        this.detailsLabels = [];
        this.detailsIcons = [];
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 25 },
            "Health, when this runs out you die."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 24 },
            "The damage you deal with each attack. Your damage is reduced by the targets armor, dealing a minimum of 1 damage."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 26 },
            "Armor. Each point reduces damage from enemy attacks by 1."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 27 },
            "Hit Chance. Hit increases your attack speed, while enemy Evasion lowers your attack speed."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 28 },
            "Evasion. Slows enemy attack speed if you have more Evasion then their Hit."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 29 },
            "Health Regen. You restore this much Health every second. Works in combat."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 31 },
            "Crit Chance. The chance any hit is a critical hit, dealing extra damage."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 30 },
            "Crit Power. Increases your crit damage, but is reduced by the targets Crit Resistance."));
        this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 48 },
            "Crit Resistance. Reduces the damage taken by critical hits."));

        this.gearLabels = this.add.bitmapText(20, 30, "courier16", "").setOrigin(0);

        this.resourceLabels = [];
        this.resourceTierButtons = [];
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "1")
            .onClickHandler(() => { this.resourceTierSelected = 0; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "2")
            .onClickHandler(() => { this.resourceTierSelected = 1; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "3")
            .onClickHandler(() => { this.resourceTierSelected = 2; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "4")
            .onClickHandler(() => { this.resourceTierSelected = 3; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "5")
            .onClickHandler(() => { this.resourceTierSelected = 4; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "6")
            .onClickHandler(() => { this.resourceTierSelected = 5; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "7")
            .onClickHandler(() => { this.resourceTierSelected = 6; this._updateResources(); }));
        this.resourceTierButtons.push(new TextButton(this, 20, 170, 16, 16, "8")
            .onClickHandler(() => { this.resourceTierSelected = 7; this._updateResources(); }));
        this.resourceIcons = [];
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 32 },
            "Wood. Found in forests and wodes, duh."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 33 },
            "Leather. The best leather comes from the plains and forests."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 34 },
            "Metal. Hard to find resource thats available in large quantities in the mountains."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 35 },
            "Fiber. Found in swamps and forests."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 36 },
            "Stone. Can be found in abundance in the hills."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 37 },
            "Crystal. Hard to find in large amounts, but can be found in the harder to reach areas."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 38 },
            "Gold. Your current gold cap is equal to (Flat bonuses + population) * Economy Multiplier."));
        this.resourceIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 39 },
            "Motes of Darkness. Fuse these onto weapons to improve their power."));
        this.resourceIncLabels = [];
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));
        this.resourceIncLabels.push(new FadingNumberLabel(this, 100, 170, 1200, Phaser.Display.Color.GetColor(80, 200, 80), "courier16", 16));


        this.buyButtons = [];
        this.buyButtons.push(new TextButton(this, 10, 780, 30, 18, "x1")
            .onClickHandler(() => { this._setBuyAmount(1, 0); })
            .setTextColor(Phaser.Display.Color.GetColor(255, 255, 0)));
        this.buyButtons.push(new TextButton(this, 45, 780, 30, 18, "x10")
            .onClickHandler(() => { this._setBuyAmount(10, 1); }));
        this.buyButtons.push(new TextButton(this, 80, 780, 40, 18, "x100")
            .onClickHandler(() => { this._setBuyAmount(100, 2); }));
        this.buyButtons.push(new TextButton(this, 125, 780, 40, 18, "x1K")
            .onClickHandler(() => { this._setBuyAmount(1000, 3); }));

        this.infuseLabel = this.add.bitmapText(10, 10, "courier20", "Infuse");
        this.shadeLabel = this.add.bitmapText(20, 10, "courier16", "Shade: " + this.player.shade);
        this.statInfuseLabel = this.add.bitmapText(20, 10, "courier16", "Infuse Stat");
        this.statProgressBar = new ProgressBar(this, 100, 10, 120, 14, Phaser.Display.Color.GetColor(0, 0, 255), Phaser.Display.Color.GetColor(0, 32, 0));
        this.statInfuseButton = new TextButton(this, 250, 10, 16, 16, '+');
        this.statInfuseButton.onClickHandler(() => { this._buyStatPoint(); });
        this.talentInfuseLabel = this.add.bitmapText(20, 10, "courier16", "Infuse Talent");
        this.talentProgressBar = new ProgressBar(this, 100, 10, 120, 14, Phaser.Display.Color.GetColor(0, 0, 255), Phaser.Display.Color.GetColor(0, 32, 0));
        this.talentInfuseButton = new TextButton(this, 250, 10, 16, 16, '+');
        this.talentInfuseButton.onClickHandler(() => { this._buyTalentPoint(); });

        this.gearLabel = this.add.bitmapText(10, 10, "courier20", "Gear");
        this.detailsLabel = this.add.bitmapText(10, 10, "courier20", "Details");
        this.resourceLabel = this.add.bitmapText(10, 10, "courier20", "Resources");

        this.progression.addOnUnlockHandler((a, b, c) => { this._handleProgressionEvents(a, b, c) });

        this.titleImage = this.add.image(650, 25, "title");
        // header buttons
        this.loreButton = new TextButton(this, 200, 60, 122, 20, "Lore")
            .onClickHandler(() => { this.scene.bringToTop("LoreScene"); this.scene.bringToTop("DarkWorld"); });
        this.gearButton = new TextButton(this, 327, 60, 122, 20, "Gear")
            .onClickHandler(() => { this.scene.bringToTop("GearScene"); this.scene.bringToTop("DarkWorld"); });
        this.talentButton = new TextButton(this, 454, 60, 122, 20, "Talents")
            .onClickHandler(() => { this.scene.bringToTop("TalentScene"); this.scene.bringToTop("DarkWorld"); });
        this.regionButton = new TextButton(this, 581, 60, 122, 20, "Region")
            .onClickHandler(() => { this.scene.bringToTop("RegionScene"); this.scene.bringToTop("DarkWorld"); });
        this.combatButton = new TextButton(this, 708, 60, 122, 20, "Combat")
            .onClickHandler(() => { this.scene.bringToTop("CombatScene"); this.scene.bringToTop("DarkWorld"); });
        this.townButton = new TextButton(this, 835, 60, 122, 20, "Town")
            .onClickHandler(() => { this.scene.bringToTop("TownScene"); this.scene.bringToTop("DarkWorld"); });
        this.worldButton = new TextButton(this, 962, 60, 122, 20, "World")
            .onClickHandler(() => { this.scene.bringToTop("WorldScene"); this.scene.bringToTop("DarkWorld"); });
        this.worldTimeBacking = this.add.rectangle(500, 81, 300, 19, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive()
            .on("pointerover", () => { this.showTimeThisRun = true; })
            .on("pointerout", () => { this.showTimeThisRun = false; });
        this.worldTimeLabel = this.add.bitmapText(650, 80, "courier20", "").setOrigin(0.5, 0);
        this.moonlightButton = new ImageButton(this, 965, 12, 32, 32, { sprite: "moonicons", tile: 12 })
            .onClickHandler(() => { this.scene.bringToTop("MoonlightScene"); });

        this.exportDialog = undefined;
        this.guideWindow = undefined;
        this.optionsButton = new ImageButton(this, 1005, 12, 32, 32, { sprite: "icons", tile: 55 })
            .onClickHandler(() => { this._openExportDialog(); });
        this.guideButton = new ImageButton(this, 1045, 12, 32, 32, { sprite: "icons", tile: 54 })
            .onClickHandler(() => { this._openGuideWindow(); });

        this.gearButton.setVisible(this.progression.unlocks.gearTab);
        this.regionButton.setVisible(this.progression.unlocks.exploreTab);
        this.combatButton.setVisible(this.progression.unlocks.combatTab);
        this.townButton.setVisible(WorldData.instance.getCurrentRegion().townData.townExplored);
        if (DynamicSettings.getInstance().talentsEnabled === true) {
            this.talentButton.setVisible(this.progression.unlocks.talentsTab);
        } else {
            this.talentButton.setVisible(false);
        }
        this.worldButton.setVisible(this.progression.unlocks.worldTab);
        this.moonlightButton.setVisible(this.progression.totalCounts.timesGated > 0);

        this.registry.set('setTooltip', (x, y, w, h, txt) => { this._setTooltip(x, y, w, h, txt); });
        this.registry.set('disableTooltip', () => { this._disableTooltip(); });

        this.regionScene = new RegionScene([200, 100], "RegionScene");
        this.regionScene.registerEvent("onTileClick", (t, ae) => { this._handleTileClick(t, ae); });

        this.combatScene = new CombatScene([200, 100], "CombatScene");
        this.combatScene.registerEvent("onReward", (a) => { this._onRewardCallback(a); });

        this.loreScene = new LoreScene([200, 100], "LoreScene");
        this.gearScene = new GearScene([200, 100], "GearScene");
        this.townScene = new TownScene([200, 100], "TownScene");
        this.talentScene = new TalentScene([200, 100], "TalentScene");
        this.worldScene = new WorldScene([200, 100], "WorldScene");
        this.moonlightScene = new MoonlightScene([0, 0], "MoonlightScene");
        this.myrahScene = new MyrahScene([0, 0], "MyrahScene");

        this.scene.add("CombatScene", this.combatScene, true);
        this.scene.add("RegionScene", this.regionScene, true);
        this.scene.add("LoreScene", this.loreScene, true);
        this.scene.add("GearScene", this.gearScene, true);
        this.scene.add("TownScene", this.townScene, true);
        this.scene.add("TalentScene", this.talentScene, true);
        this.scene.add("WorldScene", this.worldScene, true);
        this.scene.add("MoonlightScene", this.moonlightScene, true);
        this.scene.add("MyrahScene", this.myrahScene, true);

        this.scene.bringToTop("LoreScene");
        this.scene.bringToTop("DarkWorld");

        this.player.statBlock.registerEvent("onHealthChanged", () => { this._updateDetails(); });
        this.player.registerEvent("onStatChanged", () => {
            this._layoutStats();
            this.updateStatIcons();
        });
        this.player.registerEvent("onResourcesChanged", (res, gold, tier) => {
            this._updateShade();
            this._updateResources();
            this._updateFadingResourceLabels(res, gold, tier);
        });
        this.player.registerEvent("onTalentChanged", () => {
            this.updateStatIcons();
        });
        this.player.registerEvent("onClassSelected", () => { this._handleClassSelected(); });

        if (this.progression.unlocks.gearTab === false) {
            this.loreScene.addText("You open your eyes and see a vast wilderness before you. " +
                "Unsure of how you got here you check your surroundings for any clues. You find " +
                "a broken sword, an old barrel lid and some worn, raggy leathers. Not great, but " +
                "you're also naked so you take what you can get.\n\n" +
                "After putting these on you should go exploring.");
        }
        // our class is set during load, however by that point we have no UI and haven't hooked up events, so
        // we make sure we handle class specific UI here.
        this._handleClassSelected();
        this._layoutStats();
        this._setBuyAmount(1, 0);
    }

    _setBuyAmount(amount, idx) {
        this.buyAmount = amount;
        this._updateInfuseCosts();
        for (var i = 0; i < this.buyButtons.length; i++) {
            this.buyButtons[i].setTextColor(Phaser.Display.Color.GetColor(255, 255, 255));
        }
        this.buyButtons[idx].setTextColor(Phaser.Display.Color.GetColor(255, 255, 0));
    }

    _updateInfuseCosts() {
        this.statCost = this.player.getStatCost(this.buyAmount);
        this.talentCost = this.player.getTalentCost(this.buyAmount);
        this.statProgressBar.setFillPercent(this.player.shade / this.statCost,
            Common.numberString(Math.floor(Math.min(this.player.shade, this.statCost))) + '/' + Common.numberString(this.statCost));
        this.talentProgressBar.setFillPercent(this.player.shade / this.talentCost,
            Common.numberString(Math.floor(Math.min(this.player.shade, this.talentCost))) + '/' + Common.numberString(Math.floor(this.talentCost)));
        this.statInfuseButton.setEnable(this.player.shade >= this.statCost);
        this.talentInfuseButton.setEnable(this.player.shade >= this.talentCost);
    }

    notifyGear() {
        this.gearButton.setNotification();
    }
    notifyRegion() {
        this.regionButton.setNotification();
    }

    updateStatIcons() {
        this.statIcons[0].setTooltip(this.player.strTooltip());
        this.statIcons[1].setTooltip(this.player.dexTooltip());
        this.statIcons[2].setTooltip(this.player.agiTooltip());
        this.statIcons[3].setTooltip(this.player.endTooltip());
        this.statIcons[4].setTooltip(this.player.recTooltip());
        this.statIcons[5].setTooltip(this.player.defTooltip());
        this.statIcons[6].setTooltip(this.player.accTooltip());
        this.detailsIcons[6].setTooltip(this.player.critTooltip());
        this.detailsIcons[7].setTooltip(this.player.critPowerTooltip());
    }

    _handleClassSelected() {
        if (this.player.playerClass === Statics.CLASS_WIZARD) {
            this.statIcons[5].setImage({ sprite: "icons", tile: 62 });
            this.statIcons[6].setImage({ sprite: "icons", tile: 63 });
        }
        this.updateStatIcons();
    }

    _handleProgressionEvents(type, count, text) {
        if (text !== undefined && text !== "") {
            this.loreButton.setNotification();
        }
        switch (type) {
            case Statics.UNLOCK_GEAR_TAB:
                this.gearButton.setVisible(true);
                break;
            case Statics.UNLOCK_EXPLORE_TAB:
                this.regionButton.setVisible(true);
                break;
            case Statics.UNLOCK_COMBAT_TAB:
                this.combatButton.setVisible(true);
                break;
            case Statics.UNLOCK_TOWN_TAB:
                this.townButton.setVisible(true);
                this._updateResources();
                break;
            case Statics.UNLOCK_TALENTS_TAB:
                if (DynamicSettings.getInstance().talentsEnabled === true) {
                    this.talentButton.setVisible(true);
                }
                break;
            case Statics.UNLOCK_WORLD_TAB:
                this.worldButton.setVisible(true);
                break;
            case Statics.UNLOCK_INFUSE_UI:
            case Statics.UNLOCK_RESOURCE_UI:
                this._layoutStats();
                break;
            case Statics.UNLOCK_SHADE:
                if (count === 50) {
                    this.progression.registerFeatureUnlocked(Statics.UNLOCK_INFUSE_UI);
                }
                break;
            case Statics.UNLOCK_EXPLORE:
                if (count === 5) {
                    this.progression.registerFeatureUnlocked(Statics.UNLOCK_BUILDING_UI);
                }
                break;
            case Statics.UNLOCK_RESOURCE:
                if (count === 25) {
                    this.progression.registerFeatureUnlocked(Statics.UNLOCK_RESOURCE_UI);
                }
                else if (count === 100) {
                    var gearData = new GearData();
                    gearData.tiersAvailable = 1;
                    this.progression.registerFeatureUnlocked(Statics.UNLOCK_CRAFTING_UI);
                }
                break;
            case Statics.UNLOCK_MOTES_UI:
                this._updateResources();
                break;
            default:
                this.worldButton.setVisible(ProgressionStore.getInstance().unlocks.worldTab === true ||
                    ProgressionStore.getInstance().persistentUnlocks.rituals === true);
                this.worldScene.refreshButtons();
                break;
        }
    }

    _updateStats() {
        for (var i = 0; i < this.statLabels.length; i++) {
            this.statLabels[i].destroy();
        }
        this.statLabels = [];
        this.statLabels.push(this.add.bitmapText(20, 0, "courier16", "Stat Points: " + this.player.statPoints));
        this.statLabels.push(this.add.bitmapText(40, 20, "courier16", Common.numberString(this.player.statBlock.Strength())));
        this.statLabels.push(this.add.bitmapText(40, 40, "courier16", Common.numberString(this.player.statBlock.Dexterity())));
        this.statLabels.push(this.add.bitmapText(40, 60, "courier16", Common.numberString(this.player.statBlock.Agility())));
        this.statLabels.push(this.add.bitmapText(40, 80, "courier16", Common.numberString(this.player.statBlock.Endurance())));
        this.statLabels.push(this.add.bitmapText(40, 100, "courier16", Common.numberString(this.player.statBlock.Recovery())));
        this.statLabels.push(this.add.bitmapText(40, 120, "courier16", Common.numberString(this.player.statBlock.Defense())));
        this.statLabels.push(this.add.bitmapText(40, 140, "courier16", Common.numberString(this.player.statBlock.Accuracy())));

        this._updateStatButtons();
    }

    _updateShade() {
        this.infuseLabel.setPosition(10, this.infuseStart);
        this.shadeLabel.setPosition(20, this.infuseStart + 20);
        this.statInfuseLabel.setPosition(20, this.infuseStart + 40);
        this.statProgressBar.setPosition(20, this.infuseStart + 60);
        this.statInfuseButton.setPosition(150, this.infuseStart + 60);
        this.talentInfuseLabel.setPosition(20, this.infuseStart + 80);
        this.talentProgressBar.setPosition(20, this.infuseStart + 100);
        this.talentInfuseButton.setPosition(150, this.infuseStart + 100);

        this.shadeLabel.setText("Shade: " + Common.numberString(Math.floor(this.player.shade)));
        this.statProgressBar.setFillPercent(this.player.shade / this.statCost,
            Common.numberString(Math.floor(Math.min(this.player.shade, this.statCost))) + '/' + Common.numberString(this.statCost));
        this.talentProgressBar.setFillPercent(this.player.shade / this.talentCost,
            Common.numberString(Math.floor(Math.min(this.player.shade, this.talentCost))) + '/' + Common.numberString(Math.floor(this.talentCost)));
        this.statInfuseButton.setEnable(this.player.shade >= this.statCost);
        this.talentInfuseButton.setEnable(this.player.shade >= this.talentCost);
    }

    _updateGear() {
        var text = "" +
            Common.processText(this.player.weapon === undefined ? "None" : this.player.weapon.name + " Lv" + this.player.weapon.level, 20) + "\n" +
            Common.processText(this.player.armor === undefined ? "None" : this.player.armor.name + " Lv" + this.player.armor.level, 20) + "\n" +
            Common.processText(this.player.trinket === undefined ? "None" : this.player.trinket.name + " Lv" + this.player.trinket.level, 20);

        this.gearLabels.setText(text);
    }

    _updateDetails() {
        this.detailsLabel.setPosition(10, this.detailsStart);

        for (var i = 0; i < this.detailsLabels.length; i++) {
            this.detailsLabels[i].destroy();
        }
        this.detailsLabels = [];
        for (var i = 0; i < this.detailsIcons.length; i++) {
            this.detailsIcons[i].setPosition(20, this.detailsStart + 20 + (i * 20));
        }
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 20, "courier16",
            Common.numberString(Math.floor(this.player.statBlock.currentHealth)) + '/' + Common.numberString(this.player.statBlock.MaxHealth())));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 40, "courier16",
            Common.numberString(this.player.statBlock.DamageMin()) + '-' + Common.numberString(this.player.statBlock.DamageMax())));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 60, "courier16", Common.numberString(this.player.statBlock.Armor())));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 80, "courier16", Common.numberString(this.player.statBlock.Hit())));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 100, "courier16", Common.numberString(this.player.statBlock.Evasion())));
        var txt = this.player.statBlock.HealthRegen() > 100 ? Common.numberString(Math.floor(this.player.statBlock.HealthRegen())) : this.player.statBlock.HealthRegen() + "";
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 120, "courier16", txt + "/s"));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 140, "courier16",
            Math.floor(this.player.statBlock.CritChance() * 100) + "%"));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 160, "courier16",
            Common.numberString(this.player.statBlock.CritPower()) + ""));
        this.detailsLabels.push(this.add.bitmapText(40, this.detailsStart + 180, "courier16",
            Common.numberString(this.player.statBlock.CritResistance()) + ""));
    }

    _updateFadingResourceLabels(res, gold, tier) {
        if (this.progression.unlocks.resourceUI === false) {
            return;
        }
        if (tier === this.resourceTierSelected) {
            for (var i = 0; i < res.length; i++) {
                if (res[i] > 0) {
                    this.resourceIncLabels[i].setValue(Math.floor(res[i]));
                }
            }
        }
        // For now don't show gold, it doesn't fit well with even base gold values
        // if (gold > 0 && this.progression.unlocks.townTab === true) {
        //     this.resourceIncLabels[6].setValue(Math.floor(gold));
        // }
    }

    _updateResources() {
        this.resourceLabel.setPosition(10, this.resourceStart);
        this.resourceLabel.setVisible(this.progression.unlocks.resourceUI);
        this.resourceTierSelected = Math.max(this.resourceTierSelected, DynamicSettings.getInstance().minResourceTier);

        for (var i = 0; i < this.resourceLabels.length; i++) {
            this.resourceLabels[i].destroy();
        }
        this.resourceLabels = [];
        for (var i = 0; i < this.resourceIcons.length; i++) {
            this.resourceIcons[i].setPosition(20, this.resourceStart + 40 + (i * 20));
            this.resourceIcons[i].setVisible(this.progression.unlocks.resourceUI);
        }
        for (var i = 0; i < this.resourceIncLabels.length; i++) {
            this.resourceIncLabels[i].setPosition(100, this.resourceStart + 40 + (i * 20));
        }
        for (var i = DynamicSettings.getInstance().minResourceTier; i < this.resourceTierButtons.length; i++) {
            this.resourceTierButtons[i].setPosition(20 + ((i - DynamicSettings.getInstance().minResourceTier) * 20), this.resourceStart + 20);
            this.resourceTierButtons[i].setVisible(this.player.resourceTierReached >= 1 && i <= this.player.resourceTierReached);
        }
        this.resourceIcons[7].setVisible(this.progression.unlocks.motes || this.player.motes > 0);
        if (this.progression.unlocks.resourceUI === true) {
            var res = this.player.resources[this.resourceTierSelected];
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 40, "courier16", Common.numberString(Math.floor(res[0]))));
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 60, "courier16", Common.numberString(Math.floor(res[1]))));
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 80, "courier16", Common.numberString(Math.floor(res[2]))));
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 100, "courier16", Common.numberString(Math.floor(res[3]))));
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 120, "courier16", Common.numberString(Math.floor(res[4]))));
            this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 140, "courier16", Common.numberString(Math.floor(res[5]))));
            if (this.progression.unlocks.townTab === true) {
                this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 160, "courier16",
                    Common.numberString(Math.floor(this.player.gold)) + "/" + Common.numberString(Math.floor(this.worldData.getGoldCap()))));
            }
            if (this.progression.unlocks.motes === true) {
                this.resourceLabels.push(this.add.bitmapText(40, this.resourceStart + 180, "courier16", Common.numberString(Math.floor(this.player.motes))));
            }
        }
    }

    _layoutStats() {
        var h = 160;

        this.infuseLabel.setVisible(this.progression.unlocks.infuseUI);
        this.shadeLabel.setVisible(this.progression.unlocks.infuseUI);
        this.statProgressBar.setVisible(this.progression.unlocks.infuseUI);
        this.statInfuseButton.setVisible(this.progression.unlocks.infuseUI);
        this.statInfuseLabel.setVisible(this.progression.unlocks.infuseUI);
        if (DynamicSettings.getInstance().talentsEnabled === true) {
            this.talentProgressBar.setVisible(this.progression.unlocks.infuseUI);
            this.talentInfuseButton.setVisible(this.progression.unlocks.infuseUI);
            this.talentInfuseLabel.setVisible(this.progression.unlocks.infuseUI);
        } else {
            this.talentProgressBar.setVisible(false);
            this.talentInfuseButton.setVisible(false);
            this.talentInfuseLabel.setVisible(false);
        }

        if (this.progression.unlocks.infuseUI === true) {
            this.infuseStart = h;
            h += 120;
        }

        this.gearStart = h;
        this.gearLabel.setPosition(10, h);
        this.gearLabels.setPosition(20, h + 20);
        this._updateGear();

        h += this.gearLabels.getTextBounds().local.height + 20;
        this.detailsStart = h;
        h += 200;
        this.resourceStart = h;

        this._updateStats();
        this._updateDetails();
        this._updateShade();
        this._updateResources();
    }

    _updateStatButtons() {
        var enabled = this.player.statPoints > 0;
        for (var i = 0; i < this.statIncButtons.length; i++) {
            this.statIncButtons[i].setEnable(enabled);
        }
    }

    _handleTileClick(tile, fromAutoExplore = false) {
        if (tile.parent.isExplorable(tile.x, tile.y)) {
            if (fromAutoExplore === false && DynamicSettings.getInstance().openCombatOnExplore === true) {
                this.scene.bringToTop("CombatScene");
                this.scene.bringToTop("DarkWorld");
            }
            this.combatScene.initFight(tile, fromAutoExplore);
        }
    }

    _buyStatPoint() {
        this.progression.registerStatPointGain(this.buyAmount);
        this.player.buyStat(this.buyAmount);
        this._updateInfuseCosts();
        this._updateStats();
        this._updateShade();
    }
    _buyTalentPoint() {
        if (this.progression.unlocks.talentsTab === false) {
            this.progression.registerFeatureUnlocked(Statics.UNLOCK_TALENTS_TAB,
                "Holding this much raw shade, it almost feels... alive? Or it would be if classes were " +
                "in the game. Since they're not you just get 1 measly talent point to spend on the " +
                "basic bitch talents.");
        }
        this.player.buyTalent(this.buyAmount);
        this._updateInfuseCosts();
        this._updateShade();
    }

    _increaseStat(stat) {
        this.player.increaseStat(stat, this.buyAmount);
    }

    _onRewardCallback(rewards) {
        if (this.progression.unlocks.craftingUI === true) {
            GearData.getInstance().tiersAvailable = Math.min(DynamicSettings.getInstance().maxGearTier,
                Math.max(GearData.getInstance().tiersAvailable, rewards.regionLevel + 1));
            this.gearScene._updateTierButtons();
        }
        this.player.addShade(rewards.shade);
        this.player.addResource(rewards.resource, rewards.tier);
        this.player.addMote(rewards.motes);
        this._updateShade();
        this.progression.registerMonsterKill();
        this.progression.registerShadeGain(rewards.shade);
        this.progression.registerResourceGain(rewards.resource);
        if (this.progression.unlocks.townTab === true) {
            this.player.addGold(rewards.gold);
            WorldData.getInstance().getRegion(rewards.regionLevel).townData.addFriendship(rewards.friendship);
            this.townScene._updateStatus();
        }
    }

    _openExportDialog() {
        this._closeExportDialog();
        this.exportDialog = new OptionsDialog(this, 485, 120);
        this.exportDialog.onCloseHandler(() => { this._closeExportDialog(); });
    }
    _closeExportDialog() {
        if (this.exportDialog !== undefined) {
            this.exportDialog.destroy();
            this.exportDialog = undefined;
        }
    }
    _openGuideWindow() {
        this._closeGuideWindow();
        this.guideWindow = new GuideWindow(this, 175, 100);
        this.guideWindow.onCloseHandler(() => { this._closeGuideWindow(); });
    }
    _closeGuideWindow() {
        if (this.guideWindow !== undefined) {
            this.guideWindow.destroy();
            this.guideWindow = undefined;
        }
    }

    rebirth() {
        this.player.applyRitualBonuses();
        RitualData.getInstance().rebirth();
        this.player.rebirth();
        var gear = new GearData();
        gear.rebirth();
        this.worldData.rebirth();
        this.progression.rebirth();
        var lore = new LoreStore();
        lore.rebirth();
        this.resourceTierSelected = 0;
        this.worldData.time.setTimeScale(1);

        this.gearButton.setVisible(this.progression.unlocks.gearTab);
        this.regionButton.setVisible(this.progression.unlocks.exploreTab);
        this.combatButton.setVisible(this.progression.unlocks.combatTab);
        this.townButton.setVisible(WorldData.instance.getCurrentRegion().townData.townExplored);
        this.talentButton.setVisible(this.progression.unlocks.talentsTab);
        this.worldButton.setVisible(this.progression.unlocks.worldTab);
        this.moonlightButton.setVisible(this.progression.totalCounts.timesGated > 0);
        this._layoutStats();
        this._updateInfuseCosts();
        this.gearShowTimer = 2000;

        this.loreScene.rebirth();
        this.gearScene.rebirth();
        this.talentScene.rebirth();
        this.regionScene.rebirth();
        this.combatScene.rebirth();
        this.townScene.rebirth();
        this.worldScene.rebirth();

        //reset images back to adventurer
        this.statIcons[5].setImage({ sprite: "icons", tile: 5 });
        this.statIcons[6].setImage({ sprite: "icons", tile: 6 });

        this.scene.bringToTop("LoreScene");
        this.scene.bringToTop();

        this.loreScene.addText("You open your eyes and see a vast wilderness before you. " +
            "Unsure of how you got here you check your surroundings for any clues. You find " +
            "a broken sword, an old barrel lid and some worn, raggy leathers. Not great, but " +
            "you're also naked so you take what you can get.\n\n" +
            "After putting these on you should go exploring.");
    }

    changeRegion() {
        this.townButton.setVisible(WorldData.getInstance().getCurrentRegion().townData.townExplored);
    }

    refreshAll() {
        this.gearButton.setVisible(this.progression.unlocks.gearTab);
        this.regionButton.setVisible(this.progression.unlocks.exploreTab);
        this.combatButton.setVisible(this.progression.unlocks.combatTab);
        this.townButton.setVisible(WorldData.instance.getCurrentRegion().townData.townExplored);
        this.talentButton.setVisible(this.progression.unlocks.talentsTab);
        this.worldButton.setVisible(this.progression.unlocks.worldTab);
        this.moonlightButton.setVisible(this.progression.totalCounts.timesGated > 0);
        this._layoutStats();
        this._updateInfuseCosts();

        this.loreScene.refresh();
        this.gearScene.refresh();
        this.talentScene.refresh();
        this.regionScene.refresh();
        this.worldScene.refresh();
        this.townScene.refresh();
        this.moonlightScene.refresh();
    }

    update(time, __delta) {
        var lastFrameTime = time - this.lastFrame;
        if (lastFrameTime > 15000) {
            this.worldData.time.addOfflineTime(lastFrameTime);
        }
        this.worldData.time.setFrameDelta(Math.min(500, lastFrameTime));
        this.lastFrame = time;
        var fDelta = this.worldData.time.frameDelta;
        this.worldData.update(fDelta);
        this.player.statBlock.tickRegen(fDelta, this.combatScene.isInCombat());
        if (this.showTimeThisRun === true) {
            var runTime = WorldData.getInstance().time.time - WorldData.getInstance().timeAtRunStart;
            this.worldTimeLabel.setText("Current Run: " + new WorldTime(runTime).getTimespanText());
        } else {
            this.worldTimeLabel.setText(this.worldData.time.getText());
        }

        if (this.progression.unlocks.gearTab !== true) {
            this.gearShowTimer -= fDelta;
            if (this.gearShowTimer <= 0) {
                this.progression.registerFeatureUnlocked(Statics.UNLOCK_GEAR_TAB);
            }
        }

        for (var i = 0; i < this.resourceIncLabels.length; i++) {
            this.resourceIncLabels[i].update(fDelta);
        }

        // regardless of time dialation we still only want to save every minute
        this.saveTimer -= this.worldData.time.delta;
        if (this.saveTimer <= 0) {
            this.saveTimer = Statics.AUTOSAVE_TIMER;
            this.save();
        }
    }

    copyToClipboard() {
        navigator.clipboard.writeText(LZString.compressToEncodedURIComponent(localStorage.getItem("save"))).then(() => { },
            () => {
                prompt("This is your save string, make sure you copy it!",
                    LZString.compressToEncodedURIComponent(localStorage.getItem("save")));
            });
    }

    copyFromClipboard() {
        var that = this;
        if (navigator.clipboard.readText === undefined) {
            var text = prompt("Paste your save string", "");
            if (text !== "") {
                that.loadGame(text);
                that.refreshAll();
            }
        } else {
            navigator.clipboard.readText().then((text) => {
                if (text !== "") {
                    that.loadGame(text);
                    that.refreshAll();
                }
            });
        }
    }

    _getSaveObj() {
        return {
            version: Statics.VERSION_NUMBER,
            saveTime: Date.now(),
            settings: DynamicSettings.getInstance().save(),
            player: this.player.save(),
            gear: GearData.getInstance().save(),
            world: this.worldData.save(),
            progression: this.progression.save(),
            moon: this.moonlight.save(),
            star: this.starData.save(),
            ritual: RitualData.getInstance().save(),
            lore: LoreStore.getInstance().save()
        }
    }
    save() {
        var saveObj = this._getSaveObj();

        localStorage.setItem("save", JSON.stringify(saveObj));
    }

    loadGame(saveStr = undefined) {
        var saveObj = {};
        if (saveStr !== undefined) {
            saveObj = JSON.parse(LZString.decompressFromEncodedURIComponent(saveStr));
        } else {
            saveObj = JSON.parse(localStorage.getItem("save"));
        }
        if (saveObj === null) {
            return;
        }

        var gearData = new GearData();
        var lore = new LoreStore();

        if (saveObj.version > 4) {
            var dynamicSettings = new DynamicSettings();
            dynamicSettings.load(saveObj.settings);
        }
        this.progression.load(saveObj.progression, saveObj.version);
        this.moonlight.load(saveObj.moon, saveObj.version);
        if (saveObj.star !== undefined) {
            this.starData.load(saveObj.star, saveObj.version);
        }
        if (saveObj.ritual !== undefined) {
            RitualData.getInstance().load(saveObj.ritual, saveObj.version);
        }
        gearData.load(saveObj.gear, saveObj.version);
        //player needs to load after gear
        this.player.load(saveObj.player, saveObj.version);
        this.worldData.load(saveObj.world, saveObj.version);
        lore.load(saveObj.lore, saveObj.version);
        var timeOffline = Date.now() - saveObj.saveTime;
        if (timeOffline > 60000) {
            this.worldData.time.addOfflineTime(timeOffline);
        }
    }
}