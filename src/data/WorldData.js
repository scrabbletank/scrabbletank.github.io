import { Region } from "./Region";
import { WorldTime } from "./WorldTime";
import { Common } from "../utils/Common";
import { DynamicSettings } from "./DynamicSettings";
import { PlayerData } from "./PlayerData";
import { MoonlightData } from "./MoonlightData";
import { ProgressionStore } from "./ProgressionStore";

export class WorldData {
    constructor() {
        if (!WorldData.instance) {
            var regSize = DynamicSettings.getInstance().regionSize;
            this.regionList = [];
            this.regionList.push(new Region(regSize[0], regSize[1], 0, "temperate", this._randomizeTraits(0)));
            this.currentRegion = 0;
            this.nextRegions = [];
            this.timeAtRunStart = 0;
            this.time = new WorldTime();
            this.time.registerEvent("onDayEnd", () => { this.updateDay(); });
            this.time.registerEvent("onWeekEnd", () => { this.updateWeek(); });
            this.onRegionChangedHandlers = [];
            WorldData.instance = this;
        }

        return WorldData.instance;
    }

    static getInstance() {
        if (!WorldData.instance) {
            return new WorldData();
        }
        return WorldData.instance;
    }

    rebirth() {
        var regSize = DynamicSettings.getInstance().regionSize;
        this.regionList = [];
        this.regionList.push(new Region(regSize[0], regSize[1], 0, "temperate", this._randomizeTraits(0)));
        this.currentRegion = 0;
        this.nextRegions = [];
        this.timeAtRunStart = this.time.time;
        this._onRegionChangedHandler();
    }

    onRegionChanged(callback) {
        this.onRegionChangedHandlers.push(callback);
    }

    _onRegionChangedHandler() {
        for (var i = 0; i < this.onRegionChangedHandlers.length; i++) {
            this.onRegionChangedHandlers[i]();
        }
    }

    getRegion(idx) {
        return this.regionList[idx];
    }
    setRegion(idx) {
        this.currentRegion = idx;
    }
    getCurrentRegion() {
        return this.getRegion(this.currentRegion);
    }
    setCurrentRegion(index) {
        this.currentRegion = index;
        this._onRegionChangedHandler();
    }
    getGoldCap() {
        var cap = 0;
        for (var i = 0; i < this.regionList.length; i++) {
            cap += this.regionList[i].townData.getGoldCap();
        }
        return cap;
    }

    _randomizeTraits(count) {
        var settings = DynamicSettings.getInstance();
        var traits = []
        for (var i = 0; i < settings.fixedTraits.length; i++) {
            traits.push({ type: settings.fixedTraits[i].type, level: settings.fixedTraits[i].level });
        }
        for (var i = 0; i < count + settings.startingTraits; i++) {
            var traitType = Common.randint(1, 7);
            var temp = traits.find(t => t.type === traitType);
            if (temp !== undefined) {
                temp.level += 1;
            } else {
                traits.push({ type: traitType, level: 1 });
            }
        }
        traits = traits.sort((a, b) => { return b.level - a.level });
        return traits;
    }

    generateRegionChoices() {
        var numChoices = Common.randint(2, 5);
        var choices = ["temperate", "mountains", "desert", "forest", "hills"];
        this.nextRegions = [];
        for (var i = 0; i < numChoices; i++) {
            var choice = Common.randint(0, choices.length);
            var totalTraits = Math.floor((this.regionList.length) / 2);
            this.nextRegions.push({
                type: choices[choice],
                traits: this._randomizeTraits(totalTraits)
            });
            choices.splice(choice, 1);
        }
    }

    addRegion(index) {
        var regSize = DynamicSettings.getInstance().regionSize;
        this.regionList.push(new Region(regSize[0], regSize[1], this.regionList.length, this.nextRegions[index].type, this.nextRegions[index].traits));
        this.regionList[this.regionList.length - 1].worldHeight = Math.floor((index + 1) * (700 / (this.nextRegions.length + 1)));
        this.nextRegions = [];
        this._onRegionChangedHandler();
    }

