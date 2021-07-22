import { StarData } from "./StarData";

export class RitualData {
    constructor() {
        if (!RitualData.instance) {
            this.ritualCosts = [100000, 100000, 100000, 100000, 100000, 100000, 50000, 10000];

            this.moonlightBonus = 1;
            this.starshardBonus = 1;
            this.nextMoonlightBonus = 1;
            this.nextStarshardBonus = 1;
            this.ritualPoints = 0;

            this.rituals = {
                // Permanent Bonuses
                permstr: {
                    name: "Empower Strength", level: 0, pos: [72, 216], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 8 }
                },
                permdex: {
                    name: "Empower Dexterity", level: 0, pos: [144, 216], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 9 }
                },
                permagi: {
                    name: "Empower Agility", level: 0, pos: [216, 216], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 10 }
                },
                permend: {
                    name: "Empower Endurance", level: 0, pos: [72, 288], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 11 }
                },
                permrec: {
                    name: "Empower Recovery", level: 0, pos: [72, 360], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 12 }
                },
                permdef: {
                    name: "Empower Defense", level: 0, pos: [216, 288], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 13 }
                },
                permacc: {
                    name: "Empower Accuracy", level: 0, pos: [216, 360], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 14 }
                },
                permvp: {
                    name: "Cult Infiltrators", level: 0, pos: [144, 360], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 7 }
                },
                permvh: {
                    name: "Cult Warders", level: 0, pos: [144, 432], moonlight: 0, starshards: 0,
                    texture: { sprite: "icons2", tile: 15 }
                },

                // Benefits for next run
                playeroffense: {
                    name: "Corrupted Strength", level: 0, pos: [336, 216], moonlight: -0.15, starshards: -0.05,
                    texture: { sprite: "icons2", tile: 20 }
                },
                playerdefense: {
                    name: "Corrupted Endurance", level: 0, pos: [408, 216], moonlight: -0.05, starshards: -0.15,
                    texture: { sprite: "icons2", tile: 21 }
                },
                playercrits: {
                    name: "Corrupted Accuracy", level: 0, pos: [480, 216], moonlight: -0.15, starshards: -0.05,
                    texture: { sprite: "icons2", tile: 19 }
                },
                wildgrowth: {
                    name: "Wild Growth", level: 0, pos: [336, 288], moonlight: -0.05, starshards: -0.15,
                    texture: { sprite: "icons2", tile: 23 }
                },
                hatchlings: {
                    name: "Hatchlings", level: 0, pos: [408, 288], moonlight: -0.1, starshards: -0.1,
                    texture: { sprite: "icons2", tile: 24 }
                },
                offerings: {
                    name: "Vile Offering", level: 0, pos: [480, 288], moonlight: -0.15, starshards: 0,
                    texture: { sprite: "icons2", tile: 6 }
                },
                culttowns: {
                    name: "Cult Towns", level: 0, pos: [408, 360], moonlight: -0.2, starshards: 0,
                    texture: { sprite: "icons2", tile: 22 }
                },

                // Difficulty increases
                ruinouspower: {
                    name: "Ruinous Powers", level: 0, pos: [624, 216], moonlight: 0.2, starshards: 0,
                    texture: { sprite: "icons2", tile: 25 }
                },
                betrayersgift: {
                    name: "Betrayer's Gift", level: 0, pos: [720, 216], moonlight: 0, starshards: 0.25,
                    texture: { sprite: "icons", tile: 42 }
                },
                callofthevoid: {
                    name: "Call of The Void", level: 0, pos: [600, 288], moonlight: 0.1, starshards: 0.15,
                    texture: { sprite: "enemyicons", tile: 19 }
                },
                desolation: {
                    name: "Desolation", level: 0, pos: [744, 288], moonlight: 0.15, starshards: 0.25,
                    texture: { sprite: "icons2", tile: 16 }
                },
                apathy: {
                    name: "Apathy", level: 0, pos: [624, 360], moonlight: 0.2, starshards: 0,
                    texture: { sprite: "icons2", tile: 26 }
                },
                vengeance: {
                    name: "Vengeance", level: 0, pos: [720, 360], moonlight: 0, starshards: 0.25,
                    texture: { sprite: "icons", tile: 45 }
                },

                // moonlight/star shard swapping
                stargod: {
                    name: "Ritual of the Star Queen", level: 0, pos: [672, 528], moonlight: -0.2, starshards: 0.25,
                    texture: { sprite: "icons2", tile: 18 }
                },
                betrayer: {
                    name: "Ritual of the Betrayer Star", level: 0, pos: [672, 600], moonlight: 0.1, starshards: -0.15,
                    texture: { sprite: "icons2", tile: 17 }
                },
            }

            this.activePerks = {}
            for (const prop in this.rituals) {
                this.activePerks[prop] = this.rituals[prop].level;
            }

            RitualData.instance = this;
        }

        return RitualData.instance;
    }

    static getInstance() {
        if (!RitualData.instance) {
            return new RitualData();
        }
        return RitualData.instance;
    }

    rebirth() {
        this.activePerks = {};
        this.moonlightBonus = this.nextMoonlightBonus;
        this.starshardBonus = this.nextStarshardBonus;
        this.nextMoonlightBonus = 1;
        this.nextStarshardBonus = 1;
        this.ritualPoints = 0;
        this.ritualCosts = [100000, 100000, 100000, 100000, 100000, 100000, 50000, 10000];

        for (const prop in this.rituals) {
            this.activePerks[prop] = this.rituals[prop].level;
            this.rituals[prop].level = 0;
        }
    }

    increaseSacCost(idx) {
        this.ritualPoints += 1;
        var multi = 10 - 0.5 * StarData.getInstance().perks.mysticism.level;
        this.ritualCosts[idx] = this.ritualCosts[idx] * multi;
    }

    // calculates moonlight/starshard changes for next run
    calculateModifiers() {
        this.nextMoonlightBonus = 1;
        this.nextStarshardBonus = 1;
        for (const prop in this.rituals) {
            var ritual = this.rituals[prop];
            if (ritual.level >= 1) {
                this.nextMoonlightBonus *= ritual.moonlight > 0 ? 1 + (ritual.moonlight * ritual.level) :
                    Math.pow(1 + ritual.moonlight, ritual.level);
                this.nextStarshardBonus *= ritual.starshards > 0 ? 1 + (ritual.starshards * ritual.level) :
                    Math.pow(1 + ritual.starshards, ritual.level);
            }
        }
    }

    save() {
        var rituals = [];
        for (const prop in this.rituals) {
            rituals.push([prop, this.rituals[prop].level]);
        }
        var active = [];
        for (const prop in this.activePerks) {
            active.push([prop, this.activePerks[prop]]);
        }
        var saveObj = {
            ml: this.moonlightBonus,
            ss: this.starshardBonus,
            nml: this.nextMoonlightBonus,
            nss: this.nextStarshardBonus,
            rp: this.ritualPoints,
            rc: this.ritualCosts,
            r: rituals,
            ap: active
        }

        return saveObj;
    }

    load(saveObj, __ver) {
        this.moonlightBonus = saveObj.ml;
        this.starshardBonus = saveObj.ss;
        this.nextMoonlightBonus = saveObj.nml;
        this.nextStarshardBonus = saveObj.nss;
        this.ritualPoints = saveObj.rp;
        this.ritualCosts = saveObj.rc;
        for (var i = 0; i < saveObj.r.length; i++) {
            if (this.rituals[saveObj.r[i][0]] !== undefined) {
                this.rituals[saveObj.r[i][0]].level = saveObj.r[i][1];
            }
        }
        for (var i = 0; i < saveObj.ap.length; i++) {
            if (this.activePerks[saveObj.ap[i][0]] !== undefined) {
                this.activePerks[saveObj.ap[i][0]] = saveObj.ap[i][1];
            }
        }
    }
}