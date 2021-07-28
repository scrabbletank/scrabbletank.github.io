import { BuildingRegistry } from "./BuildingRegistry";
import { WorldData } from "./WorldData";
import { MoonlightData } from "./MoonlightData";
import { Common } from "../utils/Common";
import { Statics } from "./Statics";
import { PlayerData } from "./PlayerData";
import { StarData } from "./StarData";

export const BuildingTypes = {
    PRODUCTION: 0,
    ROAD: 1,
    HOUSE: 2,
    ECON: 3,
    OTHER: 4
}

export class Building {
    constructor(name, regName, tier, buildingType, texture, resourceCosts, goldCost, costMulti) {
        this.name = name;
        this.regName = regName;
        this.tier = tier;
        this.buildingType = buildingType;
        this.texture = texture;
        this.resourceCosts = resourceCosts;
        this.goldCost = goldCost;
        this.costMulti = costMulti;
    }

    increaseCosts() {
        for (var i = 0; i < this.resourceCosts.length; i++) {
            this.resourceCosts[i] = this.resourceCosts[i] * this.costMulti;
        }
        this.goldCost = this.goldCost * this.costMulti;
    }

    save() {
        var saveObj = {
            t: this.tier,
            reg: this.regName
        }

        return saveObj;
    }

    static loadFromFile(saveObj, ver) {
        var bld = BuildingRegistry.getBuildingByName(saveObj.reg);
        for (var i = bld.tier; i <= saveObj.t; i++) {
            bld.increaseCosts();
        }
        bld.tier = saveObj.t;
        return bld;
    }

