import { Statics } from "./Statics";

// this class exists purely to save the lore page for reloading
export class DynamicSettings {
    constructor() {
        if (!DynamicSettings.instance) {
            // min region required for gates
            this.minGateRegion = 1;
            this.regionSize = [9, 11];
            this.regionDifficultyIncrease = 20;
            this.maxGearTier = 8;
            this.maxResourceTier = 8;
            this.buildingsAllowed = true;
            this.gearAllowed = true;
            this.gearCostMulti = 1;
            this.maxRunTime = -1;
            this.exploreSpeed = 1;
            this.talentsEnabled = true;
            this.challengeName = "";

            DynamicSettings.instance = this;
        }

        return DynamicSettings.instance;
    }

    reset() {
        this.minGateRegion = 1;
        this.regionSize = [9, 11];
        this.regionDifficultyIncrease = 20;
        this.maxGearTier = 8;
        this.maxResourceTier = 8;
        this.buildingsAllowed = true;
        this.gearAllowed = true;
        this.gearCostMulti = 1;
        this.maxRunTime = -1;
        this.exploreSpeed = 1;
        this.talentsEnabled = true;
        this.challengeName = "";
    }

    setupChallenge(challenge) {
        this.reset();
        this.challengeName = challenge.name;
        switch (challenge.name) {
            case "A Matter of Years":
                this.minGateRegion = 1;
                this.maxRunTime = Statics.TIME_PER_YEAR * (10 - challenge.completions);
            case "Forged Ahead":
                this.minGateRegion = 1;
                this.gearCostMulti = 10 + (5 * challenge.completions);
            case "Vast Continent":
                this.minGateRegion = challenge.completions;
                this.exploreSpeed = 1 / 25;
            case "Forgotten Labor":
                this.minGateRegion = challenge.completions;
                this.buildingsAllowed = false;
            case "Talentless":
                this.minGateRegion = challenge.completions;
                this.talentsEnabled = false;
        }
    }

    save() {
        var saveObj = {
            mgr: this.minGateRegion,
            rs: this.regionSize,
            rdi: this.regionDifficultyIncrease,
            mgt: this.maxGearTier,
            mrt: this.maxResourceTier,
            ba: this.buildingsAllowed,
            ga: this.gearAllowed,
            gcm: this.gearCostMulti,
            mrun: this.maxRunTime,
            es: this.exploreSpeed,
            te: this.talentsEnabled,
            cn: this.challengeName
        }

        return saveObj;
    }
    load(saveObj) {
        this.minGateRegion = saveObj.mgr;
        this.regionSize = saveObj.rs;
        this.regionDifficultyIncrease = saveObj.rdi;
        this.maxGearTier = saveObj.mgt;
        this.maxResourceTier = saveObj.mrt;
        this.buildingsAllowed = saveObj.ba;
        this.gearAllowed = saveObj.ga;
        this.gearCostMulti = saveObj.gcm;
        this.maxRunTime = saveObj.mrun;
        this.exploreSpeed = saveObj.es;
        this.talentsEnabled = saveObj.te;
        this.challengeName = saveObj.cn;
    }
}