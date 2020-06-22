var Statics = {
    VERSION_NUMBER: 5,

    //UNLOCK FEATURE TYPES
    UNLOCK_GEAR_TAB: 100,
    UNLOCK_EXPLORE_TAB: 101,
    UNLOCK_COMBAT_TAB: 102,
    UNLOCK_TOWN_TAB: 103,
    UNLOCK_INFUSE_UI: 104,
    UNLOCK_RESOURCE_UI: 105,
    UNLOCK_CRAFTING_UI: 106,
    UNLOCK_BUILDING_UI: 107,
    UNLOCK_TALENTS_TAB: 108,
    UNLOCK_WORLD_TAB: 109,
    UNLOCK_MOTES_UI: 110,

    //UNLOCK EVENT TYPES
    UNLOCK_EXPLORE: 0,
    UNLOCK_KILL: 1,
    UNLOCK_SHADE: 2,
    UNLOCK_RESOURCE: 3,
    UNLOCK_STATPOINT: 4,
    UNLOCK_DEATH: 5,
    UNLOCK_BUILDINGS: 6,

    //RESOURCES
    RESOURCE_WOOD: 0,
    RESOURCE_LEATHER: 1,
    RESOURCE_METAL: 2,
    RESOURCE_FIBER: 3,
    RESOURCE_STONE: 4,
    RESOURCE_CRYSTAL: 5,
    RESOURCE_NAMES: ["Wood", "Leather", "Metal", "Fiber", "Stone", "Crystal"],

    //GEAR TYPES
    GEAR_WEAPON: 0,
    GEAR_ARMOR: 1,
    GEAR_TRINKET: 2,

    // STAT VARIABLES
    ATTACK_SPEED_POWER: 0.66,
    STRENGTH_DMG_MIN: 0.4,
    STRENGTH_DMG_MAX: 1,
    HIT_PER_DEXTERITY: 7,
    EVA_PER_AGILITY: 7,
    HP_PER_ENDURANCE: 5,
    REGEN_PER_RECOVERY: 0.1,
    ARMOR_PER_DEFENSE: 0.2,
    SCALING_ARMOR_PER_DEFENSE: 0.01,
    SCALING_DAMAGE_PER_STRENGTH: 0.01,
    CRITDMG_PER_ACCURACY: 0.025,
    AGI_EXPLORE_POWER: 0.5,
    AGI_EXPLORE_MULTI: 0.03,
    CRITDMG_DIMINISHING_POWER: 0.83,
    SCALING_DIMINISHING_POWER: 0.75,

    MONSTER_STAT_PER_LEVEL: 1.1,
    MONSTER_STATSCALE_PER_LEVEL: 1.027,

    // PLAYER SHADE VARIABLES
    STAT_COST_BASE: 50,
    STAT_COST_PER_LEVEL: 50,
    STAT_POINTS_PER_BUY: 2,
    TALENT_COST_BASE: 400,
    TALENT_COST_POWER: 1.2,
    MOTE_BONUS: 0.0025,
    MOTE_BASE_SOFT_CAP: 80,
    MOTE_SOFT_CAP_POWER: 0.75,
    SECONDWIND_COOLDOWN: 80000,
    DODGE_COUNTER: 13,
    DEFY_DEATH_COUNTER: 8,

    // COMBAT
    COMBAT_COOLDOWN: 2500,

    // TOWN
    BASE_TAX_INCOME: 0.5,
    POPULATION_GROWTH: 1.03,
    EXPLORE_MULTIPLIER: 0.15,
    GOLDCAP_PER_POP: 10,
    TRADE_HOUSE_MAX_DISTANCE: 4,
    BUILDING_BASE_DEFENSE: 5,
    RESEARCH_TIER_POWER: 1.66,
    RESEARCH_LEVEL_POWER: 1.5,
    DESTROY_BUILDING_COST: 50,

    // INVASION
    SIGHTING_DIVIDER: 60000,
    SIGHTING_THRESHOLD: 120000,
    INVASION_THRESHOLD: 1000,
    INVASION_REDUCTION_FROM_SIGHTING: 100,
    POP_MULTI_AFTER_INVASION: 0.9,
    MIN_SIGHTING_SECONDS: 60,
    MAX_SIGHTING_SECONDS: 3600,
    SIGHTING_MULTI_PER_SIGHTING: 2,
    SIGHTING_BATTLE_MULTI: 1.4,

    //UPGRADES
    FORGE_REDUCTION: 0.95,

    //REBIRTH
    MOONLIGHT_REGION_POWER: 1.5,

    //TIME
    MONTH_NAMES: ["Primas", "Twin", "Threed", "Tera", "Pentas", "Hexat", "Septus", "Octor", "Novum", "Deccan", "Hendeka", "Dodecan", "Zenith"],
    TIME_PER_HOUR: 1000,
    TIME_PER_DAY: 24000,
    TIME_PER_MONTH: 672000,
    TIME_PER_YEAR: 8736000,
    HOURS_PER_DAY: 24,
    DAYS_PER_MONTH: 28,
    MONTHS_PER_YEAR: 13,

    //MISC
    AUTOSAVE_TIMER: 60000,

    //ROADS string LRUD
    ROADTYPES: {
        "0001": 0,
        "0010": 1,
        "0011": 2,
        "0100": 3,
        "0101": 4,
        "0110": 5,
        "0111": 6,
        "1000": 7,
        "1001": 8,
        "1010": 9,
        "1011": 10,
        "1100": 11,
        "1101": 12,
        "1110": 13,
        "1111": 14,
    }
};

export { Statics };