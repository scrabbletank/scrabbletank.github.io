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
        var costlvl = [0, 15, 0, 8, 0, 0];
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
        var costlvl = [12, 0, 0, 0, 4, 0];
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
        var costlvl = [10, 0, 15, 5, 0, 2];
        this.gear.push(new Gear("Iron Sword", 1, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 1, damageMax: 5, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.05, critChance: 0.07, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0.6, damageMax: 1.6, strength: 0,
            dexterity: 1, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0.025, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [20, 0, 20, 5, 0, 0];
        var costlvl = [12, 0, 12, 5, 0, 4];
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
        var costlvl = [3, 0, 15, 8, 0, 5];
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
        var cost = [10, 15, 0, 0, 0, 20];
        var costlvl = [8, 12, 0, 0, 0, 15];
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
        var costlvl = [0, 10, 0, 20, 0, 5];
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
        var costlvl = [0, 20, 0, 10, 0, 5];
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
        var cost = [0, 10, 30, 0, 0, 5];
        var costlvl = [0, 8, 20, 0, 0, 5];
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
        var cost = [30, 0, 10, 0, 5, 0];
        var costlvl = [15, 0, 10, 0, 5, 3];
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
        var costlvl = [0, 0, 5, 0, 20, 8];
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
        var costlvl = [0, 15, 0, 8, 0, 5];
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
        var cost = [10, 0, 10, 25, 0, 0];
        var costlvl = [5, 0, 5, 15, 0, 0];
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
        var cost = [20, 0, 20, 0, 0, 0];
        var costlvl = [15, 0, 15, 0, 0, 5];
        this.gear.push(new Gear("Great Spear", 2, Statics.GEAR_WEAPON, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 9, damageMax: 16, strength: 1,
            dexterity: 4, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0.12, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 3, damageMax: 4.5, strength: 1,
            dexterity: 2, agility: 0, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [10, 0, 25, 5, 0, 0];
        var costlvl = [10, 0, 15, 5, 0, 5];
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
            defense: 0, accuracy: 0, hit: 30, evasion: 0,
            critDamage: 0.05, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [5, 0, 20, 10, 0, 5];
        var costlvl = [3, 0, 15, 8, 0, 5];
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
            defense: 0, accuracy: 0, hit: 16, evasion: 32,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var cost = [0, 10, 0, 30, 0, 0];
        var costlvl = [0, 10, 0, 20, 0, 5];
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
        var cost = [0, 30, 0, 10, 0, 0];
        var costlvl = [0, 20, 0, 10, 0, 5];
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
            defense: 0, accuracy: 0, hit: 0, evasion: -33,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 2.5
        };
        var cost = [0, 0, 30, 10, 0, 5];
        var costlvl = [0, 20, 0, 8, 0, 5];
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
            defense: 2, accuracy: 3, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 0, 0, 30, 5];
        var costlvl = [0, 5, 0, 0, 20, 5];
        this.gear.push(new Gear("Lucky Rock", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 5, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 50,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 3, endurance: 0, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 25,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.5
        };
        var cost = [0, 25, 0, 15, 0, 5];
        var costlvl = [0, 15, 0, 10, 0, 5];
        this.gear.push(new Gear("Boots of Speed", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 8, accuracy: 0, hit: -30, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 1
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 0,
            dexterity: 0, agility: 0, endurance: 0, recovery: 0,
            defense: 4, accuracy: 0, hit: -17, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0.5
        };
        var cost = [10, 10, 0, 0, 25, 0];
        var costlvl = [5, 5, 0, 0, 15, 0];
        this.gear.push(new Gear("Heavy Bracers", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));

        var stat = {
            health: 0, damageMin: 0, damageMax: 0, strength: 3,
            dexterity: 3, agility: 3, endurance: 3, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var statlvl = {
            health: 0, damageMin: 0, damageMax: 0, strength: 2,
            dexterity: 2, agility: 2, endurance: 2, recovery: 0,
            defense: 0, accuracy: 0, hit: 0, evasion: 0,
            critDamage: 0, critChance: 0, healthRegen: 0, armor: 0
        };
        var cost = [0, 10, 20, 0, 0, 15];
        var costlvl = [0, 0, 5, 15, 0, 10];
        this.gear.push(new Gear("Adventurer's Medallion", 2, Statics.GEAR_TRINKET, stat, statlvl, cost, costlvl));
    }
}