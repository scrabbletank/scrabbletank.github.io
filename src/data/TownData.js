import { PlayerData } from "./PlayerData";
import { Statics } from "./Statics";
import { ProgressionStore } from "./ProgressionStore";
import { WorldData } from "./WorldData";
import { MoonlightData } from "./MoonlightData";

export class TownData {
    static getTechGoldCost(tech, tier) {
        var vlvl = tech.level;
        var aGold = tech.goldCosts[0];
        var bGold = vlvl * tech.goldCosts[1];
        var cGold = Math.pow(vlvl * tech.goldCosts[2], Statics.RESEARCH_LEVEL_POWER);
        var tGold = Math.pow(Statics.RESEARCH_TIER_POWER, tier - 1);
        return Math.floor(((aGold + bGold + cGold) / 5) * tGold) * 5;
    }
    static getTechResourceCost(tech, tier) {
        var vlvl = tech.level;
        var ret = []
        for (var i = 0; i < tech.resources.length; i++) {
            var aGold = tech.resources[i][0];
            var bGold = vlvl * tech.resources[i][1];
            var cGold = Math.pow(vlvl * tech.resources[i][2], Statics.RESEARCH_LEVEL_POWER);
            var tGold = Math.pow(Statics.RESEARCH_TIER_POWER, tier - 1);
            ret.push(Math.floor(((aGold + bGold + cGold) / 5) * tGold) * 5);
        }
        return ret;
    }

    constructor(tier) {
        var moonData = new MoonlightData();

        this.currentPopulation = 50;
        this.maxPopulation = 100;
        this.tier = tier;
        this.economyMulti = 1;
        this.bountyMulti = 1;
        this.productionMulti = 1;
        this.exploreMulti = 1;
        this.goldCapBonus = moonData.moonperks.heropouch.level * 100;
        this.baseIncome = Statics.BASE_TAX_INCOME + moonData.moonperks.vault.level * 0.1;

        this.buildings = [
            {
                name: "Forge", level: 0, maxLevel: -1, requires: [],
                goldCosts: [50, 25, 15], resources: [[0, 0, 0], [0, 0, 0], [5, 5, 3], [0, 0, 0], [5, 5, 3], [0, 0, 0]]
            },
            {
                name: "Guilds", level: 0, maxLevel: -1, requires: [],
                goldCosts: [100, 50, 25], resources: [[0, 0, 0], [5, 5, 2], [0, 0, 0], [5, 5, 2], [0, 0, 0], [5, 5, 2]]
            },
            {
                name: "Town Hall", level: 0, maxLevel: -1, requires: [],
                goldCosts: [75, 50, 15], resources: [[10, 5, 5], [0, 0, 0], [0, 0, 0], [0, 0, 0], [5, 5, 3], [0, 0, 0]]
            }
        ];

        this.upgrades = [
            {
                name: "Trade House", level: 0, maxLevel: 1, requires: [],
                goldCosts: [250, 250, 0], resources: [[75, 75, 0], [25, 25, 0], [0, 0, 0], [25, 25, 0], [50, 50, 0], [25, 25, 0]]
            },
            // {
            //     name: "Alchemy Lab", level: 0, maxLevel: 1, requires: [],
            //     goldCosts: [50, 50, 25], resources: [[0, 0, 0], [0, 0, 0], [5, 5, 3], [0, 0, 0], [5, 5, 3], [0, 0, 0]]
            // },
            {
                name: "Tavern", level: 0, maxLevel: 1, requires: [],
                goldCosts: [150, 150, 0], resources: [[100, 100, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [50, 50, 0], [0, 0, 0]]
            },
            {
                name: "Reinforced Houses", level: 0, maxLevel: 5, requires: [],
                goldCosts: [75, 75, 30], resources: [[0, 0, 0], [0, 0, 0], [10, 10, 5], [0, 0, 0], [15, 15, 10], [0, 0, 0]]
            },
            {
                name: "Banking", level: 0, maxLevel: -1, requires: [],
                goldCosts: [20, 20, 15], resources: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [10, 10, 5], [5, 5, 3]]
            },
            {
                name: "Map Making", level: 0, maxLevel: -1, requires: [],
                goldCosts: [25, 25, 15], resources: [[0, 0, 0], [8, 8, 5], [0, 0, 0], [3, 3, 3], [0, 0, 0], [0, 0, 0]]
            }
        ];
    }

    //used for both buildings and upgrades
    increaseTechLevel(tech) {
        tech.level += 1;

        switch (tech.name) {
            case "Forge":
                var player = new PlayerData();
                for (var i = 0; i < this.tier; i++) {
                    player.craftingCosts[i] = player.craftingCosts[i] * Statics.FORGE_REDUCTION;
                }
                break;
            case "Guilds":
                this.productionMulti += 0.1;
                break;
            case "Town Hall":
                this.bountyMulti += 0.1;
                break;
            case "Banking":
                this.economyMulti += 0.05;
                this.goldCapBonus += 250;
                break;
            case "Map Making":
                this.exploreMulti += 0.1;
                break;
            case "Trade House":
                var region = new WorldData().getCurrentRegion();
                region.tradeHouseUnlocked = true;
                break;
            case "Tavern":
                var region = new WorldData().getCurrentRegion();
                region.tavernUnlocked = true;
                break;
        }
    }
    increaseMaxPop(value) {
        this.maxPopulation += value;
    }

    getTownIncome() {
        var player = new PlayerData();
        return Math.floor(this.currentPopulation) * this.baseIncome * this.economyMulti * (1 + player.talents.governance.level * 0.03);
    }
    getGoldCap() {
        var player = new PlayerData();
        return (this.currentPopulation * Statics.GOLDCAP_PER_POP + this.goldCapBonus) * this.economyMulti * (1 + player.talents.governance.level * 0.03);
    }

    endOfDay() {

    }

    endOfWeek() {
        var progression = new ProgressionStore();
        if (progression.unlocks.townTab === true) {
            this.currentPopulation = Math.min(this.maxPopulation, this.currentPopulation * Statics.POPULATION_GROWTH);
            var player = new PlayerData();
            player.addGold(this.getTownIncome());
        }
    }

    save() {
        var saveObj = {
            cp: this.currentPopulation,
            mp: this.maxPopulation,
            t: this.tier,
            em: this.economyMulti,
            bm: this.bountyMulti,
            pm: this.productionMulti,
            exm: this.exploreMulti,
            bi: this.baseIncome,
            bld: this.buildings,
            up: this.upgrades,
            gc: this.goldCapBonus
        }

        return saveObj;
    }
    load(saveObj) {
        this.currentPopulation = saveObj.cp;
        this.maxPopulation = saveObj.mp;
        this.tier = saveObj.t;
        this.economyMulti = saveObj.em;
        this.bountyMulti = saveObj.bm;
        this.productionMulti = saveObj.pm;
        this.exploreMulti = saveObj.exm;
        this.baseIncome = saveObj.bi;
        this.buildings = saveObj.bld;
        this.upgrades = saveObj.up;
        this.goldCapBonus = saveObj.gc;
    }
}