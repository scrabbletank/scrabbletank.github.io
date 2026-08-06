import { SceneUIBase } from "./SceneUIBase";
import { WorldData } from "../data/WorldData";
import { Statics } from "../data/Statics";
import { PlayerData } from "../data/PlayerData";
import { TechDisplay } from "../ui/TechDisplay";
import { TownData } from "../data/TownData";
import { Common } from "../utils/Common";
import { TextButton } from "../ui/TextButton";
import { DungeonDisplay } from "../ui/DungeonDisplay";
import { TooltipImage } from "../ui/TooltipImage";
import { DynamicSettings } from "../data/DynamicSettings";
import { MoonlightData } from "../data/MoonlightData";
import { ProgressionStore } from "../data/ProgressionStore";
import { DungeonManager } from "../data/DungeonManager";
import { DungeonBlockDisplay } from "../ui/DungeonBlockDisplay";
import { CreatureRegistry } from "../data/CreatureRegistry";
import { HighlightElementGroup } from "../ui/HighlightElementGroup";

export class TownScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.selectedTab = 0;
        this.dungeonManager = new DungeonManager();
        this.dungeonManager.registerEvent("OnCreatureChanged", (v, e) => { this._onCreatureChanged(v, e); });
        this.dungeonManager.registerEvent("OnPlayerDeath", () => { this._onPlayerDeath(); });
        this.dungeonManager.registerEvent("OnRoomComplete", (d) => { this._onRoomComplete(d); });
    }

    _handleDungeonClick(props) {
        if (props.reward === undefined) {
            this._startDungeon(props.dungeon);
        } else {
            props.dungeon.rewards = [props.dungeon.rewards[props.reward]];
            var region = WorldData.getInstance().getRegion(props.dungeon.regionLevel);
            region.townData.chooseReward(props.dungeon.rewards[0]);
            this._updateStatus();
            this._refreshTechs();
        }
    }

    _startDungeon(dungeon) {
        var villagerBlock = CreatureRegistry.GetDungeonCreatureByName('villager', WorldData.getInstance().getVillagerPower(),
            WorldData.getInstance().getVillagerHealth(), WorldData.getInstance().getArmySize());
        this.dungeonManager.exploreDungeon(dungeon, villagerBlock);
        this._setupActiveDungeonRooms(dungeon);
        this._refreshTechs();
    }

    _onCreatureChanged(villager, enemy) {
        this.dungeonBlockDisplays[0].initWithCreature(villager);
        this.dungeonBlockDisplays[1].initWithCreature(enemy);
    }

    _onPlayerDeath() {
        this.dungeonManager.endDungeon();
        WorldData.getInstance().killSoldiers();
        this._updateStatus();
        this._refreshTechs();
    }

    _setupActiveDungeonRooms(dungeon) {
        for (var i = 0; i < this.activeDungeonRooms.length; i++) {
            this.activeDungeonRooms[i].destroy();
        }
        this.activeDungeonRooms = [];

        var totalDist = (dungeon.maxRooms / 5) * 185;
        var x = this.relativeX(570 - totalDist / 2);
        for (var i = 0; i < dungeon.maxRooms; i++) {
            var clr = i < dungeon.completedRooms ? Phaser.Display.Color.GetColor(130, 110, 200) : Phaser.Display.Color.GetColor(0, 0, 0);
            var rect;
            if (i % 5 === 4) {
                var texture = i === dungeon.maxRooms - 1 ? { sprite: "icons2", tile: 1 } : { sprite: "icons2", tile: 0 };
                var img = this.add.image(x + 4, this.relativeY(600) + 4, texture.sprite, texture.tile).setOrigin(0, 0).setDepth(99);
                img.displayWidth = 32;
                img.displayHeight = 32;
                this.activeDungeonRooms.push(img);
                rect = this.add.rectangle(x, this.relativeY(600), 40, 40, clr).setOrigin(0, 0);
                x += 45;
            } else {
                rect = this.add.rectangle(x, this.relativeY(600) + 5, 30, 30, clr).setOrigin(0, 0);
                x += 35;
            }
            rect.isStroked = true;
            rect.lineWidth = 1;
            rect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
            this.activeDungeonRooms.push(rect)
        }

        for (var i = 0; i < this.activeDungeonRooms.length; i++) {
            this.activeDungeonRooms[i].setVisible(this.selectedTab === 2);
        }
    }

    _onRoomComplete(dungeon) {
        dungeon.completedRooms += 1;
        if (dungeon.completedRooms === dungeon.maxRooms) {
            this.dungeonManager.endDungeon();
            WorldData.getInstance().armySize = this.dungeonManager.villagerBlock.ArmySize();
        } else if (dungeon.completedRooms % 5 === 0) {
            var shade = dungeon.level * 250 * MoonlightData.getInstance().getShadowBonus();
            var motes = dungeon.tier * 10 * (1 + MoonlightData.getInstance().moonperks.heartofdarkness.level);
            PlayerData.getInstance().addShade(shade);
            PlayerData.getInstance().addMote(motes);
        } else {
            var res = [0, 0, 0, 0, 0, 0];
            res[Common.randint(0, 6)] = (dungeon.tier + 1) * 50;
            PlayerData.getInstance().addResource(res, Math.min(7, dungeon.regionLevel));
        }
        this._setupActiveDungeonRooms(dungeon);
        this._refreshTechs();
    }

    refresh() {
        this._updateStatus();
    }

    rebirth() {
        this.selectedTab = 0;
        this._updateStatus();
        this._refreshTechs();
        this.dungeonsBtn.setVisible(false);
    }

    changeRegion() {
        this.selectedTab = 0;
        this._updateStatus();
        this._refreshTechs();
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.townNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(100), "courier20", "Town");
        this.regionNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(120), "courier16", "Region ");
        this.statsLabel = this.add.bitmapText(this.relativeX(15), this.relativeY(140), "courier16", "");
        this.nightLabourBtn = new TextButton(this, this.relativeX(15), this.relativeY(140), 220, 20, "Night Labour: OFF")
            .onClickHandler(() => { this._toggleNightLabour(); });
        this.nightLabourBtn.setVisible(false);
        this.townUpgradeBtn = new TextButton(this, this.relativeX(15), this.relativeY(140), 220, 20, "Auto Upgrade: OFF")
            .onClickHandler(() => { this._toggleAutoUpgrade(); });
        this.townUpgradeBtn.setVisible(false);

        this.buildingBtn = new TextButton(this, this.relativeX(240), this.relativeY(10), 120, 20, "Buildings")
            .onClickHandler(() => { this._selectTab(0); });
        this.upgradesBtn = new TextButton(this, this.relativeX(370), this.relativeY(10), 120, 20, "Research")
            .onClickHandler(() => { this._selectTab(1); });
        this.dungeonsBtn = new TextButton(this, this.relativeX(500), this.relativeY(10), 120, 20, "Dungeons")
            .onClickHandler(() => { this._selectTab(2); });
        this.dungeonsBtn.setVisible(WorldData.getInstance().getCurrentRegion().townData.dungeons.length > 0);
        this.tabGroup = new HighlightElementGroup(Phaser.Display.Color.GetColor(255, 255, 0), Phaser.Display.Color.GetColor(0, 0, 0),
            Phaser.Display.Color.GetColor(0, 0, 0), Phaser.Display.Color.GetColor(255, 255, 255));
        this.tabGroup.addElement(this.buildingBtn);
        this.tabGroup.addElement(this.upgradesBtn);
        this.tabGroup.addElement(this.dungeonsBtn);
        this.tabGroup._updateHighlights(0);

        this.regionSelectElements = [];

        this.buildingDisplays = []

        this.dungeonIcons = []
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(50), 16, 16,
            { sprite: "icons", tile: 24 }, "Power. How much damage each villager can deal."));
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(70), 16, 16,
            { sprite: "icons", tile: 26 }, "Health. How much damage each villager can take before dying."));
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(90), 16, 16,
            { sprite: "icons", tile: 60 }, "Army Size. Each town gives 5 to your army size, increased by garrisons."));
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(110), 16, 16,
            { sprite: "icons", tile: 38 }, "Tax Malus. Each soldier in your army added by garrisons increases your global tax malus. All tax income is reduced by this number."));
        this.dungeonLabels = [];
        for (var i = 0; i < this.dungeonIcons.length; i++) {
            this.dungeonIcons[i].setVisible(false);
        }
        this.dungeonBlockDisplays = [];
        this.dungeonBlockDisplays.push(new DungeonBlockDisplay(this, this.relativeX(260), this.relativeY(430)));
        this.dungeonBlockDisplays.push(new DungeonBlockDisplay(this, this.relativeX(580), this.relativeY(430), true));
        this.activeDungeonRooms = [];
        this.dungeonsCompleteLabel = this.add.bitmapText(this.relativeX(550), this.relativeY(430), "courier20",
            "This land is now safe from the threat of the Dungeons.\n" +
            "Who knows who would have found that loot if you didn't send\n" +
            "wave after wave of villagers after it?", 20, 1).setOrigin(0.5, 0);

        this._updateStatus();
        this._refreshTechs();
        WorldData.getInstance().time.registerEvent("onDayEnd", () => { this._endOfDay(); });
        WorldData.getInstance().onRegionChanged(() => { this._updateStatus(); this._refreshTechs(); });
    }
    _setupRegionButton(idx, x, y) {
        return new TextButton(this, x, y, 27, 20, (idx + 1) + "").onClickHandler(() => {
            WorldData.getInstance().setCurrentRegion(idx);
            this.scene.get("DarkWorld").changeRegion();
        });
    }

    _setupTechDisplay(x, y, tech, tier) {
        return new TechDisplay(this, x, y, tech, tier).registerClick(() => { this._handleTechUpgrade(tech); });
    }

    _setupDungeonDisplay(x, y, dungeon) {
        return new DungeonDisplay(this, x, y, dungeon, this.dungeonManager.combatActive === false)
            .registerClick((props) => { this._handleDungeonClick(props); });
    }

    _handleTechUpgrade(tech) {
        var region = WorldData.instance.getCurrentRegion();
        var gold = TownData.getTechGoldCost(tech, region.townData.tier);
        var resource = TownData.getTechResourceCost(tech, region.townData.tier);
        var resourceTier = Math.min(7, region.townData.resourceTier);
        var player = new PlayerData();
        if (player.gold >= gold && Common.canCraft(resource, player.resources[resourceTier]) === true &&
            region.townData.friendshipLevel >= tech.level) {
            // If we are spending friendship, we spend the current level of friendship needed. Level 0 requires no friendship,
            // so don't calculate that here.
            if (DynamicSettings.getInstance().spendFriendship === true && tech.level > 0) {
                var friendshipCost = 25;
                if (tech.level > 1) {
                    friendshipCost = TownData.calcFriendshipToLevel(tech.level) - TownData.calcFriendshipToLevel(tech.level - 1);
                }
                region.townData.spendFriendship(friendshipCost);
            }
            player.addGold(-gold);
            player.spendResource(resource, resourceTier);
            region.townData.increaseTechLevel(tech);
            this._updateStatus();
            this._refreshTechs();
        }
    }

    _toggleNightLabour() {
        var region = WorldData.instance.getCurrentRegion();
        region.townData.toggleNightLabour();
        if (region.townData.nightLabourActive === true) {
            this.nightLabourBtn.setText("Night Labour: ON");
        } else {
            this.nightLabourBtn.setText("Night Labour: OFF");
        }
        this._updateStatus();
    }

    _toggleAutoUpgrade() {
        var region = WorldData.instance.getCurrentRegion();
        region.townData.autoTownUpgrade = region.townData.autoTownUpgrade === true ? false : true;
        if (region.townData.autoTownUpgrade === true) {
            this.townUpgradeBtn.setText("Auto Upgrade: ON");
        } else {
            this.townUpgradeBtn.setText("Auto Upgrade: OFF");
        }
        this._updateStatus();
    }

    _selectTab(value) {
        this.selectedTab = value;
        this._refreshTechs();
    }

    _updateStatus() {
        var region = WorldData.getInstance().getCurrentRegion();
        var player = new PlayerData();
        var prodBonus = region.townData.getProductionMulti();

        for (var i = 0; i < this.regionSelectElements.length; i++) {
            this.regionSelectElements[i].destroy();
        }
        if (WorldData.getInstance().regionList.length > 1) {
            this.regionSelectElements = [this.add.bitmapText(this.relativeX(10), this.relativeY(10), "courier20", "Town:")];
            this.regionTabGroup = new HighlightElementGroup(Phaser.Display.Color.GetColor(255, 255, 0), Phaser.Display.Color.GetColor(0, 0, 0),
                Phaser.Display.Color.GetColor(0, 0, 0), Phaser.Display.Color.GetColor(255, 255, 255));
            for (var i = 0; i < WorldData.getInstance().regionList.length; i++) {
                var x = this.relativeX(10 + (i % 8) * 27);
                var y = this.relativeY(30 + Math.floor(i / 8) * 20);
                var btn = this._setupRegionButton(i, x, y);
                this.regionSelectElements.push(btn);
                this.regionTabGroup.addElement(btn);
            }
            this.regionTabGroup._updateHighlights(WorldData.getInstance().currentRegion);
        }

        var nightLabourCost = 3.5 * region.townData.currentPopulation * MoonlightData.getInstance().moonperks.nightlabour.level *
            (region.townData.nightLabourActive === true ? 1 : 0);

        var txt = "Population: " + Common.numberString(Math.round(region.townData.currentPopulation)) +
            "/" + Common.numberString(Math.floor(region.townData.getMaxPopulation())) + "\n" +
            "Tax Income: " + Common.numberString(Math.round(region.townData.getTownIncome() - nightLabourCost)) + "g/week\n" +
            "T" + region.townData.tier + " Crafting Cost: " + (Math.round(player.getCraftingCosts(region.townData.tier - 1) * 10000) / 100) + "%\n" +
            "Economy: " + Common.numberString(Math.round(region.townData.getEconomyMulti() * 100)) + "%\n" +
            "Production: " + Common.numberString(Math.round(prodBonus * 100)) + "%\n" +
            "Bounty Gold: " + Common.numberString(Math.round(region.townData.bountyMulti * 100)) + "%\n" +
            "Friendship: " + Common.numberString(Math.floor(region.townData.friendship)) +
            "/" + Common.numberString(region.townData.friendshipToNext) + "\n" +
            "Friendship\nLevel: " + region.townData.friendshipLevel + " (+" +
            Common.numberString(Math.round((region.townData.getFriendshipBonus() - 1) * 100)) + "% Shade)\n" +
            "Daily Production:\n";

        var resources = region._getResourcesPerDay();
        for (var i = 0; i < resources.length; i++) {
            if (resources[i] > 100) {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + Common.numberString(Math.floor(resources[i])) + "\n";
            } else {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + (Math.floor(resources[i] * 100) / 100) + "\n";
            }
        }
        if (MoonlightData.getInstance().moonperks.shadow3.level > 0) {
            var shadow = region.townData.currentPopulation * 0.75 * MoonlightData.getInstance().moonperks.shadow3.level *
                MoonlightData.getInstance().getShadowBonus() * region.townData.getProductionMulti();
            txt += "Shade: " + Common.numberString(Math.round(shadow)) + "\n";
        }
        if (region.alchemyDrain > 0) {
            txt += "  Alchemy Drain: " + region.alchemyDrain + "\n" +
                "  Alchemy Gain: " + Math.round(region.alchemyGain * 100) / 100;
        }

        this.statsLabel.setText(txt);
        this.regionNameLabel.setText("Region " + (region.regionLevel + 1));
        var h = this.statsLabel.getTextBounds().local.height + 160;
        if (ProgressionStore.getInstance().persistentUnlocks.dungeons === true) {
            for (var i = 0; i < this.dungeonLabels.length; i++) {
                this.dungeonLabels[i].destroy();
            }
            for (var i = 0; i < this.dungeonIcons.length; i++) {
                this.dungeonIcons[i].setVisible(true);
            }
            this.dungeonLabels = [];
            this.dungeonIcons[0].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                Common.numberString(WorldData.getInstance().getVillagerPower())));
            h += 20;
            this.dungeonIcons[1].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                Common.numberString(WorldData.getInstance().getVillagerHealth())));
            h += 20;
            this.dungeonIcons[2].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                Common.numberString(WorldData.getInstance().getArmySize()) + "/" +
                Common.numberString(WorldData.getInstance().getArmySizeMax())));
            h += 20;
            var tax = 1 - WorldData.getInstance().getArmyTaxMulti();
            this.dungeonIcons[3].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                (Math.round(tax * 1000) / 10) + "%"));
            if (tax > 0) {
                this.dungeonLabels[this.dungeonLabels.length - 1].setTint(Phaser.Display.Color.GetColor(255, 40, 40));
            }
            h += 30;
        }

        if (MoonlightData.getInstance().moonperks.nightlabour.level > 0) {
            this.nightLabourBtn.setPosition(this.relativeX(15), this.relativeY(h));
            h += 30;
            this.nightLabourBtn.setVisible(true);
            if (region.townData.nightLabourActive === true) {
                this.nightLabourBtn.setText("Night Labour: ON");
            } else {
                this.nightLabourBtn.setText("Night Labour: OFF");
            }
        }

        if (ProgressionStore.getInstance().persistentUnlocks.autoTown === true) {
            this.townUpgradeBtn.setPosition(this.relativeX(15), this.relativeY(h));
            h += 30;
            this.townUpgradeBtn.setVisible(true);
            if (region.townData.autoTownUpgrade === true) {
                this.townUpgradeBtn.setText("Auto Upgrade: ON");
            } else {
                this.townUpgradeBtn.setText("Auto Upgrade: OFF");
            }
        }
    }

    _refreshTechs() {
        var region = WorldData.instance.getCurrentRegion();
        this.dungeonsBtn.setVisible(region.townData.dungeons.length > 0);
        this.dungeonsCompleteLabel.setVisible(false);

        for (var i = 0; i < this.buildingDisplays.length; i++) {
            this.buildingDisplays[i].destroy();
        }
        for (var i = 0; i < this.activeDungeonRooms.length; i++) {
            this.activeDungeonRooms[i].setVisible(false);
        }
        for (var i = 0; i < this.dungeonBlockDisplays.length; i++) {
            this.dungeonBlockDisplays[i].setVisible(false);
        }
        if (this.selectedTab === 0) {
            var idx = 0;
            for (const prop in region.townData.buildings) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + idx * 120),
                    region.townData.buildings[prop], region.townData.tier));
                idx += 1;
            }
        } else if (this.selectedTab === 1) {
            var idx = 0;
            for (const prop in region.townData.upgrades) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + idx * 120),
                    region.townData.upgrades[prop], region.townData.tier));
                idx += 1;
            }
        } else if (this.selectedTab === 2) {
            for (var i = 0; i < region.townData.dungeons.length; i++) {
                this.buildingDisplays.push(this._setupDungeonDisplay(this.relativeX(240), this.relativeY(50 + i * 120),
                    region.townData.dungeons[i]));
            }
            for (var i = 0; i < this.activeDungeonRooms.length; i++) {
                this.activeDungeonRooms[i].setVisible(this.dungeonManager.combatActive);
            }
            for (var i = 0; i < this.dungeonBlockDisplays.length; i++) {
                this.dungeonBlockDisplays[i].setVisible(this.dungeonManager.combatActive);
            }
            this.dungeonsCompleteLabel.setVisible(this.dungeonManager.combatActive === false && region.townData.areDungeonsComplete() === true);
        }
    }

    _endOfDay() {
        this._updateStatus();
        this._refreshTechs();
    }


    update(__time, __delta) {
        for (var i = 0; i < WorldData.getInstance().time.fskip; i++) {
            this.dungeonManager.update(WorldData.getInstance().time.frameDelta);
        }
    }
}