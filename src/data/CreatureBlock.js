// holds information on a creatures stats

import { Statics } from "./Statics";
import { Common } from "../utils/Common";
import { MoonlightData } from "./MoonlightData";

// stat calculations:
// attacks always hit, but attack speed is adjusted by hit chance/evasion. Higher hit chance means
// faster attack speeds.
// strength increases min damage by 0.4 and max by 1
// dexterity increases hit chance by 7
// agility increase evasion by 7
// endurance increases health by 5,
// recovery increases HP regen by 0.1 /s
// defense increases armor by 0.2 and armor values from gear by 1.5%


export class CreatureBlock {
    constructor() {
        this.stats = {
            strength: 5, // damage
            dexterity: 5, // hit chance
            agility: 5, // evasion
            endurance: 5, //health
            recovery: 5, //hp/energy regen?
            defense: 5, //armor increase
            accuracy: 5, //crit power
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
        this.attackSpeed = 1500;
        this.stunTimer = 0;
        this.name = "";
        this.xpReward = 0;
        this.drops = [];
        this.motes = 0;
        this.icon = { sprite: "enemyicons", tile: 8 };
        this.traits = [];
        this.shieldValue = 0;
        this.shieldCooldown = 0;
        this.slowTimer = 0;
        this.slowPercent = 0;
        this.slowDamage = 0;
        this.igniteTimer = 0;
        this.igniteDamage = 0;

        this.healthChangedHandlers = [];
        this.attackCooldownChangedHandlers = [];
        this.animationChangedHandlers = [];
    }

    MaxHealth() {
        var ret = this.statBonuses.health + this.Endurance() * Statics.HP_PER_ENDURANCE;
        return Math.floor(Math.max(1, ret));
    }
    Strength() {
        var ret = this.stats.strength + this.statBonuses.strength;
        return Math.floor(Math.max(1, ret));
    }
    Dexterity() {
        var ret = this.stats.dexterity + this.statBonuses.dexterity;
        return Math.floor(Math.max(1, ret));
    }
    Agility() {
        var ret = this.stats.agility + this.statBonuses.agility;
        return Math.floor(Math.max(1, ret));
    }
    Endurance() {
        var ret = this.stats.endurance + this.statBonuses.endurance;
        return Math.floor(Math.max(1, ret));
    }
    Recovery() {
        var ret = this.stats.recovery + this.statBonuses.recovery;
        return Math.floor(Math.max(1, ret));
    }
    Defense() {
        var ret = this.stats.defense + this.statBonuses.defense;
        return Math.floor(Math.max(1, ret));
    }
    Accuracy() {
        var ret = this.stats.accuracy + this.statBonuses.accuracy;
        return Math.floor(Math.max(1, ret));
    }
    Hit() {
        var ret = this.stats.hit + this.statBonuses.hit + this.Dexterity() * Statics.HIT_PER_DEXTERITY;
        return Math.floor(Math.max(1, ret));
    }
    Evasion() {
        var ret = this.stats.evasion + this.statBonuses.evasion + this.Agility() * Statics.EVA_PER_AGILITY;
        return Math.floor(Math.max(1, ret));
    }
    CritChance() {
        var ret = this.statBonuses.critChance;
        return Math.floor(ret * 100) / 100;
    }
    CritPower() {
        var ret = this.stats.critPower + this.statBonuses.critPower + this.Accuracy() * Statics.CRITPOWER_PER_ACCURACY;
        return Math.floor(Math.max(1, ret));
    }
    CritResistance() {
        var ret = this.stats.critResistance + this.statBonuses.critResistance + this.Endurance() * Statics.CRITRESISTANCE_PER_ENDURANCE;
        ret = ret * (this.shieldValue > 0 ? 10 : 1);
        return Math.floor(Math.max(1, ret));
    }
    DamageMin() {
        var ret = this.statBonuses.damageMin + this.Strength() * Statics.STRENGTH_DMG_MIN;
        return Math.floor(Math.max(1, ret));
    }
    DamageMax() {
        var ret = this.statBonuses.damageMax + this.Strength() * Statics.STRENGTH_DMG_MAX;
        return Math.floor(Math.max(1, ret));
    }
    HealthRegen() {
        var ret = this.statBonuses.healthRegen + this.Recovery() * Statics.REGEN_PER_RECOVERY;
        return Math.floor(Math.max(0, ret) * 10) / 10;
    }
    Armor() {
        var ret = this.Defense() * Statics.ARMOR_PER_DEFENSE + this.statBonuses.armor;
        return Math.floor(Math.max(0, ret));
    }
    AttackSpeed() {
        return this.attackSpeed;
    }
    CritDamage(resist) {
        return Math.max(1, 1 + (-0.5 + (Math.sqrt(this.CritPower()) / Math.sqrt(resist))) * 0.5);
    }

    registerEvent(event, callback) {
        if (event === 'onHealthChanged') {
            this.healthChangedHandlers.push(callback);
        } else if (event === 'onAttackCooldownChanged') {
            this.attackCooldownChangedHandlers.push(callback);
        } else if (event === 'onAnimationChanged') {
            this.animationChangedHandlers.push(callback);
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
    _onAnimationChanged(animKey) {
        for (var i = 0; i < this.animationChangedHandlers.length; i++) {
            this.animationChangedHandlers[i](animKey);
        }
    }

    initCombat() {
        this.currentHealth = this.MaxHealth();
        if (this.findTrait({ type: Statics.TRAIT_FIRSTSTRIKE }) !== undefined) {
            this.attackCooldown = this.AttackSpeed() * 0.95;
        }
    }

    canAttack() { return this.attackCooldown >= this.AttackSpeed(); }

    takeDamage(damage, __isCrit, dmgType) {
        var dmg = damage;
        if (dmgType === Statics.DMG_NORMAL) {
            if (this.shieldValue > 0) {
                var shieldDmg = Math.min(this.shieldValue, dmg);
                this.shieldValue -= shieldDmg;
                dmg -= shieldDmg;
            }
            if (dmg > 0) {
                dmg = Math.max(1, dmg - this.Armor());
            }
        } else if (dmgType === Statics.DMG_MAGIC) {
            // magic damage ignores 90% of armor but does half damage to shields
            var shieldDmg = Math.min(this.shieldValue, dmg / 2);
            this.shieldValue -= shieldDmg;
            dmg -= shieldDmg * 2;
            dmg = Math.max(1, dmg - this.Armor() * 0.1);
        } else if (dmgType === Statics.DMG_TRUE) {
            //true damage bypasses shields?
        }
        this.currentHealth -= dmg;
        this._onHealthChanged();
        return dmg;
    }
    rollDamage() {
        return Common.randint(this.DamageMin(), this.DamageMax() + 1);
    }
    tickRegen(delta, __inCombat = true) {
        var oldVal = this.currentHealth;
        var healMulti = 1;
        this.currentHealth = Math.min(this.MaxHealth(), this.currentHealth + this.HealthRegen() * (delta / 1000) * healMulti);
        //handle shielded here
        var shielded = this.findTrait(Statics.TRAIT_SHIELDED);
        if (shielded !== undefined) {
            this.shieldCooldown -= delta;
            if (this.shieldCooldown <= 0) {
                this.shieldValue += this.Armor() * shielded.level * 0.2;
                this.shieldCooldown = 1000;
                this._onHealthChanged();
            }
        }
        if (oldVal != this.currentHealth) {
            this._onHealthChanged();
        }

    }
    tickAttackCooldown(delta, multi) {
        if (this.stunTimer > 0) {
            this.stunTimer -= delta;
            return;
        }
        if (this.igniteTimer > 0) {
            this.igniteTimer -= delta;
            this.takeDamage(this.igniteDamage * (delta / 1000), false, Statics.DMG_TRUE);
        }
        if (this.slowTimer > 0) {
            this.slowTimer -= delta;
            this.takeDamage(this.slowDamage * (delta / 1000), false, Statics.DMG_TRUE);
            delta = delta * (1 - this.slowPercent);
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
            rawDmg = rawDmg * this.CritDamage(creature.CritResistance());
        }
        var dmg = creature.takeDamage(rawDmg, isCrit, Statics.DMG_NORMAL);
        creature.playAnimation(isCrit === true ? this.critAnim : this.hitAnim);
        this.attackCooldown = 0;
        //handle beserk trait, giving attack speed refresh
        var beserk = this.findTrait(Statics.TRAIT_BESERK);
        if (beserk !== undefined) {
            if (Math.random() < (1 - Math.pow(0.92, beserk.level))) {
                this.attackCooldown = this.attackSpeed / 2;
            }
        }

        this._onAttackCooldownChanged();
        return dmg;
    }
    playAnimation(anim) {
        this._onAnimationChanged(anim);
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


    // used for monsters to add scaling based on level
    setMonsterStats(name, scaleBlock, attackSpeed, critChance, level, tier, shadeBase, rewardBase, icon) {
        this.level = level;
        // offset by 1, level 0 should have no bonuses
        var rLvl = level - 1;
        // negative scaling values are bad so ignore them here.
        var sLvl = Math.max(0, rLvl);
        // monster stat bonuses
        var flatStat = rLvl * Statics.MONSTER_STAT_PER_LEVEL;
        var scaleStat = Math.pow(Statics.MONSTER_STATSCALE_PER_LEVEL, sLvl) * Math.pow(Statics.MONSTER_STATSCALE_PER_REGION, tier);
        var scaleXp = Math.pow(Statics.MONSTER_XPSCALE_PER_REGION, tier)

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
        var shade = shadeBase + (MoonlightData.getInstance().moonperks.shadow2.level * 2);
        this.xpReward = shade + (shade / 4) * rLvl;
        this.xpReward = this.xpReward * (1 + MoonlightData.getInstance().challenges.megamonsters.completions * 0.05) * scaleXp;
        this.dropBase = rewardBase;
        this.icon = icon;
    }

    findTrait(trait) {
        for (var i = 0; i < this.traits.length; i++) {
            if (this.traits[i].type === trait) {
                return this.traits[i];
            }
        }
        return undefined;
    }

    applyTraits() {
        var extraStats = {
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
            armor: 0,
            xpReward: 0,
            motes: 0
        };
        var firstStrike = false;

        for (var i = 0; i < this.traits.length; i++) {
            var trait = this.traits[i];
            switch (trait.type) {
                case Statics.TRAIT_DIRE:
                    extraStats.strength += this.Strength() * (0.2 * trait.level);
                    extraStats.dexterity += this.Dexterity() * (0.2 * trait.level);
                    extraStats.agility += this.Agility() * (0.2 * trait.level);
                    extraStats.endurance += this.Endurance() * (0.2 * trait.level);
                    extraStats.recovery += this.Recovery() * (0.2 * trait.level);
                    extraStats.defense += this.Defense() * (0.2 * trait.level);
                    extraStats.accuracy += this.Accuracy() * (0.2 * trait.level);
                    extraStats.xpReward += this.xpReward * (0.75 * trait.level);
                    extraStats.motes += trait.level + Math.floor(this.level / 20);
                    break;
                case Statics.TRAIT_MONSTROUS:
                    extraStats.damageMin += this.DamageMin() * (0.1 * trait.level);
                    extraStats.damageMax += this.DamageMax() * (0.1 * trait.level);
                    extraStats.health += this.MaxHealth() * (0.25 * trait.level);
                    this.attackSpeed = this.attackSpeed * 1.15;
                    break;
                case Statics.TRAIT_QUICK:
                    extraStats.evasion += this.Evasion() * (0.25 * trait.level);
                    this.attackSpeed = this.attackSpeed * 0.85;
                    break;
                case Statics.TRAIT_DEADLY:
                    this.critChance = this.critChance * 2;
                    extraStats.critPower += this.CritPower() * (0.3 * trait.level);
                    break;
                case Statics.TRAIT_BESERK:
                    extraStats.hit += this.Hit() * (0.2 * trait.level);
                    extraStats.healthRegen += this.HealthRegen() * (0.1 * trait.level);
                    break;
                case Statics.TRAIT_FIRSTSTRIKE:
                    firstStrike = true;
                    extraStats.accuracy += this.Accuracy() * (0.25 * trait.level);
                    break;
            }
            extraStats.xpReward += this.xpReward * (1 + MoonlightData.getInstance().challenges.megamonsters.completions * 0.01 * trait.level);
        }

        for (const prop in this.statBonuses) {
            this.statBonuses[prop] += extraStats[prop];
        }
        this.xpReward += extraStats.xpReward;
        this.motes += extraStats.motes;
        this.currentHealth = this.MaxHealth();
        if (firstStrike === true) {
            this.attackCooldown = this.AttackSpeed() * 0.95;
        }
    }

    addTrait(trait, level) {
        var newTrait = this.findTrait(trait);
        if (newTrait === undefined) {
            newTrait = { type: trait, level: level };
            this.traits.push(newTrait);
        } else {
            newTrait.level += level;
        }
    }
}