
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
import { Building, BuildingTypes } from './Building';
import { DynamicSettings } from './DynamicSettings';
import { BuildingRegistry } from './BuildingRegistry';
import { WorldData } from './WorldData';
import { ProgressionStore } from './ProgressionStore';
import { RuneRegistry } from './RuneRegistry';
import { StarData } from './StarData';
import { RitualData } from './RitualData';

export class TileData {

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
        this.defense = 0;
        this.hasRune = false;
        this.x = x;
        this.y = y;
        this.hasShard = false;
        //variables not saved
        this.name = "";
        this.exploreSpeed = 1; //can be calculated on the fly
        this.color = color; //can be determined from name
        this.borderColor = [255, 255, 255]
        this.explorationNeeded = 1000; //got from name
        this.enemies = []; //name
        this.yields = [];
        this.roadDist = -1;
        this.roadBonus = 0;
        this.roadBuildable = false;
        this.dockBuildable = false;
        this.houseBuildable = false;
        this.roadConnected = false;
        this.parent = undefined;
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
            hr: this.hasRune,
            hs: this.hasShard,
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
        tile.hasRune = saveObj.hr === undefined ? false : saveObj.hr;
        tile.hasShard = saveObj.hs === undefined ? false : saveObj.hs;
        tile.x = saveObj.x;
        tile.y = saveObj.y;
        return tile;
    }

    init(regName, difficulty, baseDifficulty, region) {
        var tileType = RegionRegistry.TILE_TYPES[regName];
        this.regName = regName;
        this.difficulty = difficulty;
        this.exploreSpeed = 1 + difficulty * Statics.EXPLORE_MULTIPLIER;
        this.color = tileType.clr;
        this.name = tileType.name;
        this.enemies = tileType.enemies;
        this.explorationNeeded = tileType.explorationNeeded;
        var maxDiff = baseDifficulty + DynamicSettings.getInstance().regionDifficultyIncrease
        var d = Math.min(1, (Math.max(0, difficulty - baseDifficulty) / maxDiff));
        this.borderColor = [255, 255 - (d > 0.5 ? 255 * (d - 0.5) * 2 : 0), 255 - Math.min(255, (255 * d * 2))];
        this.yields = [];
        this.parent = region;
    }

    sighting() {
        this.isInvaded = true;
        this.invasionPower = 0;
        this.invasionFights = 5;
    }

    invade(destroy = true) {
        if (DynamicSettings.getInstance().invasionsIncreaseDifficulty === true) {
            this.difficulty += DynamicSettings.getInstance().invasionLevelBonus;
        }
        this.isInvaded = false;
        this.invasionPower = 0;
        this.amountExplored = 0;
        this.invasionFights = 0;
        if (destroy === true) {
            this.explored = false;
            this.revealed = true;
        }
    }

    getInvasionMulti() { return Math.min(5, Math.floor(Math.max(0, Math.log2(this.invasionPower / Statics.SIGHTING_DIVIDER)))); }
    getFriendshipReward() {
        return 1 + 0.05 * (this.difficulty - (this.parent.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease));
    }

    explore(delta) {
        if (this.explored === true) {
            return false;
        }
        var exploreMulti = PlayerData.getInstance().getExploreMulti() *
            DynamicSettings.getInstance().exploreSpeed *
            this.parent.townData.exploreMulti;
        exploreMulti = exploreMulti / this.exploreSpeed;
        this.amountExplored += delta * exploreMulti;

        if (this.amountExplored >= this.explorationNeeded && this.explored === false) {
            return true;
        }

        return false;
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
            var bonusDif = DynamicSettings.getInstance().invasionLevelBonus +
                RitualData.getInstance().activePerks.callofthevoid;
            var bossDif = this.difficulty + this.getInvasionMulti();
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)],
                bossDif + bonusDif, this.parent.regionLevel));
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)],
                this.difficulty - 1 + bonusDif, this.parent.regionLevel));
            enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[Common.randint(0, this.enemies.length)],
                this.difficulty - 1 + bonusDif, this.parent.regionLevel));
            for (var i = 0; i < enemyList.length; i++) {
                enemyList[i].addTrait(Statics.TRAIT_INVADER, 1);
            }
        } else {
            var min = this.difficulty < 30 ? 1 : 2;
            var max = (this.difficulty < 5 ? 2 : 3) + (this.difficulty > 15 ? 1 : 0)
            var numCreatures = this.difficulty > 0 ? Common.randint(min, max) : 1;
            for (var i = 0; i < numCreatures; i++) {
                if (Math.random() <= PlayerData.getInstance().getTalentLevel("lootgoblin") * 0.005) {
                    enemyList.push(CreatureRegistry.GetCreatureByName("lootgoblin", this.difficulty, this.parent.regionLevel));
                } else if (this.hasShard === true) {
                    var num = Common.randint(0, Statics.STARSHARD_ENEMIES.length);
                    enemyList.push(CreatureRegistry.GetCreatureByName(Statics.STARSHARD_ENEMIES[num], this.difficulty, this.parent.regionLevel));
                } else {
                    var num = Common.randint(0, this.enemies.length);
                    enemyList.push(CreatureRegistry.GetCreatureByName(this.enemies[num], this.difficulty, this.parent.regionLevel));
                }
            }
        }

        for (var i = 0; i < enemyList.length; i++) {
            if (enemyList[i].level > 100) {
                if (Math.random() < 0.15) {
                    enemyList[i].addTrait(Statics.TRAIT_DIRE, 1);
                }
            }
            for (var t = 0; t < this.parent.traits.length; t++) {
                enemyList[i].addTrait(this.parent.traits[t].type, this.parent.traits[t].level);
            }
            enemyList[i].applyTraits();
        }


        return enemyList;
    }
}

export class Region {
    constructor(width = 8, height = 8, regionLevel, regionType, traits, ignoreGen = false) {
        //non-save variables
        this.tileChangedHandler = undefined;
        this.sightingHandler = undefined;
        this.resourcesPerDay = [0, 0, 0, 0, 0, 0];
        this.taverns = [];
        this.roads = [];
        this.markets = [];
        this.productionBuildings = [];
        this.warehouses = [];
        this.houses = [];
        this.towers = [];
        this.alchemyDrain = 0;
        this.alchemyGain = 0;
        this.villagerStatGain = [0, 0];
        this.dungeonLocations = [];
        this.autoUpgrade = false;
        this.blueprint = -1;
        this.starshardsPerTile = 1;

        if (ignoreGen === true) {
            return true;
        }
        //save variables
        this.width = width;
        this.height = height;
        this.regionLevel = regionLevel;
        this.resourceTier = Math.min(7, this.regionLevel + DynamicSettings.getInstance().minResourceTier);
        this.townData = new TownData(regionLevel + 1, this.resourceTier);
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
        this.traits = traits;

        if (this.regionLevel === 9 && ProgressionStore.getInstance().persistentUnlocks.starshards === false) {
            this.generateVoid();
        } else {
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
        }

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
            type: this.type,
            tr: this.traits,
            dl: this.dungeonLocations,
            au: this.autoUpgrade,
            bp: this.blueprint,
            rt: this.resourceTier,
            sst: this.starshardsPerTile
        }

