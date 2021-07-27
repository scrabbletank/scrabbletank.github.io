import { CreatureBlock } from "./CreatureBlock";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";
import { StarData } from "./StarData";
import { RitualData } from "./RitualData";

export class AdventurerBlock extends CreatureBlock {
    constructor(player) {
        super();
        this.player = player;
        this.moonData = new MoonlightData();
        this.secondWindCooldown = 0;
        this.secondWindDuration = 0;
        this.hitCounter = 0;
        this.encounterCounter = 0;
        this.rebirth();
    }

    _getScale(attr) {
        return (1 + Math.pow(attr, this.player.classStatics.SCALING_DIMINISHING_POWER) *
            this.player.classStatics.SCALING_DIMINISHING_MULTIPLIER) * (1 + StarData.getInstance().perks.proficiency.level * 0.1);
    }

    rebirth() {
        this.stats = {
            strength: this.player.baseStats.strength + this.moonData.moonperks.str.level, // damage
            dexterity: this.player.baseStats.dexterity + this.moonData.moonperks.dex.level, // hit chance
            agility: this.player.baseStats.agility + this.moonData.moonperks.agi.level, // evasion
            endurance: this.player.baseStats.endurance + this.moonData.moonperks.end.level, //health
            recovery: this.player.baseStats.recovery + this.moonData.moonperks.rec.level, //hp/energy regen?
            defense: this.player.baseStats.defense + this.moonData.moonperks.def.level, //armor increase
            accuracy: this.player.baseStats.accuracy + this.moonData.moonperks.acc.level, //crit power
            hit: 40,
            evasion: 40,
            critPower: 25,
            critResistance: 25
        };
        this.statBonuses = {
            health: 0,
            damageMin: 0,
            damageMax: 0,
            strength: 0,
            dexterity: 0,
            agility: 0,
            endurance: 0,
            recovery: 0,
            defense: 0,
            accuracy: 0,
            hit: 0,
            evasion: 0,
            critPower: 0,
            critResistance: 0,
            critChance: 0,
            healthRegen: 0,
            armor: 0
        };
        this.hitAnim = "claws";
        this.critAnim = "clawscrit";
        this.level = 0;
        this.currentHealth = this.MaxHealth();
        this.attackCooldown = 0;
        this.secondWindCooldown = 0;
        this.secondWindDuration = 0;
        this.hitCounter = 0;
        this.encounterCounter = 0;
    }

    convert(block) {
        this.stats = {
            strength: block.stats.strength,
            dexterity: block.stats.dexterity,
            agility: block.stats.agility,
            endurance: block.stats.endurance,
            recovery: block.stats.recovery,
            defense: block.stats.defense,
            accuracy: block.stats.accuracy,
            hit: 40,
            evasion: 40,
            critPower: 25,
            critResistance: 25
        };
        this.statBonuses = {
            health: 0,
            damageMin: 0,
            damageMax: 0,
            strength: 0,
            dexterity: 0,
            agility: 0,
            endurance: 0,
            recovery: 0,
            defense: 0,
            accuracy: 0,
            hit: 0,
            evasion: 0,
            critPower: 0,
            critResistance: 0,
            critChance: 0,
            healthRegen: 0,
            armor: 0
        };
        this.level = 0;
        this.currentHealth = Math.min(this.MaxHealth(), block.currentHealth);
        this.hitAnim = "claws";
        this.critAnim = "clawscrit";
        this.level = 0;
        this.attackCooldown = 0;
        this.secondWindCooldown = 0;
        this.secondWindDuration = 0;
        this.hitCounter = 0;
        this.encounterCounter = 0;

        this.copyHandlers(block);
    }

    copyHandlers(block) {
        this.healthChangedHandlers = block.healthChangedHandlers;
        this.attackCooldownChangedHandlers = block.attackCooldownChangedHandlers;
        this.animationChangedHandlers = block.animationChangedHandlers;
    }

