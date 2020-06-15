import { CreatureBlock } from "./CreatureBlock";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";

export class PlayerBlock extends CreatureBlock {
    constructor(player) {
        super();
        this.player = player;
        this.moonData = new MoonlightData();
    }

    rebirth() {
        this.stats = {
            strength: 5 + this.moonData.moonperks.str.level, // damage
            dexterity: 5 + this.moonData.moonperks.dex.level, // hit chance
            agility: 5 + this.moonData.moonperks.agi.level, // evasion
            endurance: 5 + this.moonData.moonperks.end.level, //health
            recovery: 5 + this.moonData.moonperks.rec.level, //hp/energy regen?
            defense: 5 + this.moonData.moonperks.def.level, //armor increase
            accuracy: 5 + this.moonData.moonperks.acc.level, //crit damage
            hit: 40,
            evasion: 40,
            critDamage: 1
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
            critDamage: 0,
            critChance: 0,
            healthRegen: 0,
            armor: 0
        };
        this.hitAnim = "claws";
        this.critAnim = "clawscrit";
        this.level = 0;
        this.currentHealth = 25;
        this.attackCooldown = 0;
        this.secondWindCooldown = 80000;
        this.secondWindDuration = 10000;
        this.hitCounter = 0;
        this.encounterCounter = 0;
    }

    MaxHealth() {
        var ret = this.statBonuses.health + this.Endurance() * Statics.HP_PER_ENDURANCE;
        ret += this.Endurance() * this.player.talents.end.level;
        return Math.floor(ret);
    }
    Strength() {
        var ret = this.stats.strength + this.statBonuses.strength;
        ret = ret * (1 + this.moonData.moonperks.str.level * 0.01);
        return Math.floor(ret);
    }
    Dexterity() {
        var ret = this.stats.dexterity + this.statBonuses.dexterity;
        ret = ret * (1 + this.moonData.moonperks.dex.level * 0.01);
        return Math.floor(ret);
    }
    Agility() {
        var ret = this.stats.agility + this.statBonuses.agility;
        ret = ret * (1 + this.moonData.moonperks.agi.level * 0.01);
        return Math.floor(ret);
    }
    Endurance() {
        var ret = this.stats.endurance + this.statBonuses.endurance;
        ret = ret * (1 + this.moonData.moonperks.end.level * 0.01);
        return Math.floor(ret);
    }
    Recovery() {
        var ret = this.stats.recovery + this.statBonuses.recovery;
        ret = ret * (1 + this.moonData.moonperks.rec.level * 0.01);
        return Math.floor(ret);
    }
    Defense() {
        var ret = this.stats.defense + this.statBonuses.defense;
        ret = ret * (1 + this.moonData.moonperks.def.level * 0.01);
        return Math.floor(ret);
    }
    Accuracy() {
        var ret = this.stats.accuracy + this.statBonuses.accuracy;
        ret = ret * (1 + this.moonData.moonperks.acc.level * 0.01);
        return Math.floor(ret);
    }
    Hit() {
        var ret = this.stats.hit + this.statBonuses.hit + this.Dexterity() * Statics.HIT_PER_DEXTERITY;
        ret += this.Dexterity() * this.player.talents.dex.level;
        ret = ret * (1 + this.player.talents.hit.level * 0.02);
        return Math.floor(ret);
    }
    Evasion() {
        var ret = this.stats.evasion + this.statBonuses.evasion + this.Agility() * Statics.EVA_PER_AGILITY;
        ret += this.Agility() * this.player.talents.agi.level;
        ret = ret * (1 + this.player.talents.evasion.level * 0.02);
        return Math.floor(ret);
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        ret += this.player.talents.crit.level * 0.01;
        return Math.floor(ret * 100) / 100;
    }
    CritDamage() {
        var ret = this.stats.critDamage + this.statBonuses.critDamage + this.Accuracy() * Statics.CRITDMG_PER_ACCURACY;
        ret += this.Accuracy() * this.player.talents.acc.level * 0.005;
        ret = Math.pow(ret, Statics.CRITDMG_DIMINISHING_POWER);
        return Math.floor(ret * 100) / 100;
    }
    DamageMin() {
        var ret = this.statBonuses.damageMin * (1 + Math.pow(this.Strength(), Statics.SCALING_DIMINISHING_POWER) * Statics.SCALING_DAMAGE_PER_STRENGTH) +
            this.Strength() * Statics.STRENGTH_DMG_MIN;
        ret += this.Strength() * this.player.talents.str.level * 0.02;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var ret = this.statBonuses.damageMax * (1 + Math.pow(this.Strength(), Statics.SCALING_DIMINISHING_POWER) * Statics.SCALING_DAMAGE_PER_STRENGTH) +
            this.Strength() * Statics.STRENGTH_DMG_MAX;
        ret += this.Strength() * this.player.talents.str.level * 0.05;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var ret = this.statBonuses.healthRegen + this.Recovery() * Statics.REGEN_PER_RECOVERY;
        ret += this.Recovery() * this.player.talents.rec.level * 0.005;
        return Math.floor(ret * 10) / 10;
    }
    Armor() {
        var ret = this.Defense() * Statics.ARMOR_PER_DEFENSE + this.statBonuses.armor *
            (1 + Math.pow(this.Defense(), Statics.SCALING_DIMINISHING_POWER) * Statics.SCALING_ARMOR_PER_DEFENSE);
        ret += this.Defense() * this.player.talents.def.level * 0.01;
        return Math.floor(ret);
    }

