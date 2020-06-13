
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

class TileData {

    constructor(color = 0x00ff00, x = 0, y = 0) {
        this.color = color;
        this.explored = true;
        this.revealed = true;
        this.difficulty = 0;
        this.name = "";
        this.enemies = [];
        this.amountExplored = 0;
        this.explorationNeeded = 1000;
        this.exploreSpeed = 1;
        this.isInvaded = false;
        this.invasionPower = 0;
        this.yields = [];
        this.building = undefined;
        this.defense = 0;
        this.borderColor = 0xffffff;
        this.fightCooldown = Statics.COMBAT_COOLDOWN;
        this.x = x;
        this.y = y;
    }

    save() {
        var saveObj = {
            clr: this.color,
            bclr: this.borderColor,
            exp: this.explored,
            rev: this.revealed,
            dif: this.difficulty,
            n: this.name,
            enemies: this.enemies,
            ae: this.amountExplored,
            en: this.explorationNeeded,
            es: this.exploreSpeed,
            in: this.isInvaded,
            ip: this.invasionPower,
            yld: this.yields,
            bld: this.building,
            def: this.defense,
            fcd: this.fightCooldown,
            x: this.x,
            y: this.y
        }

        return saveObj;
    }
    static loadFromSave(saveObj) {
        var tile = new TileData();

        tile.color = saveObj.clr;
        tile.borderColor = saveObj.bclr;
        tile.explored = saveObj.exp;
        tile.revealed = saveObj.rev;
        tile.difficulty = saveObj.dif;
        tile.name = saveObj.n;
        tile.enemies = saveObj.enemies;
        tile.amountExplored = saveObj.ae;
        tile.explorationNeeded = saveObj.en;
        tile.exploreSpeed = saveObj.es;
        tile.isInvaded = saveObj.in;
        tile.invasionPower = saveObj.ip;
        tile.yields = saveObj.yld;
        tile.building = saveObj.bld;
        tile.defense = saveObj.def;
        tile.fightCooldown = saveObj.fcd;
        tile.x = saveObj.x;
        tile.y = saveObj.y;

        return tile;
    }

    init(tileType, difficulty, baseDifficulty) {
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
    }

    invade() {
        this.isInvaded = false;
        this.invasionPower = 0;
        this.amountExplored = 0;
        this.explored = false;
        this.revealed = true;
    }

    getInvasionMulti() { return Math.min(5, Math.floor(Math.max(0, Math.log2(this.invasionPower / Statics.SIGHTING_DIVIDER)))); }

    explore(delta) {
        this.amountExplored += delta / this.exploreSpeed;
    }
    incInvasionPower(baseline) {
        if (this.getInvasionMulti() < 5) {
            var defense = baseline + this.defense;
            var powerMulti = Math.max(0.1, 1 + (this.difficulty - defense) * 0.1);
            this.invasionPower += Statics.TIME_PER_DAY * powerMulti;
        }
    }

    //should be called after killing invasion monsters
    decreaseInvasionPower() {
        this.invasionPower = this.invasionPower / Statics.SIGHTING_BATTLE_MULTI;
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
    constructor(width = 8, height = 8, difficultyRange = [0, 20], regionType, ignoreGen = false) {
        if (ignoreGen === true) {
            return true;
        }
        this.name = RegionRegistry.REGION_TYPES[regionType].name;
        this.width = width;
        this.height = height;
        this.difficultyRange = difficultyRange;
        this.townData = new TownData(Math.floor(this.difficultyRange[0] / 20) + 1);
        this.tilesExplored = 0;
        this.map = []
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var t = 0; t < width; t++) {
                row.push(new TileData(0x000000, t, i));
            }
            this.map.push(row);
        }
        this.sightings = [];
        this.sightingsDelay = 0;
        this.invasionCounter = 0;
        this.resourcesPerDay = [0, 0, 0, 0, 0, 0];
        // the town counts as a trade house for calculating bonuses
        this.tradeHouseLocations = [[Math.floor(this.width / 2), this.height - 4]];
        this.tradeHouseBonus = 0;
        this.worldHeight = 350;
        this.type = regionType;

        this.tradeHouseUnlocked = false;
        this.tavernUnlocked = false;

        var points = [];
        for (var i = 0; i < RegionRegistry.REGION_TYPES[regionType].points.length; i++) {
            var def = RegionRegistry.REGION_TYPES[regionType].points[i];
            for (var s = 0; s < def.amount; s++) {
                var tileDef = RegionRegistry.TILE_TYPES[def.terrain];
                points.push({
                    x: Common.randint(0, width), y: Common.randint(0, height),
                    power: Common.randint(def.power[0], def.power[1]), terrainData: tileDef
                });
            }
        }

