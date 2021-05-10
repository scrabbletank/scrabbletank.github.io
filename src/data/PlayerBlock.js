import { CreatureBlock } from "./CreatureBlock";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";

export class AdventurerBlock extends CreatureBlock {
    constructor(player) {
        super();
        this.player = player;
        this.moonData = new MoonlightData();
        this.secondWindCooldown = 0;
        this.secondWindDuration = 0;
        this.hitCounter = 0;
        this.encounterCounter = 0;
    }

    rebirth() {
        this.stats = {
            strength: 5 + this.moonData.moonperks.str.level, // damage
            dexterity: 5 + this.moonData.moonperks.dex.level, // hit chance
            agility: 5 + this.moonData.moonperks.agi.level, // evasion
            endurance: 5 + this.moonData.moonperks.end.level, //health
            recovery: 5 + this.moonData.moonperks.rec.level, //hp/energy regen?
            defense: 5 + this.moonData.moonperks.def.level, //armor increase
            accuracy: 5 + this.moonData.moonperks.acc.level, //crit power
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
        this.currentHealth = 25;
        this.attackCooldown = 0;
        this.secondWindCooldown = 0;
        this.secondWindDuration = 0;
        this.hitCounter = 0;
        this.encounterCounter = 0;
    }

    MaxHealth() {
        var ret = this.statBonuses.health + this.Endurance() * Statics.HP_PER_ENDURANCE;
        ret += this.Endurance() * this.player.getTalentLevel("end");
        ret += ret * this.player.runeBonuses.healthPercent;
        return Math.floor(ret);
    }
    Strength() {
        var ret = this.stats.strength + this.statBonuses.strength + this.player.runeBonuses.strFlat;
        ret = ret * (1 + (this.moonData.moonperks.str.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.strPercent + this.player.runeBonuses.allPercent);
        ret += this.Dexterity() * this.player.runeBonuses.dexToStr;
        return Math.floor(ret);
    }
    Dexterity() {
        var ret = this.stats.dexterity + this.statBonuses.dexterity + this.player.runeBonuses.dexFlat;
        ret = ret * (1 + (this.moonData.moonperks.dex.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.dexPercent + this.player.runeBonuses.allPercent);
        return Math.floor(ret);
    }
    Agility() {
        var ret = this.stats.agility + this.statBonuses.agility + this.player.runeBonuses.agiFlat;
        ret = ret * (1 + (this.moonData.moonperks.agi.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.agiPercent + this.player.runeBonuses.allPercent);
        return Math.floor(ret);
    }
    Endurance() {
        var ret = this.stats.endurance + this.statBonuses.endurance + this.player.runeBonuses.endFlat;
        ret = ret * (1 + (this.moonData.moonperks.end.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.endPercent + this.player.runeBonuses.allPercent);
        return Math.floor(ret);
    }
    Recovery() {
        var ret = this.stats.recovery + this.statBonuses.recovery + this.player.runeBonuses.recFlat;
        ret = ret * (1 + (this.moonData.moonperks.rec.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.recPercent + this.player.runeBonuses.allPercent);
        ret += this.Endurance() * this.player.runeBonuses.endToRec;
        return Math.floor(ret);
    }
    Defense() {
        var ret = this.stats.defense + this.statBonuses.defense + this.player.runeBonuses.defFlat;
        ret = ret * (1 + (this.moonData.moonperks.def.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.defPercent + this.player.runeBonuses.allPercent);
        ret += this.Agility() * this.player.runeBonuses.agiToDef;
        return Math.floor(ret);
    }
    Accuracy() {
        var ret = this.stats.accuracy + this.statBonuses.accuracy + this.player.runeBonuses.accFlat;
        ret = ret * (1 + (this.moonData.moonperks.acc.level + MoonlightData.getInstance().challengePoints) * 0.01);
        ret += ret * (this.player.runeBonuses.accPercent + this.player.runeBonuses.allPercent);
        return Math.floor(ret);
    }
    Hit() {
        var ret = this.stats.hit + this.statBonuses.hit + this.Dexterity() * Statics.HIT_PER_DEXTERITY;
        ret += this.Dexterity() * this.player.getTalentLevel("dex");
        ret = ret * (1 + this.player.getTalentLevel("hit") * 0.04);
        ret += ret * this.player.runeBonuses.hitPercent;
        return Math.floor(ret);
    }
    Evasion() {
        var ret = this.stats.evasion + this.statBonuses.evasion + this.Agility() * Statics.EVA_PER_AGILITY;
        ret += this.Agility() * this.player.getTalentLevel("agi");
        ret = ret * (1 + this.player.getTalentLevel("evasion") * 0.04);
        ret += ret * this.player.runeBonuses.evaPercent;
        return Math.floor(ret);
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        ret += this.player.getTalentLevel("crit") * 0.01;
        ret += this.player.runeBonuses.critChance;
        return Math.floor(ret * 100) / 100;
    }
    CritResistance() {
        var ret = this.stats.critResistance + this.statBonuses.critResistance + this.Endurance() * Statics.CRITRESISTANCE_PER_ENDURANCE;
        return Math.floor(ret);
    }
    CritPower() {
        var ret = this.stats.critPower + this.statBonuses.critPower + this.Accuracy() * Statics.CRITPOWER_PER_ACCURACY;
        ret += this.Accuracy() * this.player.getTalentLevel("acc") * 0.5;
        ret += ret * this.player.runeBonuses.critPercent;
        return Math.floor(ret);
    }
    DamageMin() {
        var ret = this.statBonuses.damageMin * (1 + this.player.runeBonuses.weaponPercent) * (1 + Math.pow(this.Strength(), Statics.SCALING_DIMINISHING_POWER +
            this.player.runeBonuses.weaponScaling) * Statics.SCALING_DAMAGE_PER_STRENGTH) + this.Strength() * Statics.STRENGTH_DMG_MIN;
        ret += this.Strength() * this.player.getTalentLevel("str") * 0.07 * Statics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var ret = this.statBonuses.damageMax * (1 + this.player.runeBonuses.weaponPercent) * (1 + Math.pow(this.Strength(), Statics.SCALING_DIMINISHING_POWER +
            this.player.runeBonuses.weaponScaling) * Statics.SCALING_DAMAGE_PER_STRENGTH) + this.Strength() * Statics.STRENGTH_DMG_MAX;
        ret += this.Strength() * this.player.getTalentLevel("str") * 0.07 * Statics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var ret = this.statBonuses.healthRegen + this.Recovery() * Statics.REGEN_PER_RECOVERY;
        ret += this.Recovery() * this.player.getTalentLevel("rec") * 0.08 * Statics.REGEN_PER_RECOVERY;
        ret += ret * this.player.runeBonuses.regenPercent;
        return Math.floor(ret * 10) / 10;
    }
    Armor() {
        var ret = this.Defense() * Statics.ARMOR_PER_DEFENSE + this.statBonuses.armor * (1 + this.player.runeBonuses.armorPercent) *
            (1 + Math.pow(this.Defense(), Statics.SCALING_DIMINISHING_POWER + this.player.runeBonuses.armorScaling) * Statics.SCALING_ARMOR_PER_DEFENSE);
        ret += this.Defense() * this.player.getTalentLevel("def") * 0.13 * Statics.ARMOR_PER_DEFENSE;
        return Math.floor(ret);
    }
    AttackSpeed() {
        var ret = this.attackSpeed / (1 + this.player.runeBonuses.baseAttackSpeed);
        return ret;
    }

    getStatTooltip() {

    }

    takeDamage(damage, isCrit, trueDamage = false) {
        if (this.player.getTalentLevel("dodge") > 0) {
            this.hitCounter -= 1;
            if (this.hitCounter <= 0) {
                this.hitCounter = Statics.DODGE_COUNTER - this.player.getTalentLevel("dodge");
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
        dmg = super.takeDamage(dmg, isCrit, trueDamage);
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
        var dmg = creature.takeDamage(rawDmg, isCrit);
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
        return creature.takeDamage(rawDmg, isCrit);
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