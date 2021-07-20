export class StarData {
    constructor() {
        if (!StarData.instance) {
            this.starShards = 0;

            this.perks = {
                // Astra's Marble: Stat bonus
                str: {
                    name: "Astra's Marble: Strength", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 0 }
                },
                dex: {
                    name: "Astra's Marble: Dexterity", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 1 }
                },
                agi: {
                    name: "Astra's Marble: Agility", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 2 }
                },
                end: {
                    name: "Astra's Marble: Endurance", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 3 }
                },
                rec: {
                    name: "Astra's Marble: Recovery", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 4 }
                },
                def: {
                    name: "Astra's Marble: Defense", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 5 }
                },
                acc: {
                    name: "Astra's Marble: Accuracy", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.03],
                    texture: { sprite: "staricons", tile: 6 }
                },

                // Ingram's Bell: stat costs
                statcost: {
                    name: "Ingram's Bell: Infusion", level: 0, maxLevel: 10, requires: [], cost: [3, 3, 1],
                    texture: { sprite: "staricons", tile: 9 }
                },
                statpoints: {
                    name: "Ingram's Bell: Stat Points", level: 0, maxLevel: -1, requires: ["statcost"], cost: [5, 5, 2],
                    texture: { sprite: "staricons", tile: 9 }
                },
                bounty: { // increases resource drops
                    name: "Ingram's Bell: Bounty", level: 0, maxLevel: -1, requires: ["statcost"], cost: [2, 2, 1.15],
                    texture: { sprite: "staricons", tile: 9 }
                },

                // Myrah's Spear: item powers?
                forge: {
                    name: "Myrah's Spear: Forge", level: 0, maxLevel: 15, requires: [], cost: [2, 2, 1],
                    texture: { sprite: "staricons", tile: 10 }
                },
                proficiency: { // gear scaling multiplied by x%
                    name: "Myrah's Spear: Proficiency", level: 0, maxLevel: -1, requires: ["forge"], cost: [7, 7, 1.5],
                    texture: { sprite: "staricons", tile: 10 }
                },
                stellar: { // % bonus to gear
                    name: "Myrah's Spear: Stellar Enchantments", level: 0, maxLevel: -1, requires: ["forge"], cost: [10, 10, 1.66],
                    texture: { sprite: "staricons", tile: 10 }
                },
                starmetal: { // once forged, gear starts at x level
                    name: "Myrah's Spear: Starmetal", level: 0, maxLevel: 10, requires: ["forge"], cost: [5, 5, 1],
                    texture: { sprite: "staricons", tile: 10 }
                },

                // Mask of Zymesh: invasions/ motes
                invasionpower: {
                    name: "Mask of Zymesh: Invasion Power", level: 0, maxLevel: -1, requires: [], cost: [3, 3, 1.66],
                    texture: { sprite: "staricons", tile: 11 }
                },
                invasionrewards: {
                    name: "Mask of Zymesh: Invasion Rewards", level: 0, maxLevel: -1, requires: ["invasionpower"], cost: [5, 5, 1.66],
                    texture: { sprite: "staricons", tile: 11 }
                },
                solidification: {
                    name: "Mask of Zymesh: Solidification", level: 0, maxLevel: -1, requires: ["invasionpower"], cost: [7, 7, 2],
                    texture: { sprite: "staricons", tile: 11 }
                },

                // Kella's Horn: prod/resource upgrades
                construction: { // unlocks tier 4
                    name: "Kella's Horn: Construction", level: 0, maxLevel: 2, requires: [], cost: [25, 0, 100],
                    texture: { sprite: "staricons", tile: 8 }
                },
                fertility: { // town growth speed
                    name: "Kella's Horn: Fertility", level: 0, maxLevel: 12, requires: ["construction"], cost: [5, 5, 1],
                    texture: { sprite: "staricons", tile: 8 }
                },
                tools: { // prod increased by x%
                    name: "Kella's Horn: Enchanted Tools", level: 0, maxLevel: -1, requires: ["fertility"], cost: [5, 5, 1.15],
                    texture: { sprite: "staricons", tile: 8 }
                },
                worldsmith: { // increases base resource tier by 1
                    name: "Kella's Horn: Worldsmith", level: 0, maxLevel: 7, requires: ["tools"], cost: [20, 20, 1],
                    texture: { sprite: "staricons", tile: 8 }
                },
                estate: { // house multi
                    name: "Kella's Horn: Estate", level: 0, maxLevel: -1, requires: ["worldsmith"], cost: [15, 5, 2],
                    texture: { sprite: "staricons", tile: 8 }
                },

                // Betrayer Star: ritual/shade/moonlight upgrades
                mists: { // increase shade
                    name: "Betrayer Star: Mists", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.12],
                    texture: { sprite: "staricons", tile: 12 }
                },
                knowledge: { // talents give +x base moonlight
                    name: "Betrayer Star: Forbidden Knowledge", level: 0, maxLevel: -1, requires: [], cost: [20, 10, 1.5],
                    texture: { sprite: "staricons", tile: 12 }
                },
                mysticism: { // ritual cost reduction
                    name: "Betrayer Star: Mysticism", level: 0, maxLevel: 16, requires: [], cost: [25, 25, 1],
                    texture: { sprite: "staricons", tile: 12 }
                },
            }
            StarData.instance = this;
        }

        return StarData.instance;
    }

    static getInstance() {
        if (!StarData.instance) {
            return new StarData();
        }
        return StarData.instance;
    }

    _havePerkRequirements(perk) {
        for (var i = 0; i < perk.requires.length; i++) {
            if (this.perks[perk.requires[i]].level === 0) {
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
        if (this.starShards < cost || this._havePerkRequirements(perk) === false) {
            return;
        }
        this.starShards -= cost;
        perk.level += 1;
    }

    save() {
        var perks = [];
        for (const prop in this.perks) {
            perks.push([prop, this.perks[prop].level]);
        }
        var saveObj = {
            ss: this.starShards,
            sp: perks,
        }

        return saveObj;
    }

    load(saveObj, __ver) {
        this.starShards = saveObj.ss;
        for (var i = 0; i < saveObj.sp.length; i++) {
            if (this.perks[saveObj.sp[i][0]] !== undefined) {
                this.perks[saveObj.sp[i][0]].level = saveObj.sp[i][1];
            }
        }
    }
}