    handleRunCompletion() {
        var moonlightEarned = PlayerData.getInstance().earnableMoonlight(this.getCurrentRegion().regionLevel + 1) *
            (1 + 0.15 * MoonlightData.getInstance().challenges.time.completions);
        MoonlightData.getInstance().moonlight += moonlightEarned;

        if (this.getCurrentRegion().regionLevel >= 1) {
            ProgressionStore.getInstance().persistentUnlocks.challenges = true;
        }
        if (this.getCurrentRegion().regionLevel >= 3) {
            MoonlightData.getInstance().challenges.buildings.unlocked = true;
            MoonlightData.getInstance().challenges.talent.unlocked = true;
        }
        if (this.getCurrentRegion().regionLevel >= 4) {
            MoonlightData.getInstance().challenges.megamonsters.unlocked = true;
        }
        if (this.getCurrentRegion().regionLevel >= 6) {
            MoonlightData.getInstance().challenges.outcast.unlocked = true;
        }

        //handle challenge completion here
        if (DynamicSettings.getInstance().maxRunTime === -1 || this.time.time - this.timeAtRunStart < DynamicSettings.getInstance().maxRunTime) {
            var challenge = MoonlightData.getInstance().getChallengeFromName(DynamicSettings.getInstance().challengeName);
            if (challenge !== undefined) {
                if (challenge.completions < challenge.maxCompletions) {
                    switch (challenge.name) {
                        case "A Matter of Years":
                            MoonlightData.getInstance().challenges.forge.unlocked = true;
                            MoonlightData.getInstance().challenges.explore.unlocked = true;
                            MoonlightData.getInstance().challengePoints += 2;
                            break;
                        case "Forged Ahead":
                            MoonlightData.getInstance().challengePoints += 2;
                            break;
                        case "Giant Lands":
                            MoonlightData.getInstance().challengePoints += 3;
                            break;
                        case "Lazy Townsfolk":
                            MoonlightData.getInstance().challengePoints += 3;
                            break;
                        case "Talentless":
                            MoonlightData.getInstance().challengePoints += 4;
                            break;
                        case "Mega Monsters":
                            MoonlightData.getInstance().challengePoints += 5;
                            break;
                    }
                    challenge.completions += 1;
                }
                if (challenge.fastestTime === 0) {
                    challenge.fastestTime = this.time.time - this.timeAtRunStart;
                } else {
                    challenge.fastestTime = Math.min(this.time.time - this.timeAtRunStart, challenge.fastestTime);
                }
            }
        }
        DynamicSettings.getInstance().reset();
    }


    update(delta) {
        this.time.update(delta);
        for (var i = 0; i < this.regionList.length; i++) {
            this.regionList[i].update(delta);
        }
    }

    updateDay() {
        for (var i = 0; i < this.regionList.length; i++) {
            this.regionList[i].updateDay();
        }
    }

    updateWeek() {
        for (var i = 0; i < this.regionList.length; i++) {
            this.regionList[i].updateWeek();
        }
    }

    save() {
        var rlObj = [];
        for (var i = 0; i < this.regionList.length; i++) {
            rlObj.push(this.regionList[i].save());
        }
        var saveObj = {
            rl: rlObj,
            cr: this.currentRegion,
            nr: this.nextRegions,
            st: this.timeAtRunStart,
            time: this.time.save()
        }

        return saveObj;
    }
    load(saveObj, ver) {
        if (ver <= 4) {
            saveObj.st = 0;
        }
        this.regionList = [];
        for (var i = 0; i < saveObj.rl.length; i++) {
            this.regionList.push(Region.loadFromSave(saveObj.rl[i], ver));
        }
        this.currentRegion = saveObj.cr;
        this.nextRegions = saveObj.nr;
        this.timeAtRunStart = saveObj.st;
        this.time.load(saveObj.time, ver);
    }
}