import { CreatureBlock } from "./CreatureBlock";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";
import { Common } from "../utils/Common";

export class AdventurerBlock extends CreatureBlock {
    constructor(player) {
        super();
        this.player = player;
        this.moonData = new MoonlightData();
        this.encounterCounter = 0;
    }

    convert(block) {
        this.stats = {
            strength: block.strength,
            dexterity: block.dexterity,
            agility: block.agility,
            endurance: block.endurance,
            recovery: block.recovery,
            ward: block.defense,
            power: block.accuracy,
            hit: 40,
            evasion: 30,
            spellPower: 0,
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
            spellPower: 0,
            critResistance: 0,
            critChance: 0,
            healthRegen: 0,
            armor: 0,
            shield: 0,
            magicDamage: 0
        };
        this.level = 0;
        this.currentHealth = Math.min(this.MaxHealth(), block.currentHealth);
        this.attackCooldown = block.attackCooldown;
        this.attackSpeed = 1750;
        this.cantripCounter = 0;
        this.firstCounter = 0;
        this.secondCounter = 0;
        this.thirdCounter = 0;
        this.fourthCounter = 0;
        this.fifthCounter = 0;
        this.hasteAttacks = 0;
    }

    rebirth() {
        // this should never be called
    }

    MaxHealth() {
        var ret = this.statBonuses.health + this.Endurance() * this.player.classStatics.HP_PER_ENDURANCE;
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
        var ret = this.stats.hit + this.statBonuses.hit + this.Dexterity() * this.player.classStatics.HIT_PER_DEXTERITY;
        ret += this.Dexterity() * this.player.getTalentLevel("wizdex");
        ret += ret * this.player.runeBonuses.hitPercent;
        return Math.floor(ret);
    }
    Evasion() {
        var ret = this.stats.evasion + this.statBonuses.evasion + this.Agility() * this.player.classStatics.EVA_PER_AGILITY;
        ret += this.Agility() * this.player.getTalentLevel("wizagi") * 0.7;
        ret += ret * this.player.runeBonuses.evaPercent;
        return Math.floor(ret);
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        ret += this.player.runeBonuses.critChance;
        return Math.floor(ret * 100) / 100;
    }
    CritResistance() {
        var ret = this.stats.critResistance + this.statBonuses.critResistance + this.Endurance() * this.player.classStatics.CRITRESISTANCE_PER_ENDURANCE;
        return Math.floor(ret);
    }
    CritPower() {
        var ret = this.stats.spellPower + this.statBonuses.spellPower + this.Accuracy() * this.player.classStatics.SPELL_POWER_PER_POWER * (1 + this.player.getTalentLevel('first') * 0.01) *
            (1 + this.player.getTalentLevel('second') * 0.01) * (1 + this.player.getTalentLevel('third') * 0.01) * (1 + this.player.getTalentLevel('fourth') * 0.01) *
            (1 + this.player.getTalentLevel('fifth') * 0.01) * (1 + this.player.getTalentLevel('runemancy') * this.player.getTotalSocketedRunes() * 0.01);
        ret += ret * this.player.runeBonuses.critPercent * (1 + this.CritChance());
        return Math.floor(ret);
    }
    DamageMin() {
        var ret = this.statBonuses.damageMin * (1 + this.player.runeBonuses.weaponPercent) + this.Strength() * this.player.classStatics.STRENGTH_DMG_MIN;
        ret += this.Strength() * this.player.getTalentLevel("wizstr") * 0.05 * this.player.classStatics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var ret = this.statBonuses.damageMax * (1 + this.player.runeBonuses.weaponPercent) + this.Strength() * this.player.classStatics.STRENGTH_DMG_MAX;
        ret += this.Strength() * this.player.getTalentLevel("wizstr") * 0.05 * this.player.classStatics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var ret = this.statBonuses.healthRegen + this.Recovery() * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += ret * this.player.runeBonuses.regenPercent;
        return Math.floor(ret * 10) / 10;
    }
    Armor() {
        var ret = this.Defense() * this.player.classStatics.ARMOR_PER_DEFENSE + this.statBonuses.armor;
        return Math.floor(ret);
    }
    AttackSpeed() {
        var ret = this.attackSpeed / (1 + this.player.runeBonuses.baseAttackSpeed);
        return ret;
    }

    equip(gear) {
        var bonus = gear.getStatBonuses();
        for (const prop in bonus) {
            this.statBonuses[prop] += bonus[prop];
        }
    }
    unequip(gear) {
        var bonus = gear.getStatBonuses();
        for (const prop in bonus) {
            this.statBonuses[prop] -= bonus[prop];
        }
    }

