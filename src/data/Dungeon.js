import { Common } from "../utils/Common";
import { MoonlightData } from "./MoonlightData";
import { ProgressionStore } from "./ProgressionStore";
import { StarData } from "./StarData";
import { Statics } from "./Statics";
import { WorldData } from "./WorldData";

const dungeonPrefix = ['Starlit', 'Poisoned', 'Malevolent', 'Monstrous', 'Dank', 'Moody', 'Submerged', 'Burning', 'Ancient',
    'Foggy', 'Winding', 'Whispering', 'Bloody', 'Malignant', 'Baleful', 'Gloomy', 'Glowing', 'Old', 'Blasted', 'Pestilent',
    'Forgotten'];
const dungeonSuffix = ['Tomb', 'Crypt', 'Grove', 'Garden', 'Tower', 'Spire', 'Dungeon', 'Barrow', 'Mausoleum', 'Catacomb', 'Prison'];

export class Dungeon {
    constructor(level, difficulty, tier, regionLevel, maxRooms) {
        this.level = level;
        this.difficulty = difficulty;
        this.tier = tier;
        this.maxRooms = maxRooms;
        this.completedRooms = 0;
        this.rewards = [];
        this.regionLevel = regionLevel;
        this.name = this._randomizeName();
        this._randomizeRewards();
    }

    _randomizeName() {
        return dungeonPrefix[Common.randint(0, dungeonPrefix.length)] + " " + dungeonSuffix[Common.randint(0, dungeonSuffix.length)];
    }

    _rewardAlreadyPicked(rewardType) {
        for (var i = 0; i < this.rewards.length; i++) {
            if (rewardType === this.rewards[i].type) {
                return true;
            }
        }
        if (rewardType === Statics.DUNGEON.STARSHARDS &&
            ProgressionStore.getInstance().persistentUnlocks.starshards === false) {
            return true;
        }
        if (rewardType === Statics.DUNGEON.RITUAL_POINTS &&
            ProgressionStore.getInstance().persistentUnlocks.rituals === false) {
            return true;
        }
        return false;
    }

    _randomizeRewards() {
        this.rewards = [];
        for (var i = 0; i < 3; i++) {
            if (this.tier === 0) {
                var num = Common.randint(0, 6);
                while (this._rewardAlreadyPicked(num) === true) {
                    var num = Common.randint(0, 6);
                }
                switch (num) {
                    case Statics.DUNGEON.RESOURCES:
                        this.rewards.push({ type: num, amount: 28 });
                        break;
                    case Statics.DUNGEON.SHADE:
                        var shade = Math.floor((1600 + MoonlightData.getInstance().moonperks.shadow2.level * 75) * (1 + (this.level / 4)) *
                            MoonlightData.getInstance().getShadowBonus() * (1 + StarData.getInstance().perks.mists.level * 0.25));
                        this.rewards.push({ type: num, amount: shade });
                        break;
                    case Statics.DUNGEON.MOTES:
                        var motes = (1 + MoonlightData.getInstance().moonperks.heartofdarkness.level) * 40;
                        this.rewards.push({ type: num, amount: motes });
                        break;
                    case Statics.DUNGEON.GOLD:
                        var gold = Math.floor(WorldData.getInstance().getGoldCap() * 0.25);
                        this.rewards.push({ type: num, amount: gold });
                        break;
                    case Statics.DUNGEON.GEAR_LEVELS:
                        this.rewards.push({ type: num, amount: 5 });
                        break;
                    case Statics.DUNGEON.RUNES:
                        this.rewards.push({ type: num, amount: 4 });
                        break;
                }
            } else if (this.tier === 1) {
                var num = Common.randint(10, 18);
                while (this._rewardAlreadyPicked(num) === true) {
                    var num = Common.randint(10, 18);
                }
                switch (num) {
                    case Statics.DUNGEON.WOOD:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.LEATHER:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.METAL:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.FIBER:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.STONE:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.CRYSTAL:
                        this.rewards.push({ type: num, amount: 0.15 });
                        break;
                    case Statics.DUNGEON.PRODUCTION:
                        this.rewards.push({ type: num, amount: 0.30 });
                        break;
                    case Statics.DUNGEON.ECONOMY:
                        this.rewards.push({ type: num, amount: 0.30 });
                        break;
                }
            } else {
                var num = Common.randint(20, 33);
                while (this._rewardAlreadyPicked(num) === true) {
                    var num = Common.randint(20, 33);
                }
                switch (num) {
                    case Statics.DUNGEON.STRENGTH:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.DEXTERITY:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.AGILITY:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.ENDURANCE:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.RECOVERY:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.DEFENSE:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.ACCURACY:
                        this.rewards.push({ type: num, amount: 0.2 });
                        break;
                    case Statics.DUNGEON.MOONLIGHT:
                        this.rewards.push({ type: num, amount: 0.1 });
                        break;
                    case Statics.DUNGEON.TALENTS:
                        this.rewards.push({ type: num, amount: 4 });
                        break;
                    case Statics.DUNGEON.PERM_VPOWER:
                        this.rewards.push({ type: num, amount: this.level * 0.25 });
                        break;
                    case Statics.DUNGEON.PERM_VHEALTH:
                        this.rewards.push({ type: num, amount: this.level * 2.5 });
                        break;
                    case Statics.DUNGEON.STARSHARDS:
                        var shards = WorldData.getInstance().getRegion(this.regionLevel).starshardsPerTile * 2;
                        this.rewards.push({ type: num, amount: shards });
                        break;
                    case Statics.DUNGEON.RITUAL_POINTS:
                        this.rewards.push({ type: num, amount: Math.floor(1 + (this.tier / 2)) });
                        break;
                }
            }
        }
    }

    getRandomEnemy() {

    }

    save() {
        var saveObj = {
            l: this.level,
            d: this.difficulty,
            t: this.tier,
            rl: this.regionLevel,
            n: this.name,
            mr: this.maxRooms,
            cr: this.completedRooms,
            r: this.rewards
        }

        return saveObj;
    }

    static loadFromFile(saveObj, ver) {
        var dungeon = new Dungeon(saveObj.l, saveObj.d, saveObj.t, saveObj.rl, saveObj.mr);
        dungeon.completedRooms = saveObj.cr;
        dungeon.rewards = saveObj.r;
        dungeon.name = saveObj.n;
        return dungeon;
    }
}