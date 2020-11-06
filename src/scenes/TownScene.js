import { SceneUIBase } from "./SceneUIBase";
import { WorldData } from "../data/WorldData";
import { Statics } from "../data/Statics";
import { PlayerData } from "../data/PlayerData";
import { TechDisplay } from "../ui/TechDisplay";
import { TownData } from "../data/TownData";
import { Common } from "../utils/Common";
import { TextButton } from "../ui/TextButton";
import { ProgressionStore } from "../data/ProgressionStore";

export class TownScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.showBuildings = true;
    }

    rebirth() {
        this.showBuildings = true;
        this._updateStatus();
        this.upgradesBtn.setVisible(false);
    }

    changeRegion() {
        this._updateStatus();
        this.upgradesBtn.setVisible(WorldData.instance.getCurrentRegion().townData.researchEnabled);
    }

    create() {
        var progression = new ProgressionStore();
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.townNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(10), "courier20", "Town");
        this.regionNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(30), "courier16", "Region ");
        this.statsLabel = this.add.bitmapText(this.relativeX(15), this.relativeY(50), "courier16", "");

        this.buildingBtn = new TextButton(this, this.relativeX(240), this.relativeY(10), 120, 20, "Buildings")
            .onClickHandler(() => { this._showBuildings(true); });
        this.upgradesBtn = new TextButton(this, this.relativeX(370), this.relativeY(10), 120, 20, "Research")
            .onClickHandler(() => { this._showBuildings(false); });
        this.upgradesBtn.setVisible(WorldData.instance.getCurrentRegion().townData.researchEnabled);

        this.buildingDisplays = []

        this._updateStatus();
        var worldData = new WorldData();
        worldData.time.registerEvent("onDayEnd", () => { this._endOfDay(); });

        progression.addOnUnlockHandler((type, count, text) => { this._handleProgressionChange(type); });
    }

    _handleProgressionChange(type) {
        if (type === Statics.UNLOCK_BUILDING_UI) {
            this.upgradesBtn.setVisible(true);
        }
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
            player.addGold(-gold);
            player.spendResource(resource, region.townData.tier - 1);
            region.townData.increaseTechLevel(tech);
            this._updateStatus();
        }
    }

    _showBuildings(value) {
        this.showBuildings = value;
        this._updateStatus();
    }

    _updateStatus() {
        var region = WorldData.instance.getCurrentRegion();
        var player = new PlayerData();
        var govBonus = (1 + player.getTalentLevel("governance") * 0.04);

        var txt = "Population: " + Math.round(region.townData.currentPopulation) + "/" + Math.floor(region.townData.getMaxPopulation()) + "\n" +
            "Tax Income: " + Math.round(region.townData.getTownIncome()) + "g/week\n" +
            "T" + region.townData.tier + " Crafting Cost: " + (Math.round(player.craftingCosts[region.townData.tier - 1] * 10000) / 100) + "%\n" +
            "Economy: " + Math.round(region.townData.economyMulti * 100 * govBonus) + "%\n" +
            "Production: " + Math.round(region.townData.productionMulti * 100) + "%\n" +
            "Bounty Gold: " + Math.round(region.townData.bountyMulti * 100) + "%\n" +
            "Friendship: " + Math.floor(region.townData.friendship) + "/" + region.townData.friendshipToNext + "\n" +
            "Friendship\nLevel: " + region.townData.friendshipLevel + " (+" + Math.round((region.townData.getFriendshipBonus() - 1) * 100) + "% Shade)\n" +
            "Daily Production:\n";

        for (var i = 0; i < region.resourcesPerDay.length; i++) {
            txt += "  " + Statics.RESOURCE_NAMES[i] + ": " + (Math.floor(region.resourcesPerDay[i] * region.townData.productionMulti * govBonus * 100) / 100) + "\n";
        }
        if (region.alchemyDrain > 0) {
            txt += "  Alchemy Drain: " + region.alchemyDrain + "\n" +
                "  Alchemy Gain: " + Math.round(region.alchemyGain * 100) / 100;
        }

        this.statsLabel.setText(txt);
        this.regionNameLabel.setText("Region " + (region.regionLevel + 1));

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