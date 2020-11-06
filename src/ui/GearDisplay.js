import { Common } from "../utils/Common";
import { ProgressionStore } from "../data/ProgressionStore";
import { GearData } from "../data/GearData";

export class GearDisplay {
    constructor(sceneContext, x, y, gear) {
        //275x220
        if (gear === undefined) {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", "Nothing");
            this.typeLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", "");
            this.statLabel = sceneContext.add.bitmapText(x + 5, y + 45, "courier16", "");
        }
        else {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", gear.name + " Lv" + gear.level);
    
            var types = ["Weapon", "Armor", "Trinket"]
            this.typeLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", "Tier " + gear.tier + " " + types[gear.slotType]);

            var txt = "";
            var bonus = gear.getStatBonuses();
            for (const prop in bonus) {
                txt += Common.getBonusText(prop, bonus[prop]) + "\n";
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