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

    _getScale(attr, stat = 0) {
        if (stat < 0) {
            return 1;
        }
        return (1 + Math.pow(attr, this.player.classStatics.SCALING_DIMINISHING_POWER) *
            this.player.classStatics.SCALING_DIMINISHING_MULTIPLIER) * (1 + StarData.getInstance().perks.proficiency.level * 0.1) *
            (1 + this.player.runeBonuses.gearScaling);
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
        var ret = (this.statBonuses.health * this._getScale(end, this.statBonuses.health)) + end * this.player.classStatics.HP_PER_ENDURANCE;
        ret += end * this.player.getTalentLevel("end");
        ret += ret * this.player.runeBonuses.healthPercent;
        return Math.floor(Math.max(1, ret));
    }
    Strength() {
        var ret = (this.stats.strength + this.player.runeBonuses.strFlat) * (1 + StarData.getInstance().perks.str.level * 10);
        ret += this.statBonuses.strength;
        ret = ret * (1 + (this.moonData.moonperks.str.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.strPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.strength;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        ret += this.Dexterity() * this.player.runeBonuses.dexToStr;
        return Math.floor(Math.max(1, ret));
    }
    Dexterity() {
        var ret = (this.stats.dexterity + this.player.runeBonuses.dexFlat) * (1 + StarData.getInstance().perks.dex.level * 10);
        ret += this.statBonuses.dexterity;
        ret = ret * (1 + (this.moonData.moonperks.dex.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.dexPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.dexterity;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Agility() {
        var ret = (this.stats.agility + this.player.runeBonuses.agiFlat) * (1 + StarData.getInstance().perks.agi.level * 10);
        ret += this.statBonuses.agility;
        ret = ret * (1 + (this.moonData.moonperks.agi.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.agiPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.agility;
        ret = ret * (1 + RitualData.getInstance().activePerks.playeroffense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Endurance() {
        var ret = (this.stats.endurance + this.player.runeBonuses.endFlat) * (1 + StarData.getInstance().perks.end.level * 10);
        ret += this.statBonuses.endurance;
        ret = ret * (1 + (this.moonData.moonperks.end.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.endPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.endurance;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        return Math.floor(Math.max(1, ret));
    }
    Recovery() {
        var ret = (this.stats.recovery + this.player.runeBonuses.recFlat) * (1 + StarData.getInstance().perks.rec.level * 10);
        ret += this.statBonuses.recovery;
        ret = ret * (1 + (this.moonData.moonperks.rec.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.recPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.recovery;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        ret += this.Endurance() * this.player.runeBonuses.endToRec;
        return Math.floor(Math.max(1, ret));
    }
    Defense() {
        var ret = (this.stats.defense + this.player.runeBonuses.defFlat) * (1 + StarData.getInstance().perks.def.level * 10);
        ret += this.statBonuses.defense;
        ret = ret * (1 + (this.moonData.moonperks.def.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.defPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.defense;
        ret = ret * (1 + RitualData.getInstance().activePerks.playerdefense * 0.05);
        ret += this.Agility() * this.player.runeBonuses.agiToDef;
        return Math.floor(Math.max(1, ret));
    }
    Accuracy() {
        var ret = (this.stats.accuracy + this.player.runeBonuses.accFlat) * (1 + StarData.getInstance().perks.acc.level * 10);
        ret += this.statBonuses.accuracy;
        ret = ret * (1 + (this.moonData.moonperks.acc.level + MoonlightData.getInstance().challengePoints * 2) * 0.005);
        ret += ret * (this.player.runeBonuses.accPercent + this.player.runeBonuses.allPercent);
        ret = ret * this.player.dungeonBonus.accuracy;
        ret = ret * (1 + RitualData.getInstance().activePerks.playercrits * 0.15);
        return Math.floor(Math.max(1, ret));
    }
    Hit() {
        var dex = this.Dexterity();
        var ret = this.stats.hit + (this.statBonuses.hit * this._getScale(dex, this.statBonuses.hit)) + dex * this.player.classStatics.HIT_PER_DEXTERITY;
        ret += dex * this.player.getTalentLevel("dex");
        ret = ret * (1 + this.player.getTalentLevel("hit") * 0.04);
        ret += ret * this.player.runeBonuses.hitPercent;
        return Math.floor(Math.max(1, ret));
    }
    Evasion() {
        var agi = this.Agility();
        var ret = this.stats.evasion + (this.statBonuses.evasion * this._getScale(agi, this.statBonuses.evasion)) + agi * this.player.classStatics.EVA_PER_AGILITY;
        ret += agi * this.player.getTalentLevel("agi");
        ret = ret * (1 + this.player.getTalentLevel("evasion") * 0.04);
        ret += ret * this.player.runeBonuses.evaPercent;
        return Math.floor(Math.max(1, ret));
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        ret += this.player.getTalentLevel("crit") * 0.03;
        ret += this.player.runeBonuses.critChance;
        ret += RitualData.getInstance().activePerks.playercrits * 0.1;
        while (ret > 0.5) {
            ret /= 2;
        }
        return ret;
    }
    CritDamageMulti() {
        var ret = this.statBonuses.critChance;
        ret += this.player.getTalentLevel("crit") * 0.03;
        ret += this.player.runeBonuses.critChance;
        ret += RitualData.getInstance().activePerks.playercrits * 0.1;
        var multi = 1;
        while (ret > 0.5) {
            ret /= 2;
            multi *= 2;
        }
        return multi;
    }
    Toughness() {
        var end = this.Endurance();
        var ret = this.stats.critResistance + (this.statBonuses.critResistance * this._getScale(end, this.statBonuses.critResistance)) +
            end * this.player.classStatics.CRITRESISTANCE_PER_ENDURANCE;
        return Math.floor(Math.max(1, ret));
    }
    Aim() {
        var acc = this.Accuracy();
        var ret = this.stats.critPower + (this.statBonuses.critPower * this._getScale(acc, this.statBonuses.critPower)) +
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
        var ret = (this.statBonuses.healthRegen * this._getScale(rec, this.statBonuses.healthRegen)) + rec * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += rec * this.player.getTalentLevel("rec") * 0.08 * this.player.classStatics.REGEN_PER_RECOVERY;
        ret += ret * this.player.runeBonuses.regenPercent;
        return Math.floor(Math.max(0, ret) * 10) / 10;
    }
    Armor() {
        var def = this.Defense();
        var ret = def * this.player.classStatics.ARMOR_PER_DEFENSE + this.statBonuses.armor * (1 + this.player.runeBonuses.armorPercent) *
            this._getScale(def, this.statBonuses.armor);
        ret += def * this.player.getTalentLevel("def") * 0.13 * this.player.classStatics.ARMOR_PER_DEFENSE;
        return Math.floor(Math.max(0, ret) - this.corrosion);
    }
    AttackSpeed() {
        var ret = this.attackSpeed / (1 + this.player.runeBonuses.baseAttackSpeed);
        return ret;
    }
    CritDamage(tough) {
        return Math.max(1, 1 + (-0.5 + (Math.sqrt(this.Aim()) / Math.sqrt(tough))) * 0.5 * this.CritDamageMulti());
    }
    GlancingChance(tough) {
        return Math.min(0.5, (1 - (this.Aim() / tough)) / 2);
    }
    GlancingDamage(tough) {
        return Math.min(1, this.Aim() / tough);
    }

    initCombat() {
        this.corrosion = 0;
        this.attackCooldown = 0;
        this.shieldValue = this.player.runeBonuses.defToShield * this.Defense();
        this._onHealthChanged();
    }

    takeDamage(damage, hitType, dmgType) {
        if (this.player.getTalentLevel("dodge") > 0 && dmgType !== Statics.DMG_TRUE) {
            this.hitCounter -= 1;
            if (this.hitCounter <= 0) {
                this.hitCounter = Math.max(3, Statics.DODGE_COUNTER - this.player.getTalentLevel("dodge"));
                return 0;
            }
        }
        var dmg = damage;
        if (hitType === Statics.HIT_CRIT) {
            dmg = dmg * Math.pow(0.92, this.player.runeBonuses.enemyCrit);
            dmg = Math.max(2, dmg - this.Endurance() * 0.05 * this.player.getTalentLevel("resilient"));
        }
        if (dmgType === Statics.DMG_MAGIC) {
            dmg = dmg * Math.pow(0.96, this.player.getTalentLevel("magicresist"));
        }
        if (Math.random() < this.player.getTalentLevel("parry") * 0.05) {
            dmg = dmg / 2;
        }
        if (Math.random() <= 0.2) {
            dmg = Math.max(1, dmg - this.Armor() * (this.player.getTalentLevel("block") * 0.25));
        }
        dmg = super.takeDamage(dmg, hitType, dmgType);
        if (this.player.getTalentLevel("secondwind") > 0 && this.secondWindCooldown <= 0 && this.currentHealth < this.MaxHealth() / 2) {
            this.secondWindDuration = 10000;
            this.secondWindCooldown = Statics.SECONDWIND_COOLDOWN - this.player.getTalentLevel("secondwind") * 10000;
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

    attack(creature) {
        var thorns = creature.findTrait(Statics.TRAIT_THORNS);
        if (thorns !== undefined) {
            this.takeDamage(creature.Armor() * 0.2, Statics.HIT_NORMAL, Statics.DMG_MAGIC);
        }
        if (Math.random() < this.player.getTalentLevel("stun") * 0.05) {
            creature.stunTimer = 500;
        }
        var rawDmg = this.rollDamage();
        var anim = this.hitAnim;
        var hitType = Statics.HIT_NORMAL;
        var roll = Math.random();
        if (roll <= this.CritChance()) {
            anim = this.critAnim;
            hitType = Statics.HIT_CRIT;
            rawDmg = rawDmg * this.CritDamage(creature.Toughness() *
                Math.pow(0.96, this.player.getTalentLevel("serration")));
        } else if (roll > 1 - this.GlancingChance(creature.Toughness())) {
            anim = "glancing";
            hitType = Statics.HIT_GLANCING;
            rawDmg = rawDmg * this.GlancingDamage(creature.Toughness());
        }
        var dmg = creature.takeDamage(rawDmg, hitType, Statics.DMG_NORMAL);
        creature.playAnimation(anim);
        this.attackCooldown = 0;
        if (Math.random() < this.player.getTalentLevel("followthrough") * 0.05) {
            this.attackCooldown = this.AttackSpeed() / 2;
        }
        this._onAttackCooldownChanged();
        return dmg;
    }
    cleave(creature) {
        if (Math.random() < this.player.getTalentLevel("stun") * 0.05) {
            creature.stunTimer = 500;
        }
        var rawDmg = this.Strength() * this.player.getTalentLevel("cleave") * 0.2;
        creature.playAnimation(this.hitAnim);
        return creature.takeDamage(rawDmg, Statics.HIT_NORMAL, Statics.DMG_NORMAL);
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