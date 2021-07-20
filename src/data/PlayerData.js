import { Statics } from "./Statics";
import { AdventurerBlock } from "./AdventurerBlock";
import { WizardBlock } from "./WizardBlock";
import { WorldData } from "./WorldData";
import { GearData } from "./GearData";
import { MoonlightData } from "./MoonlightData";
import { DynamicSettings } from "./DynamicSettings";
import { ProgressionStore } from "./ProgressionStore";
import { TooltipRegistry } from "./TooltipRegistry";
import { Blueprint } from "./Blueprint";
import { StarData } from "./StarData";
import { RitualData } from "./RitualData";



export class PlayerData {
    constructor() {
        if (!PlayerData.instance) {
            this.statChangedHandlers = [];
            this.resourceChangedHandlers = [];
            this.talentChangedHandlers = [];
            this.classSelectedHandlers = [];

            this.baseVillagerPower = 1;
            this.baseVillagerHealth = 10;
            this.blueprints = [];
            for (var i = 0; i < 5; i++) {
                this.blueprints.push(new Blueprint());
            }

            this._init();
            this.statBlock = new AdventurerBlock(this);

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
    _setClassStatics() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                TooltipRegistry.setDefaultNames();
                this.classStatics = {
                    STRENGTH_DMG_MIN: 0.4,
                    STRENGTH_DMG_MAX: 1,
                    HIT_PER_DEXTERITY: 7,
                    EVA_PER_AGILITY: 7,
                    HP_PER_ENDURANCE: 5,
                    REGEN_PER_RECOVERY: 0.15,
                    ARMOR_PER_DEFENSE: 0.2,
                    SCALING_DIMINISHING_MULTIPLIER: 0.01,
                    CRITPOWER_PER_ACCURACY: 3,
                    CRITRESISTANCE_PER_ENDURANCE: 3,
                    AGI_EXPLORE_POWER: 0.44,
                    AGI_EXPLORE_MULTI: 0.03,
                    SCALING_DIMINISHING_POWER: 0.6
                }
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
                break;
            case Statics.CLASS_BESERKER:
                this.classStatics = {
                    STRENGTH_DMG_MIN: 0.4,
                    STRENGTH_DMG_MAX: 1,
                    HIT_PER_DEXTERITY: 7,
                    EVA_PER_AGILITY: 7,
                    HP_PER_ENDURANCE: 5,
                    REGEN_PER_RECOVERY: 0.15,
                    ARMOR_PER_DEFENSE: 0.2,
                    SCALING_DIMINISHING_MULTIPLIER: 0.01,
                    CRITPOWER_PER_ACCURACY: 3,
                    CRITRESISTANCE_PER_ENDURANCE: 3,
                    AGI_EXPLORE_POWER: 0.44,
                    AGI_EXPLORE_MULTI: 0.03,
                    SCALING_DIMINISHING_POWER: 0.6
                }
                break;
            case Statics.CLASS_WIZARD:
                TooltipRegistry.setWizardNames();
                this.classStatics = {
                    STRENGTH_DMG_MIN: 0.2,
                    STRENGTH_DMG_MAX: 0.5,
                    HIT_PER_DEXTERITY: 7,
                    EVA_PER_AGILITY: 5,
                    HP_PER_ENDURANCE: 3,
                    REGEN_PER_RECOVERY: 0.15,
                    ARMOR_PER_WARD: 0.06,
                    SHIELD_PER_WARD: 3,
                    GEAR_ARMOR_TO_SHIELD: 2,
                    GEAR_DAMAGE_TO_MAGIC: 0.5,
                    SPELL_POWER_PER_POWER: 1,
                    CRITRESISTANCE_PER_ENDURANCE: 3,
                    AGI_EXPLORE_POWER: 0.44,
                    AGI_EXPLORE_MULTI: 0.03,
                    SCALING_DIMINISHING_MULTIPLIER: 0.01,
                    SCALING_DIMINISHING_POWER: 0.5
                }
                this.talents = {
                    cantrip: { name: "Cantrip", level: 0, maxLevel: -1, requires: [], texture: { sprite: "talenticons", tile: 0 } },
                    first: { name: "First Level Spell", level: 0, maxLevel: 1, requires: ["cantrip"], texture: { sprite: "talenticons", tile: 1 } },
                    second: { name: "Second Level Spell", level: 0, maxLevel: 2, requires: ["first"], texture: { sprite: "talenticons", tile: 2 } },
                    third: { name: "Third Level Spell", level: 0, maxLevel: 3, requires: ["second"], texture: { sprite: "talenticons", tile: 3 } },
                    fourth: { name: "Fourth Level Spell", level: 0, maxLevel: 4, requires: ["third"], texture: { sprite: "talenticons", tile: 4 } },
                    fifth: { name: "Fifth Level Spell", level: 0, maxLevel: 5, requires: ["fourth"], texture: { sprite: "talenticons", tile: 5 } },
                    entangle: { name: "Entagle", level: 0, maxLevel: -1, requires: ["first"], texture: { sprite: "talenticons", tile: 9 } },
                    thorns: { name: "Thorns", level: 0, maxLevel: -1, requires: ["entangle"], texture: { sprite: "talenticons", tile: 17 } },
                    barrier: { name: "Barrier", level: 0, maxLevel: -1, requires: ["second"], texture: { sprite: "talenticons", tile: 10 } },
                    shell: { name: "Shell", level: 0, maxLevel: -1, requires: ["barrier"], texture: { sprite: "talenticons", tile: 18 } },
                    fireball: { name: "Fireball", level: 0, maxLevel: -1, requires: ["third"], texture: { sprite: "talenticons", tile: 11 } },
                    ignite: { name: "Ignite", level: 0, maxLevel: -1, requires: ["fireball"], texture: { sprite: "talenticons", tile: 19 } },
                    haste: { name: "Haste", level: 0, maxLevel: 10, requires: ["fourth"], texture: { sprite: "talenticons", tile: 12 } },
                    quicken: { name: "Quicken", level: 0, maxLevel: -1, requires: ["haste"], texture: { sprite: "talenticons", tile: 20 } },
                    powerwordkill: { name: "Power Word Kill", level: 0, maxLevel: -1, requires: ["fifth"], texture: { sprite: "talenticons", tile: 13 } },
                    powerwordstun: { name: "Power Word Stun", level: 0, maxLevel: 5, requires: ["powerwordkill"], texture: { sprite: "talenticons", tile: 21 } },
                    wizstr: { name: "Elective Studies: Strength", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "icons", tile: 0 } },
                    wizdex: { name: "Elective Studies: Dexterity", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "icons", tile: 1 } },
                    wizagi: { name: "Elective Studies: Agility", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "icons", tile: 2 } },
                    wizend: { name: "Elective Studies: Endurance", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "icons", tile: 3 } },
                    alchemy: { name: "Alchemy", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "talenticons", tile: 8 } },
                    runemancy: { name: "Runemancy", level: 0, maxLevel: -1, requires: ["cantrip"], texture: { sprite: "talenticons", tile: 16 } },
                    magicarmor: { name: "Magic Armor", level: 0, maxLevel: -1, requires: ["runemancy"], texture: { sprite: "talenticons", tile: 25 } },
                    magicweapon: { name: "Magic Weapon", level: 0, maxLevel: -1, requires: ["runemancy"], texture: { sprite: "talenticons", tile: 24 } },
                    codex: { name: "Chromatic Codex", level: 0, maxLevel: -1, requires: ["fifth"], texture: { sprite: "talenticons", tile: 26 } },
                    bounty: { name: "Bounty", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 7 } },
                    explorer: { name: "Explorer", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 15 } },
                    guardian: { name: "Guardian", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 39 } },
                    governance: { name: "Governance", level: 0, maxLevel: -1, requires: [], texture: { sprite: "icons", tile: 38 } },
                    lootgoblin: { name: "Loot Goblin", level: 0, maxLevel: 10, requires: ["bounty"], texture: { sprite: "icons", tile: 51 } },
                    bundle: { name: "Bundle", level: 0, maxLevel: -1, requires: ["explorer"], texture: { sprite: "icons", tile: 52 } },
                    charisma: { name: "Charisma", level: 0, maxLevel: -1, requires: ["governance"], texture: { sprite: "icons", tile: 53 } },
                    townguard: { name: "Town Guard", level: 0, maxLevel: -1, requires: ["guardian"], texture: { sprite: "icons", tile: 50 } }
                }
                break;
        }
    }

    _init() {
        this.shade = 0;
        this.statPoints = 3;
        this.talentPoints = MoonlightData.getInstance().challenges.talent.completions;
        this.statLevel = 1;
        this.talentLevel = 1;
        this.nextStatCost = Statics.STAT_COST_BASE - StarData.getInstance().perks.statcost.level * 2;
        this.nextTalentCost = Statics.TALENT_COST_BASE;
        this.resources = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
        this.craftingCosts = [1, 1, 1, 1, 1, 1, 1, 1];
        this.dimCraftingCosts = [1, 1, 1, 1, 1, 1, 1, 1];
        for (var i = 0; i < this.craftingCosts.length; i++) {
            this.craftingCosts[i] = this.craftingCosts[i] * DynamicSettings.getInstance().gearCostMulti;
            this.craftingCosts[i] = this.craftingCosts[i] * Math.pow(0.925,
                MoonlightData.getInstance().challenges.forge.completions);
        }
        this.baseStats = {
            strength: 5,
            dexterity: 5,
            agility: 5,
            endurance: 5,
            recovery: 5,
            defense: 5,
            accuracy: 5
        }
        this.starperkCostReduction = Math.pow(0.95, StarData.getInstance().perks.forge.level);
        this.starperkCostReduction *= Math.pow(0.95, MoonlightData.getInstance().challenges.forge2.completions);
        this.resourceTierReached = DynamicSettings.getInstance().minResourceTier;
        this.gold = 0;
        this.motes = 0;
        this.challengeExploreMulti = 1 + (MoonlightData.getInstance().challenges.explore.completions * 0.25);
        this.playerClass = Statics.CLASS_ADVENTURER;
        this._setClassStatics();
        this.classChosen = false;

        this.weapon = undefined;
        this.armor = undefined;
        this.trinket = undefined;

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
            critPower: 0,
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

        this.dungeonBonus = {
            strength: 1,
            dexterity: 1,
            agility: 1,
            endurance: 1,
            recovery: 1,
            defense: 1,
            accuracy: 1,
            wood: 1,
            leather: 1,
            metal: 1,
            fiber: 1,
            stone: 1,
            crystal: 1,
            moonlight: 1
        }

        this.runes = [];
    }

    selectClass(selectedClass) {
        this.playerClass = selectedClass;
        this.classChosen = true;
        this._setClassStatics(selectedClass);

        var newBlock;
        switch (selectedClass) {
            case Statics.CLASS_ADVENTURER:
                newBlock = new AdventurerBlock(this);
                newBlock.convert(this.statBlock);
                if (this.weapon !== undefined) {
                    newBlock.equip(this.weapon);
                }
                if (this.armor !== undefined) {
                    newBlock.equip(this.armor);
                }
                if (this.trinket !== undefined) {
                    newBlock.equip(this.trinket);
                }
                break;
            case Statics.CLASS_WIZARD:
                newBlock = new WizardBlock(this);
                newBlock.convert(this.statBlock);
                if (this.weapon !== undefined) {
                    newBlock.equip(this.weapon);
                }
                if (this.armor !== undefined) {
                    newBlock.equip(this.armor);
                }
                if (this.trinket !== undefined) {
                    newBlock.equip(this.trinket);
                }
                break;
        }
        this.statBlock = newBlock;
        this._onClassSelected();
    }

    reduceCraftingCosts(tier, amount) {
        for (var i = 0; i < Math.min(tier, 8); i++) {
            if (this.craftingCosts[i] <= 0.1 && MoonlightData.getInstance().challenges.forge2.completions > 0) {
                this.dimCraftingCosts[i] = this.dimCraftingCosts[i] * amount;
            } else {
                this.craftingCosts[i] = Math.max(0.1, this.craftingCosts[i] * amount);
            }
        }
    }
    getCraftingCosts(tier) {
        if (tier < 0 || tier >= 8) {
            return 1;
        }
        return this.craftingCosts[tier] * this.starperkCostReduction *
            Math.pow(this.dimCraftingCosts[tier], Statics.FORGE_DIMINISHING_POWER);
    }
    getCraftingCosts(tier) {
        if (tier < 0 || tier >= 8) {
            return 1;
        }
        return this.craftingCosts[tier] * this.starperkCostReduction;
    }

    rebirth() {
        this._init();
        var block = new AdventurerBlock(this);
        block.rebirth();
        block.copyHandlers(this.statBlock);
        this.statBlock = block;
    }

    applyRitualBonuses() {
        var statHelper = (ritual) => { return (ritual.level * (10 + 10 + (ritual.level - 1) * 5)) / 2; };
        // permanent stats
        const rituals = RitualData.getInstance().rituals;
        this.baseStats.strength += statHelper(rituals.permstr);
        this.baseStats.dexterity += statHelper(rituals.permdex);
        this.baseStats.agility += statHelper(rituals.permagi);
        this.baseStats.endurance += statHelper(rituals.permend);
        this.baseStats.recovery += statHelper(rituals.permrec);
        this.baseStats.defense += statHelper(rituals.permdef);
        this.baseStats.accuracy += statHelper(rituals.permacc);

        this.baseVillagerPower += statHelper(rituals.permvp) / 2;
        this.baseVillagerHealth += statHelper(rituals.permvh) * 5;
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

    strTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Strength determines how hard you hit. Each point increases your min Damage by " +
                    (Math.floor(this.classStatics.STRENGTH_DMG_MIN * ((1 + this.getTalentLevel("str") * 0.07) * 100)) / 100) +
                    ", max Damage by " +
                    (Math.floor(this.classStatics.STRENGTH_DMG_MAX * ((1 + this.getTalentLevel("str") * 0.07) * 100)) / 100) +
                    ". Your Strength increases damage from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Strength()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Strength determines how hard you hit. Each point increases your min Damage by " +
                    (Math.floor(this.classStatics.STRENGTH_DMG_MIN * ((1 + this.getTalentLevel("wizstr") * 0.05) * 100)) / 100) +
                    ", max Damage by " +
                    (Math.floor(this.classStatics.STRENGTH_DMG_MAX * ((1 + this.getTalentLevel("wizstr") * 0.05) * 100)) / 100) +
                    ". Your Strength increases damage from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Strength()) - 1) * 100) + "%.";
        }
    }
    dexTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Dexterity determines your ability to hit enemies. Each point increases your Hit by " +
                    (this.classStatics.HIT_PER_DEXTERITY + this.getTalentLevel('dex')) +
                    ". Your Dexterity increases Hit from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Dexterity()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Dexterity determines your ability to hit enemies. Each point increases your Hit by " +
                    (this.classStatics.HIT_PER_DEXTERITY + this.getTalentLevel('wizdex')) +
                    ". Your Dexterity increases Hit from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Dexterity()) - 1) * 100) + "%.";
        }
    }
    agiTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Agility determines how hard you are to hit. Each point increases your Evasion by " +
                    (this.classStatics.EVA_PER_AGILITY + this.getTalentLevel('agi')) + " and gives a small boost to explore speed. " +
                    "Your Agility increases Evasion from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Agility()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Agility determines how hard you are to hit. Each point increases your Evasion by " +
                    (Math.floor((this.classStatics.EVA_PER_AGILITY + this.getTalentLevel('wizagi') * 0.7) * 10) / 10) +
                    " and gives a small boost to explore speed. " +
                    "Your Agility increases Evasion from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Agility()) - 1) * 100) + "%.";
        }
    }
    endTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Endurance determines your health and resistance against criticals. Each point increases your max Health by " +
                    (this.classStatics.HP_PER_ENDURANCE + this.getTalentLevel('end')) + " and Crit Resistance by 3." +
                    "Your Endurance increases Health and Crit Resistance from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Endurance()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Endurance determines your health and resistance against criticals. Each point increases your max Health by " +
                    (this.classStatics.HP_PER_ENDURANCE + this.getTalentLevel('wizend') * 0.5) + " and Crit Resistance by 3." +
                    "Your Endurance increases Health and Crit Resistance from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Endurance()) - 1) * 100) + "%.";
        }
    }
    recTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Recovery determines how easily you heal your wounds. Each point increases your Health Regen by " +
                    (Math.floor(this.classStatics.REGEN_PER_RECOVERY * ((1 + this.getTalentLevel("rec") * 0.08) * 100)) / 100) + "/s." +
                    "Your Recovery increases Health Regen from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Recovery()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Recovery determines how easily you heal your wounds. Each point increases your Health Regen by " +
                    (Math.floor(this.classStatics.REGEN_PER_RECOVERY * 100) / 100) + "/s." +
                    "Your Recovery increases Health Regen from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Recovery()) - 1) * 100) + "%.";
        }
    }
    defTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Defense determines how durable your body is. Each point increases your armor by " +
                    (Math.floor(this.classStatics.ARMOR_PER_DEFENSE * ((1 + this.getTalentLevel("def") * 0.13) * 100)) / 100) +
                    ". Your Defense increases armor from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Defense()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Ward determines your magical protections. Each point increases your armor by " +
                    (Math.floor(this.classStatics.ARMOR_PER_WARD * 100) / 100) +
                    " and increases your start of combat shield by " + this.classStatics.SHIELD_PER_WARD +
                    ". Your Ward increases armor from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Defense()) - 1) * 100) + "%.";
        }
    }
    accTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Accuracy determines your ability to strike weak points. Each point increases your Crit Power by " +
                    (this.classStatics.CRITPOWER_PER_ACCURACY + this.getTalentLevel('acc') * 0.5) +
                    ". Your Accuracy increases Crit Power from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Accuracy()) - 1) * 100) + "%.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                var spellpower = this.classStatics.SPELL_POWER_PER_POWER * (1 + this.getTalentLevel('first') * 0.01) *
                    (1 + this.getTalentLevel('second') * 0.01) * (1 + this.getTalentLevel('third') * 0.01) * (1 + this.getTalentLevel('fourth') * 0.01) *
                    (1 + this.getTalentLevel('fifth') * 0.01) * (1 + this.getTalentLevel('runemancy') * this.getTotalSocketedRunes() * 0.01) *
                    (1 + this.statBlock.CritChance()) * (1 + this.getTalentLevel('codex') * 0.06);
                return "Power determines your magical might. Each point increases your Spell Power by " + (Math.floor(spellpower * 100) / 100) +
                    ". Your Power increases Spell Power from gear by " +
                    Math.floor((this.statBlock._getScale(this.statBlock.Accuracy()) - 1) * 100) + "%.";
        }
    }
    critTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Crit Chance. The chance any hit is a critical hit, dealing extra damage.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Power Multiplier. Your spell power is increased by this value.";
        }
    }
    critPowerTooltip() {
        switch (this.playerClass) {
            case Statics.CLASS_ADVENTURER:
                return "Crit Power. Increases your crit damage, but is reduced by the targets Crit Resistance.";
            case Statics.CLASS_BESERKER:
                return "";
            case Statics.CLASS_WIZARD:
                return "Spell Power. Increases the damage dealt by the majority of your spells.";
        }
    }

    _onStatChanged() {
        for (var i = 0; i < this.statChangedHandlers.length; i++) {
            this.statChangedHandlers[i]();
        }
    }
    _onResourcesChanged(res, gold, tier) {
        for (var i = 0; i < this.resourceChangedHandlers.length; i++) {
            this.resourceChangedHandlers[i](res, gold, tier);
        }
    }
    _onTalentChanged() {
        for (var i = 0; i < this.talentChangedHandlers.length; i++) {
            this.talentChangedHandlers[i]();
        }
    }
    _onClassSelected() {
        for (var i = 0; i < this.classSelectedHandlers.length; i++) {
            this.classSelectedHandlers[i]();
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
        else if (event === "onClassSelected") {
            this.classSelectedHandlers.push(callback);
        }
    }

    earnableMoonlight(gateReached) {
        var challengeBonus = MoonlightData.getInstance().challenges.time2.completions <= 4 ? 1 :
            1 + MoonlightData.getInstance().challengePoints * 0.05 * 0.01;
        return MoonlightData.getMoonlightEarned((this.statLevel - 1) + (this.talentLevel - 1) *
            (3 + StarData.getInstance().perks.knowledge.level * 2), gateReached) *
            (1 + 0.15 * MoonlightData.getInstance().challenges.time.completions) * this.dungeonBonus.moonlight *
            RitualData.getInstance().moonlightBonus * challengeBonus;
    }

    getExploreMulti() {
        return (1 + this.talents.explorer.level * 0.2) *
            (1 + this.runeBonuses.exploreSpeed) *
            (1 + Statics.AGI_EXPLORE_MULTI * Math.pow(this.statBlock.Agility(), Statics.AGI_EXPLORE_POWER + this.runeBonuses.agilityScaling)) *
            (1 + MoonlightData.getInstance().moonperks.farstrider.level * 0.1) *
            this.challengeExploreMulti /
            (1 + RitualData.getInstance().activePerks.desolation * 0.25);
    }

    getStatCost(buyAmount) {
        var ret = 0;
        var starMod = StarData.getInstance().perks.statcost.level * 2;
        for (var i = 0; i < buyAmount; i++) {
            ret += (Statics.STAT_COST_BASE - starMod) + ((Statics.STAT_COST_PER_LEVEL - starMod) * (this.statLevel - 1 + i));
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
        if (this.talents[name] === undefined || DynamicSettings.getInstance().talentsEnabled === false) {
            return 0;
        }
        switch (name) {
            case "str":
            case "wizstr":
            case "cleave":
            case "stun":
                return this.talents[name].level + this.runeBonuses.strTalents;
            case "dex":
            case "wizdex":
            case "hit":
            case "followthrough":
                return this.talents[name].level + this.runeBonuses.dexTalents;
            case "agi":
            case "wizagi":
            case "evasion":
            case "dodge":
                return this.talents[name].level + this.runeBonuses.agiTalents;
            case "end":
            case "wizend":
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

    getTotalSocketedRunes() {
        var num = 0;
        if (this.weapon !== undefined) {
            for (var i = 0; i < this.weapon.runes.length; i++) {
                num += this.weapon.runes[i].level !== 0 ? 1 : 0;
            }
        }
        if (this.armor !== undefined) {
            for (var i = 0; i < this.armor.runes.length; i++) {
                num += this.armor.runes[i].level !== 0 ? 1 : 0;
            }
        }
        if (this.trinket !== undefined) {
            for (var i = 0; i < this.trinket.runes.length; i++) {
                num += this.trinket.runes[i].level !== 0 ? 1 : 0;
            }
        }
        return num;
    }

    buyStat(buyAmount) {
        for (var i = 0; i < buyAmount; i++) {
            this.statPoints += Statics.STAT_POINTS_PER_BUY + StarData.getInstance().perks.statpoints.level;
            this.shade -= this.nextStatCost;
            this.nextStatCost = (Statics.STAT_COST_BASE - StarData.getInstance().perks.statcost.level * 2) +
                ((Statics.STAT_COST_PER_LEVEL - StarData.getInstance().perks.statcost.level * 2) * this.statLevel);
            this.statLevel += 1;
        }
    }
    buyTalent(buyAmount) {
        var challengeMod = MoonlightData.getInstance().challenges.talent.completions * 0.008;
        for (var i = 0; i < buyAmount; i++) {
            this.talentPoints += 1;
            this.shade -= this.nextTalentCost;
            this.nextTalentCost = Statics.TALENT_COST_BASE * Math.pow(Statics.TALENT_COST_POWER - challengeMod, this.talentLevel);
            this.talentLevel += 1;
        }
        if (this.talentLevel >= 50 && ProgressionStore.getInstance().persistentUnlocks.wizardClass === false) {
            ProgressionStore.getInstance().persistentUnlocks.wizardClass = true;
            ProgressionStore.getInstance().registerFeatureUnlocked(Statics.UNLOCK_GENERIC,
                "Your long training session of several minutes is over. Infusing the last bits of shade directly into your veins " +
                "you are approached by a mysterious man in robes and a pointy hat! He speaks to you.\n\n" +
                "\"My, you have become quite talented! I think it time you look for different paths. Broaden your horizons, " +
                "only then will you gain mastery of the world around you.\"\n\n" +
                "He then vainishes into thin air, leaving only his robe and hat. Your not sure what the crazy old man was talking " +
                "about, but you aren't about to let these sweet digs go to waste. You put on your robe and wizard hat. Oh yeah, " +
                "it's all coming together. Stylish, and you can take them through the portal! You've unlocked the Wizard Class!");
        }
        this._onTalentChanged();
    }
    addTalentPoints(amount) {
        this.talentPoints += amount;
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
        this._onResourcesChanged(list, 0, tier);
    }
    spendResource(list, tier) {
        for (var i = 0; i < list.length; i++) {
            this.resources[tier][i] = Math.max(0, this.resources[tier][i] - list[i]);
        }
        this._onResourcesChanged([0, 0, 0, 0, 0, 0], 0, tier);
    }
    addGold(amount) {
        var worldData = new WorldData();
        this.gold = Math.max(0, Math.min(worldData.getGoldCap(), this.gold + amount));
        this._onResourcesChanged([0, 0, 0, 0, 0, 0], amount, 0);
    }
    addMote(amount) {
        this.motes += amount;
        this._onResourcesChanged([0, 0, 0, 0, 0, 0], 0, 0);
    }
    addShade(amount) {
        this.shade += amount;
        this._onResourcesChanged([0, 0, 0, 0, 0, 0], 0, 0);
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
    sortRunes(sortType) {
        switch (sortType) {
            case 0: // BY NAME
                this.runes.sort((a, b) => { return a.word.localeCompare(b.word); });
                break;
            case 1: // BY LEVEL
                this.runes.sort((a, b) => { return b.level - a.level; });
                break;
        }
    }
    addBaseVillagerStats(power, health) {
        this.baseVillagerPower += power;
        this.baseVillagerHealth += health;
    }

    multiplyDungeonBonus(prop, value) {
        if (this.dungeonBonus[prop] !== undefined) {
            this.dungeonBonus[prop] = this.dungeonBonus[prop] * value;
        }
        this._onStatChanged();
    }

    isEquipedItem(gear) {
        switch (gear.slotType) {
            case Statics.GEAR_WEAPON:
                return this.weapon !== undefined && gear.name === this.weapon.name;
            case Statics.GEAR_ARMOR:
                return this.armor !== undefined && gear.name === this.armor.name;
            case Statics.GEAR_TRINKET:
                return this.trinket !== undefined && gear.name === this.trinket.name;
        }
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

    save() {
        var bpArray = [];
        for (var i = 0; i < this.blueprints.length; i++) {
            bpArray.push(this.blueprints[i].save());
        }
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
            dcf: this.dimCraftingCosts,
            csp: this.starperkCostReduction,
            pc: this.playerClass,
            cc: this.classChosen,
            gold: this.gold,
            mote: this.motes,
            talents: this.talents,
            runes: this.runes,
            vp: this.baseVillagerPower,
            vh: this.baseVillagerHealth,
            db: this.dungeonBonus,
            bp: bpArray,
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
        this.playerClass = saveObj.pc === undefined ? Statics.CLASS_ADVENTURER : saveObj.pc;
        this.gold = saveObj.gold;
        this.motes = saveObj.mote;
        this.runes = saveObj.runes === undefined ? [] : saveObj.runes;
        this.baseVillagerPower = saveObj.vp === undefined ? 1 : saveObj.vp;
        this.baseVillagerHealth = saveObj.vh === undefined ? 10 : saveObj.vh;
        this.dungeonBonus = saveObj.db === undefined ? this.dungeonBonus : saveObj.db;
        this.starperkCostReduction = saveObj.csp === undefined ? 1 : saveObj.csp;
        this.dimCraftingCosts = saveObj.dcf === undefined ? [1, 1, 1, 1, 1, 1, 1, 1] : saveObj.dcf;

        this.selectClass(this.playerClass);
        var keys = Object.keys(saveObj.talents);
        for (var i = 0; i < keys.length; i++) {
            if (this.talents[keys[i]] !== undefined) {
                this.talents[keys[i]].level = saveObj.talents[keys[i]].level;
            }
        }
        this.classChosen = saveObj.cc === undefined ? true : saveObj.cc;

        if (saveObj.bp !== undefined) {
            this.blueprints = [];
            for (var i = 0; i < saveObj.bp.length; i++) {
                this.blueprints.push(Blueprint.loadFromFile(saveObj.bp[i]));
            }
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