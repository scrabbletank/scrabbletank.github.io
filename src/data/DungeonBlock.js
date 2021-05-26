//creatures for dungeon fights
export class DungeonBlock {
    constructor() {
        this.power = 1;
        this.health = 10;
        this.maxHealth = this.health * 1;
        this.currentHealth = this.maxHealth;
        this.texture = { sprite: "icons", tile: 24 };
        this.name = "Villager";
        this.armySize = 1;
    }

    setArmyStats(power, health, armySize, armyDef) {
        this.power = power * armyDef.powerScale;
        this.health = health * armyDef.healthScale;
        this.maxHealth = this.health * armySize;
        this.currentHealth = this.maxHealth;
        this.name = armyDef.name;
        this.texture = armyDef.icon;
        this.armySize = armySize;
    }

    ArmySize() { return Math.ceil(this.currentHealth / this.health); }
    Power() { return this.ArmySize() * this.power; }
    CurrentHealth() { return Math.ceil(this.currentHealth); }
    MaxHealth() { return Math.ceil(this.ArmySize() * this.health); }

    takeDamage(dmg) {
        this.currentHealth = Math.max(0, this.currentHealth - dmg);
    }
}