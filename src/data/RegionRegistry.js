import { Common } from "../utils/Common";
import { Statics } from "./Statics";

var RegionRegistry = {
    TILE_TYPES: {
        mountain: {
            name: "Mountains",
            enemies: ["wolf", "bear", "goblin", "formation"],
            clr: [140, 110, 0],
            explorationNeeded: 25000,
            yields: [1.25, 0, 2.25, 0, 1.5, 1],
            preferredBuilding: "metal"
        },
        drakemountain: {
            name: "Drake Mountains",
            enemies: ["wolf", "bear", "goblin", "formation", "drake"],
            clr: [130, 30, 30],
            explorationNeeded: 27500,
            yields: [0, 0, 2.25, 0, 2.25, 1.5],
            preferredBuilding: "metal"
        },
        forest: {
            name: "Forest",
            enemies: ["wolf", "bear", "plant", "bloom", "slime", "goblin"],
            clr: [0, 160, 0],
            explorationNeeded: 13000,
            yields: [1.75, 1.25, 0, 1.5, 0, 0],
            preferredBuilding: "wood"
        },
        wode: {
            name: "Wode",
            enemies: ["wolf", "bear", "plant", "bloom", "slime", "elk"],
            clr: [0, 130, 30],
            explorationNeeded: 16000,
            yields: [2.25, 1, 0, 1.5, 0, 0.6],
            preferredBuilding: "wood"
        },
        ancientforest: {
            name: "Ancient Forest",
            enemies: ["bear", "moss", "plant", "elk", "bloom"],
            clr: [0, 90, 0],
            explorationNeeded: 20000,
            yields: [2.5, 0, 0, 1.25, 1, 1],
            preferredBuilding: "wood"
        },
        plains: {
            name: "Plains",
            enemies: ["slime", "goblin", "lizard", "bloom"],
            clr: [20, 220, 20],
            explorationNeeded: 9000,
            yields: [0.9, 2.5, 0, 1.25, 0.75, 0],
            preferredBuilding: "leather"
        },
        savanna: {
            name: "Savanna",
            enemies: ["gnoll", "lion", "coyote", "lizard", "bloom"],
            clr: [190, 190, 60],
            explorationNeeded: 13000,
            yields: [0.75, 1.5, 0, 2, 1.25, 0],
            preferredBuilding: "fiber"
        },
        desert: {
            name: "Desert",
            enemies: ["formation", "coyote", "slime", "cactus"],
            clr: [220, 190, 140],
            explorationNeeded: 12000,
            yields: [0.75, 0, 0, 0, 1.75, 2],
            preferredBuilding: "crystal"
        },
        hills: {
            name: "Hills",
            enemies: ["slime", "goblin", "lizard", "bloom", "formation"],
            clr: [130, 190, 50],
            explorationNeeded: 11000,
            yields: [0, 1, 0, 0, 2.75, 0.75],
            preferredBuilding: "stone"
        },
        plateau: {
            name: "Plateau",
            enemies: ["elk", "goblin", "lizard", "cactus", "wolf"],
            clr: [200, 120, 40],
            explorationNeeded: 15000,
            yields: [0, 3, 0, 0.75, 2, 0],
            preferredBuilding: "leather"
        },
        lake: {
            name: "Lake",
            enemies: ["whale", "slime", "bear", "fish"],
            clr: [20, 40, 170],
            explorationNeeded: 19000,
            yields: [0, 0, 0, 0, 0, 0],
            preferredBuilding: "metal"
        },
        oasis: {
            name: "Oasis",
            enemies: ["catfish", "fish", "coyote", "cactus"],
            clr: [0, 140, 190],
            explorationNeeded: 15000,
            yields: [0, 0, 0, 0, 0, 0],
            preferredBuilding: "metal"
        },
        swamp: {
            name: "Swamp",
            enemies: ["lizard", "slime", "goblin", "bloom"],
            clr: [0, 110, 90],
            explorationNeeded: 19000,
            yields: [1, 1.5, 0, 2.25, 0, 0.7],
            preferredBuilding: "fiber"
        },
        town: {
            name: "Town",
            enemies: ["wolf"],
            clr: [230, 230, 230],
            explorationNeeded: 10,
            yields: [0, 0, 0, 0, 0, 0],
            preferredBuilding: "metal"
        },
        mysticgate: {
            name: "Mystic Gate",
            enemies: ["gateguardian"],
            clr: [153, 50, 204],
            explorationNeeded: 30000,
            yields: [0, 0, 0, 0, 0, 0],
            preferredBuilding: "metal"
        },
        crypt: {
            name: "Ancient Crypt",
            enemies: ["lizard", "goblin", "slime", "drake"],
            clr: [255, 225, 90],
            explorationNeeded: 30000,
            yields: [0, 0, 0, 0, 0, 0],
            preferredBuilding: "metal"
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