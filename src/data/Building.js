export class Building {
    constructor(name, tier, texture, resourceCosts, goldCost, costMulti) {
        this.name = name;
        this.tier = tier;
        this.texture = texture;
        this.resourceCosts = resourceCosts;
        this.goldCost = goldCost;
        this.costMulti = costMulti;
    }

    increaseCosts() {
        for (var i = 0; i < this.resourceCosts.length; i++) {
            this.resourceCosts[i] = this.resourceCosts[i] * this.costMulti;
        }
        this.goldCost = this.goldCost * this.costMulti;
    }
}