import { MoonlightData } from "./MoonlightData";
import { PlayerData } from "./PlayerData";
import { Common } from "../utils/Common";
import { Combat } from "../utils/Combat";
import { Statics } from "./Statics";
import { ProgressionStore } from "./ProgressionStore";
import { DynamicSettings } from "./DynamicSettings";
import { RegionRegistry } from "./RegionRegistry";
import { WorldData } from "./WorldData";
import { StarData } from "./StarData";
import { RitualData } from "./RitualData";

export class CombatManager {
    constructor() {
        this.combatActive = false;
        this.monsters = [];
        this.globalAttackCooldown = 0;
        this.target = 0;
        this.fightCooldown = Statics.COMBAT_COOLDOWN;
        this.dropChances = [];
        this.dropTotals = 0;

        this.activeTile = undefined;
        this.creatureHealthCallback = undefined;
        this.creatureAttackCallback = undefined;
        this.rewardCallback = undefined;
        this.playerDefeatCallback = undefined;
        this.exploreCallback = undefined;
        this.combatCallback = undefined;
        this.invasionEndCallback = undefined;
        this.animationChangedCallback = undefined;
        this.fromAutoExplore = false;
        this.totalKills = 0;
        this.poisonTimer = 0;
    }

    registerEvent(event, callback) {
        switch (event) {
            case "onCreatureHealthChanged":
                this.creatureHealthCallback = callback;
                break;
            case "onCreatureAttackChanged":
                this.creatureAttackCallback = callback;
                break;
            case "onReward":
                this.rewardCallback = callback;
                break;
            case "onPlayerDefeat":
                this.playerDefeatCallback = callback;
                break;
            case "onExplore":
                this.exploreCallback = callback;
                break;
            case "onCombatStart":
                this.combatCallback = callback;
                break;
            case "onInvasionEnd":
                this.invasionEndCallback = callback;
                break;
            case "onAnimationChanged":
                this.animationChangedCallback = callback;
                break;
        }
        return this;
    }

