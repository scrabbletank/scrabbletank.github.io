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
        this.townDefenseBonus = 0;
        this.goldCapBonus = moonData.moonperks.heropouch.level * 100;
        this.baseIncome = Statics.BASE_TAX_INCOME + moonData.moonperks.vault.level * 0.1;
        this.buildingIncome = 0;
        this.townExplored = false;
        this.researchEnabled = false;

        this.buildings = {
            forge: {
                name: "Forge", level: 0, maxLevel: -1, requires: [],
                goldCosts: [50, 25, 15], resources: [[0, 0, 0], [0, 0, 0], [10, 10, 5], [0, 0, 0], [10, 10, 5], [0, 0, 0]]
            },
            guilds: {
                name: "Guilds", level: 0, maxLevel: -1, requires: [],
                goldCosts: [100, 50, 25], resources: [[0, 0, 0], [10, 10, 5], [0, 0, 0], [10, 10, 5], [0, 0, 0], [10, 10, 5]]
            },
            townhall: {
                name: "Town Hall", level: 0, maxLevel: -1, requires: [],
                goldCosts: [50, 30, 15], resources: [[15, 10, 8], [0, 0, 0], [0, 0, 0], [0, 0, 0], [10, 10, 5], [0, 0, 0]]
            }
        };

        this.upgrades = {
            reinforcedhouses: {
                name: "Reinforced Houses", level: 0, maxLevel: 5, requires: [],
                goldCosts: [75, 75, 40], resources: [[0, 0, 0], [0, 0, 0], [20, 20, 10], [0, 0, 0], [40, 40, 20], [0, 0, 0]]
            },
            banking: {
                name: "Banking", level: 0, maxLevel: -1, requires: [],
                goldCosts: [20, 20, 15], resources: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [15, 15, 8], [10, 10, 5]]
            },
            mapmaking: {
                name: "Map Making", level: 0, maxLevel: -1, requires: [],
                goldCosts: [25, 25, 15], resources: [[0, 0, 0], [10, 10, 5], [0, 0, 0], [5, 5, 5], [0, 0, 0], [0, 0, 0]]
            },
            tavern: {
                name: "Tavern", level: 0, maxLevel: 3, requires: [],
                goldCosts: [250, 150, 50], resources: [[150, 150, 40], [0, 0, 0], [0, 0, 0], [0, 0, 0], [100, 100, 35], [0, 0, 0]]
            },
            market: {
                name: "Market", level: 0, maxLevel: 3, requires: [],
                goldCosts: [400, 250, 60], resources: [[150, 150, 30], [75, 75, 30], [0, 0, 0], [75, 75, 30], [100, 100, 35], [75, 75, 30]]
            }
        };
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
            case "Reinforced Houses":
                this.townDefenseBonus += 1;
                WorldData.instance.getCurrentRegion().handleReinforcedHouses();
                break;
            case "Banking":
                this.economyMulti += 0.05;
                this.goldCapBonus += 50;
                break;
            case "Map Making":
                this.exploreMulti += 0.1;
                break;
        }
    }
    increaseMaxPop(value) {
        this.maxPopulation += value;
    }

    calculateEconMulti(bonus) {
        this.economyMulti = 1 + bonus + (this.upgrades.banking.level * 0.05);
    }
    getTownIncome() {
        var player = new PlayerData();
        return (Math.floor(this.currentPopulation) * this.baseIncome + this.buildingIncome) *
            this.economyMulti * (1 + player.talents.governance.level * 0.03);
    }
    getGoldCap() {
        var player = new PlayerData();
        return (this.currentPopulation * Statics.GOLDCAP_PER_POP + this.goldCapBonus) * this.economyMulti * (1 + player.talents.governance.level * 0.03);
    }

    endOfDay() {

    }

    endOfWeek() {
        if (this.townExplored === true) {
            this.currentPopulation = Math.min(this.maxPopulation, this.currentPopulation * Statics.POPULATION_GROWTH);
            var player = new PlayerData();
            player.addGold(this.getTownIncome());
        }
    }

    save() {
        var buildings = [];
        for (const prop in this.buildings) {
            buildings.push([prop, this.buildings[prop].level]);
        }
        var upgrades = [];
        for (const prop in this.upgrades) {
            upgrades.push([prop, this.upgrades[prop].level]);
        }
        var saveObj = {
            cp: this.currentPopulation,
            mp: this.maxPopulation,
            t: this.tier,
            em: this.economyMulti,
            bm: this.bountyMulti,
            pm: this.productionMulti,
            exm: this.exploreMulti,
            bi: this.baseIncome,
            bld: buildings,
            up: upgrades,
            gc: this.goldCapBonus,
            te: this.townExplored,
            re: this.researchEnabled
        }

        return saveObj;
    }
    load(saveObj, ver) {
        this.currentPopulation = saveObj.cp;
        this.maxPopulation = saveObj.mp;
        this.tier = saveObj.t;
        this.economyMulti = saveObj.em;
        this.bountyMulti = saveObj.bm;
        this.productionMulti = saveObj.pm;
        this.exploreMulti = saveObj.exm;
        this.baseIncome = saveObj.bi;
        this.goldCapBonus = saveObj.gc;
        this.townExplored = saveObj.te;
        this.researchEnabled = saveObj.re;
        for (var i = 0; i < saveObj.bld.length; i++) {
            this.buildings[saveObj.bld[i][0]].level = saveObj.bld[i][1];
        }
        for (var i = 0; i < saveObj.up.length; i++) {
            this.upgrades[saveObj.up[i][0]].level = saveObj.up[i][1];
        }
    }
}