    static getTooltip(tile, name, tier, potential = false) {
        var region = WorldData.getInstance().getCurrentRegion();
        var def = tile.defense;
        if (potential === true) {
            def += MoonlightData.getInstance().moonperks.hardenedvillagers.level +
                region.townData.upgrades.reinforcedhouses.level;
        }
        var prodBonus = 1 + (def * MoonlightData.getInstance().moonperks.moonlightworkers.level * 0.01);
        var eff = tile.roadBonus * region._getBuildingEfficiency(tile.x, tile.y, potential);
        prodBonus = prodBonus * region.townData.getProductionMulti() * eff *
            (1 + MoonlightData.getInstance().challenges.buildings.completions * 0.1);
        switch (name) {
            case "Lumberyard":
                var prod = tier * tile.yields[0] * prodBonus * PlayerData.getInstance().dungeonBonus.wood;
                return "Produces " + Math.floor(prod * 100) / 100 + " Wood at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Hunter's Lodge":
                var prod = tier * tile.yields[1] * prodBonus * PlayerData.getInstance().dungeonBonus.leather;
                return "Produces " + Math.floor(prod * 100) / 100 + " Leather at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Mine":
                var prod = tier * tile.yields[2] * prodBonus * PlayerData.getInstance().dungeonBonus.metal;
                return "Produces " + Math.floor(prod * 100) / 100 + " Metal at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Herbalist's Hut":
                var prod = tier * tile.yields[3] * prodBonus * PlayerData.getInstance().dungeonBonus.fiber;
                return "Produces " + Math.floor(prod * 100) / 100 + " Fiber at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Quarry":
                var prod = tier * tile.yields[4] * prodBonus * PlayerData.getInstance().dungeonBonus.stone;
                return "Produces " + Math.floor(prod * 100) / 100 + " Stone at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Crystal Loom":
                var prod = tier * tile.yields[5] * prodBonus * PlayerData.getInstance().dungeonBonus.crystal;
                return "Produces " + Math.floor(prod * 100) / 100 + " Crystal at the end of each day. Production at " +
                    Math.floor(eff * 100) + "% based on distance to roads and other buildings.";
            case "Town House":
                if (tile.houseBuildable === true) {
                    var pop = Math.floor((tier * (5 + MoonlightData.getInstance().moonperks.urbanization.level)) *
                        (1 + StarData.getInstance().perks.estate.level * 0.5));
                    return "Increases the Town's max population by " + pop + ".";
                } else {
                    return "This house is too far away from a road and has been abandoned.";
                }
            case "Watch Tower":
                return "Increases the defense of all tiles within 2 tiles of this watch tower by " + (tier * 2) + ".";
            case "Market":
                if (tile.roadBuildable !== true && potential === false) {
                    return "The market is too far from the road. It must be next to a road to increase the economy.";
                }
                var points = []
                for (var i = 0; i < region.markets.length; i++) {
                    points.push({ x: region.markets[i][1], y: region.markets[i][0] });
                }
                var closest = Common.nearestPointInList(tile.x, tile.y, points, true);
                var max = 5 + MoonlightData.getInstance().moonperks.nightmarket.level;
                var bonus = Math.max(0, Math.min(max, (closest[1] / Statics.TRADE_HOUSE_MAX_DISTANCE) * max)) * tier / 100;
                return "Increases the Town's economy by " + Math.floor(bonus * 10000) / 100 + "%, based on distance to " +
                    "the Town and other Markets.";
            case "Tavern":
                var maxDist = 1 + MoonlightData.getInstance().moonperks.moonwine.level;
                var bonus = 0;
                var pop = 0;
                for (var y = Math.max(0, tile.y - maxDist); y < Math.min(region.height, tile.y + maxDist + 1); y++) {
                    for (var x = Math.max(0, tile.x - maxDist); x < Math.min(region.width, tile.x + maxDist + 1); x++) {
                        if (Math.abs(y - tile.y) + Math.abs(x - tile.x) <= maxDist &&
                            region.map[y][x].building !== undefined && region.map[y][x].building.name === "Town House" &&
                            region.map[y][x].houseBuildable === true) {
                            bonus += 0.02;
                            pop += 1;
                        }
                    }
                }
                return "Increases the Town's population by " + pop + " and economy by " + Math.floor(tier * bonus * 100) + "%, based on nearby Town Houses.";
            case "Road":
                var disconnectedText = tile.roadConnected === true || potential === true ? "" : " This road is disconnected and gives no bonuses."
                return "Most buildings must be built adjacent to roads. Production buildings get a boost being adjacent to a road, and " +
                    "produce nothing when more than " + tier + " tiles away." + disconnectedText;
            case "Docks":
                var dockEff = region._getDockEfficiency(tile.x, tile.y, potential);
                var bonus = tier * Statics.DOCK_BASE_ECON * region.townData.getEconomyMulti() * dockEff;
                return "Docks don't need roads and enables roads to be built beside them. Increases gold earned per week by " +
                    Math.floor(bonus) + ".";
            case "Alchemy Lab":
                var drain = [1, 5, 13, 33, 77];
                var gain = [0.05, 0.3, 0.9, 3, 8];
                var amount = Math.floor(gain[tier - 1] * (1 + MoonlightData.getInstance().moonperks.mysticcauldron.level * 0.1) * 100) / 100;
                return "Through strange magic converts " + drain[tier - 1] + " of all resources into " + amount + " of resources " +
                    "of the next highest tier each day.";
            case "Warehouse":
                var bonus = tier * 20;
                return "Stores goods for transport, increasing production of nearby buildings by " + bonus + "%.";
            case "Dojo":
                if (tile.houseBuildable === false) {
                    return "Villagers once trained here, but now it is abandoned, waiting for a road to reach it."
                }
                var moonBonus = (1 + MoonlightData.getInstance().moonperks.devotion.level * 0.1) *
                    (1 + MoonlightData.getInstance().moonperks.ninja.level * 0.25);
                var pow = tier * 0.05 * region.townData.villagerPowerMulti * moonBonus;
                var def = tier * 0.5 * region.townData.villagerPowerMulti * moonBonus;
                return "A place for your villagers to train. Each week it permanently increases Villager Power by " + Math.floor(pow * 100) / 100 + " and " +
                    "Villager Health by " + Math.floor(def * 100) / 100 + ".";
        }
    }
}