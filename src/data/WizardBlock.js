import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";
import { Common } from "../utils/Common";
import { AdventurerBlock } from "./AdventurerBlock";

export class WizardBlock extends AdventurerBlock {
    constructor(player) {
        super(player);
        this.player = player;
        this.moonData = new MoonlightData();
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
        this.attackSpeed = 1800;
        this.cantripCounter = 0;
        this.firstCounter = 0;
        this.secondCounter = 0;
        this.thirdCounter = 0;
        this.fourthCounter = 0;
        this.fifthCounter = 0;
        this.hasteAttacks = 0;

        //copy over event handlers because setting that back up sucks
        this.healthChangedHandlers = block.healthChangedHandlers;
        this.attackCooldownChangedHandlers = block.attackCooldownChangedHandlers;
        this.animationChangedHandlers = block.animationChangedHandlers;
    }

    rebirth() {
        // this should never be called
    }

    MaxHealth() {
        var end = this.Endurance();
        var ret = (this.statBonuses.health * this._getScale(end)) + end * this.player.classStatics.HP_PER_ENDURANCE;
        ret += end * this.player.getTalentLevel("wizend") * 0.75;
        ret += ret * this.player.runeBonuses.healthPercent;
        return Math.floor(ret);
    }
    Hit() {
        var dex = this.Dexterity();
        var ret = this.stats.hit + (this.statBonuses.hit * this._getScale(dex)) + dex * this.player.classStatics.HIT_PER_DEXTERITY;
        ret += dex * this.player.getTalentLevel("wizdex");
        ret += ret * this.player.runeBonuses.hitPercent;
        return Math.floor(ret);
    }
    Evasion() {
        var agi = this.Agility();
        var ret = this.stats.evasion + (this.statBonuses.evasion * this._getScale(agi)) + agi * this.player.classStatics.EVA_PER_AGILITY;
        ret += agi * this.player.getTalentLevel("wizagi");
        ret += ret * this.player.runeBonuses.evaPercent;
        if (this.hasteAttacks > 0) {
            ret += ret * this.player.getTalentLevel('quicken') * 0.05;
        }
        return Math.floor(ret);
    }
    CritResistance() {
        var end = this.Endurance();
        var ret = this.stats.critResistance + (this.statBonuses.critResistance * this._getScale(end)) +
            end * this.player.classStatics.CRITRESISTANCE_PER_ENDURANCE;
        if (this.shieldValue > 0) {
            ret += ret * this.player.getTalentLevel('shell') * 0.15;
        }
        return Math.floor(ret);
    }
    CritPower() {
        var acc = this.Accuracy();
        var ret = this.stats.spellPower + (this.statBonuses.spellPower * this._getScale(acc)) +
            acc * this.player.classStatics.SPELL_POWER_PER_POWER * (1 + this.player.getTalentLevel('first') * 0.01) *
            (1 + this.player.getTalentLevel('second') * 0.01) * (1 + this.player.getTalentLevel('third') * 0.01) *
            (1 + this.player.getTalentLevel('fourth') * 0.01) * (1 + this.player.getTalentLevel('fifth') * 0.01) *
            (1 + this.player.getTalentLevel('runemancy') * this.player.getTotalSocketedRunes() * 0.01);
        ret += this.statBonuses.damageMax * (1 + this.player.runeBonuses.weaponPercent) *
            this._getScale(this.Strength()) * this.player.getTalentLevel('magicweapon') * 0.1;
        ret += ret * this.player.runeBonuses.critPercent;
        ret += ret * this.CritChance();
        return Math.floor(ret);
    }
    DamageMin() {
        var str = this.Strength();
        var ret = this.statBonuses.damageMin * (1 + this.player.runeBonuses.weaponPercent) * this._getScale(str) +
            str * this.player.classStatics.STRENGTH_DMG_MIN;
        ret += str * this.player.getTalentLevel("wizstr") * 0.05 * this.player.classStatics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var str = this.Strength();
        var ret = this.statBonuses.damageMax * (1 + this.player.runeBonuses.weaponPercent) * this._getScale(str) +
            str * this.player.classStatics.STRENGTH_DMG_MAX;
        ret += str * this.player.getTalentLevel("wizstr") * 0.05 * this.player.classStatics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var rec = this.Recovery();
        var ret = (this.statBonuses.healthRegen * this._getScale(rec)) + rec * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += ret * this.player.runeBonuses.regenPercent;
        return Math.floor(ret * 10) / 10;
    }
    Armor() {
        var def = this.Defense();
        var ret = def * this.player.classStatics.ARMOR_PER_WARD + this.statBonuses.armor * (1 + this.player.runeBonuses.armorPercent) *
            this._getScale(def);
        return Math.floor(ret);
    }
    Shield() {
        var ret = this.Defense() * this.player.classStatics.SHIELD_PER_WARD +
            this.statBonuses.armor * (1 + this.player.runeBonuses.armorPercent) *
            this._getScale(this.Defense()) * this.player.getTalentLevel('magicarmor') * 0.2;
        return Math.floor(ret);
    }
    AttackSpeed() {
        var ret = this.attackSpeed / (1 + this.player.runeBonuses.baseAttackSpeed);
        return ret;
    }

