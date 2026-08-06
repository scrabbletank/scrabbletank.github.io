import { CombatManager } from "../data/CombatManager";
import { CreatureRegistry } from "../data/CreatureRegistry";
import { PlayerData } from "../data/PlayerData";
import { ProgressionStore } from "../data/ProgressionStore";
import { StarData } from "../data/StarData";
import { WorldData } from "../data/WorldData";
import { CreatureDisplay } from "../ui/CreatureDisplay";
import { SpriteAnimation } from "../ui/SpriteAnimation";
import { TextButton } from "../ui/TextButton";
import { TooltipImage } from "../ui/TooltipImage";
import { Combat } from "../utils/Combat";
import { Common } from "../utils/Common";
import { SceneUIBase } from "./SceneUIBase";

const STATE_IDLE = -1;
const STATE_COMBAT = 0;
const STATE_REWARDS = 1;
const STATE_FAILURE = 2;


export class MyrahScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.sceneState = STATE_IDLE;
        this.myrahDefeats = 0;

        this.player = PlayerData.getInstance();
        this.playerHitAnim = undefined;
        this.monsterHitAnim = [undefined, undefined, undefined];

        this.playerDisplay = undefined;
        this.monsterDisplays = [];
        this.elements = [];

        this.combatManager = new CombatManager()
            .registerEvent("onAnimationChanged", (i, anim) => { this._setupAnim(i, anim); })
            .registerEvent("onCreatureHealthChanged", (x, i) => { this._monsterHealthCallback(x, i); })
            .registerEvent("onCreatureAttackChanged", (x, i) => { this._monsterAttackCooldownCallback(x, i); })
            .registerEvent("onReward", (x, y) => { this._rewardCallback(x, y); })
            .registerEvent("onCombatEnd", (x) => { this._onCombatEndCallback(x); })
            .registerEvent("onCombatStart", (x) => { this._onCombatCallback(x); })
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 1100, 800, 0x000000)
            .setOrigin(0)
            .setInteractive();
        this.monsterDisplays = [];
        this.monsterDisplays.push(new CreatureDisplay(this, 425, 120));
        this.playerDisplay = new CreatureDisplay(this, 425, 450);

        this.player.statBlock.registerEvent("onHealthChanged", (x) => { this._playerHealthCallback(x); });
        this.player.statBlock.registerEvent("onAttackCooldownChanged", (x) => { this._playerAttackCooldownCallback(x); });
        this.player.statBlock.registerEvent("onAnimationChanged", (x) => { this._setupAnim(-1, x); });
        this.player.registerEvent("onStatChanged", () => { this._updatePlayerBlock(); });
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
        if (rewards === undefined) {
            this._setSceneState(STATE_FAILURE);
        } else {
            if (this.myrahDefeats === 0) {
                var tile = this.combatManager.activeTile;
                this.myrahDefeats += 1;
                var creatures = [CreatureRegistry.GetCreatureByName("myrah2", tile.difficulty, tile.parent.regionLevel)];
    
                for (var t = 0; t < tile.parent.traits.length; t++) {
                    creatures[0].addTrait(tile.parent.traits[t].type, tile.parent.traits[t].level);
                }
                creatures[0].applyTraits();
                this.combatManager.initFightWithCreatures(false, creatures);
            } else {
                this._setSceneState(STATE_REWARDS);
            }
        }
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

    _onCombatCallback(__isInvasion) {
        var monsters = this.combatManager.monsters;
        for (var i = 0; i < monsters.length; i++) {
            this.monsterDisplays[i].setVisible(true);
            this.monsterDisplays[i].initWithCreature(monsters[i]);
            this.monsterDisplays[i].setInvader();
        }
        this.playerDisplay.initWithCreature(this.player.statBlock);
    }

    _setSceneState(state) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
        this.elements = [];
        this.sceneState = state;
        this.playerDisplay.setVisible(state === STATE_COMBAT);
        if (this.playerHitAnim !== undefined) {
            this._removePlayerAnim();
        }
        for (var i = 0; i < this.monsterDisplays.length; i++) {
            this.monsterDisplays[i].setVisible(state === STATE_COMBAT);
            if (this.monsterHitAnim[i] !== undefined) {
                this._removeMonsterAnim(i);
            }
        }
        this.combatManager.stopCombat();
        this.scene.get("CombatScene").stopCombat();

        switch (this.sceneState) {
            case STATE_FAILURE:
                var txt = "Defeated, you throw all " + Common.numberString(this.player.shade) + " of your shade at MYRAH as you escape. " +
                    "you have no idea if it was necessary, but at least you made it out of there alive. Now that you think about " +
                    "it, if you had just infused that shade instead you might have won. Oh well!";
                this.elements.push(this.add.bitmapText(550, 150, "courier20", Common.processText(txt, 80), 20, 1).setOrigin(0.5, 0));
                var btn = new TextButton(this, 490, 400, 120, 40, "FLEE")
                    .onClickHandler(() => { this._fleeHandler(); });
                this.elements.push(btn);
                break;
            case STATE_REWARDS:
                var txt = "Before you can land the final blow, MYRAH disappears in a flash of light. As your eyes adjust you are " +
                    "left alone in the room. On the ground where myrah stood are a handful of glowing shards... neat!";
                this.elements.push(this.add.bitmapText(550, 150, "courier20", Common.processText(txt, 80), 20, 1).setOrigin(0.5, 0));
                txt = "\"YOU PURSUE US, YET KNOW NOT WHO WE ARE. WE HIDE NO MORE, THE COUNTLESS LIGHTS SHALL " +
                    "SHINE DOWN FROM THE VOID TO PURIFY THE USURPERS LIES.\"";
                this.elements.push(this.add.bitmapText(550, 230, "courier20", Common.processText(txt, 80), 20, 1)
                    .setTint(Phaser.Display.Color.GetColor(177, 100, 169)).setOrigin(0.5, 0));
                var txt = "You only catch a few words as you were too busy shoving those rocks into your pack. There's " +
                    "a portal in the next room glowing the same color as those shards. There doesn't seem to be anywhere " +
                    "else to go, so you hop inside. You're not sure whats on the other side, but you're pretty sure you've " +
                    "unlocked some sweet new perks!";
                this.elements.push(this.add.bitmapText(550, 290, "courier20", Common.processText(txt, 80), 20, 1).setOrigin(0.5, 0));
                this.elements.push(new TooltipImage(this, 520, 400, 32, 32, { sprite: "icons2", tile: 4 },
                    "Starshards. Fragments of a fallen star containing an unbelievable power."));
                this.elements.push(this.add.bitmapText(555, 407, "courier20", "x5")
                    .setTint(Phaser.Display.Color.GetColor(177, 100, 169)));
                var btn = new TextButton(this, 490, 450, 120, 40, "REBIRTH")
                    .onClickHandler(() => { this._rebirthHandler(); });
                this.elements.push(btn);
                break;
        }
    }

    _fleeHandler() {
        this._setSceneState(STATE_IDLE);
        this.player.addShade(-this.player.shade);
        this.scene.sendToBack();
    }

    _rebirthHandler() {
        this._setSceneState(STATE_IDLE);
        ProgressionStore.getInstance().persistentUnlocks.starshards = true;
        WorldData.getInstance().starshardsEarned += 5;
        WorldData.getInstance().handleRunCompletion();
        this.scene.get("MoonlightScene")._switchView(1);
        this.scene.get("MoonlightScene").enableLeveling();
        this.scene.bringToTop("MoonlightScene");
        this.scene.sendToBack();
    }

    initFight(tile) {
        this.myrahDefeats = 0;
        WorldData.getInstance().time.setTimeScale(1);
        this._setSceneState(STATE_COMBAT);
        this.combatManager.setTile(tile);

        var creatures = [CreatureRegistry.GetCreatureByName("myrah1", tile.difficulty, tile.parent.regionLevel)];
        for (var t = 0; t < tile.parent.traits.length; t++) {
            creatures[0].addTrait(tile.parent.traits[t].type, tile.parent.traits[t].level);
        }
        creatures[0].applyTraits();
        this.combatManager.initFightWithCreatures(false, creatures);
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

    update(__time, __delta) {
        //ANIMATIONS
        if (this.sceneState === STATE_COMBAT) {
            var fDelta = WorldData.getInstance().time.frameDelta;
            this._updateAnimations(fDelta);

            this.combatManager.update(fDelta);
        }
    }
}