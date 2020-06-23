import { Statics } from './Statics';
import { CreatureBlock } from './CreatureBlock';


var creatureDefs = {}

creatureDefs['wolf'] = {
    name: "Wolf",
    scaleBlock:
    {
        strength: 0.85,
        dexterity: 1.3,
        agility: 1,
        endurance: 0.7,
        recovery: 1,
        defense: 0.8,
        accuracy: 1.3,
        armor: 1.4,
        health: 1,
        healthRegen: 1,
        damageMin: 1.3,
        damageMax: 1.33,
        hit: 1,
        evasion: 1.3
    },
    attackSpeed: 1100,
    critChance: 0.3,
    shadeBase: 18,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 1 },
        { type: Statics.RESOURCE_LEATHER, amount: 1.3 },
        { type: Statics.RESOURCE_FIBER, amount: 0.6 }
    ],
    icon: { sprite: "enemyicons", tile: 2 }
};
creatureDefs['bear'] = {
    name: "Bear",
    scaleBlock:
    {
        strength: 1.3,
        dexterity: 0.8,
        agility: 0.8,
        endurance: 1.4,
        recovery: 1.2,
        defense: 1,
        accuracy: 0.8,
        armor: 1.7,
        health: 1.2,
        healthRegen: 1,
        damageMin: 0.9,
        damageMax: 1.35,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1800,
    critChance: 0.14,
    shadeBase: 26,
    rewards: [
        { type: Statics.RESOURCE_METAL, amount: 0.9 },
        { type: Statics.RESOURCE_FIBER, amount: 1.1 },
        { type: Statics.RESOURCE_STONE, amount: 1.8 }
    ],
    icon: { sprite: "enemyicons", tile: 5 }
};
creatureDefs['plant'] = {
    name: "Plant",
    scaleBlock:
    {
        strength: 0.85,
        dexterity: 1.2,
        agility: 1.2,
        endurance: 1.2,
        recovery: 1,
        defense: 1,
        accuracy: 1,
        armor: 1.5,
        health: 0.8,
        healthRegen: 1.3,
        damageMin: 1,
        damageMax: 1.125,
        hit: 1.2,
        evasion: 1
    },
    attackSpeed: 1350,
    critChance: 0.1,
    shadeBase: 18,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 1.8 },
        { type: Statics.RESOURCE_FIBER, amount: 1 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 0.5 }
    ],
    icon: { sprite: "enemyicons", tile: 3 }
};
creatureDefs['slime'] = {
    name: "Slime",
    scaleBlock:
    {
        strength: 0.825,
        dexterity: 1,
        agility: 1.2,
        endurance: 1,
        recovery: 1.2,
        defense: 0.8,
        accuracy: 0.8,
        armor: 1.2,
        health: 1,
        healthRegen: 2.3,
        damageMin: 1,
        damageMax: 1.05,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1200,
    critChance: 0.1,
    shadeBase: 15,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 1 },
        { type: Statics.RESOURCE_METAL, amount: 1.2 },
        { type: Statics.RESOURCE_STONE, amount: 0.8 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 1.4 }
    ],
    icon: { sprite: "enemyicons", tile: 0 }
};
creatureDefs['bloom'] = {
    name: "Bloom",
    scaleBlock:
    {
        strength: 1,
        dexterity: 1.4,
        agility: 0.6,
        endurance: 1,
        recovery: 1.2,
        defense: 1,
        accuracy: 0.6,
        armor: 1.4,
        health: 1,
        healthRegen: 1.4,
        damageMin: 1.1,
        damageMax: 1.1,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1100,
    critChance: 0.17,
    shadeBase: 16,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 0.8 },
        { type: Statics.RESOURCE_LEATHER, amount: 0.8 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 }
    ],
    icon: { sprite: "enemyicons", tile: 4 }
};
creatureDefs['goblin'] = {
    name: "Goblin",
    scaleBlock:
    {
        strength: 0.72,
        dexterity: 1.2,
        agility: 1.6,
        endurance: 0.8,
        recovery: 0.8,
        defense: 1,
        accuracy: 1.4,
        armor: 1,
        health: 1,
        healthRegen: 0.8,
        damageMin: 1.3,
        damageMax: 1.4,
        hit: 0.9,
        evasion: 1.2
    },
    attackSpeed: 1200,
    critChance: 0.4,
    shadeBase: 14,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 1.2 },
        { type: Statics.RESOURCE_METAL, amount: 1.4 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 0.6 }
    ],
    icon: { sprite: "enemyicons", tile: 12 }
};
creatureDefs['formation'] = {
    name: "Formation",
    scaleBlock:
    {
        strength: 1.1,
        dexterity: 1.1,
        agility: 0.8,
        endurance: 1.1,
        recovery: 1.1,
        defense: 1.1,
        accuracy: 1.1,
        armor: 2.5,
        health: 1,
        healthRegen: 1,
        damageMin: 1.1,
        damageMax: 1.1,
        hit: 1.1,
        evasion: 1.1
    },
    attackSpeed: 1300,
    critChance: 0.11,
    shadeBase: 24,
    rewards: [
        { type: Statics.RESOURCE_METAL, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1.8 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 2.2 }
    ],
    icon: { sprite: "enemyicons", tile: 10 }
};
creatureDefs['whale'] = {
    name: "Whale",
    scaleBlock:
    {
        strength: 1.5,
        dexterity: 0.85,
        agility: 0.55,
        endurance: 1.5,
        recovery: 1.5,
        defense: 0.8,
        accuracy: 0.8,
        armor: 1.4,
        health: 1.5,
        healthRegen: 1.5,
        damageMin: 1.5,
        damageMax: 1.55,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 2300,
    critChance: 0.1,
    shadeBase: 32,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 2.4 },
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_METAL, amount: 1.4 }
    ],
    icon: { sprite: "enemyicons", tile: 6 }
};
creatureDefs['fish'] = {
    name: "Fish",
    scaleBlock:
    {
        strength: 0.9,
        dexterity: 1.1,
        agility: 1.4,
        endurance: 1,
        recovery: 0.8,
        defense: 1.2,
        accuracy: 1,
        armor: 1.3,
        health: 1,
        healthRegen: 1,
        damageMin: 1,
        damageMax: 1.1,
        hit: 1,
        evasion: 1.3
    },
    attackSpeed: 1100,
    critChance: 0.17,
    shadeBase: 18,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 1.4 },
        { type: Statics.RESOURCE_FIBER, amount: 1.1 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 0.8 }
    ],
    icon: { sprite: "enemyicons", tile: 7 }
};
creatureDefs['lizard'] = {
    name: "Lizard",
    scaleBlock:
    {
        strength: 1.5,
        dexterity: 1.4,
        agility: 0.7,
        endurance: 1.3,
        recovery: 0.6,
        defense: 1.4,
        accuracy: 1,
        armor: 1.8,
        health: 1.3,
        healthRegen: 1,
        damageMin: 1.15,
        damageMax: 1.15,
        hit: 1.1,
        evasion: 1.2
    },
    attackSpeed: 1600,
    critChance: 0.14,
    shadeBase: 28,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 13 }
};
creatureDefs['gateguardian'] = {
    name: "Gate Guardian",
    scaleBlock:
    {
        strength: 1.65,
        dexterity: 1.1,
        agility: 0.8,
        endurance: 1.5,
        recovery: 1.5,
        defense: 1,
        accuracy: 0.6,
        armor: 2.5,
        health: 1.2,
        healthRegen: 1,
        damageMin: 1.2,
        damageMax: 1.3,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1900,
    critChance: 0.19,
    shadeBase: 40,
    rewards: [
        { type: Statics.RESOURCE_WOOD, amount: 1 },
        { type: Statics.RESOURCE_LEATHER, amount: 1 },
        { type: Statics.RESOURCE_METAL, amount: 1 },
        { type: Statics.RESOURCE_FIBER, amount: 1 },
        { type: Statics.RESOURCE_STONE, amount: 1 },
        { type: Statics.RESOURCE_CRYSTAL, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['elk'] = {
    name: "Elk",
    scaleBlock:
    {
        strength: 1.1,
        dexterity: 1.5,
        agility: 1.2,
        endurance: 1.2,
        recovery: 0.7,
        defense: 1,
        accuracy: 0.5,
        armor: 1.5,
        health: 1.15,
        healthRegen: 1,
        damageMin: 1,
        damageMax: 1.2,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1500,
    critChance: 0.15,
    shadeBase: 20,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 1 }
};
creatureDefs['drake'] = {
    name: "Drake",
    scaleBlock:
    {
        strength: 1.4,
        dexterity: 1.1,
        agility: 1.1,
        endurance: 1.5,
        recovery: 1,
        defense: 1.5,
        accuracy: 1,
        armor: 1.8,
        health: 1,
        healthRegen: 1,
        damageMin: 1.25,
        damageMax: 1.35,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1750,
    critChance: 0.17,
    shadeBase: 36,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['cactus'] = {
    name: "Cactus",
    scaleBlock:
    {
        strength: 0.9,
        dexterity: 1.2,
        agility: 0.7,
        endurance: 0.9,
        recovery: 1.3,
        defense: 1.3,
        accuracy: 1,
        armor: 1.9,
        health: 1.2,
        healthRegen: 1.5,
        damageMin: 0.9,
        damageMax: 1.05,
        hit: 1,
        evasion: 0.9
    },
    attackSpeed: 1400,
    critChance: 0.31,
    shadeBase: 24,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 11 }
};
creatureDefs['moss'] = {
    name: "Moss",
    scaleBlock:
    {
        strength: 1.3,
        dexterity: 1.2,
        agility: 1,
        endurance: 1.2,
        recovery: 1.5,
        defense: 1.8,
        accuracy: 1,
        armor: 1.5,
        health: 1,
        healthRegen: 1.5,
        damageMin: 1.1,
        damageMax: 1.2,
        hit: 1,
        evasion: 0.9
    },
    attackSpeed: 1750,
    critChance: 0.21,
    shadeBase: 34,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['lion'] = {
    name: "Lion",
    scaleBlock:
    {
        strength: 1.4,
        dexterity: 0.9,
        agility: 1.4,
        endurance: 1.5,
        recovery: 1,
        defense: 1.1,
        accuracy: 1.4,
        armor: 1.4,
        health: 1.3,
        healthRegen: 0.9,
        damageMin: 1.3,
        damageMax: 1.5,
        hit: 1,
        evasion: 1.1
    },
    attackSpeed: 2200,
    critChance: 0.21,
    shadeBase: 34,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['gnoll'] = {
    name: "Gnoll",
    scaleBlock:
    {
        strength: 1.1,
        dexterity: 1.5,
        agility: 1.2,
        endurance: 1.1,
        recovery: 0.5,
        defense: 1,
        accuracy: 1.2,
        armor: 2,
        health: 1.1,
        healthRegen: 1,
        damageMin: 1.2,
        damageMax: 1.3,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1300,
    critChance: 0.1,
    shadeBase: 26,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['coyote'] = {
    name: "Coyote",
    scaleBlock:
    {
        strength: 1,
        dexterity: 1.5,
        agility: 1.4,
        endurance: 1,
        recovery: 1,
        defense: 0.8,
        accuracy: 1.6,
        armor: 1.3,
        health: 1.1,
        healthRegen: 1,
        damageMin: 1.15,
        damageMax: 1.2,
        hit: 1.1,
        evasion: 1
    },
    attackSpeed: 1200,
    critChance: 0.25,
    shadeBase: 26,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['catfish'] = {
    name: "Catfish",
    scaleBlock:
    {
        strength: 1.2,
        dexterity: 1.1,
        agility: 1.7,
        endurance: 1,
        recovery: 1,
        defense: 1.2,
        accuracy: 1.3,
        armor: 1.2,
        health: 1,
        healthRegen: 1,
        damageMin: 0.95,
        damageMax: 1.2,
        hit: 1.2,
        evasion: 1
    },
    attackSpeed: 1150,
    critChance: 0.27,
    shadeBase: 24,
    rewards: [
        { type: Statics.RESOURCE_LEATHER, amount: 2 },
        { type: Statics.RESOURCE_FIBER, amount: 1.6 },
        { type: Statics.RESOURCE_STONE, amount: 1 }
    ],
    icon: { sprite: "enemyicons", tile: 9 }
};


export class CreatureRegistry {
    static GetCreatureByName(name, level) {
        var creature = new CreatureBlock();
        creature.setMonsterStats(creatureDefs[name].name, creatureDefs[name].scaleBlock, creatureDefs[name].attackSpeed,
            creatureDefs[name].critChance, level, creatureDefs[name].shadeBase, creatureDefs[name].rewards, creatureDefs[name].icon);
        return creature;
    }
}