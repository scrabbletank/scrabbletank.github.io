import { SceneUIBase } from "./SceneUIBase";
import { CreatureDisplay } from "./../ui/CreatureDisplay";
import { Combat } from "../utils/Combat";
import { Common } from "../utils/Common";
import { ProgressBar } from "../ui/ProgressBar";
import { SpriteAnimation } from "../ui/SpriteAnimation";
import { ProgressionStore } from "../data/ProgressionStore";
import { TextButton } from "../ui/TextButton";
import { WorldData } from "../data/WorldData";
import { CombatManager } from "../data/CombatManager";
import { PlayerData } from "../data/PlayerData";

//width 800x600

export class CombatScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.player = PlayerData.getInstance();
        this.onRewardHandlers = [];
        this.onExploreHandlers = [];
        this.regionTier = 0;

        this.playerHitAnim = undefined;
        this.monsterHitAnim = [undefined, undefined, undefined];

        this.progression = new ProgressionStore();

        this.combatManager = new CombatManager()
            .registerEvent("onPlayerHealthChanged", (x) => { this._playerHealthCallback(x); })
            .registerEvent("onPlayerAttackChanged", (x) => { this._playerAttackCooldownCallback(x); })
            .registerEvent("onPlayerHit", (x, i) => { this._setupPlayerAnim(x, i); })
            .registerEvent("onCreatureHealthChanged", (x, i) => { this._monsterHealthCallback(x, i); })
            .registerEvent("onCreatureAttackChanged", (x, i) => { this._monsterAttackCooldownCallback(x, i); })
            .registerEvent("onCreatureHit", (x, i) => { this._setupMonsterAnim(x, i); })
            .registerEvent("onReward", (x, y) => { this._rewardCallback(x, y); })
            .registerEvent("onPlayerDefeat", () => { this._playerDefeatCallback(); })
            .registerEvent("onExplore", (x, y) => { this._exploreCallback(x, y); })
            .registerEvent("onCombatStart", () => { this._onCombatCallback(); });
    }

    enableScene() {
    }

    disableScene() {
    }

    _playerHealthCallback(health) {
        this.playerDisplay.setHealthBar(health / this.player.statBlock.MaxHealth(),
            Common.numberString(Math.ceil(health)) + "/" + Common.numberString(this.player.statBlock.MaxHealth()));
    }
    _playerAttackCooldownCallback(attackCooldown) {
        this.playerDisplay.setAttackBar(attackCooldown / this.player.statBlock.attackSpeed,
            Math.floor(attackCooldown / this.player.statBlock.attackSpeed * 100) + "%");
    }

    _monsterHealthCallback(health, idx) {
        health = Math.max(0, health);
        this.monsterDiplays[idx].setHealthBar(health / this.combatManager.monsters[idx].MaxHealth(),
            Common.numberString(Math.ceil(health)) + "/" + Common.numberString(this.combatManager.monsters[idx].MaxHealth()));
    }
    _monsterAttackCooldownCallback(attackCooldown, idx) {
        this.monsterDiplays[idx].setAttackBar(attackCooldown / this.combatManager.monsters[idx].attackSpeed,
            Math.floor(attackCooldown / this.combatManager.monsters[idx].attackSpeed * 100) + "%");
    }

    _rewardCallback(tile, rewards) {
        this._hideEnemyDisplays();
        this.restButton.setVisible(true);

        for (var i = 0; i < this.onRewardHandlers.length; i++) {
            this.onRewardHandlers[i](tile, rewards);
        }
    }

    _playerDefeatCallback() {
        this._hideEnemyDisplays();
        this.progression.registerDeath(1);
        this.restButton.setVisible(true);
    }

    _updatePlayerBlock() {
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    _onExplore(tile) {
        for (var i = 0; i < this.onExploreHandlers.length; i++) {
            this.onExploreHandlers[i](tile, this.regionTier);
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
        if (this.combatManager.combatActive === true) {
            this.restButton.setText("Explore");
            this.combatManager.stopCombat();
        } else {
            this.restButton.setText("Rest");
            this.combatManager.combatActive = true;
        }
    }

    registerEvent(event, callback) {
        if (event === "onReward") {
            this.onRewardHandlers.push(callback);
        } else if (event === "onExplore") {
            this.onExploreHandlers.push(callback);
        }
    }

    initFight(tile) {
        if (tile.amountExplored >= tile.explorationNeeded) {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                "Explored");
        } else {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                Math.floor(tile.amountExplored / tile.explorationNeeded * 100) + "%");
        }
        this.combatManager.setTile(tile);
        this.combatManager.initFight();
        this.regionTier = WorldData.instance.getCurrentRegion().regionLevel;
    }

    rebirth() {
        this.combatManager.stopCombat();
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

    _exploreCallback(tile, exploreFinished) {
        if (tile.amountExplored >= tile.explorationNeeded) {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                "Explored");
        } else {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                Math.floor(tile.amountExplored / tile.explorationNeeded * 100) + "%");
        }
        if (exploreFinished === true) {
            this._onExplore(tile);
        }
    }

    _onCombatCallback() {
        this._hideEnemyDisplays();
        var monsters = this.combatManager.monsters;
        for (var i = 0; i < monsters.length; i++) {
            this.monsterDiplays[i].setVisible(true);
            this.monsterDiplays[i].initWithCreature(monsters[i]);
        }
        this.restButton.setVisible(false);
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    isInCombat() { return this.combatManager.isInCombat(); }

    update(__time, __delta) {
        //ANIMATIONS
        var fDelta = WorldData.instance.time.frameDelta;
        this._updateAnimations(fDelta);

        this.combatManager.update(fDelta);
    }
}