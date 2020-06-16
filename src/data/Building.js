import { BuildingRegistry } from "./BuildingRegistry";

export class Building {
    constructor(name, regName, tier, texture, resourceCosts, goldCost, costMulti) {
        this.name = name;
        this.regName = regName;
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

    save() {
        var saveObj = {
            t: this.tier,
            reg: this.regName
        }

        return saveObj;
    }

    static loadFromFile(saveObj, ver) {
        var bld = BuildingRegistry.getBuildingByName(saveObj.reg);
        for (var i = bld.tier; i <= saveObj.t; i++) {
            bld.increaseCosts();
        }
        bld.tier = saveObj.t;
        return bld;
    }
}