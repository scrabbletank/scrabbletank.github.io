import { Statics } from "./Statics";

var RegionRegistry = {
    TILE_TYPES: {
        mountain: {
            name: "Mountains",
            enemies: ["wolf", "bear", "goblin", "formation"],
            clr: Phaser.Display.Color.GetColor(140, 110, 0),
            explorationNeeded: 35000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 1.25 },
                { type: Statics.RESOURCE_METAL, rate: 2.25 },
                { type: Statics.RESOURCE_STONE, rate: 1.5 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 1 }
            ]
        },
        drakemountain: {
            name: "Drake Mountains",
            enemies: ["wolf", "bear", "goblin", "formation", "drake"],
            clr: Phaser.Display.Color.GetColor(130, 30, 30),
            explorationNeeded: 28000,
            yields: [
                { type: Statics.RESOURCE_METAL, rate: 2.25 },
                { type: Statics.RESOURCE_STONE, rate: 2.25 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 1.5 }
            ]
        },
        forest: {
            name: "Forest",
            enemies: ["wolf", "bear", "plant", "bloom", "slime", "goblin"],
            clr: Phaser.Display.Color.GetColor(0, 160, 0),
            explorationNeeded: 16000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 1.75 },
                { type: Statics.RESOURCE_LEATHER, rate: 1.25 },
                { type: Statics.RESOURCE_FIBER, rate: 1.5 }
            ]
        },
        wode: {
            name: "Wode",
            enemies: ["wolf", "bear", "plant", "bloom", "slime", "elk"],
            clr: Phaser.Display.Color.GetColor(0, 130, 30),
            explorationNeeded: 20000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 2.25 },
                { type: Statics.RESOURCE_LEATHER, rate: 1 },
                { type: Statics.RESOURCE_FIBER, rate: 1.5 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 0.6 }
            ]
        },
        ancientforest: {
            name: "Ancient Forest",
            enemies: ["bear", "moss", "plant", "elk", "bloom"],
            clr: Phaser.Display.Color.GetColor(0, 90, 0),
            explorationNeeded: 24000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 2.5 },
                { type: Statics.RESOURCE_FIBER, rate: 1.25 },
                { type: Statics.RESOURCE_STONE, rate: 1 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 1 }
            ]
        },
        plains: {
            name: "Plains",
            enemies: ["slime", "goblin", "lizard", "bloom"],
            clr: Phaser.Display.Color.GetColor(20, 220, 20),
            explorationNeeded: 10000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 0.9 },
                { type: Statics.RESOURCE_LEATHER, rate: 2.5 },
                { type: Statics.RESOURCE_FIBER, rate: 1.25 },
                { type: Statics.RESOURCE_STONE, rate: 0.75 }
            ]
        },
        savanna: {
            name: "Savanna",
            enemies: ["gnoll", "lion", "coyote", "lizard", "bloom"],
            clr: Phaser.Display.Color.GetColor(190, 190, 60),
            explorationNeeded: 17500,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 0.75 },
                { type: Statics.RESOURCE_LEATHER, rate: 1.5 },
                { type: Statics.RESOURCE_FIBER, rate: 2 },
                { type: Statics.RESOURCE_STONE, rate: 1.25 }
            ]
        },
        desert: {
            name: "Desert",
            enemies: ["formation", "coyote", "slime", "cactus"],
            clr: Phaser.Display.Color.GetColor(220, 190, 140),
            explorationNeeded: 16000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 0.75 },
                { type: Statics.RESOURCE_STONE, rate: 1.75 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 2 }
            ]
        },
        hills: {
            name: "Hills",
            enemies: ["slime", "goblin", "lizard", "bloom", "formation"],
            clr: Phaser.Display.Color.GetColor(130, 190, 50),
            explorationNeeded: 14000,
            yields: [
                { type: Statics.RESOURCE_LEATHER, rate: 1 },
                { type: Statics.RESOURCE_STONE, rate: 2.75 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 0.75 }
            ]
        },
        plateau: {
            name: "Plateau",
            enemies: ["elk", "goblin", "lizard", "cactus", "wolf"],
            clr: Phaser.Display.Color.GetColor(200, 120, 40),
            explorationNeeded: 15000,
            yields: [
                { type: Statics.RESOURCE_LEATHER, rate: 3 },
                { type: Statics.RESOURCE_STONE, rate: 2 },
                { type: Statics.RESOURCE_FIBER, rate: 0.75 }
            ]
        },
        lake: {
            name: "Lake",
            enemies: ["whale", "slime", "bear", "fish"],
            clr: Phaser.Display.Color.GetColor(20, 40, 170),
            explorationNeeded: 30000,
            yields: []
        },
        oasis: {
            name: "Oasis",
            enemies: ["catfish", "fish", "coyote", "cactus"],
            clr: Phaser.Display.Color.GetColor(0, 140, 190),
            explorationNeeded: 21000,
            yields: []
        },
        swamp: {
            name: "Swamp",
            enemies: ["lizard", "slime", "goblin", "bloom"],
            clr: Phaser.Display.Color.GetColor(0, 110, 90),
            explorationNeeded: 25000,
            yields: [
                { type: Statics.RESOURCE_WOOD, rate: 1 },
                { type: Statics.RESOURCE_LEATHER, rate: 1.5 },
                { type: Statics.RESOURCE_FIBER, rate: 2.25 },
                { type: Statics.RESOURCE_CRYSTAL, rate: 0.7 }
            ]
        },
        town: {
            name: "Town",
            enemies: ["wolf"],
            clr: Phaser.Display.Color.GetColor(230, 230, 230),
            explorationNeeded: 10,
            yields: []
        },
        mysticgate: {
            name: "Mystic Gate",
            enemies: ["gateguardian"],
            clr: Phaser.Display.Color.GetColor(153, 50, 204),
            explorationNeeded: 30000,
            yields: []
        }
    },
    REGION_TYPES: {
        temperate: {
            name: "Temperate",
            points: [
                { terrain: "mountain", power: [7, 12], amount: 2 },
                { terrain: "mountain", power: [3, 7], amount: 3 },
                { terrain: "forest", power: [6, 11], amount: 2 },
                { terrain: "forest", power: [4, 9], amount: 1 },
                { terrain: "wode", power: [5, 10], amount: 2 },
                { terrain: "wode", power: [3, 8], amount: 2 },
                { terrain: "plains", power: [4, 9], amount: 5 },
                { terrain: "lake", power: [4, 9], amount: 3 },
                { terrain: "swamp", power: [3, 8], amount: 2 },
                { terrain: "swamp", power: [5, 10], amount: 1 },
                { terrain: "hills", power: [3, 8], amount: 5 }
            ]
        },
        // stone/metal
        mountains: {
            name: "Mountains",
            points: [
                { terrain: "mountain", power: [7, 12], amount: 3 },
                { terrain: "mountain", power: [3, 7], amount: 4 },
                { terrain: "forest", power: [4, 9], amount: 3 },
                { terrain: "wode", power: [5, 10], amount: 2 },
                { terrain: "wode", power: [3, 6], amount: 4 },
                { terrain: "plateau", power: [3, 7], amount: 4 },
                { terrain: "lake", power: [4, 9], amount: 3 },
                { terrain: "hills", power: [3, 8], amount: 4 },
                { terrain: "drakemountain", power: [5, 8], amount: 3 }
            ]
        },
        // crystal/stone
        desert: {
            name: "Desert",
            points: [
                { terrain: "mountain", power: [3, 6], amount: 4 },
                { terrain: "forest", power: [3, 5], amount: 4 },
                { terrain: "plateau", power: [3, 6], amount: 3 },
                { terrain: "oasis", power: [3, 5], amount: 3 },
                { terrain: "hills", power: [3, 6], amount: 3 },
                { terrain: "savanna", power: [3, 5], amount: 5 },
                { terrain: "desert", power: [7, 10], amount: 5 }
            ]
        },
        // wood/fiber
        forest: {
            name: "Forest",
            points: [
                { terrain: "mountain", power: [7, 12], amount: 2 },
                { terrain: "forest", power: [6, 9], amount: 4 },
                { terrain: "wode", power: [5, 8], amount: 3 },
                { terrain: "plains", power: [4, 6], amount: 2 },
                { terrain: "ancientforest", power: [5, 7], amount: 4 },
                { terrain: "lake", power: [8, 11], amount: 2 },
                { terrain: "swamp", power: [4, 9], amount: 3 },
                { terrain: "hills", power: [3, 8], amount: 2 }
            ]
        },
        //leather/fiber?
        hills: {
            name: "Hills",
            points: [
                { terrain: "mountain", power: [4, 7], amount: 1 },
                { terrain: "forest", power: [3, 6], amount: 3 },
                { terrain: "plateau", power: [3, 7], amount: 4 },
                { terrain: "plains", power: [4, 6], amount: 3 },
                { terrain: "lake", power: [6, 8], amount: 2 },
                { terrain: "savanna", power: [3, 5], amount: 3 },
                { terrain: "hills", power: [4, 7], amount: 3 }
            ]
        }
    }
};

export { RegionRegistry };