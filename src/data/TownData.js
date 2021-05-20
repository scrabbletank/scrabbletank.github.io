import { PlayerData } from "./PlayerData";
import { Statics } from "./Statics";
import { WorldData } from "./WorldData";
import { MoonlightData } from "./MoonlightData";
import { DynamicSettings } from "./DynamicSettings";
import { ProgressionStore } from "./ProgressionStore";
import { Dungeon } from "./Dungeon";

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
    static calcFriendshipToLevel(level) {
        var scalePower = Statics.FRIENDSHIP_POWER - (0.015 * MoonlightData.getInstance().challenges.outcast.completions);
        return Statics.FRIENDSHIP_BASE + Math.floor(Math.pow(level * Statics.FRIENDSHIP_FLAT, scalePower) /
            Statics.FRIENDSHIP_FLAT) * Statics.FRIENDSHIP_FLAT;
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
        this.alchemyEnabled = false;
        this.friendship = 0;
        this.friendshipLevel = 0;
        this.friendshipToNext = 25;
        this.tilesExplored = 0;
        this.nightLabourActive = false;

        // dungeon variables
        this.villagerPower = 30;
        this.villagerHealth = 120;
        this.villagerPowerMulti = 1;
        this.villagerHealthMulti = 1;
        this.dungeons = [];

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

        if (ProgressionStore.getInstance().persistentUnlocks.dungeons === true) {
            this.buildings.barracks = {
                name: "Barracks", level: 0, maxLevel: -1, requires: [],
                goldCosts: [50, 30, 15], resources: [[15, 10, 8], [0, 0, 0], [0, 0, 0], [0, 0, 0], [10, 10, 5], [0, 0, 0]]
            }
            this.buildings.armory = {
                name: "Armory", level: 0, maxLevel: -1, requires: [],
                goldCosts: [50, 30, 15], resources: [[15, 10, 8], [0, 0, 0], [0, 0, 0], [0, 0, 0], [10, 10, 5], [0, 0, 0]]
            }
        }

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
                PlayerData.getInstance().reduceCraftingCosts(this.tier, Statics.FORGE_REDUCTION);
                break;
            case "Guilds":
                this.productionMulti += 0.1;
                break;
            case "Town Hall":
                this.bountyMulti += 0.1;
                break;
            case "Reinforced Houses":
                this.townDefenseBonus += 1;
                WorldData.getInstance().getCurrentRegion().handleReinforcedHouses();
                break;
            case "Banking":
                this.economyMulti += 0.05;
                this.goldCapBonus += 50;
                break;
            case "Map Making":
                this.exploreMulti += 0.1;
                break;
            case "Barracks":
                this.villagerPowerMulti += 0.2;
                break;
            case "Armory":
                this.villagerHealthMulti += 0.2;
                break;
        }
    }

    calculateEconMulti(bonus) {
        this.economyMulti = 1 + bonus + (this.upgrades.banking.level * 0.05);
    }
    getTownIncome() {
        var player = new PlayerData();
        return (Math.floor(this.currentPopulation) * this.baseIncome + this.buildingIncome) *
            this.economyMulti * (1 + player.getTalentLevel("governance") * 0.04);
    }
    getGoldCap() {
        var player = new PlayerData();
        var exploreBonus = MoonlightData.getInstance().moonperks.crownlands.level * 2;
        return (this.currentPopulation * Statics.GOLDCAP_PER_POP + this.goldCapBonus + exploreBonus) *
            this.economyMulti * (1 + player.getTalentLevel("governance") * 0.04);
    }
    getProductionMulti() {
        var nightLabourBonus = this.nightLabourActive === true ? (1 + 0.1 * MoonlightData.getInstance().moonperks.nightlabour.level) : 1;
        var multi = this.productionMulti *
            (1 + this.friendshipLevel * 0.01 * MoonlightData.getInstance().moonperks.motivatedlabor.level) *
            nightLabourBonus * DynamicSettings.getInstance().productionMulti;
        if (DynamicSettings.getInstance().friendshipToProduction === true) {
            return multi + this.friendshipLevel * 0.05;
        } else {
            return multi;
        }
    }
    getMaxPopulation() { return this.maxPopulation; }
    getMarketLevel() { return this.upgrades.market.level; }
    getTavernLevel() { return this.upgrades.tavern.level; }
    getVillagerPower() {
        return Math.round(this.villagerPower * this.villagerPowerMulti *
            (1 + MoonlightData.getInstance().moonperks.devotion.level * 0.25));
    }
    getVillagerHealth() {
        return Math.round(this.villagerHealth * this.villagerHealthMulti *
            (1 + MoonlightData.getInstance().moonperks.devotion.level * 0.25));
    }
    getArmySize() { return Math.ceil(this.currentPopulation * 0.1); }

    setMaxPopulation(pop) {
        this.maxPopulation = pop;
    }
    setTilesExplored(explored) {
        this.tilesExplored = explored;
    }

    addFriendship(value) {
        this.friendship += value;
        if (this.friendship >= this.friendshipToNext) {
            this.friendshipLevel += 1;
            this.friendshipToNext = TownData.calcFriendshipToLevel(this.friendshipLevel);
        }
    }
    spendFriendship(value) {
        this.friendship = Math.max(0, this.friendship - value);
        for (var i = 0; i < this.friendshipLevel; i++) {
            var temp = TownData.calcFriendshipToLevel(i);
            if (this.friendship < temp) {
                this.friendshipLevel = i;
                this.friendshipToNext = temp;
                break;
            }
        }
    }
    getFriendshipBonus() {
        return 1 + (this.friendshipLevel * Statics.FRIENDSHIP_SHADE_BONUS);
    }
    toggleNightLabour() {
        if (this.nightLabourActive === true) {
            this.baseIncome = Statics.BASE_TAX_INCOME + MoonlightData.getInstance().moonperks.vault.level * 0.1;
            this.nightLabourActive = false;
        } else {
            this.baseIncome = (Statics.BASE_TAX_INCOME + MoonlightData.getInstance().moonperks.vault.level * 0.1) / 2;
            this.nightLabourActive = true;
        }
    }

    killPopulation(value) {
        this.currentPopulation = Math.max(0, this.currentPopulation - value);
    }

    uncoverDungeon(region) {
        if (this.dungeons.length >= 3) {
            return;
        }
        var tier = this.dungeons.length;
        var lvl = region.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease + 5 + tier * 5;
        var difficulty = Math.floor((1 + lvl) * Math.pow(Statics.MONSTER_STATSCALE_PER_LEVEL, lvl) *
            Math.pow(Statics.MONSTER_STATSCALE_PER_REGION, region.regionLevel));
        this.dungeons.push(new Dungeon(lvl, difficulty, tier, region.regionLevel, 5 + tier * 5));
    }

    chooseReward(reward) {
        switch (reward.type) {
            case Statics.DUNGEON.RESOURCES:
                return "A stockpile of resources, enough for exactly " + reward.amount + " days of average production for all resources!";
            case Statics.DUNGEON.SHADE:
                return "You thought it was just a shadow, but it's really " + Common.numberString(reward.amount) + " of Shade. Nice!";
            case Statics.DUNGEON.MOTES:
                return "The final monster barfed up " + Common.numberString(reward.amount) + " Motes of Darkness.";
            case Statics.DUNGEON.GOLD:
                return "A 'Dragons Horde' worth of gold, or " + Common.numberString(reward.amount) + " pieces.";
            case Statics.DUNGEON.GEAR_LEVELS:
                return "Your not really sure how, but get " + Common.numberString(reward.amount) + " levels to your equiped gear.";
            case Statics.DUNGEON.RUNES:
                return "The monsters were guarding " + Common.numberString(reward.amount) + " random Runes. Nice!";
            case Statics.DUNGEON.WOOD:
                return "A design for a sweet woodcutting axe. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.LEATHER:
                return "A design for a sweet skinning knife. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.METAL:
                return "A design for a sweet pickaxe. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.FIBER:
                return "A design for a sweet loom.. thing? Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.STONE:
                return "A design for a sweet stone cutter. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.CRYSTAL:
                return "A design for a sweet crystal spinner. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.PRODUCTION:
                return "Some mysterious device that keeps spinning. Apparently it can increase production by " +
                    Math.floor(reward.amount * 100) + "%, but only in this town.";
            case Statics.DUNGEON.ECONOMY:
                return "Nothing. But some villagers came up with an idea to turn this into a tourist trap, increasing the economy by " +
                    Math.floor(reward.amount * 100) + "%, but only in this town.";
            case Statics.DUNGEON.STRENGTH:
                return "A Swoling Potion. Increases your Strength by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.DEXTERITY:
                return "A Manual depecting all the ways to stab someone. Increases your Dexterity by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.AGILITY:
                return "A Potion of Moving Real Fast. Increases your Agility by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.ENDURANCE:
                return "Literally just steroids. Increases your Endurance by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.RECOVERY:
                return "Magical healing goop. Increases your Recovery by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.DEFENSE:
                return "A Potion of Hardening. Kinky! Increases your Defense by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.ACCURACY:
                return "A Magical Laser Pointer. Increases your Accuracy by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.CRIT_CHANCE:
                return "A Lucky Rock! Increases your Crit Chance by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.MOONLIGHT:
                return "Moon Dust. Increases Moonlight earned this rebirth by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.TALENTS:
                return "A wise old man who says he can teach you how to earn " + Math.floor(reward.amount * 100) + " talent points.";
            case Statics.DUNGEON.PERM_VPOWER:
                return "Body oil that makes the villagers muscles glisten, permanently increasing Villager Power by " + reward.amount + ".";
            case Statics.DUNGEON.PERM_VHEALTH:
                return "A pot of dubious looking stew, permanently increasing Villager Health by " + reward.amount + ".";
        }
    }


    endOfDay() {

    }

    endOfWeek() {
        if (this.townExplored === true) {
            if (this.currentPopulation > this.maxPopulation) {
                this.currentPopulation = Math.max(this.getMaxPopulation(), this.currentPopulation * 0.9);
            } else {
                this.currentPopulation = Math.min(this.getMaxPopulation(), this.currentPopulation * Statics.POPULATION_GROWTH);
            }
            PlayerData.getInstance().addGold(this.getTownIncome());
            PlayerData.getInstance().addShade(this.currentPopulation * 0.1 *
                MoonlightData.getInstance().moonperks.shadow3.level * MoonlightData.getInstance().getShadowBonus());
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
        var dungeons = [];
        for (var i = 0; i < this.dungeons.length; i++) {
            dungeons.push(this.dungeons[i].save());
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
            dng: dungeons,
            gc: this.goldCapBonus,
            te: this.townExplored,
            re: this.researchEnabled,
            fr: this.friendship,
            frl: this.friendshipLevel,
            alc: this.alchemyEnabled,
            tl: this.tilesExplored
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
        this.friendship = saveObj.fr;
        this.friendshipLevel = saveObj.frl;
        this.alchemyEnabled = saveObj.alc;
        this.tilesExplored = saveObj.tl ? saveObj.tl : 0;
        this.friendshipToNext = TownData.calcFriendshipToLevel(this.friendshipLevel);
        for (var i = 0; i < saveObj.bld.length; i++) {
            this.buildings[saveObj.bld[i][0]].level = saveObj.bld[i][1];
        }
        for (var i = 0; i < saveObj.up.length; i++) {
            this.upgrades[saveObj.up[i][0]].level = saveObj.up[i][1];
        }
        if (saveObj.dng !== undefined) {
            for (var i = 0; i < saveObj.dng.length; i++) {
                this.dungeons.push(Dungeon.loadFromFile(saveObj.dng[i], ver));
            }
        }
        this.currentPopulation = 150;
    }
}