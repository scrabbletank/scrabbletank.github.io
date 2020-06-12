export class Gear {
    constructor(name, tier, slotType, stats, statsLvl, costs, costsLvl) {
        // this.statBonuses = {
        //     health: 0,
        //     damageMin: 0,
        //     damageMax: 0,
        //     strength: 0,
        //     dexterity: 0,
        //     agility: 0,
        //     endurance: 0,
        //     recovery: 0,
        //     defense: 0,
        //     accuracy: 0,
        //     hit: 0,
        //     evasion: 0,
        //     critDamage: 0,
        //     critChance: 0,
        //     healthRegen: 0,
        //     armor: 0
        // };
        this.tier = tier;
        this.slotType = slotType;
        this.name = name;
        this.statBonuses = stats;
        this.statsPerLevel = statsLvl;
        this.level = 0;
        this.costs = costs;
        this.costsPerLevel = costsLvl;
        this.motesFused = 0;
    }

    bringToLevel(level) {
        for (var i = this.level; i < level; i++) {
            var tlvl = i - 1;
            // first level does not add stats (ie level 0 to 1 counts as crafting the item)
            if (tlvl >= 0) {
                for (const prop in this.statBonuses) {
                    this.statBonuses[prop] += this.statsPerLevel[prop] * Math.ceil((i + 1) / 5);
                }
            }
            for (const prop in this.costs) {
                this.costs[prop] += this.costsPerLevel[prop] * (i + 1);
            }
        }
        this.level = level;
    }
}