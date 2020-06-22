import { Gear } from "./Gear";
import { Statics } from "./Statics";
import { MoonlightData } from "./MoonlightData";

export class GearData {
    constructor() {
        if (!GearData.instance) {
            this.gear = [];
            this._initGear();
            GearData.instance = this;
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
            msc: this.moteSoftCap
        }

        return saveObj;
    }

    load(saveObj, ver) {
        for (var i = 0; i < saveObj.gear.length; i++) {
            this.gear[i].load(saveObj.gear[i], ver);
        }
        this.tiersAvailable = saveObj.ta;
        this.moteSoftCap = saveObj.msc;
    }

    getMotePower(motes) {
        return (Math.min(this.moteSoftCap, motes) +
            Math.pow(Math.max(0, motes - this.moteSoftCap), Statics.MOTE_SOFT_CAP_POWER)) * Statics.MOTE_BONUS
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

    _initGear() {
        var moonData = new MoonlightData();
        this.gear = [];
        this.tiersAvailable = 0;
        this.moteSoftCap = Statics.MOTE_BASE_SOFT_CAP + moonData.moonperks.blackirongear.level * 40;

        // TIER 0

        var stat = {
            health: 0, damageMin: 1, damageMax: 1, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0.25, damageMax: 0.5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [5, 0, 10, 0, 0, 0];
        this.gear.push(new Gear("Broken Sword", 0, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.25
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [0, 10, 0, 5, 0, 0];
        this.gear.push(new Gear("Old Leathers", 0, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 1, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0.5, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 0, 0];
        var costlvl = [10, 0, 0, 0, 5, 0];
        this.gear.push(new Gear("Barrel Lid", 0, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

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
        var statlvl = {
            health: 0, damageMin: 0.75, damageMax: 1.5, strength: 0,
            dexterity: 1, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [10, 0, 25, 5, 0, 0];
        var costlvl = [6, 0, 15, 4, 0, 5];
        this.gear.push(new Gear("Iron Sword", 1, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.05, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0.6, damageMax: 1.6, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.025, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [20, 0, 15, 5, 0, 0];
        var costlvl = [13, 0, 9, 3, 0, 5];
        this.gear.push(new Gear("Iron Axe", 1, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 3, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 15, evasion: 5,
            critDamage: 0, critChance: 0.15, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0.4, damageMax: 0.9, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 10, evasion: 3,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 10, 0, 5];
        var costlvl = [3, 0, 14, 8, 0, 5];
        this.gear.push(new Gear("Dagger", 1, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 3, damageMax: 5, strength: 1,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -15, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 1.25, damageMax: 2, strength: 1,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -7, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [10, 10, 0, 0, 0, 20];
        var costlvl = [8, 8, 0, 0, 0, 14];
        this.gear.push(new Gear("Crystal Hammer", 1, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 6, evasion: 12,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 3, evasion: 6,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.25
        };
        var cost = [0, 10, 0, 30, 0, 0];
        var costlvl = [0, 5, 0, 20, 0, 5];
        this.gear.push(new Gear("Cloak", 1, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 1,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 2
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 1,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.5
        };
        var cost = [0, 30, 0, 10, 0, 0];
        var costlvl = [0, 20, 0, 5, 0, 5];
        this.gear.push(new Gear("Hide Armor", 1, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 5, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -6,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 3
        };
        var statlvl = {
            health: 3, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -4,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 10, 30, 0, 0, 0];
        var costlvl = [0, 5, 20, 0, 0, 5];
        this.gear.push(new Gear("Half Plate", 1, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 2, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 1, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.25
        };
        var cost = [30, 0, 10, 0, 0, 0];
        var costlvl = [17, 0, 10, 0, 0, 8];
        this.gear.push(new Gear("Wooden Shield", 1, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0.3, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0.15, armor: 0
        };
        var cost = [0, 0, 10, 0, 25, 5];
        var costlvl = [0, 0, 7, 0, 20, 8];
        this.gear.push(new Gear("Warm Stone", 1, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 1, agility: 1, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.05, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0.8, agility: 0.8, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 20, 0, 10, 0, 10];
        var costlvl = [0, 15, 0, 7, 0, 13];
        this.gear.push(new Gear("Wolf-Tooth Necklace", 1, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 1, hit: 15, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 1, hit: 8, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 15, 0, 20, 0, 5];
        var costlvl = [0, 10, 0, 17, 0, 8];
        this.gear.push(new Gear("Gloves", 1, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        //////////////////////////////
        // TIER 2
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 11, damageMax: 18, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -40, evasion: 50,
            critDamage: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 3.5, damageMax: 6, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -14, evasion: 20,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [25, 0, 25, 0, 0, 0];
        var costlvl = [14, 0, 14, 0, 0, 7];
        this.gear.push(new Gear("Great Spear", 2, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 9, damageMax: 16, strength: 1,
            dexterity: 4, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 3, damageMax: 4.5, strength: 0.8,
            dexterity: 1.5, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 25, 10, 0, 0];
        var costlvl = [9, 0, 14, 5, 0, 7];
        this.gear.push(new Gear("Steel Sword", 2, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 5, damageMax: 12, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 50, evasion: 0,
            critDamage: 0.1, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 1.75, damageMax: 3.5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 17, evasion: 0,
            critDamage: 0.04, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 15, 0, 10];
        var costlvl = [4, 0, 15, 9, 0, 7];
        this.gear.push(new Gear("Hunting Dagger", 2, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 30, evasion: 75,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 4
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 14, evasion: 27,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 15, 0, 35, 0, 0];
        var costlvl = [0, 9, 0, 19, 0, 7];
        this.gear.push(new Gear("Thief Garb", 2, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 4,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 6
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 2,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1.75
        };
        var cost = [0, 35, 0, 15, 0, 0];
        var costlvl = [0, 19, 0, 9, 0, 7];
        this.gear.push(new Gear("Hunting Leathers", 2, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 20, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -50,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 9
        };
        var statlvl = {
            health: 5, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: -23,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 2.5
        };
        var cost = [0, 0, 35, 15, 0, 0];
        var costlvl = [0, 0, 19, 9, 0, 7];
        this.gear.push(new Gear("Full Plate", 2, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 2, recovery: 0,
            defense: 4, accuracy: 6, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.03, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 1, recovery: 0,
            defense: 1.5, accuracy: 2, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 0, 0, 30, 10];
        var costlvl = [0, 8, 0, 0, 22, 10];
        this.gear.push(new Gear("Lucky Rock", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 50,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 2, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 20,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.25
        };
        var cost = [0, 30, 0, 15, 0, 5];
        var costlvl = [0, 19, 0, 11, 0, 10];
        this.gear.push(new Gear("Boots of Speed", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 6, accuracy: 0, hit: -30, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 2, accuracy: 0, hit: -12, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.5
        };
        var cost = [0, 15, 0, 10, 25, 0];
        var costlvl = [0, 8, 0, 6, 16, 10];
        this.gear.push(new Gear("Heavy Bracers", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 3,
            dexterity: 3, agility: 3, endurance: 3, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 1.2,
            dexterity: 1.2, agility: 1.2, endurance: 1.2, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 25, 0, 0, 15];
        var costlvl = [0, 8, 17, 0, 0, 15];
        this.gear.push(new Gear("Adventurer's Medallion", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        //////////////////////////////
        // TIER 3
        //////////////////////////////

        var stat = {
            health: 0, damageMin: 35, damageMax: 70, strength: 0,
            dexterity: 0, agility: 5, endurance: 0, recovery: 5,
            defense: 0, accuracy: 0, hit: -40, evasion: 50,
            critDamage: 0.2, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 8, damageMax: 15, strength: 0,
            dexterity: 0, agility: 2, endurance: 0, recovery: 2,
            defense: 0, accuracy: 0, hit: -14, evasion: 20,
            critDamage: 0.08, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 35, 0, 20, 0];
        var costlvl = [0, 7, 17, 0, 11, 10];
        this.gear.push(new Gear("Thunder Spear", 3, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 31, damageMax: 64, strength: 0,
            dexterity: 7, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 155, evasion: 0,
            critDamage: 0, critChance: 0.14, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 7, damageMax: 11, strength: 0,
            dexterity: 2.5, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 46, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [15, 0, 40, 0, 0, 10];
        var costlvl = [8, 0, 22, 0, 0, 15];
        this.gear.push(new Gear("Ardent Blade", 3, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 22, damageMax: 30, strength: 14,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 50, evasion: 0,
            critDamage: 0.1, critChance: 0.17, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 4.5, damageMax: 8, strength: 5,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 17, evasion: 0,
            critDamage: 0.04, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 25, 25, 15, 0, 0];
        var costlvl = [0, 15, 15, 5, 0, 10];
        this.gear.push(new Gear("Dire Claw", 3, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 2, damageMax: 5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 170,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 12
        };
        var statlvl = {
            health: 0, damageMin: 1, damageMax: 2.25, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 57,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 3
        };
        var cost = [0, 20, 0, 45, 0, 0];
        var costlvl = [0, 10, 0, 25, 0, 10];
        this.gear.push(new Gear("Assassin Cloak", 3, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 4, recovery: 7,
            defense: 0, accuracy: 0, hit: 100, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 19
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 1.5, recovery: 3,
            defense: 0, accuracy: 0, hit: 36, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 4.25
        };
        var cost = [0, 45, 0, 20, 0, 0];
        var costlvl = [0, 25, 0, 10, 0, 10];
        this.gear.push(new Gear("Beastmaster Vest", 3, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 40, damageMin: 0, damageMax: 0, strength: 4,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -30, evasion: -160,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 26
        };
        var statlvl = {
            health: 13, damageMin: 0, damageMax: 0, strength: 1.5,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: -11, evasion: -48,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 6
        };
        var cost = [0, 20, 45, 0, 0, 0];
        var costlvl = [0, 10, 25, 0, 0, 10];
        this.gear.push(new Gear("Lizardscale Armor", 3, Statics.GEAR_ARMOR, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 11, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 7, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 4, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 2.75, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 40, 0, 15, 0, 10];
        var costlvl = [0, 27, 0, 10, 0, 13];
        this.gear.push(new Gear("Wolf Gloves", 3, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 211, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 79, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 0, 0, 0, 35, 30];
        var costlvl = [0, 0, 0, 0, 24, 26];
        this.gear.push(new Gear("Hyperstone", 3, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 10, accuracy: 0, hit: 0, evasion: -70,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 5
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 3.5, accuracy: 0, hit: 0, evasion: -24,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [15, 10, 40, 0, 0, 0];
        var costlvl = [9, 6, 22, 0, 0, 13];
        this.gear.push(new Gear("Tower Shield", 3, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 12,
            dexterity: 0, agility: 0, endurance: 5, recovery: 0,
            defense: 0, accuracy: 0, hit: -60, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 5,
            dexterity: 0, agility: 0, endurance: 2, recovery: 0,
            defense: 0, accuracy: 0, hit: -17, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 35, 0, 20, 10, 0];
        var costlvl = [0, 18, 0, 13, 6, 13];
        this.gear.push(new Gear("Ogre Belt", 3, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));
    }
}