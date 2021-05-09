import { Statics } from "./Statics";
import { PlayerBlock } from "./PlayerBlock";
import { WorldData } from "./WorldData";
import { GearData } from "./GearData";
import { MoonlightData } from "./MoonlightData";
import { DynamicSettings } from "./DynamicSettings";



export class PlayerData {
    constructor() {
        if (!PlayerData.instance) {
            this.statBlock = new PlayerBlock(this);
            this.statChangedHandlers = [];
            this.resourceChangedHandlers = [];
            this.talentChangedHandlers = [];

            this._init();

            PlayerData.instance = this;
        }

        return PlayerData.instance;
    }

    static getInstance() {
        if (!PlayerData.instance) {
            return new PlayerData();
        }
        return PlayerData.instance;
    }

    _init() {
        this.shade = 0;
        this.statPoints = 3;
        this.talentPoints = MoonlightData.getInstance().challenges.talent.completions;
        this.statLevel = 1;
        this.talentLevel = 1;
        this.nextStatCost = Statics.STAT_COST_BASE;
        this.nextTalentCost = Statics.TALENT_COST_BASE;
        this.resources = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
        this.craftingCosts = [1, 1, 1, 1, 1, 1, 1, 1];
        for (var i = 0; i < this.craftingCosts.length; i++) {
            this.craftingCosts[i] = this.craftingCosts[i] * DynamicSettings.getInstance().gearCostMulti;
            this.craftingCosts[i] = this.craftingCosts[i] * Math.pow(0.925,
                MoonlightData.getInstance().challenges.forge.completions);
        }
        this.resourceTierReached = 0;
        this.gold = 0;
        this.motes = 0;
        this.challengeExploreMulti = 1 + (MoonlightData.getInstance().challenges.explore.completions * 0.25);

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
            resilient: { name: "Resilient", level: 0, maxLevel: -1, requires: ["end"], texture: { sprite: "icons", tile: 11 } },
            quickrecovery: { name: "Quick Recovery", level: 0, maxLevel: -1, requires: ["rec"], texture: { sprite: "icons", tile: 12 } },
            block: { name: "Block", level: 0, maxLevel: -1, requires: ["def"], texture: { sprite: "icons", tile: 13 } },
            crit: { name: "Critical", level: 0, maxLevel: -1, requires: ["acc"], texture: { sprite: "icons", tile: 14 } },
            stun: { name: "Stunning Hit", level: 0, maxLevel: 5, requires: ["cleave"], texture: { sprite: "icons", tile: 16 } },
            followthrough: { name: "Follow Through", level: 0, maxLevel: 5, requires: ["hit"], texture: { sprite: "icons", tile: 17 } },
            dodge: { name: "Dodge", level: 0, maxLevel: 5, requires: ["evasion"], texture: { sprite: "icons", tile: 18 } },
            defydeath: { name: "Defy Death", level: 0, maxLevel: 5, requires: ["resilient"], texture: { sprite: "icons", tile: 19 } },
            secondwind: { name: "Second Wind", level: 0, maxLevel: 5, requires: ["quickrecovery"], texture: { sprite: "icons", tile: 20 } },
            parry: { name: "Parry", level: 0, maxLevel: 5, requires: ["block"], texture: { sprite: "icons", tile: 21 } },
            doublecrit: { name: "Double Crit", level: 0, maxLevel: -1, requires: ["crit"], texture: { sprite: "icons", tile: 22 } },
            bounty: { name: "Bounty", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 7 } },
            explorer: { name: "Explorer", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 15 } },
            guardian: { name: "Guardian", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 39 } },
            governance: { name: "Governance", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 38 } },
            lootgoblin: { name: "Loot Goblin", level: 0, maxLevel: 10, requires: ["bounty"], texture: { sprite: "icons", tile: 51 } },
            bundle: { name: "Bundle", level: 0, maxLevel: -1, requires: ["explorer"], texture: { sprite: "icons", tile: 52 } },
            charisma: { name: "Charisma", level: 0, maxLevel: -1, requires: ["governance"], texture: { sprite: "icons", tile: 53 } },
            townguard: { name: "Town Guard", level: 0, maxLevel: -1, requires: ["guardian"], texture: { sprite: "icons", tile: 50 } }
        }

        this.runeBonuses = {
            strPercent: 0,
            strFlat: 0,
            strTalents: 0,
            dexPercent: 0,
            dexFlat: 0,
            dexTalents: 0,
            agiPercent: 0,
            agiFlat: 0,
            agiTalents: 0,
            endPercent: 0,
            endFlat: 0,
            endTalents: 0,
            recPercent: 0,
            recFlat: 0,
            recTalents: 0,
            defPercent: 0,
            defFlat: 0,
            defTalents: 0,
            accPercent: 0,
            accFlat: 0,
            accTalents: 0,
            hitPercent: 0,
            evaPercent: 0,
            regenPercent: 0,
            weaponPercent: 0,
            armorPercent: 0,
            critPercent: 0,
            healthPercent: 0,
            weaponScaling: 0,
            armorScaling: 0,
            baseAttackSpeed: 0,
            OOCRegen: 0,
            enemyCrit: 0,
            exploreSpeed: 0,
            friendshipMulti: 0,
            critChance: 0,
            lootFlat: 0,
            lootTalent: 0,
            moteChance: 0,
            shadeFlat: 0,
            regenOnKill: 0,
            dexToStr: 0,
            endToRec: 0,
            agiToDef: 0,
            allPercent: 0,
            guardianTalent: 0,
            governanceTalent: 0,
            agilityScaling: 0
        }

        this.runes = [];
    }

    rebirth() {
        this.statBlock.rebirth();
        this._init();
    }

    increaseStat(stat, val) {
        var statChange = Math.min(this.statPoints, val);
        if (statChange == 0) {
            return;
        }
        this.statPoints -= statChange;
        switch (stat) {
            case 'str':
                this.statBlock.stats.strength += statChange;
                break;
            case 'dex':
                this.statBlock.stats.dexterity += statChange;
                break;
            case 'agi':
                this.statBlock.stats.agility += statChange;
                break;
            case 'end':
                this.statBlock.stats.endurance += statChange;
                break;
            case 'rec':
                this.statBlock.stats.recovery += statChange;
                break;
            case 'def':
                this.statBlock.stats.defense += statChange;
                break;
            case 'acc':
                this.statBlock.stats.accuracy += statChange;
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

    getExploreMulti() {
        return (1 + this.talents.explorer.level * 0.2) *
            (1 + this.runeBonuses.exploreSpeed) *
            (1 + Statics.AGI_EXPLORE_MULTI * Math.pow(this.statBlock.Agility(), Statics.AGI_EXPLORE_POWER + this.runeBonuses.agilityScaling)) *
            (1 + MoonlightData.getInstance().moonperks.farstrider.level * 0.1) *
            this.challengeExploreMulti;
    }

    getStatCost(buyAmount) {
        var ret = 0;
        for (var i = 0; i < buyAmount; i++) {
            ret += Statics.STAT_COST_BASE + (Statics.STAT_COST_PER_LEVEL * (this.statLevel - 1 + i));
        }
        return ret;
    }
    getTalentCost(buyAmount) {
        var ret = 0;
        var challengeMod = MoonlightData.getInstance().challenges.talent.completions * 0.008;
        for (var i = 0; i < buyAmount; i++) {
            ret += Statics.TALENT_COST_BASE * Math.pow(Statics.TALENT_COST_POWER - challengeMod, (this.talentLevel - 1 + i));
        }
        return ret;
    }
    getTalentLevel(name) {
        if (this.talents[name] === undefined) {
            return 0;
        }
        switch (name) {
            case "str":
            case "cleave":
            case "stun":
                return this.talents[name].level + this.runeBonuses.strTalents;
            case "dex":
            case "hit":
            case "followthrough":
                return this.talents[name].level + this.runeBonuses.dexTalents;
            case "agi":
            case "evasion":
            case "dodge":
                return this.talents[name].level + this.runeBonuses.agiTalents;
            case "end":
            case "resilient":
            case "defydeath":
                return this.talents[name].level + this.runeBonuses.endTalents;
            case "rec":
            case "quickrecovery":
            case "secondwind":
                return this.talents[name].level + this.runeBonuses.recTalents;
            case "def":
            case "block":
            case "parry":
                return this.talents[name].level + this.runeBonuses.defTalents;
            case "acc":
            case "crit":
            case "doublecrit":
                return this.talents[name].level + this.runeBonuses.accTalents;
            case "bounty":
                return this.talents[name].level + this.runeBonuses.lootTalent;
            case "governance":
                return this.talents[name].level + this.runeBonuses.governanceTalent;
            case "guardian":
                return this.talents[name].level + this.runeBonuses.guardianTalent;
        }
        return this.talents[name].level;
    }

    buyStat(buyAmount) {
        for (var i = 0; i < buyAmount; i++) {
            this.statPoints += Statics.STAT_POINTS_PER_BUY;
            this.shade -= this.nextStatCost;
            this.nextStatCost = Statics.STAT_COST_BASE + (Statics.STAT_COST_PER_LEVEL * this.statLevel);
            this.statLevel += 1;
        }
    }
    buyTalent(buyAmount) {
        var challengeMod = MoonlightData.getInstance().challenges.talent.completions > 0 ? 0.02 : 0;
        for (var i = 0; i < buyAmount; i++) {
            this.talentPoints += 1;
            this.shade -= this.nextTalentCost;
            this.nextTalentCost = Statics.TALENT_COST_BASE * Math.pow(Statics.TALENT_COST_POWER - challengeMod, this.talentLevel);
            this.talentLevel += 1;
        }
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
        this.resourceTierReached = Math.max(this.resourceTierReached, tier);
        for (var i = 0; i < list.length; i++) {
            this.resources[tier][i] += list[i];
        }
        this._onResourcesChanged();
    }
    spendResource(list, tier) {
        for (var i = 0; i < list.length; i++) {
            this.resources[tier][i] = Math.max(0, this.resources[tier][i] - list[i]);
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
    addShade(amount) {
        this.shade += amount;
    }

    addRune(rune) {
        this.runes.push(rune);
    }
    removeRune(idx) {
        if (idx < 0 || idx >= this.runes.length) {
            return;
        }
        this.runes.splice(idx, 1);
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
        var runeBonus = gear.getRuneBonuses();
        for (const prop in runeBonus) {
            this.runeBonuses[prop] += runeBonus[prop];
        }
        this._onStatChanged();
    }
    unequip(slot) {
        var runeBonus = {};
        switch (slot) {
            case Statics.GEAR_WEAPON:
                this.statBlock.unequip(this.weapon);
                runeBonus = this.weapon.getRuneBonuses();
                this.weapon = undefined;
                break;
            case Statics.GEAR_ARMOR:
                this.statBlock.unequip(this.armor);
                runeBonus = this.armor.getRuneBonuses();
                this.armor = undefined;
                break;
            case Statics.GEAR_TRINKET:
                this.statBlock.unequip(this.trinket);
                runeBonus = this.trinket.getRuneBonuses();
                this.trinket = undefined;
                break;
        }
        for (const prop in runeBonus) {
            this.runeBonuses[prop] -= runeBonus[prop];
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
            rtr: this.resourceTierReached,
            crf: this.craftingCosts,
            gold: this.gold,
            mote: this.motes,
            talents: this.talents,
            runes: this.runes,
            w: this.weapon === undefined ? "" : this.weapon.name,
            a: this.armor === undefined ? "" : this.armor.name,
            t: this.trinket === undefined ? "" : this.trinket.name
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.statBlock.load(saveObj.stats, ver);
        this.shade = saveObj.shade;
        this.statPoints = saveObj.sp;
        this.talentPoints = saveObj.tp;
        this.statLevel = saveObj.spl;
        this.talentLevel = saveObj.tpl;
        this.nextStatCost = saveObj.nsp;
        this.nextTalentCost = saveObj.ntp;
        this.resources = saveObj.res;
        this.resourceTierReached = saveObj.rtr;
        this.craftingCosts = saveObj.crf;
        this.gold = saveObj.gold;
        this.motes = saveObj.mote;
        this.runes = saveObj.runes === undefined ? [] : saveObj.runes;

        var keys = Object.keys(saveObj.talents);
        var whelp = 0;
        for (var i = 0; i < keys.length; i++) {
            if (this.talents[keys[i]] !== undefined) {
                this.talents[keys[i]] = saveObj.talents[keys[i]];
                whelp += this.talents[keys[i]].level;
            }
        }

        if (whelp != this.talentPoints + this.talentLevel) {
            this.talentPoints = this.talentLevel - whelp + 5;
        }

        var gearData = GearData.getInstance();
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