export class Ability {
    constructor() {
        this.type = 0;
        this.name = "";
        this.cooldown = 0;
        this.currentCooldown = 0;
    }

    update(delta) {
        this.currentCooldown = Math.max(0, this.currentCooldown - delta);
    }
}