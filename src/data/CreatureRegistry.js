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
        defense: 0.95,
        accuracy: 1.3,
        armor: 1.5,
        health: 1,
        healthRegen: 1,
        damageMin: 1.27,
        damageMax: 1.3,
        hit: 1,
        evasion: 1.3
    },
    attackSpeed: 1100,
    critChance: 0.3,
    shadeBase: 19,
    rewardBase: 1.9,
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
        defense: 1.25,
        accuracy: 0.8,
        armor: 1.8,
        health: 1.2,
        healthRegen: 1,
        damageMin: 0.75,
        damageMax: 1.32,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1800,
    critChance: 0.14,
    shadeBase: 28,
    rewardBase: 2.4,
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
        armor: 1.75,
        health: 0.8,
        healthRegen: 1.3,
        damageMin: 1,
        damageMax: 1.12,
        hit: 1.2,
        evasion: 1
    },
    attackSpeed: 1350,
    critChance: 0.1,
    shadeBase: 19,
    rewardBase: 2.2,
    icon: { sprite: "enemyicons", tile: 3 }
};
creatureDefs['slime'] = {
    name: "Slime",
    scaleBlock:
    {
        strength: 0.875,
        dexterity: 1,
        agility: 1.2,
        endurance: 1,
        recovery: 1.2,
        defense: 0.95,
        accuracy: 0.8,
        armor: 1.25,
        health: 1,
        healthRegen: 2.3,
        damageMin: 1,
        damageMax: 1.1,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1300,
    critChance: 0.1,
    shadeBase: 16,
    rewardBase: 1.8,
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
        armor: 1.55,
        health: 1,
        healthRegen: 1.4,
        damageMin: 1.075,
        damageMax: 1.075,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1100,
    critChance: 0.17,
    shadeBase: 17,
    rewardBase: 2.2,
    icon: { sprite: "enemyicons", tile: 4 }
};
creatureDefs['goblin'] = {
    name: "Goblin",
    scaleBlock:
    {
        strength: 0.77,
        dexterity: 1.2,
        agility: 1.6,
        endurance: 0.8,
        recovery: 0.8,
        defense: 1,
        accuracy: 1.4,
        armor: 1.15,
        health: 1,
        healthRegen: 0.8,
        damageMin: 1.275,
        damageMax: 1.375,
        hit: 0.9,
        evasion: 1.2
    },
    attackSpeed: 1300,
    critChance: 0.4,
    shadeBase: 15,
    rewardBase: 1.7,
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
        defense: 1.15,
        accuracy: 1.1,
        armor: 2.9,
        health: 1,
        healthRegen: 1,
        damageMin: 1.15,
        damageMax: 1.15,
        hit: 1.1,
        evasion: 1.1
    },
    attackSpeed: 1400,
    critChance: 0.11,
    shadeBase: 27,
    rewardBase: 2.7,
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
        defense: 0.95,
        accuracy: 0.8,
        armor: 1.5,
        health: 1.5,
        healthRegen: 1.5,
        damageMin: 1.5,
        damageMax: 1.55,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 2400,
    critChance: 0.1,
    shadeBase: 35,
    rewardBase: 3.5,
    icon: { sprite: "enemyicons", tile: 6 }
};
creatureDefs['fish'] = {
    name: "Fish",
    scaleBlock:
    {
        strength: 0.94,
        dexterity: 1.1,
        agility: 1.4,
        endurance: 1,
        recovery: 0.8,
        defense: 1.25,
        accuracy: 1,
        armor: 1.4,
        health: 1,
        healthRegen: 1,
        damageMin: 1,
        damageMax: 1.1,
        hit: 1,
        evasion: 1.3
    },
    attackSpeed: 1200,
    critChance: 0.17,
    shadeBase: 19,
    rewardBase: 2,
    icon: { sprite: "enemyicons", tile: 7 }
};
creatureDefs['lizard'] = {
    name: "Lizard",
    scaleBlock:
    {
        strength: 1.54,
        dexterity: 1.4,
        agility: 0.7,
        endurance: 1.3,
        recovery: 0.6,
        defense: 1.45,
        accuracy: 1,
        armor: 1.95,
        health: 1.3,
        healthRegen: 1,
        damageMin: 1.1,
        damageMax: 1.1,
        hit: 1.1,
        evasion: 1.2
    },
    attackSpeed: 1700,
    critChance: 0.14,
    shadeBase: 33,
    rewardBase: 2.6,
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
        recovery: 1.3,
        defense: 1.1,
        accuracy: 0.9,
        armor: 2.7,
        health: 1.2,
        healthRegen: 1,
        damageMin: 1.2,
        damageMax: 1.25,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 2000,
    critChance: 0.19,
    shadeBase: 44,
    rewardBase: 3.7,
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['elk'] = {
    name: "Elk",
    scaleBlock:
    {
        strength: 1.15,
        dexterity: 1.5,
        agility: 1.2,
        endurance: 1.2,
        recovery: 0.7,
        defense: 1,
        accuracy: 0.5,
        armor: 1.65,
        health: 1.15,
        healthRegen: 1,
        damageMin: 1,
        damageMax: 1.15,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1600,
    critChance: 0.15,
    shadeBase: 22,
    rewardBase: 2,
    icon: { sprite: "enemyicons", tile: 1 }
};
creatureDefs['drake'] = {
    name: "Drake",
    scaleBlock:
    {
        strength: 1.45,
        dexterity: 1.1,
        agility: 1.1,
        endurance: 1.5,
        recovery: 1,
        defense: 1.55,
        accuracy: 1,
        armor: 2,
        health: 1,
        healthRegen: 1,
        damageMin: 1.2,
        damageMax: 1.3,
        hit: 1,
        evasion: 1.2
    },
    attackSpeed: 1850,
    critChance: 0.17,
    shadeBase: 39,
    rewardBase: 3.2,
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['cactus'] = {
    name: "Cactus",
    scaleBlock:
    {
        strength: 0.95,
        dexterity: 1.2,
        agility: 0.7,
        endurance: 0.9,
        recovery: 1.3,
        defense: 1.45,
        accuracy: 1,
        armor: 2.1,
        health: 1.2,
        healthRegen: 1.5,
        damageMin: 1,
        damageMax: 1.125,
        hit: 1,
        evasion: 0.9
    },
    attackSpeed: 1800,
    critChance: 0.31,
    shadeBase: 26,
    rewardBase: 2.1,
    icon: { sprite: "enemyicons", tile: 11 }
};
creatureDefs['moss'] = {
    name: "Moss",
    scaleBlock:
    {
        strength: 1.35,
        dexterity: 1.2,
        agility: 1,
        endurance: 1.2,
        recovery: 1.5,
        defense: 1.9,
        accuracy: 1,
        armor: 1.65,
        health: 1,
        healthRegen: 1.5,
        damageMin: 1.05,
        damageMax: 1.15,
        hit: 1,
        evasion: 0.9
    },
    attackSpeed: 1850,
    critChance: 0.21,
    shadeBase: 37,
    rewardBase: 3.5,
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['lion'] = {
    name: "Lion",
    scaleBlock:
    {
        strength: 1.425,
        dexterity: 0.9,
        agility: 1.4,
        endurance: 1.5,
        recovery: 1,
        defense: 1.25,
        accuracy: 1.4,
        armor: 1.5,
        health: 1.3,
        healthRegen: 0.9,
        damageMin: 1.25,
        damageMax: 1.45,
        hit: 1,
        evasion: 1.1
    },
    attackSpeed: 2300,
    critChance: 0.21,
    shadeBase: 37,
    rewardBase: 2.5,
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['gnoll'] = {
    name: "Gnoll",
    scaleBlock:
    {
        strength: 1.15,
        dexterity: 1.5,
        agility: 1.2,
        endurance: 1.1,
        recovery: 0.5,
        defense: 1.15,
        accuracy: 1.2,
        armor: 2.2,
        health: 1.1,
        healthRegen: 1,
        damageMin: 1.15,
        damageMax: 1.25,
        hit: 1,
        evasion: 1
    },
    attackSpeed: 1450,
    critChance: 0.1,
    shadeBase: 28,
    rewardBase: 2.7,
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
        defense: 1,
        accuracy: 1.6,
        armor: 1.45,
        health: 1.1,
        healthRegen: 1,
        damageMin: 1.15,
        damageMax: 1.2,
        hit: 1.1,
        evasion: 1
    },
    attackSpeed: 1300,
    critChance: 0.25,
    shadeBase: 28,
    rewardBase: 2.1,
    icon: { sprite: "enemyicons", tile: 9 }
};
creatureDefs['catfish'] = {
    name: "Catfish",
    scaleBlock:
    {
        strength: 1.25,
        dexterity: 1.1,
        agility: 1.7,
        endurance: 1,
        recovery: 1,
        defense: 1.25,
        accuracy: 1.3,
        armor: 1.3,
        health: 1,
        healthRegen: 1,
        damageMin: 0.95,
        damageMax: 1.175,
        hit: 1.2,
        evasion: 1
    },
    attackSpeed: 1250,
    critChance: 0.27,
    shadeBase: 26,
    rewardBase: 2.2,
    icon: { sprite: "enemyicons", tile: 9 }
};


export class CreatureRegistry {
    static GetCreatureByName(name, level) {
        var creature = new CreatureBlock();
        creature.setMonsterStats(creatureDefs[name].name, creatureDefs[name].scaleBlock, creatureDefs[name].attackSpeed,
            creatureDefs[name].critChance, level, creatureDefs[name].shadeBase, creatureDefs[name].rewardBase, creatureDefs[name].icon);
        return creature;
    }
}