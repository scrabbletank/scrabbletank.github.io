import { Common } from "../utils/Common";
import { ProgressionStore } from "../data/ProgressionStore";
import { GearData } from "../data/GearData";

export class GearDisplay {
    constructor(sceneContext, x, y, gear) {
        //275x220
        var progression = new ProgressionStore();
        if (gear === undefined) {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", "Nothing");
            this.typeLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", "");
            this.statLabel = sceneContext.add.bitmapText(x + 5, y + 45, "courier16", "");
        }
        else {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", gear.name + " Lv" + gear.level);
    
            var types = ["Weapon", "Armor", "Trinket"]
            this.typeLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", "Tier " + gear.tier + " " + types[gear.slotType]);
    
            this.motePower = 1;
            if (gear.level > 0 && progression.unlocks.motes === true) {
                var gearData = new GearData();
                this.motePower = 1 + gearData.getMotePower(gear.motesFused);
            }

            var txt = "";
            for (const prop in gear.statBonuses) {
                if (gear.statBonuses[prop] !== 0) {
                    txt += Common.getBonusText(prop, gear.statBonuses[prop] * this.motePower) + "\n";
                }
            }
            this.statLabel = sceneContext.add.bitmapText(x + 5, y + 45, "courier16", txt);
        }
    }

    getTextBounds() {
        return 10 + 20 + this.statLabel.getTextBounds(true).local.height;
    }

    destroy() {
        this.nameLabel.destroy();
        this.typeLabel.destroy();
        this.statLabel.destroy();
    }
}