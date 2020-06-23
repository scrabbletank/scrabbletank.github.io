
// MAP GEN
// 11x11 or bigger? maps
// each region is of a specific biome with different resource weights
// map is made by generating a set number of points based on biome,
// each point has a different terrain and strength
// run two way veronoi diagram to determine which tile becomes which terrain
// randomly place points with different difficulties, run veronoi diagram
// for tile difficulty
// add a town and difficulty point of 0, also add a start point within 3 tiles of
// town with a difficulty of -2, player starts in easiest location.

import { Common } from './../utils/Common';
import { Statics } from './../data/Statics';
import { CreatureRegistry } from './../data/CreatureRegistry';
import { TownData } from './TownData';
import { PlayerData } from './PlayerData';
import { MoonlightData } from './MoonlightData';
import { RegionRegistry } from './RegionRegistry';
import { Building } from './Building';
import { DynamicSettings } from './DynamicSettings';
import { BuildingRegistry } from './BuildingRegistry';

class TileData {

    constructor(color = 0x00ff00, x = 0, y = 0) {
        //variables to save
        this.regName = "plains";
        this.explored = false;
        this.revealed = false;
        this.difficulty = 0;
        this.amountExplored = 0;
        this.isInvaded = false;
        this.invasionPower = 0;
        this.invasionFights = 0;
        this.building = undefined;
        this.fightCooldown = Statics.COMBAT_COOLDOWN;
        this.defense = 0;
        this.x = x;
        this.y = y;
        //variables not saved
        this.name = "";
        this.exploreSpeed = 1; //can be calculated on the fly
        this.color = color; //can be determined from name
        this.borderColor = 0xffffff;
        this.explorationNeeded = 1000; //got from name
        this.enemies = []; //name
        this.yields = [];
        this.roadDist = -1;
        this.roadBonus = 0;
        this.roadBuildable = false;
        this.dockBuildable = false;
        this.houseBuildable = false;
    }

    save() {
        var saveObj = {
            exp: this.explored,
            rev: this.revealed,
            dif: this.difficulty,
            rn: this.regName,
            ae: this.amountExplored,
            in: this.isInvaded,
            ip: this.invasionPower,
            if: this.invasionFights,
            bld: this.building === undefined ? "" : this.building.save(),
            def: this.defense,
            fcd: this.fightCooldown,
            x: this.x,
            y: this.y
        }

        return saveObj;
    }
    static loadFromSave(saveObj, ver) {
        var tile = new TileData();

        tile.regName = saveObj.rn;
        tile.explored = saveObj.exp;
        tile.revealed = saveObj.rev;
        tile.difficulty = saveObj.dif;
        tile.amountExplored = saveObj.ae;
        tile.isInvaded = saveObj.in;
        tile.invasionPower = saveObj.ip;
        tile.invasionFights = saveObj.if;
        tile.building = saveObj.bld === "" ? undefined : Building.loadFromFile(saveObj.bld, ver);
        tile.defense = saveObj.def;
        tile.fightCooldown = saveObj.fcd;
        tile.x = saveObj.x;
        tile.y = saveObj.y;

        return tile;
    }

    init(regName, difficulty, baseDifficulty) {
        var tileType = RegionRegistry.TILE_TYPES[regName];
        this.regName = regName;
        this.difficulty = difficulty;
        this.exploreSpeed = 1 + difficulty * Statics.EXPLORE_MULTIPLIER;
        this.color = tileType.clr;
        this.name = tileType.name;
        this.enemies = tileType.enemies;
        this.explorationNeeded = tileType.explorationNeeded;
        var d = Math.min(1, (Math.max(0, difficulty - baseDifficulty) / 20));
        this.borderColor = Phaser.Display.Color.GetColor(255, 255 - (d > 0.5 ? 255 * (d - 0.5) * 2 : 0), 255 - Math.min(255, (255 * d * 2)));
        this.yields = [];
        for (var i = 0; i < tileType.yields.length; i++) {
            this.yields.push({
                type: tileType.yields[i].type,
                tier: Math.min(8, Math.max(1, Math.floor(difficulty / 20))),
                rate: tileType.yields[i].rate
            });
        }
    }