    MaxHealth() {
        var end = this.Endurance();
        var ret = (this.statBonuses.health * this._getScale(end)) + end * this.player.classStatics.HP_PER_ENDURANCE;
        ret += end * this.player.getTalentLevel("end");
        ret += ret * this.player.runeBonuses.healthPercent;
        return Math.floor(Math.max(1, ret));
    }
    Strength() {
        var ret = this.stats.strength * (1 + StarData.getInstance().perks.str.level * 10);
        ret += this.statBonuses.strength + this.player.runeBonuses.strFlat;
        ret = ret * (1 + (this.moonData.moonperks.str.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.strPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.strength;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        ret += this.Dexterity() * this.player.runeBonuses.dexToStr;
        return Math.floor(Math.max(1, ret));
    }
    Dexterity() {
        var ret = this.stats.dexterity * (1 + StarData.getInstance().perks.dex.level * 10);
        ret += this.statBonuses.dexterity + this.player.runeBonuses.dexFlat;
        ret = ret * (1 + (this.moonData.moonperks.dex.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.dexPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.dexterity;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Agility() {
        var ret = this.stats.agility * (1 + StarData.getInstance().perks.agi.level * 10);
        ret += this.statBonuses.agility + this.player.runeBonuses.agiFlat;
        ret = ret * (1 + (this.moonData.moonperks.agi.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.agiPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.agility;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Endurance() {
        var ret = this.stats.endurance * (1 + StarData.getInstance().perks.end.level * 10);
        ret += this.statBonuses.endurance + this.player.runeBonuses.endFlat;
        ret = ret * (1 + (this.moonData.moonperks.end.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.endPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.endurance;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Recovery() {
        var ret = this.stats.recovery * (1 + StarData.getInstance().perks.rec.level * 10);
        ret += this.statBonuses.recovery + this.player.runeBonuses.recFlat;
        ret = ret * (1 + (this.moonData.moonperks.rec.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.recPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.recovery;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        ret += this.Endurance() * this.player.runeBonuses.endToRec;
        return Math.floor(Math.max(1, ret));
    }
    Defense() {
        var ret = this.stats.defense * (1 + StarData.getInstance().perks.def.level * 10);
        ret += this.statBonuses.defense + this.player.runeBonuses.defFlat;
        ret = ret * (1 + (this.moonData.moonperks.def.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.defPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.defense;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        ret += this.Agility() * this.player.runeBonuses.agiToDef;
        return Math.floor(Math.max(1, ret));
    }
    Accuracy() {
        var ret = this.stats.accuracy * (1 + StarData.getInstance().perks.acc.level * 10);
        ret += this.statBonuses.accuracy + this.player.runeBonuses.accFlat;
        ret = ret * (1 + (this.moonData.moonperks.acc.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.accPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.accuracy;
        ret = ret * (1 + RitualData.getInstance().activePerks.playercrits * 0.15);
        return Math.floor(Math.max(1, ret));
    }
    Hit() {
        var dex = this.Dexterity();
        var ret = this.stats.hit + (this.statBonuses.hit * this._getScale(dex)) + dex * this.player.classStatics.HIT_PER_DEXTERITY;
        ret += dex * this.player.getTalentLevel("dex");
        ret = ret * (1 + this.player.getTalentLevel("hit") * 0.04);
        ret += ret * this.player.runeBonuses.hitPercent;
        return Math.floor(Math.max(1, ret));
    }
    Evasion() {
        var agi = this.Agility();
        var ret = this.stats.evasion + (this.statBonuses.evasion * this._getScale(agi)) + agi * this.player.classStatics.EVA_PER_AGILITY;
        ret += agi * this.player.getTalentLevel("agi");
        ret = ret * (1 + this.player.getTalentLevel("evasion") * 0.04);
        ret += ret * this.player.runeBonuses.evaPercent;
        return Math.floor(Math.max(1, ret));
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        ret += this.player.getTalentLevel("crit") * 0.01;
        ret += this.player.runeBonuses.critChance;
        ret += RitualData.getInstance().activePerks.playercrits * 0.08;
        return Math.floor(ret * 100) / 100;
    }
    CritResistance() {
        var end = this.Endurance();
        var ret = this.stats.critResistance + (this.statBonuses.critResistance * this._getScale(end)) +
            end * this.player.classStatics.CRITRESISTANCE_PER_ENDURANCE;
        return Math.floor(Math.max(1, ret));
    }
    CritPower() {
        var acc = this.Accuracy();
        var ret = this.stats.critPower + (this.statBonuses.critPower * this._getScale(acc)) +
            acc * this.player.classStatics.CRITPOWER_PER_ACCURACY;
        ret += acc * this.player.getTalentLevel("acc") * 0.5;
        ret += ret * this.player.runeBonuses.critPercent;
        return Math.floor(Math.max(1, ret));
    }
    DamageMin() {
        var str = this.Strength();
        var ret = this.statBonuses.damageMin * (1 + this.player.runeBonuses.weaponPercent) * this._getScale(str) +
            str * this.player.classStatics.STRENGTH_DMG_MIN;
        ret += str * this.player.getTalentLevel("str") * 0.07 * this.player.classStatics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var str = this.Strength();
        var ret = this.statBonuses.damageMax * (1 + this.player.runeBonuses.weaponPercent) * this._getScale(str) +
            str * this.player.classStatics.STRENGTH_DMG_MAX;
        ret += str * this.player.getTalentLevel("str") * 0.07 * this.player.classStatics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var rec = this.Recovery();
        var ret = (this.statBonuses.healthRegen * this._getScale(rec)) + rec * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += rec * this.player.getTalentLevel("rec") * 0.08 * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += ret * this.player.runeBonuses.regenPercent;
        return Math.floor(Math.max(0, ret) * 10) / 10;
    }
    Armor() {
        var def = this.Defense();
        var ret = def * this.player.classStatics.ARMOR_PER_DEFENSE + this.statBonuses.armor * (1 + this.player.runeBonuses.armorPercent) *
            this._getScale(def);
        ret += def * this.player.getTalentLevel("def") * 0.13 * this.player.classStatics.ARMOR_PER_DEFENSE;
        return Math.floor(Math.max(0, ret) - this.corrosion);
    }
    AttackSpeed() {
        var ret = this.attackSpeed / (1 + this.player.runeBonuses.baseAttackSpeed);
        return ret;
    }

    initCombat() {
        this.corrosion = 0;
        this.attackCooldown = 0;
        this._onHealthChanged();
    }

    takeDamage(damage, isCrit, dmgType) {
        if (this.player.getTalentLevel("dodge") > 0 && dmgType !== Statics.DMG_TRUE) {
            this.hitCounter -= 1;
            if (this.hitCounter <= 0) {
                this.hitCounter = Math.max(3, Statics.DODGE_COUNTER - this.player.getTalentLevel("dodge"));
                return 0;
            }
        }
        var dmg = damage;
        if (isCrit === true) {
            dmg = dmg * Math.pow(0.92, this.player.runeBonuses.enemyCrit);
            dmg = Math.max(2, dmg - this.Endurance() * 0.05 * this.player.getTalentLevel("resilient"));
        }
        if (Math.random() < this.player.getTalentLevel("parry") * 0.05) {
            dmg = dmg / 2;
        }
        if (Math.random() <= 0.2) {
            dmg = Math.max(1, dmg - this.Armor() * (this.player.getTalentLevel("block") * 0.25));
        }
        dmg = super.takeDamage(dmg, isCrit, dmgType);
        if (this.player.getTalentLevel("secondwind") > 0 && this.secondWindCooldown <= 0 && this.currentHealth < this.MaxHealth() / 2) {
            this.secondWindDuration = 10000;
            this.secondWindCooldown = Statics.SECONDWIND_COOLDOWN - this.player.getTalentLevel("secondwind") * 10000;
        }
        if (this.currentHealth <= 0 && this.player.getTalentLevel("defydeath") > 0 && this.encounterCounter <= 0) {
            this.currentHealth = 1;
            this.encounterCounter = Statics.DEFY_DEATH_COUNTER - this.player.getTalentLevel("defydeath");
        }
        return dmg;
    }

    tickRegen(delta, inCombat = true) {
        var oldVal = this.currentHealth;
        var healMulti = 1;
        var regen = this.HealthRegen()
        if (inCombat === false) {
            regen += this.player.runeBonuses.OOCRegen;
            healMulti = 1 + this.player.getTalentLevel("quickrecovery") * 0.25;
        }
        if (this.secondWindDuration > 0) {
            this.secondWindDuration -= delta;
            healMulti = healMulti * 3;
        }
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + regen * (delta / 1000) * healMulti);
        if (oldVal != this.currentHealth) {
            this._onHealthChanged();
        }
    }
    heal(value) {
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + value);
    }

    attack(creature, isCrit = false) {
        var thorns = creature.findTrait(Statics.TRAIT_THORNS);
        if (thorns !== undefined) {
            this.takeDamage(creature.Armor() * 0.2, false, Statics.DMG_MAGIC);
        }
        if (Math.random() < this.player.getTalentLevel("stun") * 0.05) {
            creature.stunTimer = 500;
        }
        var rawDmg = this.rollDamage();
        if (isCrit === true) {
            rawDmg = rawDmg * this.CritDamage(creature.CritResistance());
            if (Math.random() < (this.player.getTalentLevel("doublecrit") * 0.01 * this.CritChance())) {
                rawDmg = rawDmg * 2;
            }
        }
        var dmg = creature.takeDamage(rawDmg, isCrit, Statics.DMG_NORMAL);
        creature.playAnimation(isCrit === true ? this.critAnim : this.hitAnim);
        this.attackCooldown = 0;
        if (Math.random() < this.player.getTalentLevel("followthrough") * 0.05) {
            this.attackCooldown = this.AttackSpeed() / 2;
        }
        this._onAttackCooldownChanged();
        return dmg;
    }
    cleave(creature, isCrit = false) {
        if (Math.random() < this.player.getTalentLevel("stun") * 0.05) {
            creature.stunTimer = 500;
        }
        var rawDmg = this.Strength() * this.player.getTalentLevel("cleave") * 0.2;
        if (isCrit === true) {
            rawDmg = rawDmg * this.CritDamage(creature.CritResistance());
            if (Math.random() < (this.player.getTalentLevel("doublecrit") * 0.01 * this.CritChance())) {
                rawDmg = rawDmg * 2;
            }
        }
        creature.playAnimation(isCrit === true ? this.critAnim : this.hitAnim);
        return creature.takeDamage(rawDmg, isCrit, Statics.DMG_NORMAL);
    }

    save() {
        var saveObj = {
            stat: this.stats,
            ha: this.hitAnim,
            ca: this.critAnim,
            chp: this.currentHealth,
            acd: this.attackCooldown
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.stats = saveObj.stat;
        this.hitAnim = saveObj.ha;
        this.critAnim = saveObj.ca;
        this.currentHealth = saveObj.chp;
        this.attackCooldown = saveObj.acd;
    }
}