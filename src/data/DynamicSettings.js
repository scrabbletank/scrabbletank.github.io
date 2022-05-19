import { StarData } from "./StarData";
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
            this.econMulti = 1;
            this.productionBuildingCost = 0;
            this.spendFriendship = false;
            this.friendshipToProduction = false;
            this.invasionTimer = Statics.DAYS_BETWEEN_INVASIONS;
            this.expandTimer = Statics.DAYS_BETWEEN_EXPANSION;
            this.invasionLevelBonus = 0;
            this.minResourceTier = 0 + StarData.getInstance().perks.worldsmith.level;

            // game settings
            this.openCombatOnExplore = true;
            this.autoExploreWeakestFirst = true;
            this.autoExploreRegions = true;
            this.autoTownUpgradeDefault = false;
            this.autoGearUpgrade = false;
            this.autoExplore = false;
            this.autoInvade = -1;
            this.autoExploreOptions = Statics.AUTOEXPLORE_WEAKEST;

            //programmatic settings
            this.saveEnabled = true;

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

    toggleAutoInvade() {
        this.autoInvade += 1;
        if (this.autoInvade > 3) {
            this.autoInvade = -1;
        }
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
        this.econMulti = 1;
        this.productionBuildingCost = 0;
        this.spendFriendship = false;
        this.friendshipToProduction = false;
        this.invasionTimer = Statics.DAYS_BETWEEN_INVASIONS;
        this.expandTimer = Statics.DAYS_BETWEEN_EXPANSION;
        this.invasionLevelBonus = 0;
        this.minResourceTier = 0 + StarData.getInstance().perks.worldsmith.level;

        this.saveEnabled = true;
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
            case "Invasion":
                this.minGateRegion = 0 + challenge.completions;
                this.invasionTimer = 5 - 1 * challenge.completions;
                this.expandTimer = 2 - 0.2 * challenge.completions;
                this.invasionLevelBonus = 5 + 5 * challenge.completions;
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
                this.minGateRegion = 4 + challenge.completions;
                this.startingTraits = 4 + challenge.completions * 2;
                break;
            case "Outcast":
                this.productionMulti = 0.5 - (challenge.completions * 0.1);
                this.spendFriendship = true;
                this.friendshipToProduction = true;
                this.regionDifficultyIncrease = 30 + (5 * challenge.completions);
                this.minGateRegion = 3 + challenge.completions;
                break;
            case "A Matter of Decades":
                this.minGateRegion = 9;
                this.maxRunTime = Statics.TIME_PER_YEAR * (10 - challenge.completions * 2);
                this.regionDifficultyIncrease = 25;
                break;
            case "Forged Ahead 2: Reforged":
                this.minGateRegion = 9;
                this.gearCostMulti = 1000;
                this.maxGearTier = 8 - challenge.completions;
                this.regionDifficultyIncrease = 25;
                break;
            case "Capitalism":
                this.minGateRegion = 9;
                this.productionBuildingCost = 250 + (challenge.completions * 250);
                this.regionDifficultyIncrease = 25;
                this.econMulti = 0.5;
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
            em: this.econMulti,
            pbc: this.productionBuildingCost,
            sf: this.spendFriendship,
            ftp: this.friendshipToProduction,
            it2: this.invasionTimer,
            et: this.expandTimer,
            ilb: this.invasionLevelBonus,
            sce: this.openCombatOnExplore,
            saeo: this.autoExploreOptions,
            mnrt: this.minResourceTier,
            aer: this.autoExploreRegions,
            atu: this.autoTownUpgradeDefault,
            agu: this.autoGearUpgrade,
            ae: this.autoExplore,
            ai2: this.autoInvade
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
        this.productionMulti = saveObj.pm !== undefined ? saveObj.pm : 1;
        this.spendFriendship = saveObj.sf !== undefined ? saveObj.sf : false;
        this.friendshipToProduction = saveObj.ftp !== undefined ? saveObj.ftp : false;
        this.invasionTimer = saveObj.it2 !== undefined ? saveObj.it2 : Statics.DAYS_BETWEEN_INVASIONS;
        this.expandTimer = saveObj.et !== undefined ? saveObj.et : Statics.DAYS_BETWEEN_EXPANSION;
        this.invasionLevelBonus = saveObj.ilb !== undefined ? saveObj.ilb : 0;
        this.invasionsIncreaseDifficulty = saveObj.iid !== undefined ? saveObj.iid : false;
        this.openCombatOnExplore = saveObj.sce !== undefined ? saveObj.sce : true;
        this.autoExploreOptions = saveObj.saeo !== undefined ? saveObj.saeo : Statics.AUTOEXPLORE_WEAKEST;
        this.minResourceTier = saveObj.mnrt !== undefined ? saveObj.mnrt : 0;
        this.productionBuildingCost = saveObj.pbc !== undefined ? saveObj.pbc : 0;
        this.autoExploreRegions = saveObj.aer !== undefined ? saveObj.aer : true;
        this.econMulti = saveObj.em !== undefined ? saveObj.em : 1;
        this.autoTownUpgradeDefault = saveObj.atu !== undefined ? saveObj.atu : false;
        this.autoGearUpgrade = saveObj.agu !== undefined ? saveObj.agu : false;
        this.autoExplore = saveObj.ae !== undefined ? saveObj.ae : false;
        this.autoInvade = saveObj.ai2 !== undefined ? saveObj.ai2 : false;
    }
}