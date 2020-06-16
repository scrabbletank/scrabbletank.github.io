import { TooltipRegistry } from "../data/TooltipRegistry";
import { TownData } from "../data/TownData";
import { Statics } from "../data/Statics";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class TechDisplay {
    constructor(sceneContext, x, y, tech, townTier) {
        //keep reference for callbacks
        this.tech = tech;
        this.townTier = townTier;

        this.backingRect = sceneContext.add.rectangle(x + 1, y + 1, 650 - 2, 115 - 2, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 112, 65);
        this.backingRect.lineWidth = 1;

        this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", tech.name + " Lv" + tech.level);
        this.nameLabel.setTint(Phaser.Display.Color.GetColor(212, 175, 55));

        var descText = Common.processText(TooltipRegistry.getTechTooltip(tech, townTier), 77);
        this.descLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", descText);

        var costText = "Cost: " + TownData.getTechGoldCost(tech, townTier) + " Gold";
        var resourceCosts = TownData.getTechResourceCost(tech, townTier);
        for (var i = 0; i < resourceCosts.length; i++) {
            if (resourceCosts[i] > 0) {
                costText += ", " + Common.getCostText(i, resourceCosts[i]);
            }
        }
        costText = Common.processText(costText, 67);
        this.costLabel = sceneContext.add.bitmapText(x + 5, y + 80, "courier16", costText);

        if (tech.maxLevel !== -1 && tech.level >= tech.maxLevel) {
            this.buyBtn = new TextButton(sceneContext, x + 545, y + 90, 100, 20, "Maxed")
                .onClickHandler(() => { this._onClick(); });
            this.buyBtn.setEnable(false);
        } else {
            this.buyBtn = new TextButton(sceneContext, x + 545, y + 90, 100, 20, "Upgrade")
                .onClickHandler(() => { this._onClick(); });
        }

        this.onClickHandlers = [];
    }

    registerClick(callback) {
        this.onClickHandlers.push(callback);
        return this;
    }

    _onClick() {
        for (var i = 0; i < this.onClickHandlers.length; i++) {
            this.onClickHandlers[i]();
        }
    }

    destroy() {
        this.backingRect.destroy();
        this.nameLabel.destroy();
        this.descLabel.destroy();
        this.costLabel.destroy();
        this.buyBtn.destroy();
    }
}