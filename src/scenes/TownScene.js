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
        var region = WorldData.getInstance().getRegion(dungeon.regionLevel);
        var villagerBlock = CreatureRegistry.GetDungeonCreatureByName('villager', region.townData.getVillagerPower(),
            region.townData.getVillagerHealth(), region.townData.getArmySize());
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
        var region = WorldData.getInstance().getRegion(this.dungeonManager.activeDungeon.regionLevel);
        region.townData.killPopulation(this.dungeonManager.villagerBlock.armySize);
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
            WorldData.getInstance().getRegion(dungeon.regionLevel).townData.killPopulation(this.dungeonManager.villagerBlock.armySize -
                this.dungeonManager.villagerBlock.ArmySize());
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
        this.updateResearchButton();
    }

    rebirth() {
        this.selectedTab = 0;
        this._updateStatus();
        this._refreshTechs();
        this.upgradesBtn.setVisible(false);
        this.dungeonsBtn.setVisible(false);
    }

    changeRegion() {
        this.selectedTab = 0;
        this._updateStatus();
        this._refreshTechs();
        this.updateResearchButton();
    }

    updateResearchButton() {
        this.upgradesBtn.setVisible(WorldData.instance.getCurrentRegion().townData.researchEnabled);
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.townNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(10), "courier20", "Town");
        this.regionNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(30), "courier16", "Region ");
        this.statsLabel = this.add.bitmapText(this.relativeX(15), this.relativeY(50), "courier16", "");
        this.nightLabourBtn = new TextButton(this, this.relativeX(15), this.relativeY(50), 220, 20, "Turn On Night Labour")
            .onClickHandler(() => { this._toggleNightLabour(); });
        this.nightLabourBtn.setVisible(false);

        this.buildingBtn = new TextButton(this, this.relativeX(240), this.relativeY(10), 120, 20, "Buildings")
            .onClickHandler(() => { this._selectTab(0); });
        this.upgradesBtn = new TextButton(this, this.relativeX(370), this.relativeY(10), 120, 20, "Research")
            .onClickHandler(() => { this._selectTab(1); });
        this.upgradesBtn.setVisible(WorldData.getInstance().getCurrentRegion().townData.researchEnabled);
        this.dungeonsBtn = new TextButton(this, this.relativeX(500), this.relativeY(10), 120, 20, "Dungeons")
            .onClickHandler(() => { this._selectTab(2); });
        this.dungeonsBtn.setVisible(WorldData.getInstance().getCurrentRegion().townData.dungeons.length > 0);

        this.buildingDisplays = []

        this.dungeonIcons = []
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(50), 16, 16,
            { sprite: "icons", tile: 24 }, "Power. How much damage each villager can deal."));
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(70), 16, 16,
            { sprite: "icons", tile: 26 }, "Health. How much damage each villager can take before dying"));
        this.dungeonIcons.push(new TooltipImage(this, this.relativeX(15), this.relativeY(90), 16, 16,
            { sprite: "icons", tile: 60 }, "Army Size. How many villagers you can spare in a dungeon, equal to 10% of your current population."));
        this.dungeonLabels = [];
        for (var i = 0; i < this.dungeonIcons.length; i++) {
            this.dungeonIcons[i].setVisible(false);
        }
        this.dungeonBlockDisplays = [];
        this.dungeonBlockDisplays.push(new DungeonBlockDisplay(this, this.relativeX(260), this.relativeY(430)));
        this.dungeonBlockDisplays.push(new DungeonBlockDisplay(this, this.relativeX(580), this.relativeY(430), true));
        this.activeDungeonRooms = [];
        this.dungeonsCompleteLabel = this.add.bitmapText(this.relativeX(550), this.relativeY(430), "courier20",
            "With the Dungeons defeated, your brave villagers travel\n" +
            "the lands teaching others to fight. Your Dojo's now \n" +
            "give 20% of their production to the next region that\n" +
            "hasn't conquered their Dungeons.", 20, 1).setOrigin(0.5, 0);
        this.dungeonsCompleteLabel.setVisible(false);

        this._updateStatus();
        this._refreshTechs();
        WorldData.getInstance().time.registerEvent("onDayEnd", () => { this._endOfDay(); });
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
        var tier = Math.min(7, region.townData.tier - 1);
        var player = new PlayerData();
        if (player.gold >= gold && Common.canCraft(resource, player.resources[tier]) === true &&
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
            player.spendResource(resource, tier);
            region.townData.increaseTechLevel(tech);
            this._updateStatus();
            this._refreshTechs();
        }
    }

    _toggleNightLabour() {
        var region = WorldData.instance.getCurrentRegion();
        region.townData.toggleNightLabour();
        if (region.townData.nightLabourActive === true) {
            this.nightLabourBtn.setText("Turn Off Night Labour");
        } else {
            this.nightLabourBtn.setText("Turn On Night Labour");
        }
        this._updateStatus();
    }

    _selectTab(value) {
        this.selectedTab = value;
        this._refreshTechs();
    }

    _updateStatus() {
        var region = WorldData.instance.getCurrentRegion();
        var player = new PlayerData();
        var prodBonus = region.townData.getProductionMulti();
        var govBonus = (1 + player.getTalentLevel("governance") * 0.04);

        var txt = "Population: " + Math.round(region.townData.currentPopulation) + "/" + Math.floor(region.townData.getMaxPopulation()) + "\n" +
            "Tax Income: " + Math.round(region.townData.getTownIncome()) + "g/week\n" +
            "T" + region.townData.tier + " Crafting Cost: " + (Math.round(player.getCraftingCosts(region.townData.tier - 1) * 10000) / 100) + "%\n" +
            "Economy: " + Math.round(region.townData.economyMulti * 100 * govBonus) + "%\n" +
            "Production: " + Math.round(prodBonus * 100) + "%\n" +
            "Bounty Gold: " + Math.round(region.townData.bountyMulti * 100) + "%\n" +
            "Friendship: " + Math.floor(region.townData.friendship) + "/" + region.townData.friendshipToNext + "\n" +
            "Friendship\nLevel: " + region.townData.friendshipLevel + " (+" + Math.round((region.townData.getFriendshipBonus() - 1) * 100) + "% Shade)\n" +
            "Daily Production:\n";

        var resources = region._getResourcesPerDay();
        for (var i = 0; i < resources.length; i++) {
            if (resources[i] > 100) {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + Common.numberString(Math.floor(resources[i])) + "\n";
            } else {
                txt += " " + Statics.RESOURCE_NAMES[i] + ": " + (Math.floor(resources[i] * 100) / 100) + "\n";
            }
        }
        if (region.alchemyDrain > 0) {
            txt += "  Alchemy Drain: " + region.alchemyDrain + "\n" +
                "  Alchemy Gain: " + Math.round(region.alchemyGain * 100) / 100;
        }

        this.statsLabel.setText(txt);
        this.regionNameLabel.setText("Region " + (region.regionLevel + 1));
        var h = this.statsLabel.getTextBounds().local.height + 60;
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
                Common.numberString(region.townData.getVillagerPower())));
            h += 20;
            this.dungeonIcons[1].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                Common.numberString(region.townData.getVillagerHealth())));
            h += 20;
            this.dungeonIcons[2].setPosition(this.relativeX(10), this.relativeY(h));
            this.dungeonLabels.push(this.add.bitmapText(this.relativeX(30), this.relativeY(h), "courier16",
                Common.numberString(region.townData.getArmySize())));
            h += 30;
        }

        if (MoonlightData.getInstance().moonperks.nightlabour.level > 0) {
            this.nightLabourBtn.setPosition(this.relativeX(15), this.relativeY(h));
            this.nightLabourBtn.setVisible(true);
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
    }


    update(__time, __delta) {
        this.dungeonManager.update(WorldData.getInstance().time.frameDelta);
    }
}