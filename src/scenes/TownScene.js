import { SceneUIBase } from "./SceneUIBase";
import { WorldData } from "../data/WorldData";
import { Statics } from "../data/Statics";
import { PlayerData } from "../data/PlayerData";
import { TechDisplay } from "../ui/TechDisplay";
import { TownData } from "../data/TownData";
import { Common } from "../utils/Common";
import { TextButton } from "../ui/TextButton";
import { DynamicSettings } from "../data/DynamicSettings";
import { MoonlightData } from "../data/MoonlightData";

export class TownScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.showBuildings = true;
    }

    refresh() {
        this.changeRegion();
    }

    rebirth() {
        this.showBuildings = true;
        this._updateStatus();
        this.upgradesBtn.setVisible(false);
    }

    changeRegion() {
        this.showBuildings = true;
        this._updateStatus();
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
            .onClickHandler(() => { this._showBuildings(true); });
        this.upgradesBtn = new TextButton(this, this.relativeX(370), this.relativeY(10), 120, 20, "Research")
            .onClickHandler(() => { this._showBuildings(false); });
        this.upgradesBtn.setVisible(WorldData.instance.getCurrentRegion().townData.researchEnabled);

        this.buildingDisplays = []

        this._updateStatus();
        var worldData = new WorldData();
        worldData.time.registerEvent("onDayEnd", () => { this._endOfDay(); });
    }

    _setupTechDisplay(x, y, tech, tier) {
        return new TechDisplay(this, x, y, tech, tier).registerClick(() => { this._handleTechUpgrade(tech); });
    }

    _handleTechUpgrade(tech) {
        var region = WorldData.instance.getCurrentRegion();
        var gold = TownData.getTechGoldCost(tech, region.townData.tier);
        var resource = TownData.getTechResourceCost(tech, region.townData.tier);
        var player = new PlayerData();
        if (player.gold >= gold && Common.canCraft(resource, player.resources[region.townData.tier - 1]) === true &&
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
            player.spendResource(resource, region.townData.tier - 1);
            region.townData.increaseTechLevel(tech);
            this._updateStatus();
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

    _showBuildings(value) {
        this.showBuildings = value;
        this._updateStatus();
    }

    _updateStatus() {
        var region = WorldData.instance.getCurrentRegion();
        var player = new PlayerData();
        var prodBonus = region.townData.getProductionMulti();
        var govBonus = (1 + player.getTalentLevel("governance") * 0.04);

        var txt = "Population: " + Math.round(region.townData.currentPopulation) + "/" + Math.floor(region.townData.getMaxPopulation()) + "\n" +
            "Tax Income: " + Math.round(region.townData.getTownIncome()) + "g/week\n" +
            "T" + region.townData.tier + " Crafting Cost: " + (Math.round(player.craftingCosts[region.townData.tier - 1] * 10000) / 100) + "%\n" +
            "Economy: " + Math.round(region.townData.economyMulti * 100 * govBonus) + "%\n" +
            "Production: " + Math.round(prodBonus * 100) + "%\n" +
            "Bounty Gold: " + Math.round(region.townData.bountyMulti * 100) + "%\n" +
            "Friendship: " + Math.floor(region.townData.friendship) + "/" + region.townData.friendshipToNext + "\n" +
            "Friendship\nLevel: " + region.townData.friendshipLevel + " (+" + Math.round((region.townData.getFriendshipBonus() - 1) * 100) + "% Shade)\n" +
            "Daily Production:\n";

        for (var i = 0; i < region.resourcesPerDay.length; i++) {
            txt += "  " + Statics.RESOURCE_NAMES[i] + ": " + (Math.floor(region.resourcesPerDay[i] * prodBonus * govBonus * 100) / 100) + "\n";
        }
        if (region.alchemyDrain > 0) {
            txt += "  Alchemy Drain: " + region.alchemyDrain + "\n" +
                "  Alchemy Gain: " + Math.round(region.alchemyGain * 100) / 100;
        }

        this.statsLabel.setText(txt);
        this.regionNameLabel.setText("Region " + (region.regionLevel + 1));

        if (MoonlightData.getInstance().moonperks.nightlabour.level > 0) {
            var h = this.statsLabel.getTextBounds().local.height + 60;
            this.nightLabourBtn.setPosition(this.relativeX(15), this.relativeY(h));
            this.nightLabourBtn.setVisible(true);
        }

        for (var i = 0; i < this.buildingDisplays.length; i++) {
            this.buildingDisplays[i].destroy();
        }
        if (this.showBuildings === true) {
            var idx = 0;
            for (const prop in region.townData.buildings) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + idx * 120),
                    region.townData.buildings[prop], region.townData.tier));
                idx += 1;
            }
        } else {
            var idx = 0;
            for (const prop in region.townData.upgrades) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + idx * 120),
                    region.townData.upgrades[prop], region.townData.tier));
                idx += 1;
            }
        }
    }

    _endOfDay() {
        this._updateStatus();
    }
}