    takeDamage(damage, isCrit) {
        if (this.player.talents.dodge.level > 0) {
            this.hitCounter -= 1;
            if (this.hitCounter <= 0) {
                this.hitCounter = Statics.DODGE_COUNTER - this.player.talents.dodge.level;
                return 0;
            }
        }
        var dmg = damage;
        if (isCrit === true) {
            dmg = Math.max(2, dmg - this.Endurance() * 0.05 * this.player.talents.resilient.level);
        }
        if (Math.random() < this.player.talents.parry.level * 0.05) {
            dmg = dmg / 2;
        }
        dmg = super.takeDamage(damage, isCrit);
        if (this.player.talents.secondwind.level > 0 && this.secondWindCooldown < 0 && this.currentHealth < this.MaxHealth() / 2) {
            this.secondWindDuration = 10000;
            this.secondWindCooldown = Statics.SECONDWIND_COOLDOWN - this.player.talents.secondwind.level * 10000;
        }
        if (this.currentHealth <= 0 && this.player.talents.defydeath.level > 0 && this.encounterCounter <= 0) {
            this.currentHealth = 1;
            this.encounterCounter = Statics.DEFY_DEATH_COUNTER - this.player.talents.defydeath.level;
        }
    }

    tickRegen(delta, inCombat = true) {
        var oldVal = this.currentHealth;
        var healMulti = 1;
        if (inCombat === false) {
            healMulti = 1 + this.player.talents.quickrecovery.level * 0.25;
        }
        if (this.secondWindDuration > 0) {
            this.secondWindDuration -= delta;
            healMulti = healMulti * 3;
        }
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + this.HealthRegen() * (delta / 1000) * healMulti);
        if (oldVal != this.currentHealth) {
            this._onHealthChanged();
        }
    }

    attack(creature, isCrit = false) {
        if (Math.random() < this.player.talents.stun.level * 0.05) {
            creature.stunTimer = 500;
        }
        var rawDmg = this.rollDamage();
        if (isCrit === true) {
            rawDmg = rawDmg * this.CritDamage();
            if (Math.random() < (this.player.talents.doublecrit.level * 0.01 * this.CritChance())) {
                rawDmg = rawDmg * 2;
            }
        }
        var dmg = creature.takeDamage(rawDmg, isCrit);
        this.attackCooldown = 0;
        if (Math.random() < this.player.talents.followthrough.level * 0.05) {
            this.attackCooldown = this.attackSpeed / 2;
        }
        this._onAttackCooldownChanged();
        return dmg;
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

    load(saveObj) {
        this.stats = saveObj.stat;
        this.hitAnim = saveObj.ha;
        this.critAnim = saveObj.ca;
        this.currentHealth = saveObj.chp;
        this.attackCooldown = saveObj.acd;
    }
}