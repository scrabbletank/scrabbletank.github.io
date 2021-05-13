import { Gear } from "./Gear";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";
import { PlayerData } from "./PlayerData";
import { Common } from "../utils/Common";

export class GearData {
    constructor() {
        if (!GearData.instance) {
            this.gear = [];
            this._initGear();
            GearData.instance = this;
        }

        return GearData.instance;
    }

    static getInstance() {
        if (!GearData.instance) {
            return new GearData();
        }
        return GearData.instance;
    }

    save() {
        var gearList = [];
        for (var i = 0; i < this.gear.length; i++) {
            gearList.push(this.gear[i].save());
        }
        var saveObj = {
            gear: gearList,
            ta: this.tiersAvailable,
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this._initGear();
        for (var i = 0; i < saveObj.gear.length; i++) {
            this.gear[i].load(saveObj.gear[i], ver);
        }
        this.tiersAvailable = saveObj.ta;
    }

    rebirth() {
        this._initGear();
    }

    getGearByName(name) {
        for (var i = 0; i < this.gear.length; i++) {
            if (this.gear[i].name === name) {
                return this.gear[i];
            }
        }
    }

    _isEquipedItem(gear) {
        switch (gear.slotType) {
            case Statics.GEAR_WEAPON:
                return PlayerData.getInstance().weapon !== undefined && gear.name === PlayerData.getInstance().weapon.name;
            case Statics.GEAR_ARMOR:
                return PlayerData.getInstance().armor !== undefined && gear.name === PlayerData.getInstance().armor.name;
            case Statics.GEAR_TRINKET:
                return PlayerData.getInstance().trinket !== undefined && gear.name === PlayerData.getInstance().trinket.name;
        }
    }

    upgradeGear(gear) {
        var player = PlayerData.getInstance();
        var craftCostMulti = gear.tier <= 0 ? 1 : player.craftingCosts[gear.tier - 1];
        var res = [];
        for (var i = 0; i < gear.costs.length; i++) {
            res.push(gear.costs[i] * craftCostMulti);
        }
        if (Common.canCraft(res, player.resources[Math.max(0, gear.tier - 1)]) === false) {
            return;
        }
        player.spendResource(res, Math.max(0, gear.tier - 1));
        if (this._isEquipedItem(gear)) {
            player.unequip(gear.slotType);
            gear.bringToLevel(gear.level + 1);
            player.equip(gear);
        } else {
            gear.bringToLevel(gear.level + 1);
        }
    }

    fuseGear(gear, motes) {
        var player = PlayerData.getInstance();
        if (this._isEquipedItem(gear)) {
            player.unequip(gear.slotType);
            gear.fuseMotes(motes);
            player.equip(gear);
        } else {
            gear.fuseMotes(motes);
        }
        player.addMote(-motes);
    }

    _initGear() {
        this.gear = [];
        this.tiersAvailable = 0;

        // TIER 0

        var stat = {
            health: 0, damageMin: 1, damageMax: 1, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [5, 0, 10, 0, 0, 0];
        this.gear.push(new Gear("Broken Sword", 0, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [0, 10, 0, 5, 0, 0];
        this.gear.push(new Gear("Old Leathers", 0, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 1, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [10, 0, 0, 0, 5, 0];
        this.gear.push(new Gear("Barrel Lid", 0, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //initial gear should be available
        this.gear[0].bringToLevel(1);
        this.gear[1].bringToLevel(1);
        this.gear[2].bringToLevel(1);

        //////////////////////////////
        // TIER 1
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 2, damageMax: 4, strength: 1,
            dexterity: 1, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [10, 0, 25, 5, 0, 0];
        var costlvl = [6, 0, 15, 4, 0, 5];
        this.gear.push(new Gear("Iron Sword", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 6, critResistance: 0, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var cost = [20, 0, 15, 5, 0, 0];
        var costlvl = [13, 0, 9, 3, 0, 5];
        this.gear.push(new Gear("Iron Axe", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 2.75, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 12, evasion: 4,
            critPower: 0, critResistance: 0, critChance: 0.13, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 10, 0, 5];
        var costlvl = [3, 0, 14, 8, 0, 5];
        this.gear.push(new Gear("Dagger", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 3, damageMax: 5.25, strength: 1,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 1, accuracy: 0, hit: -10, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.04, healthRegen: 0, armor: 0
        };
        var cost = [10, 10, 0, 0, 0, 20];
        var costlvl = [8, 8, 0, 0, 0, 14];
        this.gear.push(new Gear("Crystal Hammer", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 4, evasion: 12,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 10, 0, 30, 0, 0];
        var costlvl = [0, 5, 0, 20, 0, 5];
        this.gear.push(new Gear("Cloak", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 1,
            defense: 0, accuracy: 1, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 2
        };
        var cost = [0, 30, 0, 10, 0, 0];
        var costlvl = [0, 20, 0, 5, 0, 5];
        this.gear.push(new Gear("Hide Armor", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 7, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -8,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 3
        };
        var cost = [0, 10, 30, 0, 0, 0];
        var costlvl = [0, 5, 20, 0, 0, 5];
        this.gear.push(new Gear("Half Plate", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 2, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 4, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [30, 0, 10, 0, 0, 0];
        var costlvl = [17, 0, 10, 0, 0, 8];
        this.gear.push(new Gear("Wooden Shield", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 2.5, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0.5, armor: 0
        };
        var cost = [0, 0, 10, 0, 25, 5];
        var costlvl = [0, 0, 7, 0, 20, 8];
        this.gear.push(new Gear("Warm Stone", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 1, agility: 1, endurance: 0, recovery: 0,
            defense: 0, accuracy: 1, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [0, 20, 0, 10, 0, 10];
        var costlvl = [0, 15, 0, 7, 0, 13];
        this.gear.push(new Gear("Wolf-Tooth Necklace", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 2, hit: 15, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 15, 0, 20, 0, 5];
        var costlvl = [0, 10, 0, 17, 0, 8];
        this.gear.push(new Gear("Gloves", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T1 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 1, strength: 3,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 25, 0, 10, 5];
            var costlvl = [0, 0, 20, 0, 7, 8];
            this.gear.push(new Gear("Shadow Wolf Charm α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 3, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 15, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 25, 0, 10, 0, 5];
            var costlvl = [0, 20, 0, 7, 0, 8];
            this.gear.push(new Gear("Moonlight Circlet α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 3, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 15,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 10, 0, 25, 0, 5];
            var costlvl = [0, 7, 0, 20, 0, 8];
            this.gear.push(new Gear("Moon Treads α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 0) {
            var stat = {
                health: 7, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 3, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 3, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 10, 0, 25, 5];
            var costlvl = [0, 0, 7, 0, 20, 8];
            this.gear.push(new Gear("Moonstone α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 3,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0.5, armor: 0
            };
            var cost = [25, 0, 0, 5, 5, 5];
            var costlvl = [20, 0, 0, 3, 3, 9];
            this.gear.push(new Gear("Dreamlight Bracer α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 3, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 1
            };
            var cost = [0, 10, 0, 0, 5, 25];
            var costlvl = [0, 7, 0, 0, 3, 25];
            this.gear.push(new Gear("Shadow Veil α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 0) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 3, hit: 0, evasion: 0,
                critPower: 6, critResistance: 0, critChance: 0.05, healthRegen: 0, armor: 0
            };
            var cost = [10, 0, 0, 10, 10, 10];
            var costlvl = [8, 0, 0, 8, 8, 11];
            this.gear.push(new Gear("Nightmare Pendant α", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }


        //////////////////////////////
        // TIER 2
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 8, damageMax: 15, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -20, evasion: 30,
            critPower: 0, critResistance: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var cost = [25, 0, 25, 0, 0, 0];
        var costlvl = [14, 0, 14, 0, 0, 7];
        this.gear.push(new Gear("Great Spear", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 5, damageMax: 11, strength: 1.5,
            dexterity: 2.5, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 25, 10, 0, 0];
        var costlvl = [9, 0, 14, 5, 0, 7];
        this.gear.push(new Gear("Steel Sword", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 3, damageMax: 8, strength: 0,
            dexterity: 0, agility: 1, endurance: 0, recovery: 2,
            defense: 0, accuracy: 1, hit: 30, evasion: 0,
            critPower: 11, critResistance: 0, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 15, 0, 10];
        var costlvl = [4, 0, 15, 9, 0, 7];
        this.gear.push(new Gear("Hunting Dagger", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 15, evasion: 45,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 4
        };
        var cost = [0, 15, 0, 35, 0, 0];
        var costlvl = [0, 9, 0, 19, 0, 7];
        this.gear.push(new Gear("Thief Garb", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 4,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 6
        };
        var cost = [0, 35, 0, 15, 0, 0];
        var costlvl = [0, 19, 0, 9, 0, 7];
        this.gear.push(new Gear("Hunting Leathers", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 15, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -20,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 8
        };
        var cost = [0, 0, 35, 15, 0, 0];
        var costlvl = [0, 0, 19, 9, 0, 7];
        this.gear.push(new Gear("Full Plate", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 2, recovery: 0,
            defense: 3, accuracy: 3, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.03, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 0, 0, 30, 10];
        var costlvl = [0, 8, 0, 0, 22, 10];
        this.gear.push(new Gear("Lucky Rock", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 20,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 1.75
        };
        var cost = [0, 30, 0, 15, 0, 5];
        var costlvl = [0, 19, 0, 11, 0, 10];
        this.gear.push(new Gear("Boots of Speed", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 2,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 7, accuracy: 0, hit: -20, evasion: 0,
            critPower: 0, critResistance: 7, critChance: 0, healthRegen: 0, armor: 2
        };
        var cost = [0, 15, 0, 10, 25, 0];
        var costlvl = [0, 8, 0, 6, 16, 10];
        this.gear.push(new Gear("Heavy Bracers", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 2.5,
            dexterity: 2.5, agility: 2.5, endurance: 2.5, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 25, 0, 0, 15];
        var costlvl = [0, 8, 17, 0, 0, 15];
        this.gear.push(new Gear("Adventurer's Medallion", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T2 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 1.75, strength: 6,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 30, 0, 10, 10];
            var costlvl = [0, 0, 20, 0, 7, 13];
            this.gear.push(new Gear("Shadow Wolf Charm ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 6, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 30, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 30, 0, 10, 0, 10];
            var costlvl = [0, 20, 0, 7, 0, 13];
            this.gear.push(new Gear("Moonlight Circlet ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 6, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 30,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 10, 0, 30, 0, 10];
            var costlvl = [0, 7, 0, 20, 0, 13];
            this.gear.push(new Gear("Moon Treads ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 1) {
            var stat = {
                health: 15, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 6, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 6, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 10, 0, 30, 10];
            var costlvl = [0, 0, 7, 0, 20, 13];
            this.gear.push(new Gear("Moonstone ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 6,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0.9, armor: 0
            };
            var cost = [30, 0, 0, 7, 8, 10];
            var costlvl = [20, 0, 0, 3, 3, 13];
            this.gear.push(new Gear("Dreamlight Bracer ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 6, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 2
            };
            var cost = [0, 15, 0, 0, 5, 30];
            var costlvl = [0, 7, 0, 0, 3, 30];
            this.gear.push(new Gear("Shadow Veil ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 1) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 6, hit: 0, evasion: 0,
                critPower: 10, critResistance: 0, critChance: 0.06, healthRegen: 0, armor: 0
            };
            var cost = [15, 0, 0, 15, 10, 10];
            var costlvl = [10, 0, 0, 10, 8, 12];
            this.gear.push(new Gear("Nightmare Pendant ß", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 3
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 16, damageMax: 35, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -42, evasion: 55,
            critPower: 22, critResistance: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 35, 0, 20, 0];
        var costlvl = [0, 7, 17, 0, 11, 10];
        this.gear.push(new Gear("Thunder Spear", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 16, damageMax: 27, strength: 0,
            dexterity: 4, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 30, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 40, 0, 0, 10];
        var costlvl = [8, 0, 22, 0, 0, 15];
        this.gear.push(new Gear("Ardent Blade", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 12, damageMax: 17, strength: 7.5,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 70, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [0, 25, 25, 15, 0, 0];
        var costlvl = [0, 15, 15, 5, 0, 10];
        this.gear.push(new Gear("Dire Claw", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 3, damageMax: 4.25, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 70,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 11
        };
        var cost = [0, 20, 0, 45, 0, 0];
        var costlvl = [0, 10, 0, 25, 0, 10];
        this.gear.push(new Gear("Assassin Cloak", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 2.5, recovery: 5,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 15
        };
        var cost = [0, 45, 0, 20, 0, 0];
        var costlvl = [0, 25, 0, 10, 0, 10];
        this.gear.push(new Gear("Beastmaster Vest", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 36, damageMin: 0, damageMax: 0, strength: 4,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -15, evasion: -55,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 20
        };
        var cost = [0, 20, 45, 0, 0, 0];
        var costlvl = [0, 10, 25, 0, 0, 10];
        this.gear.push(new Gear("Lizardscale Armor", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 9, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 6, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.06, healthRegen: 0, armor: 0
        };
        var cost = [0, 40, 0, 15, 0, 10];
        var costlvl = [0, 27, 0, 10, 0, 13];
        this.gear.push(new Gear("Wolf Gloves", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 18, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 105, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0.6, armor: 0
        };
        var cost = [0, 0, 0, 0, 35, 30];
        var costlvl = [0, 0, 0, 0, 24, 26];
        this.gear.push(new Gear("Hyperstone", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 3.5, recovery: 0,
            defense: 7.5, accuracy: 0, hit: 0, evasion: -37,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 3.5
        };
        var cost = [15, 10, 40, 0, 0, 0];
        var costlvl = [9, 6, 22, 0, 0, 13];
        this.gear.push(new Gear("Tower Shield", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 10,
            dexterity: 0, agility: 0, endurance: 5, recovery: 0,
            defense: 0, accuracy: 0, hit: -33, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 2
        };
        var cost = [0, 35, 0, 20, 10, 0];
        var costlvl = [0, 18, 0, 13, 6, 13];
        this.gear.push(new Gear("Ogre Belt", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T3 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 3.75, strength: 11,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 40, 0, 15, 10];
            var costlvl = [0, 0, 27, 0, 10, 13];
            this.gear.push(new Gear("Shadow Wolf Charm σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 11, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 70, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 40, 0, 15, 0, 10];
            var costlvl = [0, 27, 0, 10, 0, 13];
            this.gear.push(new Gear("Moonlight Circlet σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 11, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 70,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 15, 0, 40, 0, 10];
            var costlvl = [0, 10, 0, 27, 0, 13];
            this.gear.push(new Gear("Moon Treads σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 2) {
            var stat = {
                health: 36, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 11, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 13, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 15, 0, 40, 10];
            var costlvl = [0, 0, 10, 0, 27, 13];
            this.gear.push(new Gear("Moonstone σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 11,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 1.4, armor: 0
            };
            var cost = [40, 0, 0, 10, 10, 10];
            var costlvl = [27, 0, 0, 3, 3, 13];
            this.gear.push(new Gear("Dreamlight Bracer σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 11, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 3.5
            };
            var cost = [0, 17, 0, 0, 8, 40];
            var costlvl = [0, 10, 0, 0, 5, 35];
            this.gear.push(new Gear("Shadow Veil σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 2) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 11, hit: 0, evasion: 0,
                critPower: 22, critResistance: 0, critChance: 0.07, healthRegen: 0, armor: 0
            };
            var cost = [20, 0, 0, 15, 15, 15];
            var costlvl = [15, 0, 0, 10, 10, 15];
            this.gear.push(new Gear("Nightmare Pendant σ", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 4
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 22, damageMax: 57, strength: 9,
            dexterity: 0, agility: 0, endurance: 4, recovery: 0,
            defense: 0, accuracy: 0, hit: -80, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.16, healthRegen: 0, armor: 0
        };
        var cost = [40, 10, 35, 0, 0, 0];
        var costlvl = [22, 5, 19, 0, 0, 14];
        this.gear.push(new Gear("Giant's Axe", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 26, damageMax: 44, strength: 0,
            dexterity: 0, agility: 6.5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 62, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [25, 0, 45, 15, 0, 0];
        var costlvl = [14, 0, 24, 8, 0, 14];
        this.gear.push(new Gear("Elven Longsword", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 19, damageMax: 32, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 7, hit: 144, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.19, healthRegen: 1.5, armor: 0
        };
        var cost = [0, 0, 45, 30, 0, 10];
        var costlvl = [0, 0, 24, 19, 0, 17];
        this.gear.push(new Gear("Sacrificial Dagger", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 6.5, agility: 0, endurance: 0, recovery: 0,
            defense: 6.5, accuracy: 0, hit: 0, evasion: 148,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 19
        };
        var cost = [0, 15, 0, 60, 0, 10];
        var costlvl = [0, 12, 0, 32, 0, 16];
        this.gear.push(new Gear("Spellweave Robe", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 8,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 5, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 28
        };
        var cost = [0, 65, 0, 20, 0, 0];
        var costlvl = [0, 36, 0, 10, 0, 14];
        this.gear.push(new Gear("Dire Bear Cloak", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 68, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 13, accuracy: 0, hit: -65, evasion: -157,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 35
        };
        var cost = [0, 0, 0, 15, 50, 20];
        var costlvl = [0, 0, 0, 11, 26, 23];
        this.gear.push(new Gear("Ancient Armor", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: -24, damageMin: 0, damageMax: 0, strength: 16,
            dexterity: 16, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 42, critResistance: 0, critChance: 0, healthRegen: -1.1, armor: 0
        };
        var cost = [30, 15, 0, 0, 40, 0];
        var costlvl = [14, 9, 0, 0, 22, 20];
        this.gear.push(new Gear("Demonic Sigil", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 11, accuracy: 7, hit: 0, evasion: -60,
            critPower: 0, critResistance: 27, critChance: 0, healthRegen: 0, armor: 6
        };
        var cost = [10, 0, 50, 0, 0, 25];
        var costlvl = [7, 0, 31, 0, 0, 27];
        this.gear.push(new Gear("Mirror Shield", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 7.5, damageMax: 10.5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 1.25, armor: 0
        };
        var cost = [0, 45, 0, 0, 30, 10];
        var costlvl = [0, 24, 0, 0, 19, 22];
        this.gear.push(new Gear("Dragonbone Charm", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 8, agility: 8, endurance: 5, recovery: 0,
            defense: 0, accuracy: 5, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [25, 0, 15, 0, 45, 0];
        var costlvl = [13, 0, 9, 0, 23, 20];
        this.gear.push(new Gear("Spirit Ring", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T4 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 7, strength: 19,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 50, 0, 20, 15];
            var costlvl = [0, 0, 35, 0, 12, 18];
            this.gear.push(new Gear("Shadow Wolf Charm Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 19, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 125, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 50, 0, 20, 0, 15];
            var costlvl = [0, 35, 0, 12, 0, 18];
            this.gear.push(new Gear("Moonlight Circlet Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 19, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 125,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 20, 0, 50, 0, 15];
            var costlvl = [0, 12, 0, 35, 0, 18];
            this.gear.push(new Gear("Moon Treads Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 3) {
            var stat = {
                health: 68, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 19, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 25, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 20, 0, 50, 15];
            var costlvl = [0, 0, 12, 0, 35, 18];
            this.gear.push(new Gear("Moonstone Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 19,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 2.1, armor: 0
            };
            var cost = [50, 0, 0, 10, 10, 15];
            var costlvl = [35, 0, 0, 6, 6, 18];
            this.gear.push(new Gear("Dreamlight Bracer Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 19, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 6
            };
            var cost = [0, 20, 0, 0, 15, 50];
            var costlvl = [0, 12, 0, 0, 8, 45];
            this.gear.push(new Gear("Shadow Veil Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 3) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 19, hit: 0, evasion: 0,
                critPower: 42, critResistance: 0, critChance: 0.08, healthRegen: 0, armor: 0
            };
            var cost = [25, 0, 0, 20, 20, 20];
            var costlvl = [15, 0, 0, 15, 15, 20];
            this.gear.push(new Gear("Nightmare Pendant Σ", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 5
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 54, damageMax: 96, strength: 10,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 10, accuracy: 0, hit: -122, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [40, 0, 60, 0, 0, 10];
        var costlvl = [24, 0, 35, 0, 0, 21];
        this.gear.push(new Gear("Quake Hammer", 5, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 49, damageMax: 73, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 12,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 75, critResistance: 0, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [30, 30, 50, 0, 0, 0];
        var costlvl = [17, 17, 30, 0, 0, 16];
        this.gear.push(new Gear("Dawnblade", 5, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 36, damageMax: 54, strength: 5,
            dexterity: 0, agility: 5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 200, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.21, healthRegen: 0, armor: 5
        };
        var cost = [0, 30, 35, 45, 0, 0];
        var costlvl = [0, 17, 20, 27, 0, 16];
        this.gear.push(new Gear("Dragon Tooth", 5, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 10, accuracy: 0, hit: 0, evasion: 190,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 1.7, armor: 30
        };
        var cost = [0, 40, 0, 70, 0, 0];
        var costlvl = [0, 24, 0, 40, 0, 16];
        this.gear.push(new Gear("Fire Rat Tunic", 5, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 6, damageMax: 9, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 45, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 39
        };
        var cost = [0, 70, 0, 40, 0, 0];
        var costlvl = [0, 40, 0, 24, 0, 16];
        this.gear.push(new Gear("Savage Leather", 5, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 100, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -173,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 52
        };
        var cost = [0, 0, 70, 0, 20, 20];
        var costlvl = [0, 0, 40, 0, 12, 28];
        this.gear.push(new Gear("Enchanted Plate", 5, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 3,
            dexterity: 3, agility: 0, endurance: 0, recovery: 0,
            defense: 3, accuracy: 0, hit: 0, evasion: 0,
            critPower: 75, critResistance: 0, critChance: 0.1, healthRegen: 0, armor: 0
        };
        var cost = [20, 0, 0, 0, 40, 50];
        var costlvl = [11, 0, 0, 0, 24, 50];
        this.gear.push(new Gear("Power Shard", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: -7,
            defense: 18, accuracy: 0, hit: 50, evasion: 130,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 11
        };
        var cost = [0, 45, 0, 45, 0, 20];
        var costlvl = [0, 27, 0, 27, 0, 31];
        this.gear.push(new Gear("Cloak of Displacement", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 20,
            dexterity: -5, agility: -5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 20, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.08, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 0, 20, 75, 0];
        var costlvl = [9, 0, 0, 11, 44, 21];
        this.gear.push(new Gear("Pendant of Sin", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 18, endurance: 0, recovery: 20,
            defense: 0, accuracy: 0, hit: -30, evasion: 117,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [40, 40, 0, 30, 0, 0];
        var costlvl = [24, 24, 0, 16, 0, 21];
        this.gear.push(new Gear("Windwalk Cape", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T5 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 12, strength: 30,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 65, 0, 25, 20];
            var costlvl = [0, 0, 45, 0, 17, 23];
            this.gear.push(new Gear("Shadow Wolf Charm Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 30, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 200, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 65, 0, 25, 0, 20];
            var costlvl = [0, 45, 0, 17, 0, 23];
            this.gear.push(new Gear("Moonlight Circlet Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 30, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 200,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 25, 0, 65, 0, 20];
            var costlvl = [0, 17, 0, 45, 0, 23];
            this.gear.push(new Gear("Moon Treads Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 4) {
            var stat = {
                health: 100, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 30, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 40, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 25, 0, 65, 20];
            var costlvl = [0, 0, 17, 0, 45, 23];
            this.gear.push(new Gear("Moonstone Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 30,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 3.25, armor: 0
            };
            var cost = [65, 0, 0, 12, 13, 20];
            var costlvl = [45, 0, 0, 8, 9, 23];
            this.gear.push(new Gear("Dreamlight Bracer Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 30, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 11
            };
            var cost = [0, 25, 0, 0, 20, 65];
            var costlvl = [0, 17, 0, 0, 13, 55];
            this.gear.push(new Gear("Shadow Veil Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 4) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 30, hit: 0, evasion: 0,
                critPower: 75, critResistance: 0, critChance: 0.09, healthRegen: 0, armor: 0
            };
            var cost = [30, 0, 0, 30, 25, 25];
            var costlvl = [23, 0, 0, 22, 20, 20];
            this.gear.push(new Gear("Nightmare Pendant Φ", 5, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 6
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 92, damageMax: 140, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -195, evasion: 0,
            critPower: 120, critResistance: 0, critChance: 0.27, healthRegen: 0, armor: 0
        };
        var cost = [60, 0, 50, 0, 30, 0];
        var costlvl = [36, 0, 31, 0, 19, 19];
        this.gear.push(new Gear("Spear of Desolation", 6, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 77, damageMax: 119, strength: 0,
            dexterity: 0, agility: 11, endurance: 0, recovery: 0,
            defense: 0, accuracy: 11, hit: 111, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.18, healthRegen: 0, armor: 0
        };
        var cost = [45, 0, 65, 30, 0, 0];
        var costlvl = [27, 0, 40, 19, 0, 19];
        this.gear.push(new Gear("Arcane Sword", 6, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 66, damageMax: 93, strength: 12,
            dexterity: 6, agility: 6, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 335, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.2, healthRegen: 0, armor: 0
        };
        var cost = [60, 0, 60, 0, 20, 0];
        var costlvl = [37, 0, 37, 0, 12, 19];
        this.gear.push(new Gear("Orichalcum Dagger", 6, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 170, evasion: 340,
            critPower: 0, critResistance: 0, critChance: 0.07, healthRegen: 0, armor: 49
        };
        var cost = [0, 50, 0, 90, 0, 0];
        var costlvl = [0, 31, 0, 55, 0, 19];
        this.gear.push(new Gear("Vestigial Clothes", 6, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 18,
            dexterity: -4, agility: -4, endurance: 15, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 65
        };
        var cost = [0, 100, 0, 40, 0, 0];
        var costlvl = [0, 61, 0, 25, 0, 19];
        this.gear.push(new Gear("Storm Giant Tunic", 6, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 120, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 26, accuracy: 0, hit: -164, evasion: -472,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 82
        };
        var cost = [30, 0, 80, 0, 30, 0];
        var costlvl = [19, 0, 48, 0, 19, 19];
        this.gear.push(new Gear("Immovable Plate", 6, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: -70, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 14,
            defense: 8, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 8.5, armor: 0
        };
        var cost = [0, 50, 0, 0, 50, 40];
        var costlvl = [0, 31, 0, 0, 31, 48];
        this.gear.push(new Gear("Slime Core", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 11, agility: 11, endurance: 0, recovery: 0,
            defense: 11, accuracy: 0, hit: 0, evasion: -142,
            critPower: 0, critResistance: 45, critChance: 0, healthRegen: 0, armor: 20
        };
        var cost = [25, 0, 0, 0, 55, 60];
        var costlvl = [15, 0, 0, 0, 34, 61];
        this.gear.push(new Gear("Phase Shield", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 27, endurance: 0, recovery: 0,
            defense: 0, accuracy: -10, hit: 0, evasion: 350,
            critPower: 0, critResistance: 0, critChance: 0.09, healthRegen: 0, armor: 9
        };
        var cost = [0, 40, 0, 70, 0, 30];
        var costlvl = [0, 24, 0, 43, 0, 43];
        this.gear.push(new Gear("Hermes Boots", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 12, damageMax: 19, strength: 22,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 10, hit: -186, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 60, 30, 50, 0, 0];
        var costlvl = [0, 36, 20, 30, 0, 24];
        this.gear.push(new Gear("Gloves of Power", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T6 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 17, strength: 42,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 80, 0, 35, 25];
            var costlvl = [0, 0, 60, 0, 25, 30];
            this.gear.push(new Gear("Shadow Wolf Charm Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 42, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 350, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 80, 0, 35, 0, 25];
            var costlvl = [0, 60, 0, 25, 0, 30];
            this.gear.push(new Gear("Moonlight Circlet Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 42, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 350,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 35, 0, 80, 0, 25];
            var costlvl = [0, 25, 0, 60, 0, 30];
            this.gear.push(new Gear("Moon Treads Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 5) {
            var stat = {
                health: 175, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 42, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 60, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 35, 0, 80, 25];
            var costlvl = [0, 0, 25, 0, 60, 30];
            this.gear.push(new Gear("Moonstone Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 42,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 4.75, armor: 0
            };
            var cost = [80, 0, 0, 17, 18, 25];
            var costlvl = [60, 0, 0, 12, 13, 30];
            this.gear.push(new Gear("Dreamlight Bracer Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 42, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 17
            };
            var cost = [0, 35, 0, 0, 25, 80];
            var costlvl = [0, 25, 0, 0, 15, 75];
            this.gear.push(new Gear("Shadow Veil Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 5) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 42, hit: 0, evasion: 0,
                critPower: 120, critResistance: 0, critChance: 0.1, healthRegen: 0, armor: 0
            };
            var cost = [35, 0, 0, 35, 35, 35];
            var costlvl = [27, 0, 0, 27, 27, 27];
            this.gear.push(new Gear("Nightmare Pendant Θ", 6, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 7
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 138, damageMax: 215, strength: 0,
            dexterity: 0, agility: 0, endurance: 15, recovery: 0,
            defense: 20, accuracy: 0, hit: -245, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [30, 45, 100, 0, 0, 0];
        var costlvl = [19, 29, 64, 0, 0, 23];
        this.gear.push(new Gear("Dark One's Mace", 7, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 122, damageMax: 170, strength: 12,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 180, critResistance: 0, critChance: 0.33, healthRegen: 0, armor: 0
        };
        var cost = [35, 0, 70, 0, 0, 70];
        var costlvl = [22, 0, 45, 0, 0, 68];
        this.gear.push(new Gear("Vorpal Blade", 7, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 112, damageMax: 145, strength: 10,
            dexterity: 10, agility: 10, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 460, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.24, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 120, 40, 0, 0];
        var costlvl = [10, 0, 77, 25, 0, 23];
        this.gear.push(new Gear("Adamantine Claws", 7, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 14, accuracy: 0, hit: 120, evasion: 450,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 75
        };
        var cost = [0, 65, 0, 110, 0, 0];
        var costlvl = [0, 42, 0, 70, 0, 23];
        this.gear.push(new Gear("Shaed", 7, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 27,
            defense: 0, accuracy: 8, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 98
        };
        var cost = [0, 110, 0, 15, 0, 50];
        var costlvl = [0, 70, 0, 10, 0, 55];
        this.gear.push(new Gear("Crystaline Scales", 7, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 220, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -70, evasion: -370,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 4, armor: 120
        };
        var cost = [0, 0, 70, 0, 60, 45];
        var costlvl = [0, 0, 45, 0, 38, 52];
        this.gear.push(new Gear("Runic Armor", 7, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 14,
            dexterity: 14, agility: 14, endurance: 14, recovery: 0,
            defense: 14, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: -0.15, healthRegen: 3, armor: 14
        };
        var cost = [0, 0, 0, 40, 95, 40];
        var costlvl = [0, 0, 0, 26, 61, 53];
        this.gear.push(new Gear("Soul Gem", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 30, accuracy: 30, hit: 0, evasion: -270,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 24
        };
        var cost = [130, 20, 0, 0, 25, 0];
        var costlvl = [83, 13, 0, 0, 16, 28];
        this.gear.push(new Gear("Lidless Eye", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 17, damageMax: 24, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 170, critResistance: 0, critChance: 0.1, healthRegen: 0, armor: 0
        };
        var cost = [70, 0, 0, 45, 0, 60];
        var costlvl = [45, 0, 0, 29, 0, 66];
        this.gear.push(new Gear("Circlet of Power", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: -185, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 30, agility: 30, endurance: 0, recovery: 30,
            defense: -15, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var cost = [0, 70, 0, 70, 35, 0];
        var costlvl = [0, 45, 0, 45, 22, 28];
        this.gear.push(new Gear("Demonic Wraps", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T7 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 24, strength: 53,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 95, 0, 45, 35];
            var costlvl = [0, 0, 70, 0, 30, 40];
            this.gear.push(new Gear("Shadow Wolf Charm Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 53, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 470, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 95, 0, 45, 0, 35];
            var costlvl = [0, 70, 0, 30, 0, 40];
            this.gear.push(new Gear("Moonlight Circlet Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 53, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 470,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 45, 0, 95, 0, 35];
            var costlvl = [0, 30, 0, 70, 0, 40];
            this.gear.push(new Gear("Moon Treads Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 6) {
            var stat = {
                health: 240, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 53, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 80, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 45, 0, 95, 35];
            var costlvl = [0, 0, 30, 0, 70, 40];
            this.gear.push(new Gear("Moonstone Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 53,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 6.25, armor: 0
            };
            var cost = [95, 0, 0, 22, 23, 35];
            var costlvl = [70, 0, 0, 15, 15, 40];
            this.gear.push(new Gear("Dreamlight Bracer Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 53, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 24
            };
            var cost = [0, 45, 0, 0, 35, 95];
            var costlvl = [0, 30, 0, 0, 25, 85];
            this.gear.push(new Gear("Shadow Veil Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 6) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 3, hit: 0, evasion: 0,
                critPower: 170, critResistance: 0, critChance: 0.11, healthRegen: 0, armor: 0
            };
            var cost = [45, 0, 0, 45, 45, 40];
            var costlvl = [35, 0, 0, 35, 35, 35];
            this.gear.push(new Gear("Nightmare Pendant Ω", 7, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        //////////////////////////////
        // TIER 8
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 166, damageMax: 333, strength: 40,
            dexterity: 0, agility: -10, endurance: 15, recovery: 0,
            defense: 0, accuracy: 0, hit: -470, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.24, healthRegen: 0, armor: 0
        };
        var cost = [90, 0, 100, 25, 0, 0];
        var costlvl = [59, 0, 67, 17, 0, 27];
        this.gear.push(new Gear("Ragnarok", 8, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 182, damageMax: 265, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0.33, healthRegen: 7, armor: 0
        };
        var cost = [0, 45, 90, 0, 80, 0];
        var costlvl = [0, 30, 60, 0, 53, 27];
        this.gear.push(new Gear("9 Lives Stealer", 8, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 157, damageMax: 205, strength: 17,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 620, evasion: 0,
            critPower: 0.4, critResistance: 0, critChance: 0.3, healthRegen: 0, armor: 0
        };
        var cost = [55, 0, 70, 90, 0, 0];
        var costlvl = [0, 0, 47, 59, 0, 27];
        this.gear.push(new Gear("Chthonic Dagger", 8, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 100, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 780,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 115
        };
        var cost = [0, 45, 0, 140, 0, 30];
        var costlvl = [0, 30, 0, 93, 0, 47];
        this.gear.push(new Gear("Angelic Garments", 8, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 12, recovery: 34,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 145
        };
        var cost = [0, 140, 0, 75, 0, 0];
        var costlvl = [0, 93, 0, 50, 0, 27];
        this.gear.push(new Gear("Terrasque Leather", 8, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 325, damageMin: 0, damageMax: 0, strength: 12,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -150, evasion: -620,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 180
        };
        var cost = [0, 0, 150, 0, 40, 25];
        var costlvl = [0, 0, 100, 0, 27, 43];
        this.gear.push(new Gear("God Plate", 8, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 230, damageMin: 0, damageMax: 0, strength: -15,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 42, accuracy: 0, hit: 0, evasion: 0,
            critPower: 0, critResistance: 200, critChance: -0.12, healthRegen: 0, armor: 31
        };
        var cost = [0, 0, 50, 0, 100, 65];
        var costlvl = [0, 0, 33, 0, 67, 75];
        this.gear.push(new Gear("Sigil of Protection", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 19, damageMax: 32, strength: 50,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: -20, accuracy: 0, hit: 240, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: -16
        };
        var cost = [75, 90, 0, 0, 0, 50];
        var costlvl = [50, 60, 0, 0, 0, 65];
        this.gear.push(new Gear("Aura of Bloodlust", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: -210, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 580, evasion: 580,
            critPower: 220, critResistance: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [60, 0, 0, 140, 0, 15];
        var costlvl = [40, 0, 0, 93, 0, 42];
        this.gear.push(new Gear("Winds of Battle", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 17,
            dexterity: 17, agility: 17, endurance: 17, recovery: 17,
            defense: 17, accuracy: 17, hit: 0, evasion: 0,
            critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [60, 60, 60, 0, 0, 35];
        var costlvl = [40, 40, 40, 0, 0, 55];
        this.gear.push(new Gear("Inner Fire", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //// T8 MOON GEAR ////

        if (MoonlightData.getInstance().moonperks.strtrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 31, strength: 68,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 120, 0, 55, 40];
            var costlvl = [0, 0, 95, 0, 35, 45];
            this.gear.push(new Gear("Shadow Wolf Charm ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.dextrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 68, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 620, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 120, 0, 55, 0, 40];
            var costlvl = [0, 95, 0, 35, 0, 45];
            this.gear.push(new Gear("Moonlight Circlet ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.agitrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 68, endurance: 0, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 620,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 55, 0, 120, 0, 40];
            var costlvl = [0, 35, 0, 95, 0, 45];
            this.gear.push(new Gear("Moon Treads ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.endtrinket.level > 7) {
            var stat = {
                health: 325, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 68, recovery: 0,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 110, critChance: 0, healthRegen: 0, armor: 0
            };
            var cost = [0, 0, 55, 0, 120, 40];
            var costlvl = [0, 0, 35, 0, 95, 45];
            this.gear.push(new Gear("Moonstone ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.rectrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 68,
                defense: 0, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 8.5, armor: 0
            };
            var cost = [120, 0, 0, 27, 28, 40];
            var costlvl = [95, 0, 0, 17, 17, 45];
            this.gear.push(new Gear("Dreamlight Bracer ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.deftrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 68, accuracy: 0, hit: 0, evasion: 0,
                critPower: 0, critResistance: 0, critChance: 0, healthRegen: 0, armor: 31
            };
            var cost = [0, 55, 0, 0, 40, 120];
            var costlvl = [0, 35, 0, 0, 30, 110];
            this.gear.push(new Gear("Shadow Veil ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }

        if (MoonlightData.getInstance().moonperks.acctrinket.level > 7) {
            var stat = {
                health: 0, damageMin: 0, damageMax: 0, strength: 0,
                dexterity: 0, agility: 0, endurance: 0, recovery: 0,
                defense: 0, accuracy: 68, hit: 0, evasion: 0,
                critPower: 230, critResistance: 0, critChance: 0.12, healthRegen: 0, armor: 0
            };
            var cost = [55, 0, 0, 55, 55, 50];
            var costlvl = [36, 0, 0, 36, 36, 36];
            this.gear.push(new Gear("Nightmare Pendant ☼", 8, Statics.GEAR_TRINKET, stat, cost, costlvl));
        }
    }
}