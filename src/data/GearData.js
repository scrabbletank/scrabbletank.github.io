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
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [5, 0, 10, 0, 0, 0];
        this.gear.push(new Gear("Broken Sword", 0, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [0, 10, 0, 5, 0, 0];
        this.gear.push(new Gear("Old Leathers", 0, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 1, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
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
            health: 0, damageMin: 2, damageMax: 4, strength: 0,
            dexterity: 1, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [10, 0, 25, 5, 0, 0];
        var costlvl = [6, 0, 15, 4, 0, 5];
        this.gear.push(new Gear("Iron Sword", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.05, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var cost = [20, 0, 15, 5, 0, 0];
        var costlvl = [13, 0, 9, 3, 0, 5];
        this.gear.push(new Gear("Iron Axe", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 2.75, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 15, evasion: 5,
            critDamage: 0, critChance: 0.15, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 10, 0, 5];
        var costlvl = [3, 0, 14, 8, 0, 5];
        this.gear.push(new Gear("Dagger", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 3, damageMax: 5.25, strength: 1,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -15, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [10, 10, 0, 0, 0, 20];
        var costlvl = [8, 8, 0, 0, 0, 14];
        this.gear.push(new Gear("Crystal Hammer", 1, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 6, evasion: 12,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 10, 0, 30, 0, 0];
        var costlvl = [0, 5, 0, 20, 0, 5];
        this.gear.push(new Gear("Cloak", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 1.5,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 2
        };
        var cost = [0, 30, 0, 10, 0, 0];
        var costlvl = [0, 20, 0, 5, 0, 5];
        this.gear.push(new Gear("Hide Armor", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 7, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -7,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 3
        };
        var cost = [0, 10, 30, 0, 0, 0];
        var costlvl = [0, 5, 20, 0, 0, 5];
        this.gear.push(new Gear("Half Plate", 1, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 2, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [30, 0, 10, 0, 0, 0];
        var costlvl = [17, 0, 10, 0, 0, 8];
        this.gear.push(new Gear("Wooden Shield", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0.4, armor: 0
        };
        var cost = [0, 0, 10, 0, 25, 5];
        var costlvl = [0, 0, 7, 0, 20, 8];
        this.gear.push(new Gear("Warm Stone", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 1.3, agility: 1.3, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [0, 20, 0, 10, 0, 10];
        var costlvl = [0, 15, 0, 7, 0, 13];
        this.gear.push(new Gear("Wolf-Tooth Necklace", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 1.45, hit: 15, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 15, 0, 20, 0, 5];
        var costlvl = [0, 10, 0, 17, 0, 8];
        this.gear.push(new Gear("Gloves", 1, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //////////////////////////////
        // TIER 2
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 10, damageMax: 18, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -30, evasion: 40,
            critDamage: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var cost = [25, 0, 25, 0, 0, 0];
        var costlvl = [14, 0, 14, 0, 0, 7];
        this.gear.push(new Gear("Great Spear", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 7, damageMax: 14, strength: 1.5,
            dexterity: 4, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 25, 10, 0, 0];
        var costlvl = [9, 0, 14, 5, 0, 7];
        this.gear.push(new Gear("Steel Sword", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 6, damageMax: 10, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 50, evasion: 0,
            critDamage: 0.1, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 15, 0, 10];
        var costlvl = [4, 0, 15, 9, 0, 7];
        this.gear.push(new Gear("Hunting Dagger", 2, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 30, evasion: 65,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 4
        };
        var cost = [0, 15, 0, 35, 0, 0];
        var costlvl = [0, 9, 0, 19, 0, 7];
        this.gear.push(new Gear("Thief Garb", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 4,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 6
        };
        var cost = [0, 35, 0, 15, 0, 0];
        var costlvl = [0, 19, 0, 9, 0, 7];
        this.gear.push(new Gear("Hunting Leathers", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 20, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -35,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 8
        };
        var cost = [0, 0, 35, 15, 0, 0];
        var costlvl = [0, 0, 19, 9, 0, 7];
        this.gear.push(new Gear("Full Plate", 2, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 2, recovery: 0,
            defense: 4, accuracy: 5, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.03, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 0, 0, 30, 10];
        var costlvl = [0, 8, 0, 0, 22, 10];
        this.gear.push(new Gear("Lucky Rock", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 4, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 40,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 30, 0, 15, 0, 5];
        var costlvl = [0, 19, 0, 11, 0, 10];
        this.gear.push(new Gear("Boots of Speed", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 6, accuracy: 0, hit: -19, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1.5
        };
        var cost = [0, 15, 0, 10, 25, 0];
        var costlvl = [0, 8, 0, 6, 16, 10];
        this.gear.push(new Gear("Heavy Bracers", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 3,
            dexterity: 3, agility: 3, endurance: 3, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 25, 0, 0, 15];
        var costlvl = [0, 8, 17, 0, 0, 15];
        this.gear.push(new Gear("Adventurer's Medallion", 2, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //////////////////////////////
        // TIER 3
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 24, damageMax: 50, strength: 0,
            dexterity: 0, agility: 5, endurance: 0, recovery: 6,
            defense: 0, accuracy: 0, hit: -37, evasion: 48,
            critDamage: 0.15, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 35, 0, 20, 0];
        var costlvl = [0, 7, 17, 0, 11, 10];
        this.gear.push(new Gear("Thunder Spear", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 23, damageMax: 38, strength: 0,
            dexterity: 6, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 57, evasion: 0,
            critDamage: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 40, 0, 0, 10];
        var costlvl = [8, 0, 22, 0, 0, 15];
        this.gear.push(new Gear("Ardent Blade", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 17, damageMax: 24, strength: 8,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 76, evasion: 0,
            critDamage: 0.1, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [0, 25, 25, 15, 0, 0];
        var costlvl = [0, 15, 15, 5, 0, 10];
        this.gear.push(new Gear("Dire Claw", 3, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 2, damageMax: 3.75, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 170,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 11
        };
        var cost = [0, 20, 0, 45, 0, 0];
        var costlvl = [0, 10, 0, 25, 0, 10];
        this.gear.push(new Gear("Assassin Cloak", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 4, recovery: 7,
            defense: 0, accuracy: 0, hit: 100, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 16
        };
        var cost = [0, 45, 0, 20, 0, 0];
        var costlvl = [0, 25, 0, 10, 0, 10];
        this.gear.push(new Gear("Beastmaster Vest", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 43, damageMin: 0, damageMax: 0, strength: 4,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -36, evasion: -144,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 22
        };
        var cost = [0, 20, 45, 0, 0, 0];
        var costlvl = [0, 10, 25, 0, 0, 10];
        this.gear.push(new Gear("Lizardscale Armor", 3, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 9, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 6, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var cost = [0, 40, 0, 15, 0, 10];
        var costlvl = [0, 27, 0, 10, 0, 13];
        this.gear.push(new Gear("Wolf Gloves", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 211, evasion: 33,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 35, 30];
        var costlvl = [0, 0, 0, 0, 24, 26];
        this.gear.push(new Gear("Hyperstone", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 10, accuracy: 0, hit: 0, evasion: -54,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 5
        };
        var cost = [15, 10, 40, 0, 0, 0];
        var costlvl = [9, 6, 22, 0, 0, 13];
        this.gear.push(new Gear("Tower Shield", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 10,
            dexterity: 0, agility: 0, endurance: 6, recovery: 0,
            defense: 0, accuracy: 0, hit: -38, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 35, 0, 20, 10, 0];
        var costlvl = [0, 18, 0, 13, 6, 13];
        this.gear.push(new Gear("Ogre Belt", 3, Statics.GEAR_TRINKET, stat, cost, costlvl));

        //////////////////////////////
        // TIER 4
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 47, damageMax: 97, strength: 13,
            dexterity: 0, agility: 0, endurance: 5, recovery: 0,
            defense: 0, accuracy: 0, hit: -74, evasion: 0,
            critDamage: 0, critChance: 0.16, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 35, 0, 20, 0];
        var costlvl = [0, 7, 17, 0, 11, 10];
        this.gear.push(new Gear("Giant's Axe", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 46, damageMax: 73, strength: 0,
            dexterity: 0, agility: 9, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 147, evasion: 0,
            critDamage: 0.18, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 40, 0, 0, 10];
        var costlvl = [8, 0, 22, 0, 0, 15];
        this.gear.push(new Gear("Elven Longsword", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 39, damageMax: 54, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 9, hit: 230, evasion: 0,
            critDamage: 0, critChance: 0.19, healthRegen: 3, armor: 0
        };
        var cost = [0, 25, 25, 15, 0, 0];
        var costlvl = [0, 15, 15, 5, 0, 10];
        this.gear.push(new Gear("Sacrificial Dagger", 4, Statics.GEAR_WEAPON, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 8, agility: 8, endurance: 0, recovery: 0,
            defense: 8, accuracy: 0, hit: 0, evasion: 190,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 20
        };
        var cost = [0, 20, 0, 45, 0, 0];
        var costlvl = [0, 10, 0, 25, 0, 10];
        this.gear.push(new Gear("Spellweave Robe", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 11,
            dexterity: 0, agility: 0, endurance: 0, recovery: 8,
            defense: 0, accuracy: 0, hit: 100, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 29
        };
        var cost = [0, 45, 0, 20, 0, 0];
        var costlvl = [0, 25, 0, 10, 0, 10];
        this.gear.push(new Gear("Dire Bear Cloak", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: 68, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 13, accuracy: 0, hit: -50, evasion: -210,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 38
        };
        var cost = [0, 20, 45, 0, 0, 0];
        var costlvl = [0, 10, 25, 0, 0, 10];
        this.gear.push(new Gear("Ancient Armor", 4, Statics.GEAR_ARMOR, stat, cost, costlvl));

        var stat = {
            health: -24, damageMin: 0, damageMax: 0, strength: 15,
            dexterity: 15, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.25, critChance: 0, healthRegen: -1.3, armor: 0
        };
        var cost = [0, 40, 0, 15, 0, 10];
        var costlvl = [0, 27, 0, 10, 0, 13];
        this.gear.push(new Gear("Demonic Sigil", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 10, accuracy: 7, hit: 0, evasion: -60,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 8
        };
        var cost = [0, 0, 0, 0, 35, 30];
        var costlvl = [0, 0, 0, 0, 24, 26];
        this.gear.push(new Gear("Mirror Shield", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 7.5, damageMax: 10.5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 1, armor: 0
        };
        var cost = [15, 10, 40, 0, 0, 0];
        var costlvl = [9, 6, 22, 0, 0, 13];
        this.gear.push(new Gear("Dragonbone Charm", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 9, agility: 9, endurance: 5, recovery: 0,
            defense: 0, accuracy: 5, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var cost = [0, 35, 0, 20, 10, 0];
        var costlvl = [0, 18, 0, 13, 6, 13];
        this.gear.push(new Gear("Spirit Ring", 4, Statics.GEAR_TRINKET, stat, cost, costlvl));
    }
}