    sighting() {
        this.isInvaded = true;
        this.invasionPower = 0;
        this.invasionFights = 5;
    }

    invade() {
        this.isInvaded = false;
        this.invasionPower = 0;
        this.amountExplored = 0;
        this.invasionFights = 0;
        this.explored = false;
        this.revealed = true;
    }

    getInvasionMulti() { return Math.min(5, Math.floor(Math.max(0, Math.log2(this.invasionPower / Statics.SIGHTING_DIVIDER)))); }

    explore(delta) {
        this.amountExplored += delta / this.exploreSpeed;
    }
    incInvasionPower(baseline) {
        if (this.getInvasionMulti() < 5) {
            var def = baseline + this.defense;
            var powerMulti = Math.max(0.1, 1 + (this.difficulty - def) * 0.1);
            this.invasionPower += Statics.TIME_PER_DAY * powerMulti;
        }
    }

    generateMonsters() {
        var enemyList = [];
        if (this.isInvaded === true) {
            var bossDif = this.difficulty + this.getInvasionMulti();
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)], bossDif));
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)], this.difficulty - 1));
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)], this.difficulty - 1));
        } else {
            var min = this.difficulty < 30 ? 1 : 2;
            var max = (this.difficulty < 5 ? 2 : 3) + (this.difficulty > 15 ? 1 : 0)
            var numCreatures = this.difficulty > 0 ? Common.randint(min, max) : 1;

            for (var i = 0; i < numCreatures; i++) {
                var num = Common.randint(0, this.enemies.length);
                enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[num], this.difficulty));
            }
        }

        return enemyList;
    }
}