    takeDamage(damage, isCrit, dmgType) {
        var dmg = damage;
        if (isCrit === true) {
            dmg = dmg * Math.pow(0.92, this.player.runeBonuses.enemyCrit);
        }
        dmg = super.takeDamage(dmg, isCrit, dmgType);
        return dmg;
    }

    tickRegen(delta, inCombat = true) {
        var oldVal = this.currentHealth;
        var regen = this.HealthRegen()
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + regen * (delta / 1000));
        if (oldVal != this.currentHealth) {
            this._onHealthChanged();
        }
    }
    heal(value) {
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + value);
    }

    _endAttack() {
        this.attackCooldown = 0;
        if (this.hasteAttacks > 0) {
            this.hasteAttacks -= 1;
            this.attackCooldown = this.AttackSpeed() * 0.075 * this.player.getTalentLevel("haste").level;
        }
        this._onAttackCooldownChanged();
    }

    _castPowerWordKill(creature) {
        var max = this.CritPower() * (1 + this.player.getTalentLevel('powerwordkill').level * 0.25) + 1;
        var dmg = Common.randint(1, max);

        if (this.player.getTalentLevel('powerwordstun').level > 0 &&
            dmg / max > 0.8 - this.player.getTalentLevel('powerwordstun').level * 0.07) {
            creature.stunTimer = 2000;
        }
        var dmg = creature.takeDamage(rawDmg, isCrit, Statics.DMG_MAGIC);
        this.fifthCounter = 9;
        return dmg;
    }
    _castHaste(creature) {
        this.fourthCounter = 6;
        this.hasteAttacks = 3;
        return 0;
    }
    _castFireball(creature) {
        this.fifthCounter = 5;
        var dmg = this.CritPower() * (0.1 * this.player.getTalentLevel('fireball').level) + 1;
        var dmg = creature.takeDamage(rawDmg, isCrit, Statics.DMG_MAGIC);
        if (this.player.getTalentLevel('ignite').level > 0) {
            creature.igniteTimer = 1000 + 500 * this.player.getTalentLevel('ignite').level;
            creature.igniteDamage = dmg * 0.15;
            if (creature.shieldValue > 0) {
                creature.igniteDamage = creature.igniteDamage / 2;
            }
        }
        return dmg;
    }
    _castBarrier(creature) {
        this.secondCounter = 13;
        this.shieldValue += this.Defense() * this.player.getTalentLevel('barrier').level * 0.25;
        return 0;
    }
    _castEntangle(creature) {
        this.firstCounter = 4;
        creature.slowTimer = 2000 + 250 * this.player.getTalentLevel('entangle').level;
        creature.slowPercent = 0.3;
        creature.slowDamage = this.GetEvasion() * this.player.getTalentLevel('thorns').level * 0.05;
        if (creature.shieldValue > 0) {
            creature.slowDamage = creature.slowDamage / 2;
        }
        return 0;
    }
    _castCantrip(creature) {
        var dmg = this.CritPower() * (0.2 + this.player.getTalentLevel('cantrip').level * 0.08) + 1;
        var dmg = creature.takeDamage(rawDmg, isCrit, Statics.DMG_MAGIC);
        return dmg;
    }

    canCastFireball() { return this.fifthCounter > 0 && this.fourthCounter > 0 && this.thirdCounter <= 0; }

    attack(creature, isCrit = false) {
        var dmg = 0;
        if (this.player.getTalentLevel("fifth").level >= 5 && this.player.getTalentLevel('powerwordkill').level > 0 &&
            this.fifthCounter <= 0) {
            dmg = this._castPowerWordKill(creature);
        } else if (this.player.getTalentLevel("fourth").level >= 4 && this.player.getTalentLevel('haste').level > 0 &&
            this.fourthCounter <= 0) {
            dmg = this._castHaste(creature);
        } else if (this.player.getTalentLevel("third").level >= 3 && this.player.getTalentLevel('fireball').level > 0 &&
            this.thirdCounter <= 0) {
            dmg = this._castFireball(creature);
        } else if (this.player.getTalentLevel("second").level >= 2 && this.player.getTalentLevel('barrier').level > 0 &&
            this.secondCounter <= 0) {
            dmg = this._castBarrier(creature);
        } else if (this.player.getTalentLevel("first").level >= 1 && this.player.getTalentLevel('entangle').level > 0 &&
            this.firstCounter <= 0) {
            dmg = this._castEntangle(creature);
        } else if (this.player.getTalentLevel("cantrip").level > 0) {
            dmg = this._castCantrip(creature);
        }
        this.fifthCounter -= 1;
        this.fourthCounter -= 1;
        this.thirdCounter -= 1;
        this.secondCounter -= 1;
        this.firstCounter -= 1;
        var rawDmg = this.rollDamage();
        dmg += creature.takeDamage(rawDmg, false, Statics.DMG_NORMAL);
        this._endAttack();
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