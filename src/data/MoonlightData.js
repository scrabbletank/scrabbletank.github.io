import { Statics } from "./Statics";

export class MoonlightData {
    constructor() {
        if (!MoonlightData.instance) {
            this.moonlight = 0;
            this.challengePoints = 0;

            this.moonperks = {
                str: {
                    name: "Moon's Strength", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                dex: {
                    name: "Moon's Dexterity", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 1 }
                },
                agi: {
                    name: "Moon's Agility", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 2 }
                },
                end: {
                    name: "Moon's Endurance", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 3 }
                },
                rec: {
                    name: "Moon's Recovery", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 4 }
                },
                def: {
                    name: "Moon's Defense", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 5 }
                },
                acc: {
                    name: "Moon's Accuracy", level: 0, maxLevel: -1, requires: [], cost: [7, 4, 1.05],
                    texture: { sprite: "moonicons", tile: 6 }
                },
                vault: {
                    name: "Hero's Vault", level: 0, maxLevel: -1, requires: [], cost: [60, 45, 1.3],
                    texture: { sprite: "moonicons", tile: 9 }
                },
                nightmarket: {
                    name: "Night Market", level: 0, maxLevel: -1, requires: [], cost: [50, 45, 1.35],
                    texture: { sprite: "moonicons", tile: 22 }
                },
                hardenedvillagers: {
                    name: "Hardened Villagers", level: 0, maxLevel: -1, requires: [], cost: [50, 50, 1.5],
                    texture: { sprite: "moonicons", tile: 11 }
                },
                shadow: {
                    name: "Shadow's Blessing", level: 0, maxLevel: -1, requires: [], cost: [10, 15, 1.2],
                    texture: { sprite: "moonicons", tile: 12 }
                },
                runes: {
                    name: "Moon Runes", level: 0, maxLevel: 1, requires: [], cost: [1000, 0, 0],
                    texture: { sprite: "moonicons", tile: 8 }
                },
                farstrider: {
                    name: "Farstrider", level: 0, maxLevel: -1, requires: [], cost: [35, 35, 1.25],
                    texture: { sprite: "moonicons", tile: 15 }
                },
                heartofdarkness: {
                    name: "Heart of Darkness", level: 0, maxLevel: -1, requires: [], cost: [100, 150, 1.35],
                    texture: { sprite: "moonicons", tile: 10 }
                },
                blackirongear: {
                    name: "Blackiron Gear", level: 0, maxLevel: -1, requires: ["heartofdarkness"], cost: [75, 100, 1.4],
                    texture: { sprite: "moonicons", tile: 10 }
                },
                runelands: {
                    name: "Runelands", level: 0, maxLevel: -1, requires: ["runes"], cost: [300, 150, 1.5],
                    texture: { sprite: "moonicons", tile: 8 }
                },
                moonlightworkers: {
                    name: "Moonlight Workers", level: 0, maxLevel: -1, requires: ["hardenedvillagers"], cost: [150, 150, 1.5],
                    texture: { sprite: "moonicons", tile: 19 }
                },
                heropouch: {
                    name: "Hero's Pouch", level: 0, maxLevel: -1, requires: ["vault"], cost: [70, 50, 1.3],
                    texture: { sprite: "moonicons", tile: 9 }
                },
                moonwine: {
                    name: "Moonwine", level: 0, maxLevel: 2, requires: ["nightmarket"], cost: [500, 500, 5],
                    texture: { sprite: "moonicons", tile: 14 }
                },
                metal: {
                    name: "Shadow's Metal", level: 0, maxLevel: -1, requires: ["str"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 26 }
                },
                leather: {
                    name: "Shadow's Leather", level: 0, maxLevel: -1, requires: ["dex"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 25 }
                },
                fiber: {
                    name: "Shadow's Fiber", level: 0, maxLevel: -1, requires: ["agi"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 27 }
                },
                stone: {
                    name: "Shadow's Stone", level: 0, maxLevel: -1, requires: ["end"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 28 }
                },
                wood: {
                    name: "Shadow's Wood", level: 0, maxLevel: -1, requires: ["rec"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 24 }
                },
                crystal: {
                    name: "Shadow's Crystal", level: 0, maxLevel: -1, requires: ["def"], cost: [25, 15, 1.125],
                    texture: { sprite: "moonicons", tile: 29 }
                },
                gold: {
                    name: "Shadow's Gold", level: 0, maxLevel: -1, requires: ["acc"], cost: [120, 75, 1.125],
                    texture: { sprite: "moonicons", tile: 30 }
                },
                motivatedlabor: {
                    name: "Motivated Labor", level: 0, maxLevel: -1, requires: ["moonlightworkers"], cost: [100, 75, 1.5],
                    texture: { sprite: "moonicons", tile: 17 }
                },
                shadow2: {
                    name: "Shadow's Chosen", level: 0, maxLevel: -1, requires: ["shadow"], cost: [75, 75, 1.25],
                    texture: { sprite: "moonicons", tile: 20 }
                },
                runes3: {
                    name: "Corrupted Runes", level: 0, maxLevel: -1, requires: ["runelands"], cost: [400, 200, 1.35],
                    texture: { sprite: "moonicons", tile: 8 }
                },
                soulbound: {
                    name: "Soulbound", level: 0, maxLevel: -1, requires: ["blackirongear"], cost: [400, 400, 1.5],
                    texture: { sprite: "moonicons", tile: 21 }
                },
                discovery: {
                    name: "Discovery", level: 0, maxLevel: -1, requires: ["farstrider"], cost: [100, 75, 1.3],
                    texture: { sprite: "moonicons", tile: 16 }
                },
                crownlands: {
                    name: "Crown Lands", level: 0, maxLevel: -1, requires: ["discovery"], cost: [60, 45, 1.3],
                    texture: { sprite: "moonicons", tile: 18 }
                },
                mysticcauldron: {
                    name: "Mystic Cauldron", level: 0, maxLevel: -1, requires: ["moonwine"], cost: [75, 60, 1.4],
                    texture: { sprite: "moonicons", tile: 23 }
                },
                shadow3: {
                    name: "Shadow's Harvest", level: 0, maxLevel: -1, requires: ["shadow2"], cost: [150, 100, 1.3],
                    texture: { sprite: "moonicons", tile: 31 }
                },
                strtrinket: {
                    name: "Shadow Wolf Charm", level: 0, maxLevel: 8, requires: ["metal"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                dextrinket: {
                    name: "Moonlight Circlet", level: 0, maxLevel: 8, requires: ["leather"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                agitrinket: {
                    name: "Moon Treads", level: 0, maxLevel: 8, requires: ["fiber"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                endtrinket: {
                    name: "Moonstone", level: 0, maxLevel: 8, requires: ["stone"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                rectrinket: {
                    name: "Dreamlight Bracer", level: 0, maxLevel: 8, requires: ["wood"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                deftrinket: {
                    name: "Shadow Veil", level: 0, maxLevel: 8, requires: ["crystal"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                acctrinket: {
                    name: "Nightmare Pendant", level: 0, maxLevel: 8, requires: ["gold"], cost: [100, 100, 2],
                    texture: { sprite: "moonicons", tile: 32 }
                },
                nightlabour: {
                    name: "Night Labour", level: 0, maxLevel: -1, requires: ["heropouch"], cost: [150, 100, 1.5],
                    texture: { sprite: "moonicons", tile: 9 }
                },
                devotion: {
                    name: "Devotion", level: 0, maxLevel: -1, requires: [], cost: [150, 75, 1.25],
                    texture: { sprite: "moonicons", tile: 34 }
                },
                ninja: {
                    name: "Ninjas", level: 0, maxLevel: -1, requires: ["devotion"], cost: [750, 500, 1.3],
                    texture: { sprite: "moonicons", tile: 35 }
                },
                urbanization: {
                    name: "Urbanization", level: 0, maxLevel: -1, requires: ["ninja"], cost: [10000, 7500, 4],
                    texture: { sprite: "moonicons", tile: 33 }
                }
            };

            this.challenges = {
                time: { name: "A Matter of Years", completions: 0, maxCompletions: 5, unlocked: true, fastestTime: 0 },
                forge: { name: "Forged Ahead", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                explore: { name: "Giant Lands", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                invasion: { name: "Invasion", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                buildings: { name: "Lazy Townsfolk", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                talent: { name: "Talentless", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                megamonsters: { name: "Mega Monsters", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                outcast: { name: "Outcast", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                time2: { name: "A Matter of Decades", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                forge2: { name: "Forged Ahead 2: Reforged", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
                capitalism: { name: "Capitalism", completions: 0, maxCompletions: 5, unlocked: false, fastestTime: 0 },
            };

            MoonlightData.instance = this;
        }

        return MoonlightData.instance;
    }

    static getInstance() {
        if (!MoonlightData.instance) {
            return new MoonlightData();
        }
        return MoonlightData.instance;
    }

    static getMoonlightEarned(statLvl, region) {
        return Math.floor(statLvl * Math.pow(Statics.MOONLIGHT_REGION_POWER, region));
    }

    getChallengeFromName(name) {
        switch (name) {
            case "A Matter of Years":
                return this.challenges.time;
            case "Forged Ahead":
                return this.challenges.forge;
            case "Giant Lands":
                return this.challenges.explore;
            case "Invasion":
                return this.challenges.invasion;
            case "Lazy Townsfolk":
                return this.challenges.buildings;
            case "Talentless":
                return this.challenges.talent;
            case "Mega Monsters":
                return this.challenges.megamonsters;
            case "Outcast":
                return this.challenges.outcast;
            case "A Matter of Decades":
                return this.challenges.time2;
            case "Forged Ahead 2: Reforged":
                return this.challenges.forge2;
            case "Capitalism":
                return this.challenges.capitalism;
        }
    }

    getShadowBonus() { return 1 + this.moonperks.shadow.level * 0.1; }
    getMoteSoftCap() { return Statics.MOTE_BASE_SOFT_CAP + this.moonperks.blackirongear.level * 40; }

    _haveMoonlightRequirements(perk) {
        for (var i = 0; i < perk.requires.length; i++) {
            if (this.moonperks[perk.requires[i]].level === 0) {
                return false;
            }
        }
        return true;
    }

    levelUpPerk(perk) {
        if (perk.level >= perk.maxLevel && perk.maxLevel !== -1) {
            return;
        }
        var cost = Math.floor((perk.cost[0] + perk.cost[1] * (perk.level)) * Math.pow(perk.cost[2], perk.level));
        if (this.moonlight < cost || this._haveMoonlightRequirements(perk) === false) {
            return;
        }
        this.moonlight -= cost;
        perk.level += 1;
    }

    save() {
        var perks = [];
        for (const prop in this.moonperks) {
            perks.push([prop, this.moonperks[prop].level]);
        }
        var challenge = [];
        for (const prop in this.challenges) {
            challenge.push([prop, this.challenges[prop].completions, this.challenges[prop].unlocked, this.challenges[prop].fastestTime]);
        }
        var saveObj = {
            ml: this.moonlight,
            mp: perks,
            cp: this.challengePoints,
            c: challenge
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.moonlight = saveObj.ml;
        for (var i = 0; i < saveObj.mp.length; i++) {
            if (this.moonperks[saveObj.mp[i][0]] !== undefined) {
                this.moonperks[saveObj.mp[i][0]].level = saveObj.mp[i][1];
            }
        }
        this.challengePoints = saveObj.cp;
        for (var i = 0; i < saveObj.c.length; i++) {
            this.challenges[saveObj.c[i][0]].completions = saveObj.c[i][1];
            this.challenges[saveObj.c[i][0]].unlocked = saveObj.c[i][2];
            this.challenges[saveObj.c[i][0]].fastestTime = saveObj.c[i][3];
        }
        if (this.challenges.time.completions > 0) {
            this.challenges.invasion.unlocked = true;
        }
    }
}