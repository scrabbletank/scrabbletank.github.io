// this class exists purely to save the lore page for reloading
export class DynamicSettings {
    constructor() {
        if (!DynamicSettings.instance) {
            // min region required for gates
            this.minGateRegion = 1
            this.regionSize = [12, 12]
            this.regionDifficultyIncrease = 20
            this.maxGearTier = 8
            this.maxResourceTier = 8
            this.buildingsAllowed = true
            this.gearAllowed = true
            this.gearCostMulti = 1


            DynamicSettings.instance = this;
        }

        return DynamicSettings.instance;
    }

    rebirth() {
    }

    save() {
        var saveObj = {
        }

        return saveObj;
    }
    load(saveObj) {
    }
}