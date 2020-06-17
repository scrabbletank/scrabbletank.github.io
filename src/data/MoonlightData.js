import { Statics } from "./Statics";

export class MoonlightData {
    constructor() {
        if (!MoonlightData.instance) {
            this.moonlight = 0;

            this.moonperks = {
                str: {
                    name: "Moon's Strength", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                dex: {
                    name: "Moon's Dexterity", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 1 }
                },
                agi: {
                    name: "Moon's Agility", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 2 }
                },
                end: {
                    name: "Moon's Endurance", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 3 }
                },
                rec: {
                    name: "Moon's Recovery", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 4 }
                },
                def: {
                    name: "Moon's Defense", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 5 }
                },
                acc: {
                    name: "Moon's Accuracy", level: 0, maxLevel: -1, requires: [], cost: [10, 2, 1.025],
                    texture: { sprite: "moonicons", tile: 6 }
                },
                vault: {
                    name: "Hero's Vault", level: 0, maxLevel: -1, requires: [], cost: [60, 30, 1.25],
                    texture: { sprite: "moonicons", tile: 9 }
                },
                moonwine: {
                    name: "Moonwine", level: 0, maxLevel: 10, requires: [], cost: [50, 50, 1.5],
                    texture: { sprite: "moonicons", tile: 14 }
                },
                hardenedvillagers: {
                    name: "Hardened Villagers", level: 0, maxLevel: 5, requires: [], cost: [40, 25, 1.5],
                    texture: { sprite: "moonicons", tile: 11 }
                },
                shadow: {
                    name: "Shadow's Blessing", level: 0, maxLevel: -1, requires: [], cost: [10, 10, 1.125],
                    texture: { sprite: "moonicons", tile: 12 }
                },
                runes: {
                    name: "Moon Runes", level: 0, maxLevel: 1, requires: [], cost: [1000, 0, 0],
                    texture: { sprite: "moonicons", tile: 8 }
                },
                direbeasts: {
                    name: "Dire Beasts", level: 0, maxLevel: 1, requires: [], cost: [250, 0, 0],
                    texture: { sprite: "moonicons", tile: 13 }
                },
                heartofdarkness: {
                    name: "Heart of Darkness", level: 0, maxLevel: -1, requires: [], cost: [100, 100, 1.25],
                    texture: { sprite: "moonicons", tile: 10 }
                },
                blackirongear: {
                    name: "Blackiron Gear", level: 0, maxLevel: -1, requires: ["heartofdarkness"], cost: [30, 100, 1.25],
                    texture: { sprite: "moonicons", tile: 10 }
                },
                runelands: {
                    name: "Runelands", level: 0, maxLevel: -1, requires: ["runes"], cost: [500, 0, 1.5],
                    texture: { sprite: "moonicons", tile: 8 }
                },
                moonlightworkers: {
                    name: "Moonlight Workers", level: 0, maxLevel: -1, requires: ["hardenedvillagers"], cost: [100, 100, 1.2],
                    texture: { sprite: "moonicons", tile: 11 }
                },
                heropouch: {
                    name: "Hero's Pouch", level: 0, maxLevel: -1, requires: ["vault"], cost: [35, 45, 1.05],
                    texture: { sprite: "moonicons", tile: 9 }
                },
            }

            MoonlightData.instance = this;
        }

        return MoonlightData.instance;
    }

    static getMoonlightEarned(statLvl, region) {
        return Math.floor(statLvl * Math.pow(Statics.MOONLIGHT_REGION_POWER, region));
    }

    save() {
        var saveObj = {
            ml: this.moonlight,
            mp: this.moonperks
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.moonlight = saveObj.ml;
        this.moonperks = saveObj.mp;
    }
}