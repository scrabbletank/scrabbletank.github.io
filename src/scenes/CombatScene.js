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
import { MoonlightData } from "../data/MoonlightData";
import { Statics } from "../data/Statics";
import { DynamicSettings } from "../data/DynamicSettings";
import { GearData } from "../data/GearData";

//width 800x600

export class CombatScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.player = PlayerData.getInstance();
        this.regionTier = 0;
        this.restartAfterRegen = false;

        this.playerHitAnim = undefined;
        this.monsterHitAnim = [undefined, undefined, undefined];

        this.progression = new ProgressionStore();

        this.combatManager = new CombatManager()
            .registerEvent("onAnimationChanged", (i, anim) => { this._setupAnim(i, anim); })
            .registerEvent("onCreatureHealthChanged", (x, i) => { this._monsterHealthCallback(x, i); })
            .registerEvent("onCreatureAttackChanged", (x, i) => { this._monsterAttackCooldownCallback(x, i); })
            .registerEvent("onExplore", (x) => { this._exploreCallback(x); })
            .registerEvent("onCombatStart", (x) => { this._onCombatCallback(x); })
            .registerEvent("onCombatEnd", (x) => { this._onCombatEndCallback(x); })
            .registerEvent('onInvasionEnd', () => { this._onInvasionEndCallback(); });
    }

    enableScene() {
    }

    disableScene() {
    }

    _playerHealthCallback(health) {
        var shieldPercent = this.player.statBlock.shieldValue / this.player.statBlock.MaxHealth();
        var fillTxt = "";
        if (shieldPercent > 0) {
            fillTxt = Common.numberString(Math.ceil(health)) + "+(" + Common.numberString(Math.ceil(this.player.statBlock.shieldValue)) + ")/" +
                Common.numberString(this.player.statBlock.MaxHealth());
        } else {
            fillTxt = Common.numberString(Math.ceil(health)) + "/" + Common.numberString(this.player.statBlock.MaxHealth());
        }
        this.playerDisplay.setHealthBar(health / this.player.statBlock.MaxHealth(), fillTxt);
        this.playerDisplay.setShieldBar(shieldPercent);
    }
    _playerAttackCooldownCallback(attackCooldown) {
        this.playerDisplay.setAttackBar(attackCooldown / this.player.statBlock.attackSpeed,
            Math.floor(attackCooldown / this.player.statBlock.attackSpeed * 100) + "%");
    }

    _monsterHealthCallback(health, idx) {
        health = Math.max(0, health);
        var shieldPercent = this.combatManager.monsters[idx].shieldValue / this.combatManager.monsters[idx].MaxHealth();
        var fillTxt = "";
        if (shieldPercent > 0) {
            fillTxt = Common.numberString(Math.ceil(health)) + "+(" + Common.numberString(Math.ceil(this.combatManager.monsters[idx].shieldValue)) + ")/" +
                Common.numberString(this.combatManager.monsters[idx].MaxHealth());
        } else {
            fillTxt = Common.numberString(Math.ceil(health)) + "/" + Common.numberString(this.combatManager.monsters[idx].MaxHealth());
        }
        this.monsterDisplays[idx].setHealthBar(health / this.combatManager.monsters[idx].MaxHealth(), fillTxt);
        this.monsterDisplays[idx].setShieldBar(shieldPercent);
    }
    _monsterAttackCooldownCallback(attackCooldown, idx) {
        this.monsterDisplays[idx].setAttackBar(attackCooldown / this.combatManager.monsters[idx].attackSpeed,
            Math.floor(attackCooldown / this.combatManager.monsters[idx].attackSpeed * 100) + "%");
    }

    _onCombatEndCallback(rewards) {
        this._hideEnemyDisplays();
        this.restButton.setVisible(true);
        if (rewards === undefined) {
            this.restartAfterRegen = true;
            this.progression.registerDeath(1);
            this.restButton.setText("Explore");
        } else {
            this.restButton.setText("Rest");
            if (this.progression.unlocks.craftingUI === true) {
                GearData.getInstance().tiersAvailable = Math.min(DynamicSettings.getInstance().maxGearTier,
                    Math.max(GearData.getInstance().tiersAvailable, rewards.regionLevel + 1));
                this.scene.get("GearScene")._updateTierButtons();
            }
            this.player.addShade(rewards.shade);
            this.player.addResource(rewards.resource, rewards.tier);
            this.player.addMote(rewards.motes);
            this.progression.registerMonsterKill();
            this.progression.registerShadeGain(rewards.shade);
            this.progression.registerResourceGain(rewards.resource);
            if (this.progression.unlocks.townTab === true) {
                this.player.addGold(rewards.gold);
                WorldData.getInstance().getRegion(rewards.regionLevel).townData.addFriendship(rewards.friendship);
                this.scene.get("TownScene")._updateStatus();
            }

            var tile = this.combatManager.activeTile;

            if (tile.isInvaded === true) {
                tile.invasionFights += 1;
                if (tile.invasionFights >= 2 + tile.parent.invasionStrength) {
                    tile.parent.clearInvadedTile(tile.x, tile.y);
                }
            }
        }
    }

    _updatePlayerBlock() {
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }
    _hideEnemyDisplays() {
        for (var i = 0; i < this.monsterDisplays.length; i++) {
            this.monsterDisplays[i].setVisible(false);
        }
    }
    _setupAnim(idx, animKey) {
        if (idx === -1) {
            this._setupPlayerAnim(animKey);
        } else {
            this._setupMonsterAnim(idx, animKey);
        }
    }
    _setupPlayerAnim(animKey) {
        if (this.playerHitAnim !== undefined) {
            this._removePlayerAnim();
        }
        var x = this.playerDisplay.getCenterX();
        var y = this.playerDisplay.getCenterY();
        this.playerHitAnim = new SpriteAnimation(this, x, y, animKey, Combat.getAnimInfoFromKey(animKey), () => { this._removePlayerAnim(); });
    }
    _removePlayerAnim() {
        this.playerHitAnim.destroy();
        this.playerHitAnim = undefined;
    }
    _setupMonsterAnim(idx, animKey) {
        // if an animation is already playing, cancel it
        if (this.monsterHitAnim[idx] !== undefined) {
            this._removeMonsterAnim(idx);
        }
        var x = this.monsterDisplays[idx].getCenterX();
        var y = this.monsterDisplays[idx].getCenterY();
        this.monsterHitAnim[idx] = new SpriteAnimation(this, x, y, animKey, Combat.getAnimInfoFromKey(animKey), () => { this._removeMonsterAnim(idx); });
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

    initFight(tile) {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
        const tileName = letters[tile.y] + "" + (tile.x + 1) + " - " + tile.name;
        if (tile.amountExplored >= tile.explorationNeeded) {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                tileName + ": Explored");
        } else {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                tileName + ": " + Math.floor(tile.amountExplored / tile.explorationNeeded * 100) + "%");
        }
        this.invasionCounter.setVisible(tile.isInvaded);
        var invaders = 3 * (2 + tile.parent.invasionStrength - tile.invasionFights);
        this.invasionCounter.setText("Invaders: " + invaders);
        this.combatManager.setTile(tile);
        this.combatManager.initFight();
        this.regionTier = tile.parent.regionLevel;
    }

    rebirth() {
        this.combatManager.stopCombat();
        this._hideEnemyDisplays();
    }

    stopCombat() {
        this.combatManager.stopCombat();
    }

    preload() {
        this.load.spritesheet("claws", "./../../assets/anims/clawanim.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("clawscrit", "./../../assets/anims/clawanimcrit.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("mace", "./../../assets/anims/maceanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("magicmissile", "./../../assets/anims/magicanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("entangle", "./../../assets/anims/entangleanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("barrier", "./../../assets/anims/barrieranim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("fireball", "./../../assets/anims/fireanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("haste", "./../../assets/anims/hasteanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("skull", "./../../assets/anims/killanim.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("glancing", "./../../assets/anims/glancinganim.png", { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.explorationBar = new ProgressBar(this, this.relativeX(10), this.relativeY(10), 880, 20,
            Phaser.Display.Color.GetColor(0, 0, 255), Phaser.Display.Color.GetColor(32, 32, 64));
        this.invasionCounter = this.add.bitmapText(this.relativeX(400), this.relativeY(35), "courier20", "Invaders: 0")
            .setTint(Phaser.Display.Color.GetColor(220, 0, 220));
        this.invasionCounter.setVisible(false);
        this.monsterDisplays = [];
        this.monsterDisplays.push(new CreatureDisplay(this, this.relativeX(325), this.relativeY(70)));
        this.monsterDisplays.push(new CreatureDisplay(this, this.relativeX(65), this.relativeY(170)));
        this.monsterDisplays.push(new CreatureDisplay(this, this.relativeX(585), this.relativeY(170)));

        this.playerDisplay = new CreatureDisplay(this, this.relativeX(325), this.relativeY(460));
        this.playerDisplay.initWithCreature(this.player.statBlock);
        this._hideEnemyDisplays();

        this.restButton = new TextButton(this, this.relativeX(800), this.relativeY(40), 80, 20, "Rest")
            .onClickHandler(() => { this._restHandler(); });
        this.restButton.setVisible(false);

        this.player.statBlock.registerEvent("onHealthChanged", (x) => { this._playerHealthCallback(x); });
        this.player.statBlock.registerEvent("onAttackCooldownChanged", (x) => { this._playerAttackCooldownCallback(x); });
        this.player.statBlock.registerEvent("onAnimationChanged", (x) => { this._setupAnim(-1, x); });
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

    _exploreCallback(tile) {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
        const tileName = letters[tile.y] + "" + (tile.x + 1) + " - " + tile.name;
        if (tile.explored) {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                tileName + ": Explored");
        } else {
            this.explorationBar.setFillPercent(tile.amountExplored / tile.explorationNeeded,
                tileName + ": " + Math.floor(tile.amountExplored / tile.explorationNeeded * 100) + "%");
        }

        if (tile.explored === true && tile.isInvaded === false) {
            this.scene.get("RegionScene").triggerAutoExplore(tile, tile.parent.regionLevel);
        }
    }

    _onCombatCallback(isInvasion) {
        this._hideEnemyDisplays();
        var monsters = this.combatManager.monsters;
        for (var i = 0; i < Math.min(monsters.length, this.monsterDisplays.length); i++) {
            this.monsterDisplays[i].setVisible(true);
            this.monsterDisplays[i].initWithCreature(monsters[i]);
            if (isInvasion === true) {
                this.monsterDisplays[i].setInvader();
            }
        }
        this.invasionCounter.setVisible(this.combatManager.activeTile.isInvaded);
        var invaders = 3 * (2 + this.combatManager.activeTile.parent.invasionStrength -
            this.combatManager.activeTile.invasionFights);
        this.invasionCounter.setText("Invaders: " + invaders);
        this.restButton.setVisible(false);
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    _onInvasionEndCallback() {
        if (DynamicSettings.getInstance().autoInvade === true) {
            this.scene.get("RegionScene").triggerAutoExplore(this.combatManager.activeTile,
                this.combatManager.activeTile.parent.regionLevel);
        }
    }

    isInCombat() { return this.combatManager.isInCombat(); }

    update(__time, __delta) {
        var fDelta = WorldData.getInstance().time.frameDelta;
        for (var i = 0; i < WorldData.getInstance().time.fskip; i++) {
            this._updateAnimations(fDelta);
            this.combatManager.update(fDelta);

            if (this.restartAfterRegen === true && this.combatManager.combatActive === false &&
                this.player.statBlock.currentHealth >= this.player.statBlock.MaxHealth() &&
                DynamicSettings.getInstance().autoExplore === true) {
                this.combatManager.initFight(true);
                this.restartAfterRegen = false;
            }
            if (this.combatManager.combatActive === true) {
                this.restartAfterRegen = false;
            }
        }
    }
}