export class StarData {
    constructor() {
        if (!StarData.instance) {
            this.starShards = 0;

            this.starperks = {
                // Astra's Marble: Stat bonus
                str: {
                    name: "Astra's Marble: Strength", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                dex: {
                    name: "Astra's Marble: Dexterity", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                agi: {
                    name: "Astra's Marble: Agility", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                end: {
                    name: "Astra's Marble: Endurance", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                rec: {
                    name: "Astra's Marble: Recovery", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                def: {
                    name: "Astra's Marble: Defense", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: {
                    name: "Astra's Marble: Accuracy", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },

                // Ingram's Bell: stat costs
                statcost: {
                    name: "Ingram's Bell: Infusion", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                statpoints: {
                    name: "Ingram's Bell: Stat Points", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                bounty: { // increases resource drops
                    name: "Ingram's Bell: Bounty", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },

                // Myrah's Spear: item powers?
                acc: {
                    name: "Myrah's Spear: Forge", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // % bonus to gear
                    name: "Myrah's Spear: Stellar Enchantments", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // gear scaling multiplied by x%
                    name: "Myrah's Spear: Proficiency", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // once forged, gear starts at x level
                    name: "Myrah's Spear: Proficiency", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },

                // Mask of Zymesh: invasions/ motes
                acc: {
                    name: "Mask of Zymesh: Invasion Power", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: {
                    name: "Mask of Zymesh: Invasion Rewards", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: {
                    name: "Mask of Zymesh: Invasion Power", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },

                // Kella's Horn: prod/resource upgrades
                acc: { // unlocks tier 4
                    name: "Kella's Horn: Construction", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // increases base resource tier by 1
                    name: "Kella's Horn: Worldsmith", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // prod increased by x%
                    name: "Kella's Horn: Worldsmith", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // house multi
                    name: "Kella's Horn: Estate", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },

                // Betrayer Star: ritual/shade/moonlight upgrades
                acc: { // increase shade
                    name: "Betrayer Star: Mists", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // talents give +x base moonlight
                    name: "Betrayer Star: Knowledge", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
                },
                acc: { // ritual cost reduction
                    name: "Betrayer Star: Mysticism", level: 0, maxLevel: -1, requires: [], cost: [1, 1, 1.1],
                    texture: { sprite: "moonicons", tile: 0 }
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
}