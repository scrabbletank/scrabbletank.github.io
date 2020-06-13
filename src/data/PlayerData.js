import { Statics } from "./Statics";
import { PlayerBlock } from "./PlayerBlock";
import { WorldData } from "./WorldData";
import { GearData } from "./GearData";
import { MoonlightData } from "./MoonlightData";



export class PlayerData {
    constructor() {
        if (!PlayerData.instance) {
            this.statBlock = new PlayerBlock(this);
            this.shade = 0;
            this.statPoints = 0;
            this.talentPoints = 0;
            this.statLevel = 1;
            this.talentLevel = 1;
            this.nextStatCost = Statics.STAT_COST_BASE;
            this.nextTalentCost = Statics.TALENT_COST_BASE;
            this.resources = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
            this.statChangedHandlers = [];
            this.resourceChangedHandlers = [];
            this.talentChangedHandlers = [];
            this.craftingCosts = [1, 1, 1, 1, 1, 1, 1, 1];
            this.gold = 0;
            this.motes = 0;

            this.weapon = undefined;
            this.armor = undefined;
            this.trinket = undefined;

            this.talents = {
                str: { name: "Strength", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 0 } },
                dex: { name: "Dexterity", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 1 } },
                agi: { name: "Agility", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 2 } },
                end: { name: "Endurance", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 3 } },
                rec: { name: "Recovery", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 4 } },
                def: { name: "Defense", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 5 } },
                acc: { name: "Accuracy", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 6 } },
                cleave: { name: "Cleave", level: 0, maxLevel: 5, requires: ["str"], texture: { sprite: "icons", tile: 8 } },
                hit: { name: "Hit", level: 0, maxLevel: -1, requires: ["dex"], texture: { sprite: "icons", tile: 9 } },
                evasion: { name: "Evasion", level: 0, maxLevel: -1, requires: ["agi"], texture: { sprite: "icons", tile: 10 } },
                resilient: { name: "Resilient", level: 0, maxLevel: 10, requires: ["end"], texture: { sprite: "icons", tile: 11 } },
                quickrecovery: { name: "Quick Recovery", level: 0, maxLevel: 12, requires: ["rec"], texture: { sprite: "icons", tile: 12 } },
                block: { name: "Block", level: 0, maxLevel: 12, requires: ["def"], texture: { sprite: "icons", tile: 13 } },
                crit: { name: "Critical", level: 0, maxLevel: 15, requires: ["acc"], texture: { sprite: "icons", tile: 14 } },
                stun: { name: "Stunning Hit", level: 0, maxLevel: 5, requires: ["cleave"], texture: { sprite: "icons", tile: 16 } },
                followthrough: { name: "Follow Through", level: 0, maxLevel: 5, requires: ["hit"], texture: { sprite: "icons", tile: 17 } },
                dodge: { name: "Dodge", level: 0, maxLevel: 5, requires: ["evasion"], texture: { sprite: "icons", tile: 18 } },
                defydeath: { name: "Defy Death", level: 0, maxLevel: 5, requires: ["resilient"], texture: { sprite: "icons", tile: 19 } },
                secondwind: { name: "Second Wind", level: 0, maxLevel: 5, requires: ["quickrecovery"], texture: { sprite: "icons", tile: 20 } },
                parry: { name: "Parry", level: 0, maxLevel: 5, requires: ["block"], texture: { sprite: "icons", tile: 21 } },
                doublecrit: { name: "Double Crit", level: 0, maxLevel: 5, requires: ["crit"], texture: { sprite: "icons", tile: 22 } },
                bounty: { name: "Bounty", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 7 } },
                explorer: { name: "Explorer", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 15 } },
                guardian: { name: "Guardian", level: 0, maxLevel: 5, requires: [], texture: { sprite: "icons", tile: 39 } },
                governance: { name: "Governance", level: 0, maxLevel: 10, requires: [], texture: { sprite: "icons", tile: 38 } }
            }

            PlayerData.instance = this;
        }

        return PlayerData.instance;
    }

    rebirth() {
        this.statBlock.rebirth();
        this.shade = 0;
        this.statPoints = 0;
        this.talentPoints = 0;
        this.statLevel = 1;
        this.talentLevel = 1;
        this.nextStatCost = Statics.STAT_COST_BASE;
        this.nextTalentCost = Statics.TALENT_COST_BASE;
        this.resources = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
        this.craftingCosts = [1, 1, 1, 1, 1, 1, 1, 1];
        this.gold = 0;
        this.motes = 0;

        this.weapon = undefined;
        this.armor = undefined;
        this.trinket = undefined;

        this.talents = {
            str: { name: "Strength", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 0 } },
            dex: { name: "Dexterity", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 1 } },
            agi: { name: "Agility", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 2 } },
            end: { name: "Endurance", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 3 } },
            rec: { name: "Recovery", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 4 } },
            def: { name: "Defense", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 5 } },
            acc: { name: "Accuracy", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 6 } },
            cleave: { name: "Cleave", level: 0, maxLevel: 5, requires: ["str"], texture: { sprite: "icons", tile: 8 } },
            hit: { name: "Hit", level: 0, maxLevel: -1, requires: ["dex"], texture: { sprite: "icons", tile: 9 } },
            evasion: { name: "Evasion", level: 0, maxLevel: -1, requires: ["agi"], texture: { sprite: "icons", tile: 10 } },
            resilient: { name: "Resilient", level: 0, maxLevel: 10, requires: ["end"], texture: { sprite: "icons", tile: 11 } },
            quickrecovery: { name: "Quick Recovery", level: 0, maxLevel: 12, requires: ["rec"], texture: { sprite: "icons", tile: 12 } },
            block: { name: "Block", level: 0, maxLevel: 12, requires: ["def"], texture: { sprite: "icons", tile: 13 } },
            crit: { name: "Critical", level: 0, maxLevel: 15, requires: ["acc"], texture: { sprite: "icons", tile: 14 } },
            stun: { name: "Stunning Hit", level: 0, maxLevel: 5, requires: ["cleave"], texture: { sprite: "icons", tile: 16 } },
            followthrough: { name: "Follow Through", level: 0, maxLevel: 5, requires: ["hit"], texture: { sprite: "icons", tile: 17 } },
            dodge: { name: "Dodge", level: 0, maxLevel: 5, requires: ["evasion"], texture: { sprite: "icons", tile: 18 } },
            defydeath: { name: "Defy Death", level: 0, maxLevel: 5, requires: ["resilient"], texture: { sprite: "icons", tile: 19 } },
            secondwind: { name: "Second Wind", level: 0, maxLevel: 5, requires: ["quickrecovery"], texture: { sprite: "icons", tile: 20 } },
            parry: { name: "Parry", level: 0, maxLevel: 5, requires: ["block"], texture: { sprite: "icons", tile: 21 } },
            doublecrit: { name: "Double Crit", level: 0, maxLevel: 5, requires: ["crit"], texture: { sprite: "icons", tile: 22 } },
            bounty: { name: "Bounty", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 7 } },
            explorer: { name: "Explorer", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 15 } },
            guardian: { name: "Guardian", level: 0, maxLevel: 5, requires: [], texture: { sprite: "icons", tile: 39 } },
            governance: { name: "Governance", level: 0, maxLevel: 10, requires: [], texture: { sprite: "icons", tile: 38 } }
        }
    }

    increaseStat(stat, val) {
        this.statPoints -= val;
        switch (stat) {
            case 'str':
                this.statBlock.stats.strength += val;
                break;
            case 'dex':
                this.statBlock.stats.dexterity += val;
                break;
            case 'agi':
                this.statBlock.stats.agility += val;
                break;
            case 'end':
                this.statBlock.stats.endurance += val;
                break;
            case 'rec':
                this.statBlock.stats.recovery += val;
                break;
            case 'def':
                this.statBlock.stats.defense += val;
                break;
            case 'acc':
                this.statBlock.stats.accuracy += val;
                break;
        }
        this._onStatChanged();
    }

    _onStatChanged() {
        for (var i = 0; i < this.statChangedHandlers.length; i++) {
            this.statChangedHandlers[i]();
        }
    }
    _onResourcesChanged() {
        for (var i = 0; i < this.resourceChangedHandlers.length; i++) {
            this.resourceChangedHandlers[i]();
        }
    }
    _onTalentChanged() {
        for (var i = 0; i < this.talentChangedHandlers.length; i++) {
            this.talentChangedHandlers[i]();
        }
    }

    registerEvent(event, callback) {
        if (event === "onStatChanged") {
            this.statChangedHandlers.push(callback);
        }
        else if (event === "onResourcesChanged") {
            this.resourceChangedHandlers.push(callback);
        }
        else if (event === "onTalentChanged") {
            this.talentChangedHandlers.push(callback);
        }
    }

    earnableMoonlight(gateReached) {
        return MoonlightData.getMoonlightEarned((this.statLevel - 1) + (this.talentLevel - 1) * 3, gateReached);
    }

    buyStat() {
        this.statPoints += Statics.STAT_POINTS_PER_BUY;
        this.shade -= this.nextStatCost;
        this.nextStatCost = Statics.STAT_COST_BASE + (Statics.STAT_COST_PER_LEVEL * this.statLevel);
        this.statLevel += 1;
    }
    buyTalent() {
        this.talentPoints += 1;
        this.shade -= this.nextTalentCost;
        this.nextTalentCost = Statics.TALENT_COST_BASE * Math.pow(Statics.TALENT_COST_POWER, this.talentLevel);
        this.talentLevel += 1;
        this._onTalentChanged();
    }

    levelTalent(talent) {
        if (talent.level < talent.maxLevel || talent.maxLevel === -1) {
            talent.level += 1;
            this.talentPoints -= 1;
            this._onTalentChanged();
        }
    }

    addResource(list, tier) {
        for (var i = 0; i < list.length; i++) {
            this.resources[tier][i] += list[i];
        }
        this._onResourcesChanged();
    }
    spendResource(list, tier) {
        for (var i = 0; i < list.length; i++) {
            this.resources[tier][i] -= list[i];
        }
        this._onResourcesChanged();
    }
    addGold(amount) {
        var worldData = new WorldData();
        this.gold = Math.min(worldData.getGoldCap(), this.gold + amount);
        this._onResourcesChanged();
    }
    addMote(amount) {
        this.motes += amount;
        this._onResourcesChanged();
    }

    equip(gear) {
        switch (gear.slotType) {
            case Statics.GEAR_WEAPON:
                if (this.weapon !== undefined) {
                    this.unequip(Statics.GEAR_WEAPON);
                }
                this.weapon = gear;
                this.statBlock.equip(this.weapon);
                break;
            case Statics.GEAR_ARMOR:
                if (this.armor !== undefined) {
                    this.unequip(Statics.GEAR_ARMOR);
                }
                this.armor = gear;
                this.statBlock.equip(this.armor);
                break;
            case Statics.GEAR_TRINKET:
                if (this.trinket !== undefined) {
                    this.unequip(Statics.GEAR_TRINKET);
                }
                this.trinket = gear;
                this.statBlock.equip(this.trinket);
                break;
        }
        this._onStatChanged();
    }
    unequip(slot) {
        switch (slot) {
            case Statics.GEAR_WEAPON:
                this.statBlock.unequip(this.weapon);
                this.weapon = undefined;
                break;
            case Statics.GEAR_ARMOR:
                this.statBlock.unequip(this.armor);
                this.armor = undefined;
                break;
            case Statics.GEAR_TRINKET:
                this.statBlock.unequip(this.trinket);
                this.trinket = undefined;
                break;
        }
        this._onStatChanged();
    }

    applyForgeUpgrade(tier) {
        for (var i = 0; i < tier; i++) {
            this.craftingCosts[i] = this.craftingCosts[i] * Statics.FORGE_REDUCTION;
        }
    }

    save() {
        var saveObj = {
            stats: this.statBlock.save(),
            shade: this.shade,
            sp: this.statPoints,
            tp: this.talentPoints,
            spl: this.statLevel,
            tpl: this.talentLevel,
            nsp: this.nextStatCost,
            ntp: this.nextTalentCost,
            res: this.resources,
            crf: this.craftingCosts,
            gold: this.gold,
            mote: this.motes,
            talents: this.talents,
            w: this.weapon === undefined ? "" : this.weapon.name,
            a: this.armor === undefined ? "" : this.armor.name,
            t: this.trinket === undefined ? "" : this.trinket.name
        }

        return saveObj;
    }

    load(saveObj) {
        this.statBlock.load(saveObj.stats);
        this.shade = saveObj.shade;
        this.statPoints = saveObj.sp;
        this.talentPoints = saveObj.tp;
        this.statLevel = saveObj.spl;
        this.talentLevel = saveObj.tpl;
        this.nextStatCost = saveObj.nsp;
        this.nextTalentCost = saveObj.ntp;
        this.resources = saveObj.res;
        this.craftingCosts = saveObj.crf;
        this.gold = saveObj.gold;
        this.motes = saveObj.mote;
        this.talents = saveObj.talents;

        var gearData = new GearData();
        if (saveObj.w !== "") {
            this.equip(gearData.getGearByName(saveObj.w));
        }
        if (saveObj.a !== "") {
            this.equip(gearData.getGearByName(saveObj.a));
        }
        if (saveObj.t !== "") {
            this.equip(gearData.getGearByName(saveObj.t));
        }
    }
}