import { Region } from "./Region";
import { WorldTime } from "./WorldTime";
import { Common } from "../utils/Common";

export class WorldData {
    constructor() {
        if (!WorldData.instance) {
            this.regionList = [];
            this.regionList.push(new Region(12, 12, [0, 20], "temperate"));
            this.currentRegion = 0;
            this.nextRegions = [];
            this.time = new WorldTime();
            this.time.registerEvent("onDayEnd", () => {this.updateDay(); });
            this.time.registerEvent("onWeekEnd", () => {this.updateWeek(); });
            WorldData.instance = this;
        }

        return WorldData.instance;
    }

    rebirth() {
        this.regionList = [];
        this.regionList.push(new Region(12, 12, [0, 20], "temperate"));
        this.currentRegion = 0;
        this.nextRegions = [];
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
    }
    getGoldCap() {
        var cap = 0;
        for (var i = 0; i < this.regionList.length; i++) {
            cap += this.regionList[i].townData.getGoldCap();
        }
        return cap;
    }

    generateRegionChoices() {
        var numChoices = Common.randint(2, 5);
        var choices = ["temperate", "mountains", "desert", "forest", "hills"];
        this.nextRegions = [];
        for (var i = 0; i < numChoices; i++) {
            var choice = Common.randint(0, choices.length);
            this.nextRegions.push(choices[choice]);
            choices.splice(choice, 1);
        }
    }

    addRegion(index) {
        var difficulty = this.regionList.length * 20;
        this.regionList.push(new Region(12, 12, [difficulty, difficulty + 20], this.nextRegions[index]));
        this.regionList[this.regionList.length - 1].worldHeight = Math.floor((index + 1) * (700 / (this.nextRegions.length + 1)));
        this.nextRegions = [];
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
            time: this.time.save()
        }

        return saveObj;
    }
    load(saveObj, ver) {
        this.regionList = [];
        for (var i = 0; i < saveObj.rl.length; i++) {
            this.regionList.push(Region.loadFromSave(saveObj.rl[i], ver));
        }
        this.currentRegion = saveObj.cr;
        this.nextRegions = saveObj.nr;
        this.time.load(saveObj.time, ver);
    }
}