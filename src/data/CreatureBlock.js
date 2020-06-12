// holds information on a creatures stats

import { Statics } from "./Statics";
import { Common } from "../utils/Common";
import { GearData } from "./GearData";

// stat calculations:
// attacks always hit, but attack speed is adjusted by hit chance/evasion. Higher hit chance means
// faster attack speeds.
// strength increases min damage by 0.4 and max by 1
// dexterity increases hit chance by 7
// agility increase evasion by 7
// endurance increases health by 5,
// recovery increases HP regen by 0.1 /s
// defense increases armor by 0.2 and armor values from gear by 1.5%
// accuracy increases crit damage by 0.025


export class CreatureBlock {
    constructor() {
        this.stats = {
            strength: 5, // damage
            dexterity: 5, // hit chance
            agility: 5, // evasion
            endurance: 5, //health
            recovery: 5, //hp/energy regen?
            defense: 5, //armor increase
            accuracy: 5, //crit damage
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
        this.attackSpeed = 1500;
        this.stunTimer = 0;
        this.name = "";
        this.xpReward = 0;
        this.drops = [];
        this.icon = { sprite: "enemyicons", tile: 8 };

        this.healthChangedHandlers = [];
        this.attackCooldownChangedHandlers = [];
    }

    MaxHealth() {
        var ret = this.statBonuses.health + this.Endurance() * Statics.HP_PER_ENDURANCE;
        return Math.floor(ret);
    }
    Strength() {
        var ret = this.stats.strength + this.statBonuses.strength;
        return Math.floor(ret);
    }
    Dexterity() {
        var ret = this.stats.dexterity + this.statBonuses.dexterity;
        return Math.floor(ret);
    }
    Agility() {
        var ret = this.stats.agility + this.statBonuses.agility;
        return Math.floor(ret);
    }
    Endurance() {
        var ret = this.stats.endurance + this.statBonuses.endurance;
        return Math.floor(ret);
    }
    Recovery() {
        var ret = this.stats.recovery + this.statBonuses.recovery;
        return Math.floor(ret);
    }
    Defense() {
        var ret = this.stats.defense + this.statBonuses.defense;
        return Math.floor(ret);
    }
    Accuracy() {
        var ret = this.stats.accuracy + this.statBonuses.accuracy;
        return Math.floor(ret);
    }
    Hit() {
        var ret = this.stats.hit + this.statBonuses.hit + this.Dexterity() * Statics.HIT_PER_DEXTERITY;
        return Math.floor(ret);
    }
    Evasion() {
        var ret = this.stats.evasion + this.statBonuses.evasion + this.Agility() * Statics.EVA_PER_AGILITY;
        return Math.floor(ret);
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        return Math.floor(ret * 100) / 100;
    }
    CritDamage() {
        var ret = this.stats.critDamage + this.statBonuses.critDamage + this.Accuracy() * Statics.CRITDMG_PER_ACCURACY;
        return Math.floor(ret * 100) / 100;
    }
    DamageMin() {
        var ret = this.statBonuses.damageMin * (1 + this.Strength() * Statics.SCALING_DAMAGE_PER_STRENGTH) + this.Strength() * Statics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var ret = this.statBonuses.damageMax * (1 + this.Strength() * Statics.SCALING_DAMAGE_PER_STRENGTH) + this.Strength() * Statics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var ret = this.statBonuses.healthRegen + this.Recovery() * Statics.REGEN_PER_RECOVERY;
        return Math.floor(ret * 10) / 10;
    }
    Armor() {
        var ret = this.Defense() * Statics.ARMOR_PER_DEFENSE + this.statBonuses.armor * (1 + this.Defense() * Statics.SCALING_ARMOR_PER_DEFENSE);
        return Math.floor(ret);
    }

    registerEvent(event, callback) {
        if (event === 'onHealthChanged') {
            this.healthChangedHandlers.push(callback);
        } else if (event === 'onAttackCooldownChanged') {
            this.attackCooldownChangedHandlers.push(callback);
        }
    }

    _onHealthChanged() {
        for (var i = 0; i < this.healthChangedHandlers.length; i++) {
            this.healthChangedHandlers[i](this.currentHealth);
        }
    }
    _onAttackCooldownChanged() {
        for (var i = 0; i < this.attackCooldownChangedHandlers.length; i++) {
            this.attackCooldownChangedHandlers[i](this.attackCooldown);
        }
    }

    canAttack() { return this.attackCooldown >= this.attackSpeed; }

    takeDamage(damage, isCrit) {
        var dmg = damage;
        dmg = Math.max(1, dmg - this.Armor());
        this.currentHealth -= dmg;
        this._onHealthChanged();
        return dmg;
    }
    rollDamage() {
        return Common.randint(this.DamageMin(), this.DamageMax());
    }
    tickRegen(delta, inCombat = true) {
        var oldVal = this.currentHealth;
        var healMulti = 1;
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + this.HealthRegen() * (delta / 1000) * healMulti);
        if (oldVal != this.currentHealth) {
            this._onHealthChanged();
        }

    }
    tickAttackCooldown(delta, multi) {
        if (this.stunTimer > 0) {
            this.stunTimer -= delta;
            return;
        }
        var oldVal = this.attackCooldown;
        this.attackCooldown = Math.min(this.attackSpeed, this.attackCooldown + delta * multi);
        if (oldVal != this.attackCooldown) {
            this._onAttackCooldownChanged();
        }
    }
    attack(creature, isCrit = false) {
        var rawDmg = this.rollDamage();
        if (isCrit === true) {
            rawDmg = rawDmg * this.CritDamage();
        }
        var dmg = creature.takeDamage(rawDmg, isCrit);
        this.attackCooldown = 0;
        this._onAttackCooldownChanged();
        return dmg;
    }