        this.generateTerrain(points);
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
            dr: this.difficultyRange,
            td: this.townData.save(),
            te: this.tilesExplored,
            map: tileSave,
            sight: this.sightings,
            sd: this.sightingsDelay,
            ic: this.invasionCounter,
            rpd: this.resourcesPerDay,
            thl: this.tradeHouseLocations,
            thb: this.tradeHouseBonus,
            thu: this.tradeHouseUnlocked,
            tu: this.tavernUnlocked,
            wh: this.worldHeight,
            type: this.type
        }

        return saveObj;
    }

    static loadFromSave(saveObj) {
        var region = new Region(0, 0, [0, 0], "temperate", true);

        region.width = saveObj.w;
        region.height = saveObj.h;
        region.difficultyRange = saveObj.dr;
        region.townData = new TownData(1);
        region.townData.load(saveObj.td);
        region.tilesExplored = saveObj.te;
        region.map = []
        for (var i = 0; i < saveObj.map.length; i++) {
            var row = [];
            for (var t = 0; t < saveObj.map[i].length; t++) {
                row.push(TileData.loadFromSave(saveObj.map[i][t]));
            }
            region.map.push(row);
        }
        region.sightings = saveObj.sight;
        region.sightingsDelay = saveObj.sd;
        region.invasionCounter = saveObj.ic;
        region.resourcesPerDay = saveObj.rpd;
        region.tradeHouseLocations = saveObj.thl;
        region.tradeHouseBonus = saveObj.thb;
        region.tradeHouseUnlocked = saveObj.thu;
        region.tavernUnlocked = saveObj.tu;
        region.worldHeight = saveObj.wh;
        region.type = saveObj.type;

        return region;
    }

    generateTerrain(pointList) {
        // for now, town is at 7, 11
        // spawn point is always within 2 tiles of town (ignoring north points)
        var townPoint = [Math.floor(this.width / 2), this.height - 4]
        var spawnPoint = [townPoint[0] + Math.floor(Math.random() * 2)]
        spawnPoint.push(townPoint[1] + 2 - Math.abs(townPoint[0] - spawnPoint[0]));

        var difficultyNodes = []
        difficultyNodes.push({ x: townPoint[0], y: townPoint[1], power: this.difficultyRange[0] - 2 });
        difficultyNodes.push({ x: spawnPoint[0], y: spawnPoint[1], power: this.difficultyRange[0] - 4 });

        for (var i = 0; i < 10; i++) {
            var x = Common.randint(0, this.width);
            var y = Common.randint(0, this.height);
            while (Common.pointInList(x, y, difficultyNodes)) {
                x = Common.randint(0, this.width);
                y = Common.randint(0, this.height);
            }
            var basePow = this.difficultyRange[0] + ((Common.getDistance(x, y, townPoint[0], townPoint[1]) / (this.height * 0.70)) *
                (this.difficultyRange[1] - this.difficultyRange[0]));
            difficultyNodes.push(
                {
                    x: x,
                    y: y,
                    power: basePow + Common.randint(-7, 7)
                });
        }

        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.height; t++) {
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
                var base = this.difficultyRange[0] + ((Common.getDistance(t, i, townPoint[0], townPoint[1]) / (this.height * 0.70)) *
                    (this.difficultyRange[1] - this.difficultyRange[0]));
                var difficulty = Math.max(this.difficultyRange[0],
                    Math.min(this.difficultyRange[1] + 2, Math.floor(base + (difficultyNodes[cIdx[0]].power - base) / (2 + cIdx[1]))));
                this.map[i][t].init(terrainData, difficulty, this.difficultyRange[0]);
            }
        }

        //find a place to put the mystic gate, either randomly in a spot max difficulty or above, or at highest difficulty place otherwise
        var mysticGateSpots = [];
        var max = 0;
        var maxPos = [0, 0];
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.height; t++) {
                if (this.map[i][t].difficulty >= this.difficultyRange[1]) {
                    mysticGateSpots.push([i, t]);
                }
                if (this.map[i][t].difficulty > max) {
                    maxPos[0] = i;
                    maxPos[1] = t;
                }
            }
        }
        mysticGateSpots.push(maxPos);
        var gatePos = mysticGateSpots[Common.randint(0, mysticGateSpots.length)];
        this.map[gatePos[0]][gatePos[1]].init(RegionRegistry.TILE_TYPES.mysticgate, this.map[gatePos[0]][gatePos[1]].difficulty, this.difficultyRange[0]);

        this.map[townPoint[1]][townPoint[0]].init(RegionRegistry.TILE_TYPES.town, this.difficultyRange[0], this.difficultyRange[0]);
        this.map[spawnPoint[1]][spawnPoint[0]].revealed = true;
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
            if (y > 0) {
                this.map[y - 1][x].revealed = true;
            }
            if (y < this.height - 1) {
                this.map[y + 1][x].revealed = true;
            }
            if (x > 0) {
                this.map[y][x - 1].revealed = true;
            }
            if (x < this.width - 1) {
                this.map[y][x + 1].revealed = true;
            }
        }
        return this.map[y][x];
    }

    _invade() {
        this.invasionCounter = 0;
        var tile = this.sightings[Common.randint(0, this.sightings.length)];
        this.map[tile[0]][tile[1]].invade();
        this.townData.currentPopulation = this.townData.currentPopulation * Statics.POP_MULTI_AFTER_INVASION;
        this.tilesExplored -= 1;
    }

    _addSighting() {
        var a = Math.min(Statics.MIN_SIGHTING_SECONDS * (1 + this.sightings.length * Statics.SIGHTING_MULTI_PER_SIGHTING), Statics.MAX_SIGHTING_SECONDS);
        var b = Math.min(a * 2, Statics.MAX_SIGHTING_SECONDS);
        this.sightingsDelay = Common.randint(a, b) * 1000;
        var invadeList = [];
        for (var y = 1; y < this.height - 1; y++) {
            for (var x = 1; x < this.width - 1; x++) {
                if (this.map[y][x].explored === false) {
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

        if (invadeList.length < 0) {
            return;
        }
        var tile = invadeList[Common.randint(0, invadeList.length)];
        this.sightings.push(tile);
        this.map[tile[0]][tile[1]].sighting();
    }

    endSighting(x, y) {
        this.sightings = this.sightings.filter(item => item[0] !== y && item[1] !== x);
        this.map[y][x].isInvaded = false;
        this.map[y][x].invasionPower = 0;
        this.invasionCounter = Math.max(0, this.invasionCounter - Statics.INVASION_REDUCTION_FROM_SIGHTING);
    }

    _calculateTradeHouseBonus(tier) {
        this.townData.economyMulti -= this.tradeHouseBonus;
        this.tradeHouseBonus = 0;

        //we start at 1 as we include the towns position for distance calculations while the town itself provides no bonus
        for (var i = 1; i < this.tradeHouseLocations.length; i++) {
            var closest = Common.nearestPointInList(this.tradeHouseLocations[i][0], this.tradeHouseLocations[i][1], this.tradeHouseLocations, true);
            this.tradeHouseBonus += Math.max(5, Math.min(20, (closest[1] / Statics.TRADE_HOUSE_MAX_DISTANCE) * 20)) * tier / 100;
        }
        this.townData.economyMulti += this.tradeHouseBonus;
    }

    _applyBuildingBonus(tile) {
        var yieldHelper = (type, yields) => {
            var amount = 0;
            for (var i = 0; i < yields.length; i++) {
                if (yields[i].type === type) {
                    amount = yields[i].rate;
                    break;
                }
            }
            return amount;
        };
        var moonData = new MoonlightData();
        tile.defense += Statics.BUILDING_BASE_DEFENSE + moonData.moonperks.hardenedvillagers.level;
        switch (tile.building.name) {
            case "Lumberyard":
                this.resourcesPerDay[Statics.RESOURCE_WOOD] += tile.building.tier * yieldHelper(Statics.RESOURCE_WOOD, tile.yields);
                break;
            case "Hunter's Lodge":
                this.resourcesPerDay[Statics.RESOURCE_LEATHER] += tile.building.tier * yieldHelper(Statics.RESOURCE_LEATHER, tile.yields);
                break;
            case "Mine":
                this.resourcesPerDay[Statics.RESOURCE_METAL] += tile.building.tier * yieldHelper(Statics.RESOURCE_METAL, tile.yields);
                break;
            case "Herbalist's Hut":
                this.resourcesPerDay[Statics.RESOURCE_FIBER] += tile.building.tier * yieldHelper(Statics.RESOURCE_FIBER, tile.yields);
                break;
            case "Quarry":
                this.resourcesPerDay[Statics.RESOURCE_STONE] += tile.building.tier * yieldHelper(Statics.RESOURCE_STONE, tile.yields);
                break;
            case "Crystal Loom":
                this.resourcesPerDay[Statics.RESOURCE_CRYSTAL] += tile.building.tier * yieldHelper(Statics.RESOURCE_CRYSTAL, tile.yields);
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
            case "Trade House":
                this.tradeHouseLocations.push([tile.x, tile.y]);
                this._calculateTradeHouseBonus(tile.building.tier);
                break;
            case "Tavern":
                this.townData.increaseMaxPop(5);
                this.townData.economyMulti += (0.1 + moonData.moonperks.moonwine.level * 0.02) * tile.building.tier;
                break;
        }
    }
    _removeBuildingBonus(tile) {
        var yieldHelper = (type, yields) => {
            var amount = 0;
            for (var i = 0; i < yields.length; i++) {
                if (yields[i].type === type) {
                    amount = yields[i].rate;
                    break;
                }
            }
            return amount;
        };
        var moonData = new MoonlightData();
        tile.defense -= Statics.BUILDING_BASE_DEFENSE + moonData.moonperks.hardenedvillagers.level;
        var prodBonus = 1 + (tile.defense * moonData.moonperks.moonlightworkers.level * 0.01);
        switch (tile.building.name) {
            case "Lumberyard":
                this.resourcesPerDay[Statics.RESOURCE_WOOD] -= tile.building.tier * yieldHelper(Statics.RESOURCE_WOOD, tile.yields) * prodBonus;
                break;
            case "Hunter's Lodge":
                this.resourcesPerDay[Statics.RESOURCE_LEATHER] -= tile.building.tier * yieldHelper(Statics.RESOURCE_LEATHER, tile.yields) * prodBonus;
                break;
            case "Mine":
                this.resourcesPerDay[Statics.RESOURCE_METAL] -= tile.building.tier * yieldHelper(Statics.RESOURCE_METAL, tile.yields) * prodBonus;
                break;
            case "Herbalist's Hut":
                this.resourcesPerDay[Statics.RESOURCE_FIBER] -= tile.building.tier * yieldHelper(Statics.RESOURCE_FIBER, tile.yields) * prodBonus;
                break;
            case "Quarry":
                this.resourcesPerDay[Statics.RESOURCE_STONE] -= tile.building.tier * yieldHelper(Statics.RESOURCE_STONE, tile.yields) * prodBonus;
                break;
            case "Crystal Loom":
                this.resourcesPerDay[Statics.RESOURCE_CRYSTAL] -= tile.building.tier * yieldHelper(Statics.RESOURCE_CRYSTAL, tile.yields) * prodBonus;
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
            case "Town House":
                this.tradeHouseLocations = this.tradeHouseLocations.filter(item => item[0] !== tile.x && item[1] !== tile.y);
                this._calculateTradeHouseBonus();
                break;
            case "Tavern":
                this.townData.increaseMaxPop(-5);
                this.townData.economyMulti -= (0.1 + moonData.moonperks.moonwine.level * 0.02) * tile.building.tier;
                break;
        }
    }

    placeBuilding(x, y, building) {
        this.map[y][x].building = building;
        this.map[y][x].building.increaseCosts();
        this._applyBuildingBonus(this.map[y][x]);
    }
    upgradeBuilding(x, y) {
        this._removeBuildingBonus(this.map[y][x]);
        this.map[y][x].building.tier += 1;
        this.map[y][x].building.increaseCosts();
        this._applyBuildingBonus(this.map[y][x]);
    }
    destroyBuilding(x, y) {
        this._removeBuildingBonus(this.map[y][x]);
        this.map[y][x].building = undefined;
    }

    update(delta) {
    }

    updateDay() {
        this.townData.endOfDay();
        var player = new PlayerData();

        var resource = [];
        var govBonus = 1 + player.talents.governance.level * 0.03;
        for (var i = 0; i < this.resourcesPerDay.length; i++) {
            resource.push(this.resourcesPerDay[i] * this.townData.productionMulti * govBonus);
        }
        player.addResource(resource, Math.floor(this.difficultyRange[0] / 20));

        if (this.tilesExplored >= 11) {
            this.sightingsDelay -= Statics.TIME_PER_DAY;
            if (this.sightingsDelay <= 0) {
                this._addSighting();
            }
        }
        for (var i = 0; i < this.sightings.length; i++) {
            var s = this.sightings[i];
            //TODO Add ramping strength from land/building
            this.map[s[0]][s[1]].incInvasionPower(this.difficultyRange[0]);
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