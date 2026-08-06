import { Common } from "../utils/Common";
import { CreatureRegistry } from "./CreatureRegistry";

const MONSTERS = ['goblin', 'wolf', 'lizard', 'guardian', 'slime'];
const BOSSES = ['shadow', 'drake', 'void'];

export class DungeonManager {
    constructor() {
        this.combatActive = false;
        this.attackCooldown = 0;
        this.villagerBlock = undefined;
        this.enemyBlock = undefined;
        this.activeDungeon = undefined;
        this.enemyCount = 0;

        this.creatureChangedHandler = [];
        this.playerDeathHandler = [];
        this.enemyDeathHandler = [];
        this.roomCompleteHandler = [];
    }

    registerEvent(event, callback) {
        switch (event) {
            case "OnCreatureChanged":
                this.creatureChangedHandler.push(callback);
                break;
            case "OnPlayerDeath":
                this.playerDeathHandler.push(callback);
                break;
            case "OnEnemyDeath":
                this.enemyDeathHandler.push(callback);
                break;
            case "OnRoomComplete":
                this.roomCompleteHandler.push(callback);
                break;
        }
    }

    exploreDungeon(dungeon, villagerBlock) {
        this.activeDungeon = dungeon;
        this.combatActive = true;
        this.villagerBlock = villagerBlock;
        this._setupRoom();
        this._onCreaturesChanged();
    }

    endDungeon() {
        this.combatActive = false;
    }

    _setupRoom() {
        if (this.activeDungeon.completedRooms === this.activeDungeon.maxRooms - 1) {
            this._initBoss();
            this.enemyCount = 1;
        } else if (this.activeDungeon.completedRooms % 5 === 4) {
            this._initMiniBoss();
            this.enemyCount = 1;
        } else {
            this._initMonster();
            this.enemyCount = 5;
        }
    }

    _onCreaturesChanged() {
        for (var i = 0; i < this.creatureChangedHandler.length; i++) {
            this.creatureChangedHandler[i](this.villagerBlock, this.enemyBlock);
        }
    }
    _onPlayerDeath() {
        for (var i = 0; i < this.playerDeathHandler.length; i++) {
            this.playerDeathHandler[i]();
        }
    }
    _onEnemyDeath() {
        for (var i = 0; i < this.enemyDeathHandler.length; i++) {
            this.enemyDeathHandler[i]();
        }
    }
    _onRoomComplete() {
        for (var i = 0; i < this.roomCompleteHandler.length; i++) {
            this.roomCompleteHandler[i](this.activeDungeon);
        }
    }

    _initMonster() {
        var min = 3 + Math.floor(this.activeDungeon.level / 5);
        var count = Common.randint(min, Math.ceil(min * 1.2));
        this.enemyBlock = CreatureRegistry.GetDungeonCreatureByName(MONSTERS[Common.randint(0, MONSTERS.length)],
            this.activeDungeon.difficulty, this.activeDungeon.difficulty * 10, count);
    }

    _initMiniBoss() {
        var min = 2 + Math.floor(this.activeDungeon.level / 10);
        var count = Common.randint(min, Math.ceil(min * 1.2));
        var tierBonus = [3, 4];
        var diff = this.activeDungeon.difficulty * tierBonus[Math.floor(this.activeDungeon.completedRooms / 5)];
        this.enemyBlock = CreatureRegistry.GetDungeonCreatureByName(MONSTERS[Common.randint(0, MONSTERS.length)],
            Math.floor(diff), Math.floor(diff * 10), count);
        this.enemyBlock.name = "Elite " + this.enemyBlock.name;
    }

    _initBoss() {
        var min = 3 + Math.floor(this.activeDungeon.level / 5);
        var count = Common.randint(min, Math.ceil(min * 1.2));
        var tierBonus = [2, 2.5, 3];
        var diff = count * tierBonus[this.activeDungeon.tier] * this.activeDungeon.difficulty;
        this.enemyBlock = CreatureRegistry.GetDungeonCreatureByName(BOSSES[Common.randint(0, BOSSES.length)],
            Math.floor(diff), Math.floor(diff * 10), 1);
    }

    update(delta) {
        if (this.combatActive === false) {
            return;
        }

        this.attackCooldown -= delta;
        if (this.attackCooldown <= 0) {
            this.attackCooldown += 1000;

            this.enemyBlock.takeDamage(this.villagerBlock.Power());
            if (this.enemyBlock.currentHealth <= 0) {
                this._onEnemyDeath();
                this.enemyCount -= 1;
                if (this.enemyCount <= 0) {
                    this._onRoomComplete();
                    this._setupRoom();
                } else {
                    this._initMonster();
                }
            } else {
                this.villagerBlock.takeDamage(this.enemyBlock.Power());
                if (this.villagerBlock.currentHealth <= 0) {
                    this._onPlayerDeath();
                    this.combatActive = false;
                }
            }
            this._onCreaturesChanged();
        }
    }
}