        return saveObj;
    }

    static loadFromSave(saveObj, ver) {
        var region = new Region(0, 0, 0, "temperate", [], true);

        region.width = saveObj.w;
        region.height = saveObj.h;
        region.regionLevel = saveObj.rl;
        region.townData = new TownData(1, 0);
        region.townData.load(saveObj.td);
        region.tilesExplored = saveObj.te;
        region.sightings = saveObj.sight;
        region.sightingsDelay = saveObj.sd;
        region.invasionCounter = saveObj.ic;
        region.worldHeight = saveObj.wh;
        region.type = saveObj.type;
        region.traits = saveObj.tr;
        region.dungeonLocations = saveObj.dl === undefined ? [] : saveObj.dl;
        region.autoUpgrade = saveObj.au === undefined ? false : saveObj.au;
        region.blueprint = saveObj.bp === undefined ? -1 : saveObj.bp;
        region.resourceTier = saveObj.rt === undefined ? Math.min(7, region.regionLevel) : saveObj.rt;
        region.starshardsPerTile = saveObj.sst === undefined ? 1 : saveObj.sst;
        region.map = []
        for (var i = 0; i < saveObj.map.length; i++) {
            var row = [];
            for (var t = 0; t < saveObj.map[i].length; t++) {
                var tile = TileData.loadFromSave(saveObj.map[i][t], ver);
                tile.init(tile.regName, tile.difficulty, region.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease, region);
                row.push(tile);
            }
            region.map.push(row);
        }
        // yields for a tile are based on their surrounding tiles
        for (var i = 0; i < region.height; i++) {
            for (var t = 0; t < region.width; t++) {
                region.map[i][t].yields = region._getTileYields(t, i);
            }
        }

        region._init();

        return region;
    }

    _getTileYields(px, py) {
        // we use the tile yields as a mask to determine which yields we should add for a given tile
        var yieldMask = RegionRegistry.TILE_TYPES[this.map[py][px].regName].yields;
        var yields = [0, 0, 0, 0, 0, 0];
        var ritMulti = (1 + RitualData.getInstance().activePerks.wildgrowth * 0.1) /
            (1 + RitualData.getInstance().activePerks.desolation * 0.5);
        for (var y = Math.max(0, py - 1); y < Math.min(this.height, py + 2); y++) {
            for (var x = Math.max(0, px - 1); x < Math.min(this.width, px + 2); x++) {
                for (var i = 0; i < yields.length; i++) {
                    if (yieldMask[i] === 0) {
                        continue;
                    }
                    yields[i] += RegionRegistry.TILE_TYPES[this.map[y][x].regName].yields[i] * Statics.TILE_YIELD_SHARING;
                }
            }
        }
        yields[0] = yields[0] * (1 + MoonlightData.getInstance().moonperks.wood.level * 0.05) * ritMulti;
        yields[1] = yields[1] * (1 + MoonlightData.getInstance().moonperks.leather.level * 0.05) * ritMulti;
        yields[2] = yields[2] * (1 + MoonlightData.getInstance().moonperks.metal.level * 0.05) * ritMulti;
        yields[3] = yields[3] * (1 + MoonlightData.getInstance().moonperks.fiber.level * 0.05) * ritMulti;
        yields[4] = yields[4] * (1 + MoonlightData.getInstance().moonperks.stone.level * 0.05) * ritMulti;
        yields[5] = yields[5] * (1 + MoonlightData.getInstance().moonperks.crystal.level * 0.05) * ritMulti;
        return yields;
    }

    generateVoid() {
        var voidMap = RegionRegistry.VOID_MAPS[Common.randint(0, 3)];
        var minDiff = this.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease;
        var maxDiff = minDiff + DynamicSettings.getInstance().regionDifficultyIncrease;

        var starfields = ['starfield', 'starfield2', 'starfield3'];

        for (var y = 0; y < voidMap.length; y++) {
            for (var x = 0; x < voidMap[y].length; x++) {
                var base = minDiff + ((Common.getDistance(x, y, 5, 11) / (this.height * 0.79)) *
                    DynamicSettings.getInstance().regionDifficultyIncrease);
                var difficulty = Math.max(minDiff, Math.min(maxDiff, base));
                var regName;
                switch (voidMap[y][x]) {
                    case 0:
                        regName = 'void';
                        difficulty = Math.min(maxDiff, difficulty + 5);
                        break;
                    case 1:
                        regName = starfields[Common.randint(0, starfields.length)];
                        break;
                    case 2:
                        regName = 'starpalace';
                        difficulty = maxDiff + 1;
                        break;
                }
                this.map[y][x].init(regName, Math.floor(difficulty), minDiff, this);
            }
        }

        // yields for a tile are based on their surrounding tiles
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                this.map[i][t].yields = this._getTileYields(t, i);
            }
        }

        this._calculateTileBonuses();
        this.map[11][5].revealed = true;
    }

    generateTerrain(pointList) {
        var minDiff = this.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease;
        var maxDiff = minDiff + DynamicSettings.getInstance().regionDifficultyIncrease;

        var starfields = ['starfield', 'starfield2', 'starfield3'];

        for (var y = 0; y < voidMap.length; y++) {
            for (var x = 0; x < voidMap[y].length; x++) {
                var base = minDiff + ((Common.getDistance(x, y, 5, 11) / (this.height * 0.79)) *
                    DynamicSettings.getInstance().regionDifficultyIncrease);
                var difficulty = Math.max(minDiff, Math.min(maxDiff, base));
                var regName;
                switch (voidMap[y][x]) {
                    case 0:
                        regName = 'void';
                        difficulty = Math.min(maxDiff, difficulty + 5);
                        break;
                    case 1:
                        regName = starfields[Common.randint(0, starfields.length)];
                        break;
                    case 2:
                        regName = 'starpalace';
                        difficulty = maxDiff + 1;
                        break;
                }
                this.map[y][x].init(regName, Math.floor(difficulty), minDiff, this);
            }
        }

        // yields for a tile are based on their surrounding tiles
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                this.map[i][t].yields = this._getTileYields(t, i);
            }
        }

        this._calculateTileBonuses();
        this.map[11][5].revealed = true;
    }

    generateTerrain(pointList) {
        var minDiff = this.regionLevel * (DynamicSettings.getInstance().regionDifficultyIncrease +
            RitualData.getInstance().activePerks.vengeance);
        var maxDiff = minDiff + (DynamicSettings.getInstance().regionDifficultyIncrease +
            RitualData.getInstance().activePerks.vengeance);
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
                DynamicSettings.getInstance().regionDifficultyIncrease);
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
                    DynamicSettings.getInstance().regionDifficultyIncrease);
                var difficulty = Math.max(minDiff,
                    Math.min(maxDiff - 1, Math.floor(base + (difficultyNodes[cIdx[0]].power - base) / (2 + cIdx[1]))));
                this.map[i][t].init(terrainData, difficulty, minDiff, this);
            }
        }

        //find a place to put the mystic gate, either randomly in a spot max difficulty or above, or at highest difficulty place otherwise
        var gatePos = [-1, -1];
        if (this.regionLevel >= DynamicSettings.getInstance().minGateRegion) {
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
            gatePos = mysticGateSpots[Common.randint(0, mysticGateSpots.length)];
            this.map[gatePos[0]][gatePos[1]].init("mysticgate", maxDiff, minDiff, this);
        }

        // for unlocking dungeons, we need to place a single crypt tile in region 5
        if (DynamicSettings.getInstance().challengeName === "" &&
            ProgressionStore.getInstance().persistentUnlocks.dungeons === false && this.regionLevel === 4) {
            // place the crypt on a random tile 5 rows from the top
            var x = Common.randint(0, this.width);
            this.map[6][x].init("crypt", maxDiff, minDiff, this);
        }

        // For unlocking Rituals, place a cultist fortress in region 12
        if (DynamicSettings.getInstance().challengeName === "" &&
            ProgressionStore.getInstance().persistentUnlocks.rituals === false && this.regionLevel === 11) {
            // the cultist lair is ontop of mount doom, a 5 tile area shaped like a '+'
            var x = Common.randint(1, this.width - 1);
            this.map[3][x].init("doomhill", maxDiff - 2, minDiff, this);
            this.map[5][x].init("doomhill", maxDiff - 2, minDiff, this);
            this.map[4][x - 1].init("doomhill", maxDiff - 2, minDiff, this);
            this.map[4][x + 1].init("doomhill", maxDiff - 2, minDiff, this);
            this.map[4][x].init("mtdoom", maxDiff, minDiff, this);
        }

        //if runes appear on the map, add spawn locations here
        var runeCount = 0;
        if (MoonlightData.getInstance().moonperks.runes.level > 0) {
            runeCount = 5 + MoonlightData.getInstance().moonperks.runelands.level % 5;
        }
        // we can't place runes on the town or gate squares, or on places that already have runes.
        var validFunc = (x, y) => {
            return this.map[y][x].hasRune === false && (x !== townPoint[0] || y !== townPoint[1]) && (x !== gatePos[1] || y !== gatePos[0]);
        };
        for (var i = 0; i < runeCount; i++) {
            var posX = Common.randint(0, this.width);
            var posY = Common.randint(0, this.height);

            if (validFunc(posX, posY) === true) {
                this.map[posY][posX].hasRune = true;
            } else {
                //search for a new valid point
                var start = posY * this.width + posX;
                for (var t = 0; t < 20; t++) {
                    var idx = (start + t) % (this.width * this.height);
                    posX = idx % this.width;
                    posY = Math.floor(idx / this.width);
                    if (validFunc(posX, posY) === true) {
                        this.map[posY][posX].hasRune = true;
                        break;
                    }
                }
            }
        }

        // yields for a tile are based on their surrounding tiles
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                this.map[i][t].yields = this._getTileYields(t, i);
            }
        }

        this.map[townPoint[1]][townPoint[0]].init("town", minDiff, minDiff, this);
        this.map[townPoint[1]][townPoint[0]].building = BuildingRegistry.getBuildingByName("town");
        // avoid place building as that can lead to infinite loops in the startup path
        this._addBuilding(this.map[townPoint[1]][townPoint[0]]);
        this._calculateTileBonuses();
        this.map[spawnPoint[1]][spawnPoint[0]].revealed = true;

        // calculate dungeon spawns
        if (ProgressionStore.getInstance().persistentUnlocks.dungeons === true) {
            var p = [Common.randint(0, Math.floor(this.height / 3)), Common.randint(0, this.width)]
            while (this.map[p[0]][p[1]].regName === "town" || this.map[p[0]][p[1]].regName === 'mysticgate') {
                p = [Common.randint(0, Math.floor(this.height / 3)), Common.randint(0, this.width)]
            }
            this.dungeonLocations.push(p);
            var p = [Common.randint(Math.floor(this.height / 3), Math.floor(this.height / 3) * 2), Common.randint(0, this.width)]
            while (this.map[p[0]][p[1]].regName === "town" || this.map[p[0]][p[1]].regName === 'mysticgate') {
                p = [Common.randint(Math.floor(this.height / 3), Math.floor(this.height / 3) * 2), Common.randint(0, this.width)]
            }
            this.dungeonLocations.push(p);
            var p = [Common.randint(Math.floor(this.height / 3) * 2, Math.floor(this.height / 3) * 3), Common.randint(0, this.width)]
            while (this.map[p[0]][p[1]].regName === "town" || this.map[p[0]][p[1]].regName === 'mysticgate') {
                p = [Common.randint(Math.floor(this.height / 3) * 2, Math.floor(this.height / 3) * 3), Common.randint(0, this.width)]
            }
            this.dungeonLocations.push(p);
        }

        // add shard locations
        if (ProgressionStore.getInstance().persistentUnlocks.starshards === true) {
            var starLevel = this.regionLevel + MoonlightData.getInstance().challenges.time2.completions;
            var chance = Statics.BASE_STARSHARD_CHANCE * (1 + starLevel * Statics.STARSHARD_REGION_MULTI) *
                RitualData.getInstance().starshardBonus;
            this.starshardsPerTile = 1;
            while (chance > 0.1) {
                chance = chance / 2;
                this.starshardsPerTile = this.starshardsPerTile * 2;
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (Math.random() < chance) {
                        this.map[y][x].hasShard = true;
                    }
                }
            }
        }
    }

    onTileChanged(callback) {
        this.tileChangedHandler = callback;
    }
    removeHandlers() {
        this.tileChangedHandler = undefined;
        this.sightingHandler = undefined;
    }
    onSighting(callback) {
        this.sightingHandler = callback;
    }
    _onTileChanged(tile) {
        if (this.tileChangedHandler !== undefined) {
            this.tileChangedHandler(tile);
        }
    }

    getStarShardChance() {
        var starLevel = this.regionLevel + MoonlightData.getInstance().challenges.time2.completions;
        var chance = Statics.BASE_STARSHARD_CHANCE * (1 + starLevel * Statics.STARSHARD_REGION_MULTI) *
            RitualData.getInstance().starshardBonus;
        while (chance > 0.1) {
            chance = chance / 2;
        }
        return chance;
    }
    getExplorePercent() {
        return this.tilesExplored / (this.width * this.height);
    }
    isExplorable(x, y) {
        return this.map[y][x].revealed === true && this.map[y][x].name !== "Starlight Palace";
    }

    _tileIsDungeon(x, y) {
        for (var i = 0; i < this.dungeonLocations.length; i++) {
            if (this.dungeonLocations[i][0] === y && this.dungeonLocations[i][1] === x) {
                return true;
            }
        }
        return false;
    }

    exploreTile(x, y) {
        if (this.map[y][x].revealed === true && this.map[y][x].explored !== true) {
            this.tilesExplored += 1;
            this.townData.setTilesExplored(this.tilesExplored);
            this.map[y][x].explored = true;
            this.townData.addFriendship(10 * MoonlightData.getInstance().moonperks.discovery.level);
            if (this.map[y][x].hasRune === true) {
                this.map[y][x].hasRune = false;
                var runeLvl = Math.floor(this.regionLevel / 2) + 1 +
                    Math.floor(MoonlightData.getInstance().moonperks.runelands.level / 5);
                var rune = RuneRegistry.getRandomRuneAtLevel(runeLvl);
                PlayerData.getInstance().addRune(rune);
            }
            if (this.map[y][x].name === "Town") {
                this.townData.townExplored = true;
            }
            if (this.tilesExplored >= 5 && WorldData.getInstance().invasionRegion < this.regionLevel) {
                WorldData.getInstance().increaseInvasionPower();
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
            if (this._tileIsDungeon(x, y)) {
                this.dungeonLocations = this.dungeonLocations.filter(p => p[1] !== x || p[0] !== y);
                this.townData.uncoverDungeon(this);
            }
            if (this.map[y][x].hasShard === true) {
                this.map[y][x].hasShard = false;
                WorldData.getInstance().starshardsEarned += this.starshardsPerTile;
            }
            if (this.map[y][x].name === "Ancient Crypt" && ProgressionStore.getInstance().persistentUnlocks.dungeons === false) {
                ProgressionStore.getInstance().persistentUnlocks.dungeons = true;
                ProgressionStore.getInstance().registerFeatureUnlocked(Statics.UNLOCK_GENERIC,
                    "As you clear the final floor of this ancient crypt you find an ornate key! Surely this key must lead to " +
                    "some ancient treasure. As you leave the crypt thinking about how your going to get PAID you see a " +
                    "villager carrying the same key as you.\n\n" +
                    "\"What, this old thing? We find them all the time, it's so bad we end up just throwing them away. Apparently it " +
                    "unlocks some old dungeon filled with treasure and unspeakable horrors. Anyway, I gotta go chuck this key " +
                    "down into the crypt here.\"\n\n" +
                    "This whole time there's been dungeons full of loot and the villagers are just telling you now? Well, you don't " +
                    "have time to do the dungeons yourself, and it's not because your afraid of whatever unspeakable horrors are inside. " +
                    "You're pretty sure the villagers can handle it, and if not it only takes a week for them to breed a fully adult " +
                    "villager. What's with that anyway?\n" +
                    "VILLAGER DUNEGONS UNLOCKED! On your next rebirth you'll find dungeons to throw your villagers in.");
            }
            if (this.map[y][x].name === "Cultist Foothills") {
                ProgressionStore.getInstance().registerLore("cultists1");
            }
            if (this.map[y][x].name === "Doom Mountain" && ProgressionStore.getInstance().persistentUnlocks.rituals === false) {
                ProgressionStore.getInstance().persistentUnlocks.rituals = true;
                ProgressionStore.getInstance().registerLore("cultists2");
            }
        }
        if (this.regionLevel > 0 && this.regionLevel <= 8 && WorldData.getInstance().getRegion(this.regionLevel - 1).townData.alchemyEnabled === false) {
            WorldData.getInstance().getRegion(this.regionLevel - 1).townData.alchemyEnabled = true;
            ProgressionStore.getInstance().registerFeatureUnlocked(Statics.UNLOCK_GENERIC,
                "You recieved a letter from the previous town. A mysterious old man came through and taught them " +
                "the magic of alchemy. You may now build alchemy labs to convert tier " + (this.regionLevel - 1) +
                " resources to tier " + this.regionLevel + " resources at a horribly inefficient rate! Thanks " +
                "mysterious old man!");
        }
        this._onTileChanged(this.map[y][x]);
        return this.map[y][x];
    }

    _invade() {
        this.invasionCounter = 0;
        var tile = this.sightings[Common.randint(0, this.sightings.length)];
        if (Math.random() <= tile.defense * PlayerData.getInstance().getTalentLevel('townguard') * 0.005) {
            this.map[tile[0]][tile[1]].invade(false);
            this.townData.currentPopulation = this.townData.currentPopulation * Statics.POP_MULTI_AFTER_INVASION;
        } else {
            this.map[tile[0]][tile[1]].invade();
            if (this.map[tile[0]][tile[1]].building != undefined) {
                this.destroyBuilding(tile[1], tile[0]);
            }
            this.townData.currentPopulation = this.townData.currentPopulation * Statics.POP_MULTI_AFTER_INVASION;
            this.tilesExplored -= 1;
            this.townData.setTilesExplored(this.tilesExplored);
        }
        this.endSighting(tile[1], tile[0]);
    }

    _addSighting() {
        var baseTimer = Math.max(DynamicSettings.getInstance().invasionTimer -
            RitualData.getInstance().activePerks.callofthevoid * 2, 5);
        var a = Math.min(baseTimer * (1 + this.sightings.length * Statics.SIGHTING_MULTI_PER_SIGHTING),
            Statics.MAX_SIGHTING_SECONDS);
        var b = Math.min(a * 2, Statics.MAX_SIGHTING_SECONDS);
        this.sightingsDelay = Common.randint(a, b) * 1000;
        var invadeList = [];
        for (var y = 1; y < this.height - 1; y++) {
            for (var x = 1; x < this.width - 1; x++) {
                if (this.map[y][x].explored === false || this.map[y][x].name === "Town" || this.map[y][x].name === "Mystic Gate" ||
                    this.map[y][x].isInvaded === true) {
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
        if (this.sightingHandler !== undefined) {
            this.sightingHandler();
        }
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
        this.markets = [[this.height - 3, Math.floor(this.width / 2)]];
        this.taverns = [];
        this.productionBuildings = [];
        this.warehouses = [];
        this.towers = [];

        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                if (this.map[i][t].building !== undefined) {
                    if (this.map[i][t].building.name === "Road" || this.map[i][t].building.name === "Town") {
                        this.roads.push([i, t]);
                    } else if (this.map[i][t].building.name === "Market") {
                        this.markets.push([i, t]);
                    } else if (this.map[i][t].building.name === "Tavern") {
                        this.taverns.push([i, t]);
                    } else if (this.map[i][t].building.name === "Warehouse") {
                        this.warehouses.push([i, t]);
                    } else if (this.map[i][t].building.name === "Town House") {
                        this.houses.push([i, t]);
                    } else if (this.map[i][t].building.name === "Watch Tower") {
                        this.towers.push([i, t]);
                    } else {
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

    _getBuildingEfficiency(px, py, potential = false) {
        let bldCount = potential === false ? 0 : 1;
        for (var y = Math.max(0, py - 1); y < Math.min(this.height, py + 2); y++) {
            for (var x = Math.max(0, px - 1); x < Math.min(this.width, px + 2); x++) {
                if (this.map[y][x].building !== undefined) {
                    switch (this.map[y][x].building.buildingType) {
                        case BuildingTypes.PRODUCTION:
                            bldCount += 1;
                            break;
                        case BuildingTypes.ECON:
                            bldCount += 0.30;
                            break;
                        case BuildingTypes.HOUSE:
                            bldCount += 0.15;
                        default:
                            break;
                    }
                }
            }
        }
        return Math.pow(Statics.PRODUCTION_EFFICIENCY_MULT, bldCount - 1);
    }

    _getDockEfficiency(px, py, potential = false) {
        let bldCount = potential === false ? 0 : 1;
        for (var y = Math.max(0, py - 1); y < Math.min(this.height, py + 2); y++) {
            for (var x = Math.max(0, px - 1); x < Math.min(this.width, px + 2); x++) {
                if (this.map[y][x].building !== undefined) {
                    if (this.map[y][x].building.name === "Docks") {
                        bldCount += 1;
                    }
                }
            }
        }
        return Math.pow(Statics.PRODUCTION_EFFICIENCY_MULT, bldCount - 1);
    }

    _getMapProp(x, y, prop, fallback) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return fallback;
        }
        return this.map[y][x][prop] === undefined ? fallback : this.map[y][x][prop];
    }
    _setMapProp(x, y, prop, value) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }
        this.map[y][x][prop] = value;
    }
    _connectRoads(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }
        this.map[y][x].roadConnected = true;
        if (this._getMapProp(x, y + 1, 'building', undefined) !== undefined &&
            this.map[y + 1][x].roadConnected === false && this.map[y + 1][x].building.name === 'Road') {
            this._connectRoads(x, y + 1);
        }
        if (this._getMapProp(x, y - 1, 'building', undefined) !== undefined &&
            this.map[y - 1][x].roadConnected === false && this.map[y - 1][x].building.name === 'Road') {
            this._connectRoads(x, y - 1);
        }
        if (this._getMapProp(x + 1, y, 'building', undefined) !== undefined &&
            this.map[y][x + 1].roadConnected === false && this.map[y][x + 1].building.name === 'Road') {
            this._connectRoads(x + 1, y);
        }
        if (this._getMapProp(x - 1, y, 'building', undefined) !== undefined &&
            this.map[y][x - 1].roadConnected === false && this.map[y][x - 1].building.name === 'Road') {
            this._connectRoads(x - 1, y);
        }
    }

    _calculateTileBonuses() {
        //reset tile information
        var econBonus = 0;
        var maxPop = 100;
        this.townData.buildingIncome = 0;
        this.resourcesPerDay = [0, 0, 0, 0, 0, 0];
        this.alchemyDrain = 0;
        this.alchemyGain = 0;
        this.villagerStatGain = [0, 0];
        for (var i = 0; i < this.height; i++) {
            for (var t = 0; t < this.width; t++) {
                this.map[i][t].roadDist = -1;
                this.map[i][t].roadBonus = 0;
                this.map[i][t].roadBuildable = false;
                this.map[i][t].houseBuildable = false;
                this.map[i][t].roadConnected = false;
            }
        }
        //calculate road connectedness
        this._connectRoads(Math.floor(this.width / 2), this.height - 3)
        for (var i = 0; i < this.productionBuildings.length; i++) {
            var tile = this.map[this.productionBuildings[i][0]][this.productionBuildings[i][1]];
            if (tile.building.name === "Docks") {
                this._connectRoads(tile.x, tile.y);
            }
        }

        //calculate road bonuses here
        var roadBonus = [[1, 0.5, 0],
        [1.25, 0.75, 0.25],
        [1.5, 1, 0.5],
        [1.75, 1.25, 0.75],
        [2, 1.5, 1]];
        for (var i = 0; i < this.roads.length; i++) {
            if (this._getMapProp(this.roads[i][1], this.roads[i][0], 'roadConnected', false) === false) {
                continue;
            }
            var maxDist = 3;
            var tier = this.map[this.roads[i][0]][this.roads[i][1]].building.tier;
            for (var y = this.roads[i][0] - maxDist; y < this.roads[i][0] + maxDist + 1; y++) {
                for (var x = this.roads[i][1] - maxDist; x < this.roads[i][1] + maxDist + 1; x++) {
                    var dist = Math.abs(y - this.roads[i][0]) + Math.abs(x - this.roads[i][1]);
                    if (dist <= maxDist && this._getMapProp(x, y, 'roadDist', undefined) !== undefined) {
                        this.map[y][x].roadDist = this.map[y][x].roadDist === -1 ? dist : Math.min(this.map[y][x].roadDist, dist);
                        this.map[y][x].roadBuildable = this.map[y][x].roadDist <= 1;
                        this.map[y][x].roadBonus = Math.max(this.map[y][x].roadBonus, roadBonus[tier - 1][dist - 1]);
                        this.map[y][x].houseBuildable = this.map[y][x].roadDist <= 2;
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

        //get house population
        for (var i = 0; i < this.houses.length; i++) {
            if (this.map[this.houses[i][0]][this.houses[i][1]].houseBuildable === true) {
                maxPop += Math.floor((5 + MoonlightData.getInstance().moonperks.urbanization.level) *
                    (1 + StarData.getInstance().perks.estate.level * 0.5) *
                    this.map[this.houses[i][0]][this.houses[i][1]].building.tier);
            }
        }

        //get market bonuses
        var points = []
        for (var i = 0; i < this.markets.length; i++) {
            points.push({ x: this.markets[i][1], y: this.markets[i][0] });
        }
        for (var i = 1; i < this.markets.length; i++) {
            if (this.map[this.markets[i][0]][this.markets[i][1]].roadBuildable === true) {
                var max = 5 + MoonlightData.getInstance().moonperks.nightmarket.level;
                var tier = this.map[this.markets[i][0]][this.markets[i][1]].building.tier;
                var closest = Common.nearestPointInList(this.markets[i][1], this.markets[i][0], points, true);
                econBonus += Math.max(0, Math.min(max, (closest[1] / Statics.TRADE_HOUSE_MAX_DISTANCE) * max)) * tier / 100;
            }
        }
        //get tavern bonuses
        for (var i = 0; i < this.taverns.length; i++) {
            var maxDist = 1 + MoonlightData.getInstance().moonperks.moonwine.level;
            var bonus = 0;
            var tier = this.map[this.taverns[i][0]][this.taverns[i][1]].building.tier;
            for (var y = Math.max(0, this.taverns[i][0] - maxDist); y < Math.min(this.height, this.taverns[i][0] + maxDist + 1); y++) {
                for (var x = Math.max(0, this.taverns[i][1] - maxDist); x < Math.min(this.width, this.taverns[i][1] + maxDist + 1); x++) {
                    if (Math.abs(y - this.taverns[i][0]) + Math.abs(x - this.taverns[i][1]) <= maxDist &&
                        this.map[y][x].building !== undefined && this.map[y][x].building.name === "Town House" &&
                        this.map[y][x].houseBuildable === true) {
                        bonus += 0.02;
                        maxPop += 1;
                    }
                }
            }
            econBonus += bonus * tier;
        }
        //warehouses add to road bonus for all adjacent buildings
        for (var i = 0; i < this.warehouses.length; i++) {
            var bonus = this.map[this.warehouses[i][0]][this.warehouses[i][1]].building.tier * 0.20;
            for (var y = Math.max(0, this.warehouses[i][0] - 1); y < Math.min(this.height, this.warehouses[i][0] + 2); y++) {
                for (var x = Math.max(0, this.warehouses[i][1] - 1); x < Math.min(this.width, this.warehouses[i][1] + 2); x++) {
                    this.map[y][x].roadBonus += bonus;
                }
            }
        }

        //calculate production bonuses of some prod buildings
        var dockBonus = [1, 1.25, 1.5, 1.75, 2];
        for (var i = 0; i < this.productionBuildings.length; i++) {
            var tile = this.map[this.productionBuildings[i][0]][this.productionBuildings[i][1]];
            switch (tile.building.name) {
                case "Docks":
                    if (tile.y > 0) {
                        this.map[tile.y - 1][tile.x].roadBuildable = true;
                        this.map[tile.y - 1][tile.x].houseBuildable = true;
                        this.map[tile.y - 1][tile.x].roadBonus = Math.max(this.map[tile.y - 1][tile.x].roadBonus, dockBonus[tile.building.tier - 1]);
                    }
                    if (tile.y < this.height - 1) {
                        this.map[tile.y + 1][tile.x].roadBuildable = true;
                        this.map[tile.y + 1][tile.x].houseBuildable = true;
                        this.map[tile.y + 1][tile.x].roadBonus = Math.max(this.map[tile.y + 1][tile.x].roadBonus, dockBonus[tile.building.tier - 1]);
                    }
                    if (tile.x > 0) {
                        this.map[tile.y][tile.x - 1].roadBuildable = true;
                        this.map[tile.y][tile.x - 1].houseBuildable = true;
                        this.map[tile.y][tile.x - 1].roadBonus = Math.max(this.map[tile.y][tile.x - 1].roadBonus, dockBonus[tile.building.tier - 1]);
                    }
                    if (tile.x < this.width - 1) {
                        this.map[tile.y][tile.x + 1].roadBuildable = true;
                        this.map[tile.y][tile.x + 1].houseBuildable = true;
                        this.map[tile.y][tile.x + 1].roadBonus = Math.max(this.map[tile.y][tile.x + 1].roadBonus, dockBonus[tile.building.tier - 1]);
                    }
                    break;
            }
        }

        //calculate production bonuses
        //for alchemy
        var drain = [1, 5, 13, 33, 77];
        var gain = [0.05, 0.3, 0.9, 3, 8];
        for (var i = 0; i < this.productionBuildings.length; i++) {
            var tile = this.map[this.productionBuildings[i][0]][this.productionBuildings[i][1]];
            var prodBonus = 1 + (tile.defense * MoonlightData.getInstance().moonperks.moonlightworkers.level * 0.01);
            prodBonus = prodBonus * (1 + MoonlightData.getInstance().challenges.buildings.completions * 0.1) *
                this._getBuildingEfficiency(tile.x, tile.y) * tile.roadBonus;
            switch (tile.building.name) {
                case "Lumberyard":
                    this.resourcesPerDay[Statics.RESOURCE_WOOD] += tile.building.tier * tile.yields[0] * prodBonus;
                    break;
                case "Hunter's Lodge":
                    this.resourcesPerDay[Statics.RESOURCE_LEATHER] += tile.building.tier * tile.yields[1] * prodBonus;
                    break;
                case "Mine":
                    this.resourcesPerDay[Statics.RESOURCE_METAL] += tile.building.tier * tile.yields[2] * prodBonus;
                    break;
                case "Herbalist's Hut":
                    this.resourcesPerDay[Statics.RESOURCE_FIBER] += tile.building.tier * tile.yields[3] * prodBonus;
                    break;
                case "Quarry":
                    this.resourcesPerDay[Statics.RESOURCE_STONE] += tile.building.tier * tile.yields[4] * prodBonus;
                    break;
                case "Crystal Loom":
                    this.resourcesPerDay[Statics.RESOURCE_CRYSTAL] += tile.building.tier * tile.yields[5] * prodBonus;
                    break;
                case "Docks":
                    var dockEff = this._getDockEfficiency(tile.x, tile.y);
                    this.townData.buildingIncome += Statics.DOCK_BASE_ECON * tile.building.tier * dockEff;
                    break;
                case "Alchemy Lab":
                    this.alchemyDrain += drain[tile.building.tier - 1];
                    this.alchemyGain += gain[tile.building.tier - 1];
                    break;
                case "Dojo":
                    if (tile.houseBuildable === true) {
                        var moonBonus = (1 + MoonlightData.getInstance().moonperks.ninja.level * 0.25);
                        this.villagerStatGain[0] += tile.building.tier * 0.05 * moonBonus;
                        this.villagerStatGain[1] += tile.building.tier * 0.5 * moonBonus;
                    }
                    break;
            }
        }
        this.townData.setMaxPopulation(maxPop);
        this.townData.calculateEconMulti(econBonus);
    }

    _canBuild(tile, building) {
        if (tile.building !== undefined || tile.regName === 'mysticgate' || tile.regName === 'town' ||
            tile.explored === false || ProgressionStore.getInstance().unlocks.buildings === false) {
            return false;
        }
        if (Common.canCraft(building.resourceCosts, PlayerData.getInstance().resources[this.resourceTier]) === false ||
            building.goldCost > PlayerData.getInstance().gold) {
            return false;
        }
        var yieldSum = tile.yields.reduce((a, b) => { return a + b; });
        switch (building.name) {
            case "Lumberyard":
                return tile.yields[0] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Hunter's Lodge":
                return tile.yields[1] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Mine":
                return tile.yields[2] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Herbalist's Hut":
                return tile.yields[3] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Quarry":
                return tile.yields[4] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Crystal Loom":
                return tile.yields[5] > 0 && DynamicSettings.getInstance().buildingsAllowed === true;
            case "Town House":
                return tile.houseBuildable && yieldSum > 0;
            case "Warehouse":
                return tile.houseBuildable && yieldSum > 0 && MoonlightData.getInstance().challenges.buildings.completions > 0;
            case "Market":
                return tile.roadBuildable && yieldSum > 0 && this.townData.getMarketLevel() > 0;
            case "Road":
                return tile.roadBuildable && yieldSum > 0;
            case "Docks":
                return tile.dockBuildable;
            case "Watch Tower":
                return yieldSum > 0;
            case "Alchemy Lab":
                return yieldSum > 0 && this.townData.alchemyEnabled === true;
            case "Tavern":
                return yieldSum > 0 && this.townData.getTavernLevel() > 0;
            case "Dojo":
                return yieldSum > 0 && tile.houseBuildable && ProgressionStore.getInstance().persistentUnlocks.dungeons === true;
        }
    }
    _canUpgrade(tile) {
        if (tile.building === undefined || tile.building.tier >= 3 + StarData.getInstance().perks.construction.level ||
            tile.building.name === "Town") {
            return false;
        }
        if ((tile.building.name === "Market" && tile.building.tier >= this.townData.getMarketLevel()) ||
            (tile.building.name === "Tavern" && tile.building.tier >= this.townData.getTavernLevel())) {
            return false;
        }
        var player = new PlayerData();
        return Common.canCraft(tile.building.resourceCosts, player.resources[this.resourceTier]) === true &&
            tile.building.goldCost <= player.gold;
    }

    _addBuilding(tile) {
        tile.defense += MoonlightData.getInstance().moonperks.hardenedvillagers.level +
            this.townData.upgrades.reinforcedhouses.level;
        switch (tile.building.name) {
            case "Lumberyard":
            case "Hunter's Lodge":
            case "Mine":
            case "Herbalist's Hut":
            case "Quarry":
            case "Crystal Loom":
            case "Docks":
            case "Alchemy Lab":
            case "Dojo":
                this.productionBuildings.push([tile.y, tile.x]);
                break;
            case "Town House":
                this.houses.push([tile.y, tile.x]);
                break;
            case "Watch Tower":
                this.towers.push([tile.y, tile.x]);
                for (var y = Math.max(0, tile.y - 2); y < Math.min(this.height, tile.y + 3); y++) {
                    for (var x = Math.max(0, tile.x - 2); x < Math.min(this.width, tile.x + 3); x++) {
                        if (Math.abs(x - tile.x) + Math.abs(y - tile.y) <= 2) {
                            this.map[y][x].defense += 2 * tile.building.tier;
                        }
                    }
                }
                break;
            case "Market":
                this.markets.push([tile.y, tile.x]);
                break;
            case "Town House":
                this.houses.push([tile.y, tile.x]);
                break;
            case "Tavern":
                this.taverns.push([tile.y, tile.x]);
                break;
            case "Road":
            case "Town":
                this.roads.push([tile.y, tile.x]);
                break;
            case "Warehouse":
                this.warehouses.push([tile.y, tile.x]);
                break;
        }
    }
    _removeBuilding(tile) {
        tile.defense -= MoonlightData.getInstance().moonperks.hardenedvillagers.level +
            this.townData.upgrades.reinforcedhouses.level;
        switch (tile.building.name) {
            case "Lumberyard":
            case "Hunter's Lodge":
            case "Mine":
            case "Herbalist's Hut":
            case "Quarry":
            case "Crystal Loom":
            case "Docks":
            case "Alchemy Lab":
            case "Dojo":
                this.productionBuildings = this.productionBuildings.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Watch Tower":
                this.towers = this.towers.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                for (var y = Math.max(0, tile.y - 2); y < Math.min(this.height, tile.y + 3); y++) {
                    for (var x = Math.max(0, tile.x - 2); x < Math.min(this.width, tile.x + 3); x++) {
                        if (Math.abs(x - tile.x) + Math.abs(y - tile.y) <= 2) {
                            this.map[y][x].defense -= 2 * tile.building.tier;
                        }
                    }
                }
                break;
            case "Market":
                this.markets = this.markets.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Town House":
                this.houses = this.houses.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Tavern":
                this.taverns = this.taverns.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Road":
                this.roads = this.roads.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
            case "Warehouse":
                this.warehouses = this.warehouses.filter(p => p[1] !== tile.x || p[0] !== tile.y);
                break;
        }
    }

    _findWeakestTile() {
        var pos = [-1, -1];
        var min = this.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease + 9999;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.map[y][x].explored === false && this.map[y][x].revealed === true &&
                    this.map[y][x].difficulty < min && this.map[y][x].name !== "Starlight Palace") {
                    pos = [x, y];
                    min = this.map[y][x].difficulty;
                }
            }
        }
        return pos;
    }
    _findStrongestTile() {
        var pos = [-1, -1];
        var min = this.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease - 10;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.map[y][x].explored === false && this.map[y][x].revealed === true &&
                    this.map[y][x].difficulty > min && this.map[y][x].name !== "Starlight Palace") {
                    pos = [x, y];
                    min = this.map[y][x].difficulty;
                }
            }
        }
        return pos;
    }

    getProdBuildingCount() {
        return this.productionBuildings.length;
    }

    nextWeakestTile(autoInvasion) {
        if (autoInvasion === true && this.sightings.length > 0) {
            // sightings are stored (y,x) while this function expects (x,y)
            return [this.sightings[0][1], this.sightings[0][0]];
        }
        if (DynamicSettings.getInstance().autoExploreOptions === Statics.AUTOEXPLORE_WEAKEST) {
            return this._findWeakestTile();
        } else if (DynamicSettings.getInstance().autoExploreOptions === Statics.AUTOEXPLORE_STRONGEST) {
            return this._findStrongestTile();
        }
        return [-1, -1];
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
        PlayerData.getInstance().spendResource(building.resourceCosts, Math.min(7, this.regionLevel));
        PlayerData.getInstance().addGold(-building.goldCost);
        this.map[y][x].building = building;
        this.map[y][x].building.increaseCosts();
        this._addBuilding(this.map[y][x]);
        this._calculateTileBonuses();
        this._onTileChanged(this.map[y][x]);
    }
    upgradeBuilding(x, y) {
        PlayerData.getInstance().spendResource(this.map[y][x].building.resourceCosts, Math.min(7, this.regionLevel));
        PlayerData.getInstance().addGold(-this.map[y][x].building.goldCost);
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

    _getResourcesPerDay() {
        var resource = [];
        var prodBonus = this.townData.getProductionMulti() *
            (1 + PlayerData.getInstance().getTalentLevel("governance") * 0.04);
        for (var i = 0; i < this.resourcesPerDay.length; i++) {
            resource.push(Math.max(0, this.resourcesPerDay[i] * prodBonus));
        }
        resource[0] *= PlayerData.getInstance().dungeonBonus.wood;
        resource[1] *= PlayerData.getInstance().dungeonBonus.leather;
        resource[2] *= PlayerData.getInstance().dungeonBonus.metal;
        resource[3] *= PlayerData.getInstance().dungeonBonus.fiber;
        resource[4] *= PlayerData.getInstance().dungeonBonus.stone;
        resource[5] *= PlayerData.getInstance().dungeonBonus.crystal;
        return resource;
    }

    _tryUpgradeList(list) {
        for (var i = 0; i < list.length; i++) {
            if (this._canUpgrade(this.map[list[i][0]][list[i][1]])) {
                this.upgradeBuilding(list[i][1], list[i][0]);
                break;
            }
        }
    }

    updateDay() {
        this.townData.endOfDay();
        var player = new PlayerData();

        //add resources from buildings here
        var resource = this._getResourcesPerDay();
        player.addResource(resource, this.resourceTier);

        // calculate alchemy production here, first drain resources, and then give proportional resources of next tier
        // If there are not enough resources to drain, production is scaled proportionally across all alchemy labs
        if (this.alchemyDrain > 0) {
            var resource = [];
            var moonlightBonus = 1 + (MoonlightData.getInstance().moonperks.mysticcauldron.level * 0.1);
            for (var i = 0; i < player.resources[this.resourceTier].length; i++) {
                resource.push(Math.min(this.alchemyDrain, player.resources[this.resourceTier][i]));
            }
            player.spendResource(resource, this.resourceTier);
            for (var i = 0; i < player.resources[this.resourceTier].length; i++) {
                resource[i] = (resource[i] / this.alchemyDrain) * this.alchemyGain * moonlightBonus;
            }
            player.addResource(resource, Math.min(this.resourceTier + 1, 7));
        }

        if (this.tilesExplored >= 11 && this.regionLevel === WorldData.getInstance().invasionRegion) {
            this.sightingsDelay -= Statics.TIME_PER_DAY;
            if (this.sightingsDelay <= 0) {
                this._addSighting();
            }
        }
        for (var i = 0; i < this.sightings.length; i++) {
            var s = this.sightings[i];
            //TODO Add ramping strength from land/building
            this.map[s[0]][s[1]].incInvasionPower(this.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease);
            this.invasionCounter += this.map[s[0]][s[1]].getInvasionMulti() *
                (1 / (1 + MoonlightData.getInstance().challenges.invasion.completions * 0.25));
        }

        if (this.invasionCounter > Statics.INVASION_THRESHOLD) {
            this._invade();
        }

        if (this.autoUpgrade === true) {
            this._tryUpgradeList(this.productionBuildings);
            this._tryUpgradeList(this.houses);
            this._tryUpgradeList(this.markets);
            this._tryUpgradeList(this.taverns);
            this._tryUpgradeList(this.roads);
            this._tryUpgradeList(this.warehouses);
            this._tryUpgradeList(this.towers);
        }
    }

    updateWeek() {
        if (this.townData.areDungeonsComplete() === true) {
            var regionList = WorldData.getInstance().regionList;
            for (var i = this.regionLevel + 1; i < regionList.length; i++) {
                if (regionList[i].townData.areDungeonsComplete() === false) {
                    regionList[i].townData.villagerPower += this.villagerStatGain[0] * 0.2;
                    regionList[i].townData.villagerHealth += this.villagerStatGain[1] * 0.2;
                    break;
                }
            }
        } else {
            this.townData.villagerPower += this.villagerStatGain[0];
            this.townData.villagerHealth += this.villagerStatGain[1];
        }
        if (this.blueprint !== -1 && this.width === 11 && this.height === 13) {
            var bp = PlayerData.getInstance().blueprints[this.blueprint];
            for (var y = 0; y < bp.map.length; y++) {
                for (var x = 0; x < bp.map[y].length; x++) {
                    if (bp.map[y][x] !== 0) {
                        var bld;
                        if (bp.map[y][x] === 'prod') {
                            bld = BuildingRegistry.getBuildingByName(RegionRegistry.TILE_TYPES[this.map[y][x].regName].preferredBuilding);
                        } else {
                            bld = BuildingRegistry.getBuildingByName(bp.map[y][x]);
                        }
                        if (this._canBuild(this.map[y][x], bld)) {
                            this.placeBuilding(x, y, bld);
                        }
                    }
                }
            }
        }
        this.townData.endOfWeek(this);
    }
}