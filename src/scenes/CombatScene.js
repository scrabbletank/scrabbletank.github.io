import { SceneUIBase } from "./SceneUIBase";
import { CreatureDisplay } from "./../ui/CreatureDisplay";
import { Combat } from "../utils/Combat";
import { Common } from "../utils/Common";
import { Statics } from "../data/Statics";
import { ProgressBar } from "../ui/ProgressBar";
import { SpriteAnimation } from "../ui/SpriteAnimation";
import { PlayerData } from "../data/PlayerData";
import { ProgressionStore } from "../data/ProgressionStore";
import { TextButton } from "../ui/TextButton";
import { WorldData } from "../data/WorldData";
import { MoonlightData } from "../data/MoonlightData";

//width 800x600

export class CombatScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.tileRef = undefined;
        this.combatActive = false;
        this.monsters = [];
        this.player = new PlayerData();
        this.globalAttackCooldown = 0;

        this.onKillHandlers = [];
        this.onExploreHandlers = [];
        this.target = 0;

        this.playerHitAnim = undefined;
        this.monsterHitAnim = [undefined, undefined, undefined];

        this.progression = new ProgressionStore();
    }

    enableScene() {
    }

    disableScene() {
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
        this.monsterDiplays[i].setVisible(true);
        this.monsterDiplays[i].initWithCreature(this.monsters[i]);
        this.monsters[i].registerEvent('onHealthChanged', (x) => { this._monsterHealthCallback(x, i); });
        this.monsters[i].registerEvent('onAttackCooldownChanged', (x) => { this._monsterAttackCooldownCallback(x, i); });
        this._monsterHealthCallback(this.monsters[i].currentHealth, i);
    }

    _setupCreatures() {
        this.monsters = this.tileRef.generateMonsters();

        for (var i = 0; i < this.monsterDiplays.length; i++) {
            this.monsterDiplays[i].setVisible(false);
        }

        for (var i = 0; i < this.monsters.length; i++) {
            // to save context on i when calling functions, because scope fuckery.
            this._creatureWorkaround(i);
        }
    }

    _playerHealthCallback(health) {
        this.playerDisplay.setHealthBar(health / this.player.statBlock.MaxHealth(),
            Math.floor(health) + "/" + this.player.statBlock.MaxHealth());
    }
    _playerAttackCooldownCallback(attackCooldown) {
        this.playerDisplay.setAttackBar(attackCooldown / this.player.statBlock.attackSpeed,
            Math.floor(attackCooldown / this.player.statBlock.attackSpeed * 100) + "%");
    }

    _monsterHealthCallback(health, idx) {
        this.monsterDiplays[idx].setHealthBar(health / this.monsters[idx].MaxHealth(),
            Math.floor(health) + "/" + this.monsters[idx].MaxHealth());
    }
    _monsterAttackCooldownCallback(attackCooldown, idx) {
        this.monsterDiplays[idx].setAttackBar(attackCooldown / this.monsters[idx].attackSpeed,
            Math.floor(attackCooldown / this.monsters[idx].attackSpeed * 100) + "%");
    }
    _updatePlayerBlock() {
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    _onKill(tile, shade, rewards, gold) {
        for (var i = 0; i < this.onKillHandlers.length; i++) {
            this.onKillHandlers[i](tile, shade, rewards, gold);
        }
    }
    _onExplore(tile) {
        for (var i = 0; i < this.onExploreHandlers.length; i++) {
            this.onExploreHandlers[i](tile);
        }
    }
    _hideEnemyDisplays() {
        for (var i = 0; i < this.monsterDiplays.length; i++) {
            this.monsterDiplays[i].setVisible(false);
        }
    }
    _setupPlayerAnim(monster, crit = false) {
        if (this.playerHitAnim !== undefined) {
            this._removePlayerAnim();
        }
        var x = this.playerDisplay.getCenterX();
        var y = this.playerDisplay.getCenterY();
        var sprite = crit === true ? monster.critAnim : monster.hitAnim;
        this.playerHitAnim = new SpriteAnimation(this, x, y, sprite, Combat.getAnimInfoFromKey(sprite), () => { this._removePlayerAnim(); });
    }
    _removePlayerAnim() {
        this.playerHitAnim.destroy();
        this.playerHitAnim = undefined;
    }
    _setupMonsterAnim(i, crit = false) {
        // if an animation is already playing, cancel it
        if (this.monsterHitAnim[i] !== undefined) {
            this._removeMonsterAnim(i);
        }
        var x = this.monsterDiplays[i].getCenterX();
        var y = this.monsterDiplays[i].getCenterY();
        var sprite = crit === true ? this.player.statBlock.critAnim : this.player.statBlock.hitAnim;
        this.monsterHitAnim[i] = new SpriteAnimation(this, x, y, sprite, Combat.getAnimInfoFromKey(sprite), () => { this._removeMonsterAnim(i); });
    }
    _removeMonsterAnim(i) {
        this.monsterHitAnim[i].destroy();
        this.monsterHitAnim[i] = undefined;
    }

    _restHandler() {
        if (this.combatActive === true) {
            this.restButton.setText("Explore");
            this.combatActive = false;
        } else {
            this.restButton.setText("Rest");
            this.initFight(this.tileRef);
        }
    }

    registerEvent(event, callback) {
        if (event === "onKill") {
            this.onKillHandlers.push(callback);
        } else if (event === "onExplore") {
            this.onExploreHandlers.push(callback);
        }
    }

    initFight(tileRef) {
        this.combatActive = true;
        this.tileRef = tileRef;
        if (this.tileRef.fightCooldown > 0) {
            this._hideEnemyDisplays();
        } else {
            this._setupCreatures();
            this.target = this._getTarget();
            this.restButton.setVisible(false);
        }
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    rebirth() {
        this.tileRef = undefined;
        this.combatActive = false;
        this.monsters = [];
        this.globalAttackCooldown = 0;
        this._hideEnemyDisplays();
    }

    preload() {
        this.load.spritesheet("claws", "./../../assets/anims/clawanim.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("clawscrit", "./../../assets/anims/clawanimcrit.png", { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.explorationBar = new ProgressBar(this, this.relativeX(10), this.relativeY(10), 880, 20,
            Phaser.Display.Color.GetColor(0, 0, 255), Phaser.Display.Color.GetColor(32, 32, 64));
        this.monsterDiplays = [];
        this.monsterDiplays.push(new CreatureDisplay(this, this.relativeX(325), this.relativeY(70)));
        this.monsterDiplays.push(new CreatureDisplay(this, this.relativeX(100), this.relativeY(170)));
        this.monsterDiplays.push(new CreatureDisplay(this, this.relativeX(550), this.relativeY(170)));

        this.playerDisplay = new CreatureDisplay(this, this.relativeX(325), this.relativeY(460));
        this.playerDisplay.initWithCreature(this.player.statBlock);
        this._hideEnemyDisplays();

        this.restButton = new TextButton(this, this.relativeX(800), this.relativeY(40), 80, 20, "Rest")
            .onClickHandler(() => { this._restHandler(); });

        this.player.statBlock.registerEvent("onHealthChanged", (x) => { this._playerHealthCallback(x); });
        this.player.statBlock.registerEvent("onAttackCooldownChanged", (x) => { this._playerAttackCooldownCallback(x); });
        this.player.registerEvent("onStatChanged", () => { this._updatePlayerBlock(); });
    }

    _updateAnimations(delta) {
        if (this.playerHitAnim !== undefined) {
            this.playerHitAnim.update(delta);
        }
        for (var i = 0; i < this.monsterHitAnim.length; i++) {
            if (this.monsterHitAnim[i] !== undefined) {
                this.monsterHitAnim[i].update(delta);
            }
        }
    }

    isInCombat() { return this.combatActive === true && this.globalAttackCooldown <= 0 && this.tileRef.fightCooldown <= 0; }

    update(__time, delta) {
        //ANIMATIONS
        this._updateAnimations(delta);
        if (this.combatActive === false) {
            return;
        }
        if (this.globalAttackCooldown > 0) {
            this.globalAttackCooldown -= delta;
            return;
        }
        if (this.tileRef.fightCooldown > 0) {
            this.tileRef.fightCooldown -= delta;
            var region = new WorldData().getCurrentRegion();
            var exploreMulti = (1 + this.player.talents.explorer.level * 0.1) * region.townData.exploreMulti *
                (1 + Statics.AGI_EXPLORE_MULTI * Math.pow(this.player.statBlock.Agility(), Statics.AGI_EXPLORE_POWER));
            this.tileRef.explore(delta * exploreMulti);
            if (this.tileRef.amountExplored >= this.tileRef.explorationNeeded) {
                this.explorationBar.setFillPercent(this.tileRef.amountExplored / this.tileRef.explorationNeeded,
                    "Explored");
            } else {
                this.explorationBar.setFillPercent(this.tileRef.amountExplored / this.tileRef.explorationNeeded,
                    Math.floor(this.tileRef.amountExplored / this.tileRef.explorationNeeded * 100) + "%");
            }
            if (this.tileRef.amountExplored >= this.tileRef.explorationNeeded && this.tileRef.explored === false) {
                this._onExplore(this.tileRef);
            }
            if (this.tileRef.fightCooldown <= 0) {
                this._setupCreatures();
                this.target = this._getTarget();
                this.restButton.setVisible(false);
            }
            return;
        }
        if (this._monstersAlive() === true) {
            for (var i = 0; i < this.monsters.length; i++) {
                if (this.monsters[i].currentHealth <= 0) {
                    continue;
                }
                var multi = Combat.getAttackSpeedMultiplier(this.monsters[i].Hit(), this.player.statBlock.Evasion());

                this.monsters[i].tickAttackCooldown(delta, multi);
                this.monsters[i].tickRegen(delta);

                if (this.monsters[i].canAttack() === true) {
                    var crit = this.monsters[i].CritChance() > Math.random();
                    var dmg = this.monsters[i].attack(this.player.statBlock, crit);
                    this._setupPlayerAnim(this.monsters[i], crit);
                    this.globalAttackCooldown = 150;
                    return;
                }
            }

            // player regen is handled elsewhere so we dont tick it here.
            var multi = Combat.getAttackSpeedMultiplier(this.player.statBlock.Hit(), this.monsters[this.target].Evasion());
            this.player.statBlock.tickAttackCooldown(delta, multi);

            if (this.player.statBlock.canAttack() === true) {
                var crit = this.player.statBlock.CritChance() > Math.random();
                var dmg = this.player.statBlock.attack(this.monsters[this.target], crit);
                this._setupMonsterAnim(this.target, crit);
                if (this.player.talents.cleave.level > 0 && Math.random() < 0.2) {
                    var newTarget = this.target;
                    for (var i = 0; i < this.monsters.length; i++) {
                        var num = (newTarget + i) % this.monsters.length;
                        if (this.monsters[num] !== undefined && this.monsters[num].currentHealth > 0) {
                            newTarget = num;
                            break;
                        }
                    }
                    if (newTarget !== this.target) {
                        crit = this.player.statBlock.CritChance() > Math.random();
                        dmg = this.player.statBlock.attack(this.monsters[newTarget], crit);
                        this._setupMonsterAnim(newTarget, crit);
                    }
                }
                this.target = this._getTarget();
                this.globalAttackCooldown = 150;
            }


            if (this._monstersAlive() === false) {
                var rewards = [0, 0, 0, 0, 0, 0];
                var shade = 0;
                var gold = 0;
                for (var i = 0; i < this.monsters.length; i++) {
                    gold += 1 + Math.floor(Math.max(1, this.monsters[i].level) / 5);
                    shade += this.monsters[i].xpReward;
                    // calculating bonus drops here
                    var lvl = this.player.talents.bounty.level;
                    var numRewards = 1 + (lvl / 10) + ((lvl % 10) / 10 > Math.random() ? 1 : 0);
                    for (var t = 0; t < numRewards; t++) {
                        var idx = Common.randint(0, this.monsters[i].drops.length);
                        var dropMulti = Math.max(1, this.monsters[i].level) - Math.max(0, Math.min(8, Math.floor(this.monsters[i].level / 20)) * 20);
                        rewards[this.monsters[i].drops[idx].type] += this.monsters[i].drops[idx].amount * dropMulti;
                    }
                }
                this.player.statBlock.encounterCounter -= 1;
                this._onKill(this.tileRef, shade, rewards, gold);
                this._hideEnemyDisplays();
                this.tileRef.fightCooldown = Statics.COMBAT_COOLDOWN;
                if (this.tileRef.isInvaded === true) {
                    if (this.progression.unlocks.motes === false) {
                        this.progression.registerFeatureUnlocked(Statics.UNLOCK_MOTES_UI,
                            "Well it happened. Some big bad monsters came back to spew their horrible mists all over the " +
                            "place again, but fortunately for you you had prepared for this. After killing the " +
                            "great misty one in the back it dropped something you haven't seen before... sort of like Shade, but like, " +
                            "more solid. You should probably just call them Motes of Darkness. I'm sure the townsfolk " +
                            "will be super impressed if you bring this dumb stone back and call it that.\n\n" +
                            "Oh, you can probably try putting it on your weapon if you really wanted to. It's up to you.");
                    }
                    var moonData = new MoonlightData();
                    this.player.addMote(1 + moonData.moonperks.heartofdarkness.level);
                    this.tileRef.decreaseInvasionPower();
                    if (this.tileRef.isInvaded === false) {
                        var region = new WorldData().getCurrentRegion().endSighting(this.tileRef.x, this.tileRef.y);
                    }
                }
                this.restButton.setVisible(true);
            }

            if (this.player.statBlock.currentHealth <= 0) {
                this.player.statBlock.currentHealth = 0;
                this._hideEnemyDisplays();
                this.combatActive = false;
                this.progression.registerDeath(1);
                this.restButton.setVisible(true);
            }
        }
    }
}