    equip(gear) {
        var bonus = gear.getStatBonuses();
        for (const prop in bonus) {
            switch (prop) {
                case 'critPower':
                    this.statBonuses['spellPower'] += Math.floor(bonus[prop] / 3);
                    break;
                default:
                    this.statBonuses[prop] += bonus[prop];
                    break;
            }
        }
    }
    unequip(gear) {
        var bonus = gear.getStatBonuses();
        for (const prop in bonus) {
            switch (prop) {
                case 'critPower':
                    this.statBonuses['spellPower'] -= Math.floor(bonus[prop] / 3);
                    break;
                default:
                    this.statBonuses[prop] -= bonus[prop];
                    break;
            }
        }
    }

    initCombat() {
        this.attackCooldown = 0;
        this.shieldValue = this.Shield();
        this._onHealthChanged();
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
            this.attackCooldown = this.AttackSpeed() * 0.075 * this.player.getTalentLevel("haste");
        }
        this._onAttackCooldownChanged();
    }

    _castPowerWordKill(creature) {
        var max = this.CritPower() * (1 + this.player.getTalentLevel('powerwordkill') * 0.25) + 1;
        var rawDmg = Common.randint(1, max);

        if (this.player.getTalentLevel('powerwordstun') > 0 &&
            rawDmg / max > 0.8 - this.player.getTalentLevel('powerwordstun') * 0.07) {
            creature.stunTimer = 2000;
        }
        var dmg = creature.takeDamage(rawDmg, false, Statics.DMG_MAGIC);
        creature.playAnimation("skull");
        this.fifthCounter = 9;
        return dmg;
    }
    _castHaste(creature) {
        this.fourthCounter = 6;
        this.hasteAttacks = 3;
        this.playAnimation("haste");
        return 0;
    }
    _castFireball(creatureList) {
        this.thirdCounter = 5;
        var rawDmg = this.CritPower() * (0.07 * this.player.getTalentLevel('fireball')) + 1;
        for (var i = 0; i < creatureList.length; i++) {
            var dmg = creatureList[i].takeDamage(rawDmg, false, Statics.DMG_MAGIC);
            if (this.player.getTalentLevel('ignite') > 0) {
                creatureList[i].igniteTimer = 1000 + 500 * this.player.getTalentLevel('ignite');
                creatureList[i].igniteDamage = dmg * 0.15;
                if (creatureList[i].shieldValue > 0) {
                    creatureList[i].igniteDamage = creatureList[i].igniteDamage / 2;
                }
            }
            creatureList[i].playAnimation("fireball");
        }
        this._endAttack();
        return 0;
    }
    _castBarrier(creature) {
        this.secondCounter = 13;
        this.playAnimation("barrier");
        this.shieldValue += this.Defense() * this.player.getTalentLevel('barrier') * 0.25;
        return 0;
    }
    _castEntangle(creature) {
        this.firstCounter = 4;
        creature.playAnimation("entangle");
        creature.slowTimer = 2000 + 250 * this.player.getTalentLevel('entangle');
        creature.slowPercent = 0.4;
        creature.slowDamage = this.Agility() * this.player.getTalentLevel('thorns') * 0.10;
        if (creature.shieldValue > 0) {
            creature.slowDamage = creature.slowDamage / 2;
        }
        return 0;
    }
    _castCantrip(creature) {
        var rawDmg = this.CritPower() * (0.2 + this.player.getTalentLevel('cantrip') * 0.09) + 1;
        creature.playAnimation("magicmissile");
        return creature.takeDamage(rawDmg, false, Statics.DMG_MAGIC);
    }

    canCastFireball() {
        return (this.player.getTalentLevel("fifth") >= 5 && this.player.getTalentLevel('powerwordkill') > 0 &&
            this.fifthCounter <= 0) !== true && (this.player.getTalentLevel("fourth") >= 4 && this.player.getTalentLevel('haste') > 0 &&
                this.fourthCounter <= 0) !== true && this.thirdCounter <= 0;
    }

    attack(creature, isCrit = false) {
        var dmg = 0;
        var didCast = false;
        if (this.player.getTalentLevel("fifth") >= 5 && this.player.getTalentLevel('powerwordkill') > 0 &&
            this.fifthCounter <= 0) {
            dmg = this._castPowerWordKill(creature);
            didCast = true;
        } else if (this.player.getTalentLevel("fourth") >= 4 && this.player.getTalentLevel('haste') > 0 &&
            this.fourthCounter <= 0) {
            dmg = this._castHaste(creature);
        } else if (this.player.getTalentLevel("second") >= 2 && this.player.getTalentLevel('barrier') > 0 &&
            this.secondCounter <= 0) {
            dmg = this._castBarrier(creature);
        } else if (this.player.getTalentLevel("first") >= 1 && this.player.getTalentLevel('entangle') > 0 &&
            this.firstCounter <= 0) {
            dmg = this._castEntangle(creature);
            didCast = true;
        } else if (this.player.getTalentLevel("cantrip") > 0) {
            dmg = this._castCantrip(creature);
            didCast = true;
        }
        this.fifthCounter -= 1;
        this.fourthCounter -= 1;
        this.thirdCounter -= 1;
        this.secondCounter -= 1;
        this.firstCounter -= 1;
        var rawDmg = this.rollDamage();
        dmg += creature.takeDamage(rawDmg, false, Statics.DMG_NORMAL);
        if (didCast === false) {
            creature.playAnimation("mace");
        }
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