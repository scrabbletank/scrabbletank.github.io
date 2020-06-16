import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";
import { ProgressionStore } from "../data/ProgressionStore";
import { PlayerData } from "../data/PlayerData";
import { GearData } from "../data/GearData";
import { ImageButton } from "./ImageButton";

export class GearCraftDisplay {
    constructor(sceneContext, x, y, gear) {
        //275x220
        // for checking against crafting unlocks
        var progression = new ProgressionStore();
        //keep reference of gear for callbacks
        this.gear = gear;

        this.backingRect = sceneContext.add.rectangle(x + 1, y + 1, 285 - 2, 210 - 2, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 1;

        this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", gear.name + " Lv" + gear.level);

        var types = ["Weapon", "Armor", "Trinket"]
        var subtext = gear.tier === 0 ? "Broken " + types[gear.slotType] : "Tier " + gear.tier + " " + types[gear.slotType];
        this.typeLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", subtext);
        this.moteButton = undefined;
        this.moteLabel = undefined;

        this.motePower = 0;
        if (gear.level > 0 && progression.unlocks.motes === true) {
            var gearData = new GearData();
            this.motePower = gearData.getMotePower(gear.motesFused);
            if (gear.motesFused > 0) {
                this.moteLabel = sceneContext.add.bitmapText(x + 233, y + 21, "courier16",
                    "+" + Math.floor(this.motePower * 1000) / 10 + "%").setOrigin(1, 0.5);
                this.moteLabel.setTint(Phaser.Display.Color.GetColor(200, 0, 200));
            }
            this.moteButton = new ImageButton(sceneContext, x + 238, y + 5, 32, 32, { sprite: "icons", tile: 39 })
                .onClickHandler(() => { this._onFuse(); });
        }

        this.statLabels = []
        var txt = "";
        for (const prop in gear.statBonuses) {
            if (gear.statBonuses[prop] !== 0) {
                txt += Common.getBonusText(prop, gear.statBonuses[prop] * (1 + this.motePower)) + "\n";
            }
        }
        this.statLabels.push(sceneContext.add.bitmapText(x + 5, y + 45, "courier16", txt));
        if (progression.unlocks.resourceUI === true) {
            var player = new PlayerData();
            var craftCostMulti = gear.tier <= 0 ? 1 : player.craftingCosts[gear.tier - 1];
            txt = "";
            for (var i = 0; i < gear.costs.length; i++) {
                if (gear.costs[i] !== 0) {
                    txt += Common.getCostText(i, Math.floor(gear.costs[i] * craftCostMulti)) + '\n';
                }
            }
            this.statLabels.push(sceneContext.add.bitmapText(x + 175, y + 45, "courier16", txt));
        }
        this.equipBtn = undefined;
        this.upgradeBtn = undefined;

        if (gear.level === 0) {
            this.upgradeBtn = new TextButton(sceneContext, x + 72, y + 185, 135, 20, "Forge");
            this.upgradeBtn.onClickHandler(() => { this._onUpgrade(); });
        } else {
            if (progression.unlocks.resourceUI === true) {
                this.equipBtn = new TextButton(sceneContext, x + 5, y + 185, 135, 20, "Equip");
                this.equipBtn.onClickHandler(() => { this._onEquip(); });
                this.upgradeBtn = new TextButton(sceneContext, x + 145, y + 185, 135, 20, "Upgrade");
                this.upgradeBtn.onClickHandler(() => { this._onUpgrade(); });
            } else {
                this.equipBtn = new TextButton(sceneContext, x + 72, y + 185, 135, 20, "Equip");
                this.equipBtn.onClickHandler(() => { this._onEquip(); });
            }
        }


        this.onEquipHandlers = [];
        this.onUpgradeHandlers = [];
        this.onFuseHandlers = [];
    }

    registerEvents(event, callback) {
        if (event === "onEquip") {
            this.onEquipHandlers.push(callback);
        } else if (event === "onUpgrade") {
            this.onUpgradeHandlers.push(callback);
        } else if (event === "onFuse") {
            this.onFuseHandlers.push(callback);
        }
        return this;
    }

    _onEquip() {
        for (var i = 0; i < this.onEquipHandlers.length; i++) {
            this.onEquipHandlers[i](this.gear);
        }
    }
    _onUpgrade() {
        for (var i = 0; i < this.onUpgradeHandlers.length; i++) {
            this.onUpgradeHandlers[i](this.gear);
        }
    }
    _onFuse() {
        for (var i = 0; i < this.onFuseHandlers.length; i++) {
            this.onFuseHandlers[i](this.gear);
        }
    }

    destroy() {
        this.backingRect.destroy();
        this.nameLabel.destroy();
        this.typeLabel.destroy();
        for (var i = 0; i < this.statLabels.length; i++) {
            this.statLabels[i].destroy();
        }
        if (this.equipBtn !== undefined) {
            this.equipBtn.destroy();
        }
        if (this.upgradeBtn !== undefined) {
            this.upgradeBtn.destroy();
        }
        if (this.moteLabel !== undefined) {
            this.moteLabel.destroy();
        }
        if (this.moteButton !== undefined) {
            this.moteButton.destroy();
        }
    }
}