    equip(gear) {
        var gearData = new GearData();
        var motePower = 1 + gearData.getMotePower(gear.motesFused);
        for (const prop in this.statBonuses) {
            this.statBonuses[prop] += gear.statBonuses[prop] * motePower;
        }
    }
    unequip(gear) {
        var gearData = new GearData();
        var motePower = 1 + gearData.getMotePower(gear.motesFused);
        for (const prop in this.statBonuses) {
            this.statBonuses[prop] -= gear.statBonuses[prop] * motePower;
        }
    }


    // used for monsters to add scaling based on level
    setMonsterStats(name, scaleBlock, attackSpeed, critChance, level, shadeBase, rewards, icon) {
        this.level = level;
        // offset by 1, level 0 should have no bonuses
        var rLvl = level - 1;
        // negative scaling values are bad so ignore them here.
        var sLvl = Math.max(0, rLvl);
        // monster stat bonuses
        var flatStat = rLvl * Statics.MONSTER_STAT_PER_LEVEL;
        var scaleStat = Math.pow(Statics.MONSTER_STATSCALE_PER_LEVEL, sLvl);

        this.stats.strength = (this.stats.strength + flatStat) * scaleBlock.strength * scaleStat;
        this.stats.dexterity = (this.stats.dexterity + flatStat) * scaleBlock.dexterity * scaleStat;
        this.stats.agility = (this.stats.agility + flatStat) * scaleBlock.agility * scaleStat;
        this.stats.endurance = (this.stats.endurance + flatStat) * scaleBlock.endurance * scaleStat;
        this.stats.recovery = (this.stats.recovery + flatStat) * scaleBlock.recovery * scaleStat;
        this.stats.defense = (this.stats.defense + flatStat) * scaleBlock.defense * scaleStat;
        this.stats.accuracy = (this.stats.accuracy + flatStat) * scaleBlock.accuracy * scaleStat;
        this.statBonuses.armor = this.Armor() * (scaleBlock.armor - 1);
        this.statBonuses.healthRegen = this.HealthRegen() * (scaleBlock.healthRegen - 1);
        this.statBonuses.damageMin = this.DamageMin() * (scaleBlock.damageMin - 1);
        this.statBonuses.damageMax = this.DamageMax() * (scaleBlock.damageMax - 1);
        this.statBonuses.hit = this.Hit() * (scaleBlock.hit - 1);
        this.statBonuses.evasion = this.Evasion() * (scaleBlock.evasion - 1);
        this.statBonuses.health = this.MaxHealth() * (scaleBlock.health - 1);
        this.statBonuses.critChance = critChance;

        this.attackSpeed = attackSpeed;
        this.attackCooldown = 0;

        this.currentHealth = this.MaxHealth();
        this.name = level < 1 ? "Weak " + name : name;
        if (rLvl < 0) {
            this.xpReward = shadeBase * 0.75;
        } else {
            this.xpReward = shadeBase + (shadeBase / 2) * rLvl;
        }
        this.drops = rewards;
        this.icon = icon;
    }
}