export class Region {
    constructor(width = 8, height = 8, regionLevel, regionType, ignoreGen = false) {
        //non-save variables
        this.tileChangedHandler = undefined;
        this.resourcesPerDay = [0, 0, 0, 0, 0, 0];
        this.taverns = [];
        this.roads = [];
        this.markets = [];
        this.productionBuildings = [];

        if (ignoreGen === true) {
            return true;
        }
        //save variables
        this.width = width;
        this.height = height;
        this.regionLevel = regionLevel;
        this.townData = new TownData(regionLevel + 1);
        this.tilesExplored = 0;
        this.sightings = [];
        this.sightingsDelay = 0;
        this.invasionCounter = 0;
        this.worldHeight = 350;
        this.type = regionType;
        this.map = []
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var t = 0; t < width; t++) {
                row.push(new TileData(0x000000, t, i));
            }
            this.map.push(row);
        }

        var points = [];
        for (var i = 0; i < RegionRegistry.REGION_TYPES[regionType].points.length; i++) {
            var def = RegionRegistry.REGION_TYPES[regionType].points[i];
            for (var s = 0; s < def.amount; s++) {
                points.push({
                    x: Common.randint(0, width), y: Common.randint(0, height),
                    power: Common.randint(def.power[0], def.power[1]), terrainData: def.terrain
                });
            }
        }

        this.generateTerrain(points);
        this._init();
    }

    save() {
        var tileSave = [];
        for (var i = 0; i < this.height; i++) {
            var row = [];
            for (var t = 0; t < this.width; t++) {
                row.push(this.map[i][t].save());
            }
            tileSave.push(row);
        }
        var saveObj = {
            w: this.width,
            h: this.height,
            rl: this.regionLevel,
            td: this.townData.save(),
            te: this.tilesExplored,
            map: tileSave,
            sight: this.sightings,
            sd: this.sightingsDelay,
            ic: this.invasionCounter,
            wh: this.worldHeight,
            type: this.type
        }

        return saveObj;
    }

    static loadFromSave(saveObj, ver) {
        var region = new Region(0, 0, 0, "temperate", true);

        region.width = saveObj.w;
        region.height = saveObj.h;
        region.regionLevel = saveObj.rl;
        region.townData = new TownData(1);
        region.townData.load(saveObj.td);
        region.tilesExplored = saveObj.te;
        region.sightings = saveObj.sight;
        region.sightingsDelay = saveObj.sd;
        region.invasionCounter = saveObj.ic;
        region.worldHeight = saveObj.wh;
        region.type = saveObj.type;
        region.map = []
        for (var i = 0; i < saveObj.map.length; i++) {
            var row = [];
            for (var t = 0; t < saveObj.map[i].length; t++) {
                var tile = TileData.loadFromSave(saveObj.map[i][t], ver);
                tile.init(tile.regName, tile.difficulty, this.regionLevel * DynamicSettings.instance.regionDifficultyIncrease);
                row.push(tile);
            }
            region.map.push(row);
        }

        region._init();

        return region;
    }

    generateTerrain(pointList) {
        var minDiff = this.regionLevel * DynamicSettings.instance.regionDifficultyIncrease;
        var maxDiff = minDiff + DynamicSettings.instance.regionDifficultyIncrease;
        // spawn point is always within 2 tiles of town (ignoring north points)
        var townPoint = [Math.floor(this.width / 2), this.height - 3]
        var spawnPoint = [townPoint[0] + Math.floor(Math.random() * 2)]
        spawnPoint.push(townPoint[1] + 2 - Math.abs(townPoint[0] - spawnPoint[0]));

        var difficultyNodes = []
        difficultyNodes.push({ x: townPoint[0], y: townPoint[1], power: minDiff - 2 });
        difficultyNodes.push({ x: spawnPoint[0], y: spawnPoint[1], power: minDiff - 4 });

        for (var i = 0; i < 8; i++) {
            var x = Common.randint(0, this.width);
            var y = Common.randint(0, this.height);
            while (Common.pointInList(x, y, difficultyNodes)) {
                x = Common.randint(0, this.width);
                y = Common.randint(0, this.height);
            }
            var basePow = minDiff + ((Common.getDistance(x, y, townPoint[0], townPoint[1]) / (this.height * 0.70)) *
                DynamicSettings.instance.regionDifficultyIncrease);
            difficultyNodes.push(
                {
                    x: x,
                    y: y,
                    power: basePow + Common.randint(-4, 4)
                });
        }

        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                // terrain type
                var cIdx = Common.nearestPointsInList(t, i, pointList, 2);
                var powA = pointList[cIdx[0][0]].power / (1 + cIdx[0][1]);
                var powB = pointList[cIdx[1][0]].power / (1 + cIdx[1][1]);
                var terrainData = undefined;
                if (powA > powB) {
                    terrainData = pointList[cIdx[0][0]].terrainData;
                } else {
                    terrainData = pointList[cIdx[1][0]].terrainData;
                }
                // difficulty
                cIdx = Common.nearestPointInList(t, i, difficultyNodes);
                // because the location of the town is somewhat centered we multiply the height by 0.66 to make the difficulty more in line
                // with the difficulty range.
                var base = minDiff + ((Common.getDistance(t, i, townPoint[0], townPoint[1]) / (this.height * 0.79)) *
                    DynamicSettings.instance.regionDifficultyIncrease);
                var difficulty = Math.max(minDiff,
                    Math.min(maxDiff - 1, Math.floor(base + (difficultyNodes[cIdx[0]].power - base) / (2 + cIdx[1]))));
                this.map[i][t].init(terrainData, difficulty, minDiff);
            }
        }

        //find a place to put the mystic gate, either randomly in a spot max difficulty or above, or at highest difficulty place otherwise
        var mysticGateSpots = [];
        var max = 0;
        var maxPos = [0, 0];
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                if (this.map[i][t].difficulty >= maxDiff - 1) {
                    mysticGateSpots.push([i, t]);
                }
                if (this.map[i][t].difficulty > max) {
                    maxPos[0] = i;
                    maxPos[1] = t;
                    max = this.map[i][t].difficulty;
                }
            }
        }
        mysticGateSpots.push(maxPos);
        var gatePos = mysticGateSpots[Common.randint(0, mysticGateSpots.length)];
        this.map[gatePos[0]][gatePos[1]].init("mysticgate", maxDiff, minDiff);

        this.map[townPoint[1]][townPoint[0]].init("town", minDiff, minDiff);
        this.map[townPoint[1]][townPoint[0]].building = BuildingRegistry.getBuildingByName("town");
        this.placeBuilding(townPoint[0], townPoint[1], BuildingRegistry.getBuildingByName("town"));
        this.map[spawnPoint[1]][spawnPoint[0]].revealed = true;
    }

    onTileChanged(callback) {
        this.tileChangedHandler = callback;
    }
    removeTileChanged() {
        this.tileChangedHandler = undefined;
    }
    _onTileChanged(tile) {
        if (this.tileChangedHandler !== undefined) {
            this.tileChangedHandler(tile);
        }
    }

    getExplorePercent() {
        return this.tilesExplored / (this.width * this.height);
    }
    isExplorable(x, y) {
        return this.map[y][x].revealed;
    }

    exploreTile(x, y) {
        if (this.map[y][x].revealed === true) {
            this.tilesExplored += 1;
            this.map[y][x].explored = true;
            if (this.map[y][x].name === "Town") {
                this.townData.townExplored = true;
            }
            if (this.tilesExplored >= 10) {
                this.townData.researchEnabled = true;
            }
            if (y > 0) {
                this.map[y - 1][x].revealed = true;
                this._onTileChanged(this.map[y - 1][x]);
            }
            if (y < this.height - 1) {
                this.map[y + 1][x].revealed = true;
                this._onTileChanged(this.map[y + 1][x]);
            }
            if (x > 0) {
                this.map[y][x - 1].revealed = true;
                this._onTileChanged(this.map[y][x - 1]);
            }
            if (x < this.width - 1) {
                this.map[y][x + 1].revealed = true;
                this._onTileChanged(this.map[y][x + 1]);
            }
        }
        this._onTileChanged(this.map[y][x]);
        return this.map[y][x];
    }

    _invade() {
        this.invasionCounter = 0;
        var tile = this.sightings[Common.randint(0, this.sightings.length)];
        this.map[tile[0]][tile[1]].invade();
        if (this.map[tile[0]][tile[1]].building != undefined) {
            this.destroyBuilding(tile[1], tile[0]);
        }
        this.townData.currentPopulation = this.townData.currentPopulation * Statics.POP_MULTI_AFTER_INVASION;
        this.tilesExplored -= 1;
        this.endSighting(tile[1], tile[0]);
    }

    _addSighting() {
        var a = Math.min(Statics.MIN_SIGHTING_SECONDS * (1 + this.sightings.length * Statics.SIGHTING_MULTI_PER_SIGHTING), Statics.MAX_SIGHTING_SECONDS);
        var b = Math.min(a * 2, Statics.MAX_SIGHTING_SECONDS);
        this.sightingsDelay = Common.randint(a, b) * 1000;
        var invadeList = [];
        for (var y = 1; y < this.height - 1; y++) {
            for (var x = 1; x < this.width - 1; x++) {
                if (this.map[y][x].explored === false || this.map[y][x].name === "Town" || this.map[y][x].name === "Mystic Gate") {
                    continue;
                }
                var canInvade = false;
                for (var i = -1; i < 2; i++) {
                    for (var s = -1; s < 2; s++) {
                        if (this.map[y + i][x + s].revealed === true && this.map[y + i][x + s].explored === false) {
                            canInvade = true;
                        }
                    }
                }
                if (canInvade === true) {
                    invadeList.push([y, x]);
                }
            }
        }

        if (invadeList.length <= 0) {
            return;
        }
        var tile = invadeList[Common.randint(0, invadeList.length)];
        this.sightings.push(tile);
        this.map[tile[0]][tile[1]].sighting();
    }

    endSighting(x, y) {
        this.map[y][x].isInvaded = false;
        this.map[y][x].invasionPower = 0;
        this.invasionCounter = Math.max(0, this.invasionCounter - Statics.INVASION_REDUCTION_FROM_SIGHTING);

        this.sightings = this.sightings.filter(s => this.map[s[0]][s[1]].isInvaded === true);
        this._onTileChanged(this.map[y][x]);
    }

    _canDock(x, y) {
        return ((y > 0 && this.map[y - 1][x].name != this.map[y][x].name) ||
            (y < this.height - 1 && this.map[y + 1][x].name != this.map[y][x].name) ||
            (x > 0 && this.map[y][x - 1].name != this.map[y][x].name) ||
            (x < this.width - 1 && this.map[y][x + 1].name != this.map[y][x].name));
    }
    _init() {
        this.roads = [];
        this.markets = [{ x: Math.floor(this.width / 2), y: this.height - 3 }];
        this.taverns = [];
        this.productionBuildings = [];

        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                if (this.map[i][t].building !== undefined) {
                    if (this.map[i][t].building.name === "Road" || this.map[i][t].building.name === "Town") {
                        this.roads.push([i, t]);
                    } else if (this.map[i][t].building.name === "Market") {
                        this.markets.push({ x: t, y: i });
                    } else if (this.map[i][t].building.name === "Tavern") {
                        this.taverns.push([i, t]);
                    } else if (this.map[i][t].building.name !== "Town House") {
                        this.productionBuildings.push([i, t]);
                    }
                }
                if (this.map[i][t].name === "Lake" || this.map[i][t].name === "Oasis") {
                    this.map[i][t].dockBuildable = this._canDock(t, i);
                }
            }
        }

        this._calculateTileBonuses();
    }

    _calculateTileBonuses() {
        //reset tile information
        var econBonus = 0;
        var tavernPop = 0;
        this.townData.buildingIncome = 0;
        this.resourcesPerDay = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                this.map[i][t].roadDist = -1;
                this.map[i][t].roadBonus = 0;
                this.map[i][t].roadBuildable = false;
                this.map[i][t].houseBuildable = false;
            }
        }
        //calculate road bonuses here
        var roadBonus = [[1, 0.5, 0],
        [1.25, 0.75, 0.25],
        [1.5, 1, 0.5]];
        for (var i = 0; i < this.roads.length; i++) {
            var maxDist = this.map[this.roads[i][0]][this.roads[i][1]].building.tier;
            for (var y = Math.max(0, this.roads[i][0] - maxDist); y < Math.min(this.height, this.roads[i][0] + maxDist + 1); y++) {
                for (var x = Math.max(0, this.roads[i][1] - maxDist); x < Math.min(this.width, this.roads[i][1] + maxDist + 1); x++) {
                    var dist = Math.abs(y - this.roads[i][0]) + Math.abs(x - this.roads[i][1]);
                    if (Math.abs(y - this.roads[i][0]) + Math.abs(x - this.roads[i][1]) <= maxDist) {
                        this.map[y][x].roadDist = this.map[y][x].roadDist === -1 ? dist : Math.min(this.map[y][x].roadDist, dist);
                        this.map[y][x].roadBuildable = this.map[y][x].roadDist <= 1;
                        this.map[y][x].roadBonus = Math.max(this.map[y][x].roadBonus, roadBonus[maxDist - 1][this.map[y][x].roadDist - 1]);
                        this.map[y][x].houseBuildable = Math.abs(y - this.roads[i][0]) <= 1 && Math.abs(x - this.roads[i][1]) <= 1;
                    }
                }
            }
        }
        //set base road tiles just in case town somehow dies?
        var tx = Math.floor(this.width / 2);
        var ty = this.height - 3;
        this.map[ty][tx - 1].roadBuildable = true;
        this.map[ty][tx + 1].roadBuildable = true;
        this.map[ty - 1][tx].roadBuildable = true;
        this.map[ty + 1][tx].roadBuildable = true;

        //get market bonuses
        for (var i = 1; i < this.markets.length; i++) {
            var max = 10 + MoonlightData.instance.moonperks.nightmarket.level;
            var tier = this.map[this.markets[i].y][this.markets[i].x].building.tier;
            var closest = Common.nearestPointInList(this.markets[i].x, this.markets[i].y, this.markets, true);
            econBonus += Math.max(0, Math.min(max, (closest[1] / Statics.TRADE_HOUSE_MAX_DISTANCE) * max)) * tier / 100;
        }
        //get tavern bonuses
        for (var i = 0; i < this.taverns.length; i++) {
            var maxDist = 1 + MoonlightData.instance.moonperks.moonwine.level;
            var bonus = 0;
            var tier = this.map[this.taverns[i][0]][this.taverns[i][1]].building.tier;
            for (var y = Math.max(0, this.roads[i][0] - maxDist); y < Math.min(this.height, this.roads[i][0] + maxDist + 1); y++) {
                for (var x = Math.max(0, this.roads[i][1] - maxDist); x < Math.min(this.width, this.roads[i][1] + maxDist + 1); x++) {
                    if (Math.abs(y - this.roads[i][0]) + Math.abs(x - this.roads[i][1]) <= maxDist &&
                        this.map[y][x].building !== undefined && this.map[y][x].building.name === "Town House") {
                        bonus += 0.02;
                        tavernPop += 1;
                    }
                }
            }
            econBonus += bonus * tier;
        }

        //calculate production bonuses
        for (var i = 0; i < this.productionBuildings.length; i++) {
            var tile = this.map[this.productionBuildings[i][0]][this.productionBuildings[i][1]];
            var prodBonus = 1 + (tile.defense * MoonlightData.instance.moonperks.moonlightworkers.level * 0.01);
            switch (tile.building.name) {
                case "Lumberyard":
                    this.resourcesPerDay[Statics.RESOURCE_WOOD] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_WOOD, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Hunter's Lodge":
                    this.resourcesPerDay[Statics.RESOURCE_LEATHER] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_LEATHER, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Mine":
                    this.resourcesPerDay[Statics.RESOURCE_METAL] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_METAL, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Herbalist's Hut":
                    this.resourcesPerDay[Statics.RESOURCE_FIBER] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_FIBER, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Quarry":
                    this.resourcesPerDay[Statics.RESOURCE_STONE] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_STONE, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Crystal Loom":
                    this.resourcesPerDay[Statics.RESOURCE_CRYSTAL] += tile.building.tier * Common.yieldHelper(Statics.RESOURCE_CRYSTAL, tile.yields) *
                        prodBonus * tile.roadBonus;
                    break;
                case "Docks":
                    this.townData.buildingIncome += 2 * tile.building.tier;
                    if (tile.y > 0) {
                        this.map[tile.y - 1][tile.x].roadBuildable = true;
                    }
                    if (tile.y < this.height - 1) {
                        this.map[tile.y + 1][tile.x].roadBuildable = true;
                    }
                    if (tile.x > 0) {
                        this.map[tile.y][tile.x - 1].roadBuildable = true;
                    }
                    if (tile.x < this.width - 1) {
                        this.map[tile.y][tile.x + 1].roadBuildable = true;
                    }
                    break;
            }
        }
        this.townData.setTavernPopulation(tavernPop);
        this.townData.calculateEconMulti(econBonus);
    }

    _addBuilding(tile) {
        switch (tile.building.name) {
            case "Lumberyard":
            case "Hunter's Lodge":
            case "Mine":
            case "Herbalist's Hut":
            case "Quarry":
            case "Crystal Loom":
            case "Docks":
                this.productionBuildings.push([tile.y, tile.x]);
                break;
            case "Town House":
                this.townData.increaseMaxPop(5 * tile.building.tier);
                break;
            case "Watch Tower":
                for (var y = Math.max(0, tile.y - 2); y < Math.min(this.height, tile.y + 3); y++) {
                    for (var x = Math.max(0, tile.x - 2); x < Math.min(this.width, tile.x + 3); x++) {
                        if (Math.abs(x - tile.x) + Math.abs(y - tile.y) <= 2) {
                            this.map[y][x].defense += 2 * tile.building.tier;
                        }
                    }
                }
                break;
            case "Market":
                this.markets.push({ x: tile.x, y: tile.y });
                break;
            case "Tavern":
                this.taverns.push([tile.y, tile.x]);
                break;
            case "Road":
            case "Town":
                this.roads.push([tile.y, tile.x]);
                break;
        }
    }
    _removeBuilding(tile) {
        switch (tile.building.name) {
            case "Lumberyard":
            case "Hunter's Lodge":
            case "Mine":
            case "Herbalist's Hut":
            case "Quarry":
            case "Crystal Loom":
            case "Docks":
                this.productionBuildings = this.productionBuildings.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Town House":
                this.townData.increaseMaxPop(-5 * tile.building.tier);
                break;
            case "Watch Tower":
                for (var y = Math.max(0, tile.y - 2); y < Math.min(this.height, tile.y + 3); y++) {
                    for (var x = Math.max(0, tile.x - 2); x < Math.min(this.width, tile.x + 3); x++) {
                        if (Math.abs(x - tile.x) + Math.abs(y - tile.y) <= 2) {
                            this.map[y][x].defense -= 2 * tile.building.tier;
                        }
                    }
                }
                break;
            case "Market":
                this.markets = this.markets.filter(p => p.x !== tile.x || p.y !== tile.y);
                break;
            case "Tavern":
                this.taverns = this.taverns.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Road":
                this.roads = this.roads.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
        }
    }

    nextWeakestTile() {
        var pos = [-1, -1];
        var min = this.regionLevel * DynamicSettings.instance.regionDifficultyIncrease + 50;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.map[y][x].explored === false && this.map[y][x].revealed === true &&
                    this.map[y][x].difficulty < min) {
                    pos = [x, y];
                    min = this.map[y][x].difficulty;
                }
            }
        }
        return pos;
    }

    handleReinforcedHouses() {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.map[y][x].building !== undefined) {
                    this.map[y][x].defense += 1;
                }
            }
        }
        this._calculateTileBonuses();
    }

    placeBuilding(x, y, building) {
        this.map[y][x].building = building;
        this.map[y][x].building.increaseCosts();
        this._addBuilding(this.map[y][x]);
        this._calculateTileBonuses();
        this._onTileChanged(this.map[y][x]);
    }
    upgradeBuilding(x, y) {
        this._removeBuilding(this.map[y][x]);
        this.map[y][x].building.tier += 1;
        this.map[y][x].building.increaseCosts();
        this._addBuilding(this.map[y][x]);
        this._calculateTileBonuses();
        this._onTileChanged(this.map[y][x]);
    }
    destroyBuilding(x, y) {
        this._removeBuilding(this.map[y][x]);
        this.map[y][x].building = undefined;
        this._calculateTileBonuses();
        this._onTileChanged(this.map[y][x]);
    }

    update(delta) {
    }

    updateDay() {
        this.townData.endOfDay();
        var player = new PlayerData();

        var resource = [];
        var govBonus = 1 + player.talents.governance.level * 0.03;
        for (var i = 0; i < this.resourcesPerDay.length; i++) {
            resource.push(Math.max(0, this.resourcesPerDay[i] * this.townData.productionMulti * govBonus));
        }
        player.addResource(resource, Math.floor(this.regionLevel));

        if (this.tilesExplored >= 11) {
            this.sightingsDelay -= Statics.TIME_PER_DAY;
            if (this.sightingsDelay <= 0) {
                this._addSighting();
            }
        }
        for (var i = 0; i < this.sightings.length; i++) {
            var s = this.sightings[i];
            //TODO Add ramping strength from land/building
            this.map[s[0]][s[1]].incInvasionPower(this.regionLevel);
            this.invasionCounter += this.map[s[0]][s[1]].getInvasionMulti() * (1 / (1 + player.talents.guardian.level * 0.25));
        }

        if (this.invasionCounter > Statics.INVASION_THRESHOLD) {
            this._invade();
        }
    }

    updateWeek() {
        this.townData.endOfWeek();
    }
}