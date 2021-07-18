import { PlayerData } from "./PlayerData";
import { Statics } from "./Statics";
import { WorldData } from "./WorldData";
import { MoonlightData } from "./MoonlightData";
import { DynamicSettings } from "./DynamicSettings";
import { ProgressionStore } from "./ProgressionStore";
import { Dungeon } from "./Dungeon";
import { RuneRegistry } from "./RuneRegistry";
import { StarData } from "./StarData";
import { RitualData } from "./RitualData";

export class TownData {
    static getTechGoldCost(tech, tier) {
        var vlvl = tech.level;
        var aGold = tech.goldCosts[0];
        var bGold = vlvl * tech.goldCosts[1];
        var cGold = Math.pow(vlvl * tech.goldCosts[2], Statics.RESEARCH_LEVEL_POWER);
        var tGold = Math.pow(Statics.RESEARCH_TIER_POWER, tier - 1);
        return Math.floor(((aGold + bGold + cGold) / 5) * tGold) * 5 *
            (1 - MoonlightData.getInstance().challenges.capitalism.completions * 0.1);
    }
    static getTechResourceCost(tech, tier) {
        var vlvl = tech.level;
        var ret = [];
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

    constructor(tier, resourceTier) {
        var moonData = new MoonlightData();

        this.currentPopulation = 50;
        this.maxPopulation = 100;
        this.tier = tier;
        this.resourceTier = resourceTier;
        this.economyMulti = 1;
        this.bountyMulti = 1;
        this.productionMulti = 1;
        this.exploreMulti = 1;
        this.dungeonEconMulti = 1;
        this.dungeonProdMulti = 1;
        this.townDefenseBonus = 0;
        this.paidProdMulti = 1;
        this.buildingEconBonus = 0;
        this.goldCapBonus = moonData.moonperks.heropouch.level * 100 +
            moonData.challenges.capitalism.completions * 250;
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
        this.villagerPower = PlayerData.getInstance().baseVillagerPower;
        this.villagerHealth = PlayerData.getInstance().baseVillagerHealth;
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
            this.buildings["barracks"] = {
                name: "Barracks", level: 0, maxLevel: -1, requires: [],
                goldCosts: [75, 40, 20], resources: [[25, 15, 10], [0, 0, 0], [0, 0, 0], [20, 10, 8], [0, 0, 0], [0, 0, 0]]
            }
            this.buildings['armory'] = {
                name: "Armory", level: 0, maxLevel: -1, requires: [],
                goldCosts: [75, 40, 20], resources: [[0, 0, 0], [20, 10, 8], [25, 15, 10], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
                PlayerData.getInstance().reduceCraftingCosts(this.resourceTier, Statics.FORGE_REDUCTION);
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
        this.buildingEconBonus = bonus;
    }
    getTownIncome() {
        return (Math.floor(this.currentPopulation) * this.baseIncome + this.buildingIncome) *
            this.getEconomyMulti() / (1 + RitualData.getInstance().activePerks.apathy * 0.5);
    }
    getGoldCap() {
        var exploreBonus = MoonlightData.getInstance().moonperks.crownlands.level * 2 * this.tilesExplored;
        return (this.currentPopulation * Statics.GOLDCAP_PER_POP + this.goldCapBonus + exploreBonus) *
            this.getEconomyMulti();
    }
    getProductionMulti() {
        var nightLabourBonus = this.nightLabourActive === true ? (1 + 0.1 * MoonlightData.getInstance().moonperks.nightlabour.level) : 1;
        var multi = this.productionMulti *
            (1 + this.friendshipLevel * 0.01 * MoonlightData.getInstance().moonperks.motivatedlabor.level) *
            nightLabourBonus * DynamicSettings.getInstance().productionMulti * this.dungeonProdMulti *
            (1 + StarData.getInstance().perks.tools.level * 0.25) * this.paidProdMulti;
        if (DynamicSettings.getInstance().friendshipToProduction === true) {
            return multi + this.friendshipLevel * 0.05;
        } else {
            return multi;
        }
    }
    getEconomyMulti() {
        return (1 + this.buildingEconBonus + (this.upgrades.banking.level * 0.05)) * this.dungeonEconMulti *
            DynamicSettings.getInstance().econMulti * (1 + PlayerData.getInstance().getTalentLevel("governance") * 0.04);
    }
    getMaxPopulation() { return this.maxPopulation * (1 + RitualData.getInstance().activePerks.hatchlings * 0.05); }
    getMarketLevel() { return this.upgrades.market.level; }
    getTavernLevel() { return this.upgrades.tavern.level; }
    getVillagerPower() {
        return Math.round(this.villagerPower * this.villagerPowerMulti *
            (1 + MoonlightData.getInstance().moonperks.devotion.level * 0.25) *
            (1 + RitualData.getInstance().activePerks.culttowns * 0.25) /
            (1 + RitualData.getInstance().activePerks.apathy * 0.5));
    }
    getVillagerHealth() {
        return Math.round(this.villagerHealth * this.villagerHealthMulti *
            (1 + MoonlightData.getInstance().moonperks.devotion.level * 0.25) *
            (1 + RitualData.getInstance().activePerks.culttowns * 0.25) /
            (1 + RitualData.getInstance().activePerks.apathy * 0.5));
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

    areDungeonsComplete() {
        if (this.dungeons.length != 3) {
            return false;
        }
        for (var i = 0; i < this.dungeons.length; i++) {
            if (this.dungeons[i].completedRooms < this.dungeons[i].maxRooms) {
                return false;
            }
        }
        return true;
    }

    chooseReward(reward) {
        switch (reward.type) {
            case Statics.DUNGEON.RESOURCES:
                var region = WorldData.getInstance().getCurrentRegion();
                var res = region.resourcesPerDay;
                var avg = 0;
                for (var i = 0; i < res.length; i++) {
                    avg += res[i];
                }
                avg = Math.ceil(avg / res.length) * reward.amount;
                PlayerData.getInstance().addResource([avg, avg, avg, avg, avg, avg], Math.min(7, region.regionLevel));
                break;
            case Statics.DUNGEON.SHADE:
                PlayerData.getInstance().addShade(reward.amount);
                break;
            case Statics.DUNGEON.MOTES:
                PlayerData.getInstance().addMote(reward.amount);
                break;
            case Statics.DUNGEON.GOLD:
                PlayerData.getInstance().addGold(reward.amount);
                break;
            case Statics.DUNGEON.GEAR_LEVELS:
                var player = PlayerData.getInstance();
                if (player.weapon !== undefined) {
                    var wep = player.weapon;
                    player.unequip(wep.slotType);
                    wep.bringToLevel(wep.level + reward.amount);
                    player.equip(wep);
                }
                if (player.armor !== undefined) {
                    var arm = player.armor;
                    player.unequip(arm.slotType);
                    arm.bringToLevel(arm.level + reward.amount);
                    player.equip(arm);
                }
                if (player.trinket !== undefined) {
                    var trink = player.trinket;
                    player.unequip(trink.slotType);
                    trink.bringToLevel(trink.level + reward.amount);
                    player.equip(trink);
                }
                break;
            case Statics.DUNGEON.RUNES:
                var runeLevel = 1 + Math.floor(WorldData.getInstance().getCurrentRegion().regionLevel / 2);
                for (var i = 0; i < reward.amount; i++) {
                    PlayerData.getInstance().addRune(RuneRegistry.getRandomRuneAtLevel(runeLevel));
                }
                break;
            case Statics.DUNGEON.WOOD:
                PlayerData.getInstance().multiplyDungeonBonus('wood', 1 + reward.amount);
                break;
            case Statics.DUNGEON.LEATHER:
                PlayerData.getInstance().multiplyDungeonBonus('leather', 1 + reward.amount);
                break;
            case Statics.DUNGEON.METAL:
                PlayerData.getInstance().multiplyDungeonBonus('metal', 1 + reward.amount);
                break;
            case Statics.DUNGEON.FIBER:
                PlayerData.getInstance().multiplyDungeonBonus('fiber', 1 + reward.amount);
                break;
            case Statics.DUNGEON.STONE:
                PlayerData.getInstance().multiplyDungeonBonus('stone', 1 + reward.amount);
                break;
            case Statics.DUNGEON.CRYSTAL:
                PlayerData.getInstance().multiplyDungeonBonus('crystal', 1 + reward.amount);
                break;
            case Statics.DUNGEON.PRODUCTION:
                this.dungeonProdMulti += reward.amount;
                break;
            case Statics.DUNGEON.ECONOMY:
                this.dungeonEconMulti += reward.amount;
                break;
            case Statics.DUNGEON.STRENGTH:
                PlayerData.getInstance().multiplyDungeonBonus('strength', 1 + reward.amount);
                break;
            case Statics.DUNGEON.DEXTERITY:
                PlayerData.getInstance().multiplyDungeonBonus('dexterity', 1 + reward.amount);
                break;
            case Statics.DUNGEON.AGILITY:
                PlayerData.getInstance().multiplyDungeonBonus('agility', 1 + reward.amount);
                break;
            case Statics.DUNGEON.ENDURANCE:
                PlayerData.getInstance().multiplyDungeonBonus('endurance', 1 + reward.amount);
                break;
            case Statics.DUNGEON.RECOVERY:
                PlayerData.getInstance().multiplyDungeonBonus('recovery', 1 + reward.amount);
                break;
            case Statics.DUNGEON.DEFENSE:
                PlayerData.getInstance().multiplyDungeonBonus('defense', 1 + reward.amount);
                break;
            case Statics.DUNGEON.ACCURACY:
                PlayerData.getInstance().multiplyDungeonBonus('accuracy', 1 + reward.amount);
                break;
            case Statics.DUNGEON.MOONLIGHT:
                PlayerData.getInstance().multiplyDungeonBonus('moonlight', 1 + reward.amount);
                break;
            case Statics.DUNGEON.TALENTS:
                PlayerData.getInstance().addTalentPoints(reward.amount);
                break;
            case Statics.DUNGEON.PERM_VPOWER:
                PlayerData.getInstance().addBaseVillagerStats(reward.amount, 0);
                break;
            case Statics.DUNGEON.PERM_VHEALTH:
                PlayerData.getInstance().addBaseVillagerStats(0, reward.amount);
                break;
        }
    }


    endOfDay() {

    }

    endOfWeek(region) {
        if (this.townExplored === true) {
            if (this.currentPopulation > this.getMaxPopulation()) {
                this.currentPopulation = Math.max(this.getMaxPopulation(), this.currentPopulation * 0.9);
            } else {
                var growthRate = (Statics.POPULATION_GROWTH + StarData.getInstance().perks.fertility.level * 0.01) *
                    (1 + RitualData.getInstance().activePerks.hatchlings * 0.25) /
                    (1 + RitualData.getInstance().activePerks.apathy * 0.5);
                this.currentPopulation = Math.min(this.getMaxPopulation(), this.currentPopulation * growthRate);
            }
            PlayerData.getInstance().addGold(this.getTownIncome());
            if (DynamicSettings.getInstance().productionBuildingCost > 0) {
                var bldCost = region.getProdBuildingCount() * DynamicSettings.getInstance().productionBuildingCost;
                if (bldCost > PlayerData.getInstance().gold) {
                    this.paidProdMulti = PlayerData.getInstance().gold / bldCost;
                } else {
                    this.paidProdMulti = 1;
                }
                PlayerData.getInstance().addGold(-bldCost);
            }
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
            rt: this.resourceTier,
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
            tl: this.tilesExplored,
            vp: this.villagerPower,
            vpm: this.villagerPowerMulti,
            vh: this.villagerHealth,
            vhm: this.villagerHealthMulti,
            dpm: this.dungeonProdMulti,
            dem: this.dungeonEconMulti,
            ppm: this.paidProdMulti
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
        this.villagerPower = saveObj.vp ? saveObj.vp : 1;
        this.villagerPowerMulti = saveObj.vpm ? saveObj.vpm : 1;
        this.villagerHealth = saveObj.vh ? saveObj.vh : 10;
        this.villagerHealthMulti = saveObj.vhm ? saveObj.vhm : 1;
        this.dungeonProdMulti = saveObj.dpm ? saveObj.dpm : 1;
        this.dungeonEconMulti = saveObj.dem ? saveObj.dem : 1;
        this.paidProdMulti = saveObj.ppm ? saveObj.ppm : 1;
        this.resourceTier = saveObj.rt ? saveObj.rt : this.tier - 1;
        this.friendshipToNext = TownData.calcFriendshipToLevel(this.friendshipLevel);
        for (var i = 0; i < saveObj.bld.length; i++) {
            if (this.buildings[saveObj.bld[i][0]] !== undefined) {
                this.buildings[saveObj.bld[i][0]].level = saveObj.bld[i][1];
            }
        }
        for (var i = 0; i < saveObj.up.length; i++) {
            this.upgrades[saveObj.up[i][0]].level = saveObj.up[i][1];
        }
        if (saveObj.dng !== undefined) {
            for (var i = 0; i < saveObj.dng.length; i++) {
                this.dungeons.push(Dungeon.loadFromFile(saveObj.dng[i], ver));
            }
        }
    }
}