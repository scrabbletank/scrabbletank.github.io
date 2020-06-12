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
    }

    create() {
        var progression = new ProgressionStore();
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.townNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(10), "courier20", "Town");
        this.regionNameLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(30), "courier16", "Region 1");
        this.statsLabel = this.add.bitmapText(this.relativeX(15), this.relativeY(50), "courier16", "Region 1");

        this.buildingBtn = new TextButton(this, this.relativeX(240), this.relativeY(10), 120, 20, "Buildings")
            .onClickHandler(() => { this._showBuildings(true); });
        this.upgradesBtn = new TextButton(this, this.relativeX(370), this.relativeY(10), 120, 20, "Research")
            .onClickHandler(() => { this._showBuildings(false); });
        this.upgradesBtn.setVisible(progression.unlocks.buildings);

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
        var region = new WorldData().getCurrentRegion();
        var gold = TownData.getTechGoldCost(tech, region.townData.tier);
        var resource = TownData.getTechResourceCost(tech, region.townData.tier);
        var player = new PlayerData();
        if (player.gold >= gold && Common.canCraft(resource, player.resources[region.townData.tier - 1]) === true) {
            player.addGold(-gold);
            player.spendResource(resource, region.townData.tier);
            region.townData.increaseTechLevel(tech);
            this._updateStatus();
        }
    }

    _showBuildings(value) {
        this.showBuildings = value;
        this._updateStatus();
    }

    _updateStatus() {
        var region = new WorldData().getCurrentRegion();
        var player = new PlayerData();
        var govBonus = (1 + player.talents.governance.level * 0.03);

        var txt = "Population: " + Math.floor(region.townData.currentPopulation) + "/" + Math.floor(region.townData.maxPopulation) + "\n" +
            "Tax Income: " + Math.floor(region.townData.getTownIncome()) + "g/week\n" +
            "T" + region.townData.tier + " Crafting Cost: " + (Math.floor(player.craftingCosts[region.townData.tier - 1] * 10000) / 100) + "%\n" +
            "Economy: " + Math.floor(region.townData.economyMulti * 100 * govBonus) + "%\n" +
            "Production: " + Math.floor(region.townData.productionMulti * 100) + "%\n" +
            "Bounty Gold: " + Math.floor(region.townData.bountyMulti * 100) + "%";

        this.statsLabel.setText(txt);
        var region = new WorldData().getCurrentRegion();

        for (var i = 0; i < this.buildingDisplays.length; i++) {
            this.buildingDisplays[i].destroy();
        }
        if (this.showBuildings === true) {
            for (var i = 0; i < region.townData.buildings.length; i++) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + i * 120),
                    region.townData.buildings[i], region.townData.tier));
            }
        } else {
            for (var i = 0; i < region.townData.upgrades.length; i++) {
                this.buildingDisplays.push(this._setupTechDisplay(this.relativeX(240), this.relativeY(50 + i * 120),
                    region.townData.upgrades[i], region.townData.tier));
            }
        }
    }

    _endOfDay() {
        this._updateStatus();
    }
}