    _monstersAlive() {
        for (var i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].currentHealth > 0) {
                return true;
            }
        }
        return false;
    }

    _getTarget() {
        if (this._monstersAlive() === false) {
            return 0;
        }

        var target = Common.randint(0, this.monsters.length);
        while (this.monsters[target].currentHealth <= 0) {
            target = (target + 1) % this.monsters.length;
        }
        return target;
    }

    _creatureWorkaround(i) {
        this.monsters[i].registerEvent('onHealthChanged', (x) => { this._creatureHealthChanged(x, i); });
        this.monsters[i].registerEvent('onAttackCooldownChanged', (x) => { this._creatureAttackChanged(x, i); });
        this.monsters[i].registerEvent('onAnimationChanged', (anim) => { this._animationChangedHandler(i, anim); });
    }

    _creatureHealthChanged(x, i) {
        if (this.creatureHealthCallback !== undefined) {
            this.creatureHealthCallback(x, i);
        }
    }
    _creatureAttackChanged(x, i) {
        if (this.creatureAttackCallback !== undefined) {
            this.creatureAttackCallback(x, i);
        }
    }
    _animationChangedHandler(i, anim) {
        if (this.animationChangedCallback !== undefined) {
            this.animationChangedCallback(i, anim);
        }
    }

    setTile(tile) {
        this.activeTile = tile;
        this.dropChances = [100, 100, 100, 100, 100, 100];
        this.dropTotals = 0;
        var tileType = RegionRegistry.TILE_TYPES[tile.regName];
        for (var i = 0; i < tileType.yields.length; i++) {
            this.dropChances[i] += tileType.yields[i];
            this.dropTotals += this.dropChances[i];
        }
    }

    initFightWithCreatures(fromAutoExplore, monsterList) {
        this.fromAutoExplore = fromAutoExplore;
        this.combatActive = true;
        this.monsters = monsterList;
        for (var i = 0; i < this.monsters.length; i++) {
            // to save context on i when calling functions, because scope fuckery.
            this.monsters[i].initCombat();
            this._creatureWorkaround(i);
        }
        PlayerData.getInstance().statBlock.initCombat();
        for (var i = 0; i < this.monsters.length; i++) {
            var trait = this.monsters[i].findTrait(Statics.TRAIT_CORROSIVE);
            if (trait !== undefined) {
                PlayerData.getInstance().statBlock.corrosion += this.monsters[i].DamageMin() * 0.01 * trait.level;
            }
        }
        this.target = this._getTarget();
        if (this.combatCallback !== undefined) {
            this.combatCallback(this.activeTile.isInvaded);
        }
    }

    initFight(fromAutoExplore) {
        this.fromAutoExplore = fromAutoExplore;
        this.combatActive = true;
        this.monsters = this.activeTile.generateMonsters();
        for (var i = 0; i < this.monsters.length; i++) {
            // to save context on i when calling functions, because scope fuckery.
            this.monsters[i].initCombat();
            this._creatureWorkaround(i);
        }
        PlayerData.getInstance().statBlock.initCombat();
        for (var i = 0; i < this.monsters.length; i++) {
            var trait = this.monsters[i].findTrait(Statics.TRAIT_CORROSIVE);
            if (trait !== undefined) {
                PlayerData.getInstance().statBlock.corrosion += this.monsters[i].DamageMin() * 0.01 * trait.level;
            }
        }
        this.target = this._getTarget();
        if (this.combatCallback !== undefined) {
            this.combatCallback(this.activeTile.isInvaded);
        }
        this.poisonTimer = 0;
    }

    isInCombat() { return this.combatActive === true && this.fightCooldown <= 0; }

    stopCombat() { this.combatActive = false; }

    _getDropIndex() {
        var c = Common.randint(0, this.dropTotals);
        for (var i = 0; i < this.dropChances.length; i++) {
            if (c < this.dropChances[i]) {
                return i;
            }
            c -= this.dropChances[i];
        }
        return 0;
    }

    _handleRewards() {
        this.fightCooldown = Statics.COMBAT_COOLDOWN;
        var rewards = {
            tier: this.activeTile.parent.resourceTier,
            resource: [0, 0, 0, 0, 0, 0],
            shade: 0,
            gold: 0,
            motes: 0,
            friendship: 0,
            regionLevel: this.activeTile.parent.regionLevel
        }
        var player = PlayerData.getInstance();

        //handle wizard gold gain here
        if (Math.floor((this.totalKills + this.monsters.length) / 10) > Math.floor(this.totalKills / 10)) {
            rewards.gold += player.getTalentLevel("alchemy") * 5 * this.activeTile.parent.townData.economyMulti;
        }
        this.totalKills += this.monsters.length;

        for (var i = 0; i < this.monsters.length; i++) {
            rewards.gold += 1 + (Math.max(1, this.monsters[i].level) / 14) + MoonlightData.getInstance().moonperks.gold.level * 0.25;
            rewards.shade += this.monsters[i].xpReward + player.runeBonuses.shadeFlat;
            rewards.motes += this.monsters[i].motes;
            if (Math.random() < player.runeBonuses.moteChance) {
                rewards.motes += 1;
            }
            // calculating bonus drops here
            var lvl = player.getTalentLevel("bounty");
            var numRewards = 1 + (lvl / 10) + ((lvl % 10) / 10 > Math.random() ? 1 : 0);
            var baseLvl = this.activeTile.parent.regionLevel * DynamicSettings.getInstance().regionDifficultyIncrease;
            for (var t = 0; t < numRewards; t++) {
                var idx = this._getDropIndex();
                var dropMulti = (1 + (this.monsters[i].level - baseLvl) * 0.20) + (this.activeTile.parent.regionLevel * 0.1);
                dropMulti = dropMulti * (1 + StarData.getInstance().perks.bounty.level * 0.5);
                rewards.resource[idx] += Math.max(0, this.monsters[i].dropBase * dropMulti) + player.runeBonuses.lootFlat;
            }
            rewards.friendship += this.activeTile.getFriendshipReward();
        }
        if (player.getTalentLevel('bundle') > 0) {
            var totalBundle = this.monsters.length * player.getTalentLevel('bundle') * 0.02;
            var townProd = this.activeTile.parent._getResourcesPerDay();
            for (var i = 0; i < townProd.length; i++) {
                rewards.resource[i] += townProd[i] * totalBundle;
            }
        }
        rewards.gold = (rewards.gold * (this.activeTile.explored ? 1 : 3.5)) * this.activeTile.parent.townData.bountyMulti;
        rewards.shade *= MoonlightData.getInstance().getShadowBonus() * this.activeTile.parent.townData.getFriendshipBonus();
        rewards.friendship *= (1 + player.runeBonuses.friendshipMulti) *
            (1 + MoonlightData.getInstance().challenges.outcast.completions * 0.1) *
            (1 + player.getTalentLevel('charisma') * 0.1);

        if (this.activeTile.isInvaded === true) {
            if (ProgressionStore.getInstance().unlocks.motes === false) {
                ProgressionStore.getInstance().registerFeatureUnlocked(Statics.UNLOCK_MOTES_UI,
                    "Well it happened. Some big bad monsters came back to spew their horrible mists all over the " +
                    "place again, but fortunately for you you had prepared for this. After killing the " +
                    "great misty one in the back it dropped something you haven't seen before... sort of like Shade, but like, " +
                    "more solid. You should probably just call them Motes of Darkness. I'm sure the townsfolk " +
                    "will be super impressed if you bring this dumb stone back and call it that.\n\n" +
                    "Oh, you can probably try putting it on your weapon if you really wanted to. It's up to you.");
            }
            if (MoonlightData.getInstance().challenges.invasion.completions > 0 &&
                MoonlightData.getInstance().challenges.invasion.completions < 5 && this.fromAutoExplore === true) {
                rewards.motes += (1 + MoonlightData.getInstance().moonperks.heartofdarkness.level) *
                    WorldData.getInstance().invasionReward * 0.25;
            } else {
                rewards.motes += (1 + MoonlightData.getInstance().moonperks.heartofdarkness.level) *
                    WorldData.getInstance().invasionReward;
            }
            this.activeTile.invasionFights -= 1;
            if (this.activeTile.invasionFights <= 0) {
                this.activeTile.parent.endSighting(this.activeTile.x, this.activeTile.y);
                if (this.invasionEndCallback !== undefined) {
                    this.invasionEndCallback();
                }
            }
        }

        rewards.motes *= (1 + RitualData.getInstance().activePerks.offerings * 0.2);
        for (var i = 0; i < rewards.resource.length; i++) {
            rewards.resource[i] *= (1 + RitualData.getInstance().activePerks.offerings * 0.2);
        }

        if (this.rewardCallback !== undefined) {
            this.rewardCallback(rewards);
        }
    }

    update(delta) {
        if (this.combatActive === false) {
            return;
        }
        if (this.globalAttackCooldown > 0) {
            this.globalAttackCooldown -= delta;
            return;
        }
        var player = PlayerData.getInstance();
        if (this._monstersAlive() === true) {

            this.poisonTimer -= delta;
            if (this.poisonTimer <= 0 && this.monsters[0].findTrait(Statics.TRAIT_POISONED) !== undefined) {
                var poison = this.monsters[0].findTrait(Statics.TRAIT_POISONED);
                for (var i = 0; i < this.monsters.length; i++) {
                    var poisonDmg = player.statBlock.currentHealth / player.statBlock.MaxHealth() > 0.5 ?
                        0.04 + poison.level * 0.01 : 0.08 + poison.level * 0.02;
                    player.statBlock.takeDamage(this.monsters[i].DamageMax() * poisonDmg,
                        Statics.HIT_NORMAL, Statics.DMG_MAGIC);
                }
                this.poisonTimer += Statics.POISON_TICK_DELAY;
            }
            for (var i = 0; i < this.monsters.length; i++) {
                if (this.monsters[i].currentHealth <= 0) {
                    continue;
                }
                var multi = Combat.getAttackSpeedMultiplier(this.monsters[i].Hit(), player.statBlock.Evasion());

                this.monsters[i].tickAttackCooldown(delta, multi);
                this.monsters[i].tickRegen(delta);

                if (this.monsters[i].canAttack() === true) {
                    var crit = this.monsters[i].CritChance() > Math.random();
                    var dmg = this.monsters[i].attack(player.statBlock, crit);
                    this.globalAttackCooldown = Statics.GLOBAL_ATTACK_COOLDOWN;
                    break;
                }
            }

            // player regen is handled elsewhere so we dont tick it here.
            var multi = Combat.getAttackSpeedMultiplier(player.statBlock.Hit(), this.monsters[this.target].Evasion());
            player.statBlock.tickAttackCooldown(delta, multi);

            if (player.statBlock.canAttack() === true) {
                var crit = player.statBlock.CritChance() > Math.random();
                if (player.statBlock.canCastFireball !== undefined &&
                    player.statBlock.canCastFireball() === true) {
                    player.statBlock._castFireball(this.monsters);
                } else {
                    player.statBlock.attack(this.monsters[this.target], crit);
                }
                if (this.monsters[this.target].currentHealth <= 0) {
                    player.statBlock.heal(player.statBlock.HealthRegen() * player.runeBonuses.regenOnKill);
                }
                if (player.getTalentLevel("cleave") > 0 && Math.random() < 0.2) {
                    var newTarget = this.target;
                    for (var i = 0; i < this.monsters.length; i++) {
                        var num = (newTarget + i) % this.monsters.length;
                        if (this.monsters[num] !== undefined && this.monsters[num].currentHealth > 0) {
                            newTarget = num;
                            break;
                        }
                    }
                    if (newTarget !== this.target) {
                        crit = player.statBlock.CritChance() > Math.random();
                        player.statBlock.cleave(this.monsters[newTarget], crit);
                        if (this.monsters[newTarget].currentHealth <= 0) {
                            player.statBlock.heal(player.statBlock.HealthRegen() * player.runeBonuses.regenOnKill);
                        }
                    }
                }

                this.target = this._getTarget();
                this.globalAttackCooldown = Statics.GLOBAL_ATTACK_COOLDOWN;
            }

            if (this._monstersAlive() === false) {
                this._handleRewards();
                player.statBlock.encounterCounter -= 1;
            }

            if (player.statBlock.currentHealth <= 0 && this.playerDefeatCallback !== undefined) {
                player.statBlock.currentHealth = 0;
                this.combatActive = false;
                this.playerDefeatCallback();
            }
        } else {
            this.fightCooldown -= delta;
            var exploreResult = this.activeTile.explore(delta);
            if (this.exploreCallback !== undefined) {
                this.exploreCallback(this.activeTile, exploreResult);
            }
            if (this.fightCooldown <= 0) {
                this.initFight(this.fromAutoExplore);
            }
        }
    }
}