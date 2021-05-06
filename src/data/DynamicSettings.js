import { Statics } from "./Statics";

// this class exists purely to save the lore page for reloading
export class DynamicSettings {
    constructor() {
        if (!DynamicSettings.instance) {
            // min region required for gates
            this.minGateRegion = 0;
            this.regionSize = [11, 13];
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
            this.startingTraits = 0;
            this.fixedTraits = [];
            this.productionMulti = 1;
            this.spendFriendship = false;
            this.friendshipToProduction = false;

            DynamicSettings.instance = this;
        }

        return DynamicSettings.instance;
    }

    static getInstance() {
        if (!DynamicSettings.instance) {
            return new DynamicSettings();
        }
        return DynamicSettings.instance;
    }

    reset() {
        this.minGateRegion = 0;
        this.regionSize = [11, 13];
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
        this.startingTraits = 0;
        this.fixedTraits = [];
        this.productionMulti = 1;
        this.spendFriendship = false;
        this.friendshipToProduction = false;
    }

    setupChallenge(challenge) {
        this.reset();
        this.challengeName = challenge.name;
        switch (challenge.name) {
            case "A Matter of Years":
                this.minGateRegion = 1;
                this.maxRunTime = Statics.TIME_PER_YEAR * (5 - challenge.completions);
                break;
            case "Forged Ahead":
                this.minGateRegion = 1;
                this.gearCostMulti = 10 + (10 * challenge.completions);
                break;
            case "Giant Lands":
                this.regionSize = [5, 7];
                this.minGateRegion = challenge.completions;
                this.exploreSpeed = 1 / 25;
                this.fixedTraits = [{ type: Statics.TRAIT_MONSTROUS, level: 2 + challenge.completions * 2 }];
                break;
            case "Lazy Townsfolk":
                this.minGateRegion = 2 + challenge.completions;
                this.buildingsAllowed = false;
                break;
            case "Talentless":
                this.minGateRegion = 2 + challenge.completions;
                this.talentsEnabled = false;
                break;
            case "Mega Monsters":
                this.minGateRegion = 3 + challenge.completions;
                this.startingTraits = 4 + challenge.completions * 2;
                break;
            case "Outcast":
                this.productionMulti = 0.5 - (challenge.completions * 0.1);
                this.spendFriendship = true;
                this.friendshipToProduction = true;
                this.regionDifficultyIncrease = 40 + (5 * challenge.completions);
                break;
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
            cn: this.challengeName,
            st: this.startingTraits,
            ft: this.fixedTraits,
            pm: this.productionMulti,
            sf: this.spendFriendship,
            ftp: this.friendshipToProduction
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
        this.startingTraits = saveObj.st;
        this.fixedTraits = saveObj.ft;
        this.productionMulti = saveObj.pm ? saveObj.pm : 1;
        this.spendFriendship = saveObj.sf ? saveObj.sf : false;
        this.friendshipToProduction = saveObj.ftp ? saveObj.ftp : false;
    }
}