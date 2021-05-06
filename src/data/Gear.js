import { MoonlightData } from './MoonlightData';
import { RuneRegistry } from './RuneRegistry';
import { Statics } from './Statics';

export class Gear {
    constructor(name, tier, slotType, stats, costs, costsLvl) {
        this.tier = tier;
        this.slotType = slotType;
        this.name = name;
        this.statBonuses = stats;
        this.statsPerLevel = { critChance: 0 };
        this._totalBonuses = stats;
        this.level = 0;
        this.costs = costs;
        this.costsPerLevel = costsLvl;
        this.motesFused = 0;
        this.runes = [];
        this.compiledRunes = [];
        this._runeBonuses = {};

        for (const prop in this.statBonuses) {
            if (prop !== 'critChance') {
                this.statsPerLevel[prop] = this.statBonuses[prop] * 0.25;
            }
        }

        for (var i = 0; i < Statics.RUNESLOTS_PER_TIER[tier]; i++) {
            this.runes.push({ word: "Empty", level: 0 });
        }
    }

    bringToLevel(level) {
        for (var i = this.level; i < level; i++) {
            var tlvl = i - 1;
            // first level does not add stats (ie level 0 to 1 counts as crafting the item)
            if (tlvl >= 0) {
                for (const prop in this.statBonuses) {
                    this.statBonuses[prop] += this.statsPerLevel[prop] * Math.ceil((i + 1) / 5);
                }
            }
            for (var t = 0; t < this.costs.length; t++) {
                this.costs[t] += this.costsPerLevel[t] * (i + 1);
            }
        }
        this.level = level;
        this._calculateStats();
    }

    getMotePower() {
        var softCap = MoonlightData.getInstance().getMoteSoftCap();
        return (Math.min(softCap, this.motesFused) +
            Math.pow(Math.max(0, this.motesFused - softCap), Statics.MOTE_SOFT_CAP_POWER)) * Statics.MOTE_BONUS
    }

    _calculateStats() {
        this._totalBonuses = {};
        var motePower = 1 + this.getMotePower();
        for (const prop in this.statBonuses) {
            if (this.statBonuses[prop] !== 0) {
                this._totalBonuses[prop] = this.statBonuses[prop] > 0 ? this.statBonuses[prop] * motePower : this.statBonuses[prop];
            }
        }
    }

    _calculateRuneBonuses() {
        this.compiledRunes = RuneRegistry.getRuneWordsAndBonuses(this.runes);
        this._runeBonuses = {};

        for (var i = 0; i < this.compiledRunes.length; i++) {
            for (const prop in this.compiledRunes[i].bonus) {
                if (this._runeBonuses[prop] === undefined) {
                    this._runeBonuses[prop] = 0;
                }
                this._runeBonuses[prop] += this.compiledRunes[i].bonus[prop];
            }
        }
    }

    fuseMotes(motes) {
        this.motesFused += motes;
        this._calculateStats();
    }

    destroyRune(slot) {
        if (slot < 0 || slot >= this.runes.length) {
            return;
        }
        this.runes[slot] = { word: "Empty", level: 0 };
        this._calculateRuneBonuses();
    }
    addRune(rune, slot) {
        if (slot < 0 || slot >= this.runes.length) {
            return;
        }
        this.runes[slot] = rune;
        this._calculateRuneBonuses();
    }

    getStatBonuses() { return this._totalBonuses; }
    getRuneBonuses() { return this._runeBonuses; }

    save() {
        var saveObj = {
            lv: this.level,
            mote: this.motesFused,
            rn: this.runes
        }

        return saveObj;
    }

    load(saveObj, __ver) {
        this.motesFused = saveObj.mote;
        this.runes = saveObj.rn === undefined ? [] : saveObj.rn;
        this.bringToLevel(saveObj.lv);
        this._calculateRuneBonuses();
    }
}