import { SceneUIBase } from "./SceneUIBase";
import { TextButton } from "../ui/TextButton";
import { GearCraftDisplay } from "../ui/GearCraftDisplay";
import { Statics } from "../data/Statics";
import { ProgressionStore } from "../data/ProgressionStore";
import { GearDisplay } from "../ui/GearDisplay";
import { GearData } from "../data/GearData";
import { PlayerData } from "../data/PlayerData";
import { GearRuneWindow } from "../ui/GearRuneWindow";
import { ImageButton } from "../ui/ImageButton";
import { RuneUpgradeWindow } from "../ui/RuneUpgradeWindow";
import { WorldData } from "../data/WorldData";
import { Common } from "../utils/Common";

export class GearScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.player = new PlayerData();
        this.page = 0;
        this.gearList = [];
        this.craftDisplays = [];
        this.gearDisplays = [];

        this.progression = new ProgressionStore();

        WorldData.getInstance().time.registerEvent("onDayEnd", () => { this._setupView(); });
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.runeBtn = new ImageButton(this, this.relativeX(250), this.relativeY(10), 32, 32, { sprite: "runeicons", tile: 0 });
        this.runeBtn.onClickHandler(() => { this._onRuneUpgradeHandler(); });
        this.runeBtn.setVisible(ProgressionStore.getInstance().unlocks.runes);
        var tx = 290;
        this.equipedBtn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "E");
        this.equipedBtn.onClickHandler(() => { this._changeFilter(-2); });
        tx += 30;
        this.allBtn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 50, 20, "All");
        this.allBtn.onClickHandler(() => { this._changeFilter(-1); });
        tx += 50;
        this.tier0Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 80, 20, "Broken");
        this.tier0Btn.onClickHandler(() => { this._changeFilter(0); });
        tx += 80;
        this.tier1Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T1");
        this.tier1Btn.onClickHandler(() => { this._changeFilter(1); });
        tx += 30;
        this.tier2Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T2");
        this.tier2Btn.onClickHandler(() => { this._changeFilter(2); });
        tx += 30;
        this.tier3Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T3");
        this.tier3Btn.onClickHandler(() => { this._changeFilter(3); });
        tx += 30;
        this.tier4Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T4");
        this.tier4Btn.onClickHandler(() => { this._changeFilter(4); });
        tx += 30;
        this.tier5Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T5");
        this.tier5Btn.onClickHandler(() => { this._changeFilter(5); });
        tx += 30;
        this.tier6Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T6");
        this.tier6Btn.onClickHandler(() => { this._changeFilter(6); });
        tx += 30;
        this.tier7Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T7");
        this.tier7Btn.onClickHandler(() => { this._changeFilter(7); });
        tx += 30;
        this.tier8Btn = new TextButton(this, this.relativeX(tx), this.relativeY(10), 30, 20, "T8");
        this.tier8Btn.onClickHandler(() => { this._changeFilter(8); });

        this.prevPageBtn = new TextButton(this, this.relativeX(850), this.relativeY(10), 20, 20, "<")
            .onClickHandler(() => { this._prevPage(); });
        this.nextPageBtn = new TextButton(this, this.relativeX(870), this.relativeY(10), 20, 20, ">")
            .onClickHandler(() => { this._nextPage(); });

        this.buyMaxLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(10), "courier20", "Upgrade Amount:");
        this.buyMaxButton = new TextButton(this, this.relativeX(170), this.relativeY(10), 40, 20, "1x")
            .onClickHandler(() => { this._toggleBuyMax(); });
        this.craftingCostLabel = this.add.bitmapText(this.relativeX(10), this.relativeY(60), "courier16", "Crafting Cost: 100%");
        this.weaponLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Weapon");
        this.armorLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Armor");
        this.trinketLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Trinket");


        this._updateTierButtons();
        this._setupGearDisplays();
        this._changeFilter(-1);

        this.buyMax = false;

        var progression = new ProgressionStore();
        progression.addOnUnlockHandler((type, count, text) => { this._handleProgressionEvents(type, count, text); });
    }

    _handleProgressionEvents(type, __count, __text) {
        switch (type) {
            case Statics.UNLOCK_RESOURCE_UI:
            case Statics.UNLOCK_CRAFTING_UI:
            case Statics.UNLOCK_RUNES_UI:
                this._updateTierButtons();
                this._setupView();
                this.runeBtn.setVisible(ProgressionStore.getInstance().unlocks.runes);
                break;
        }
    }

    _updateTierButtons() {
        var gearData = new GearData();
        this.tier1Btn.setVisible(gearData.tiersAvailable >= 1);
        this.tier2Btn.setVisible(gearData.tiersAvailable >= 2);
        this.tier3Btn.setVisible(gearData.tiersAvailable >= 3);
        this.tier4Btn.setVisible(gearData.tiersAvailable >= 4);
        this.tier5Btn.setVisible(gearData.tiersAvailable >= 5);
        this.tier6Btn.setVisible(gearData.tiersAvailable >= 6);
        this.tier7Btn.setVisible(gearData.tiersAvailable >= 7);
        this.tier8Btn.setVisible(gearData.tiersAvailable >= 8);
    }

    _toggleBuyMax() {
        this.buyMax = this.buyMax === true ? false : true;
        this.buyMaxButton.setText(this.buyMax === true ? "Max" : "1x");
    }

    _nextPage() {
        if (this.page * 6 + 6 < this.gearList.length) {
            this.page += 1;
        }
        this._setupView();
    }
    _prevPage() {
        if (this.page > 0) {
            this.page -= 1;
        }
        this._setupView();
    }

    _changeFilter(filter) {
        if (filter === -2) {
            this.craftingCostLabel.setText("Crafting Cost: N/A");
        } else if (filter === -1) {
            this.craftingCostLabel.setText("Crafting Cost: N/A");
        } else if (filter === 0) {
            this.craftingCostLabel.setText("Crafting Cost: 100%");
        } else {
            this.craftingCostLabel.setText("Crafting Cost: " + (Math.round(this.player.getCraftingCosts(filter - 1) * 10000) / 100) + "%");
        }
        var gearData = new GearData();
        this.gearList = [];
        this.page = 0;
        for (var i = 0; i < gearData.gear.length; i++) {
            if (filter === -2 && PlayerData.getInstance().isEquipedItem(gearData.gear[i])) {
                this.gearList.push(gearData.gear[i]);
            }
            else if ((filter === -1 || filter === gearData.gear[i].tier) && gearData.gear[i].tier <= gearData.tiersAvailable) {
                this.gearList.push(gearData.gear[i]);
            }
        }
        this._setupView();
    }

    _setupGearDisplays() {
        for (var i = 0; i < this.gearDisplays.length; i++) {
            this.gearDisplays[i].destroy();
        }
        this.gearDisplays = [];

        this.weaponLabel.setPosition(this.relativeX(10), this.relativeY(80));
        var h = 80 + this.weaponLabel.getTextBounds(true).local.height;

        this.gearDisplays.push(new GearDisplay(this, this.relativeX(20), this.relativeY(h), this.player.weapon));
        h += 20 + this.gearDisplays[0].getTextBounds();

        this.armorLabel.setPosition(this.relativeX(10), this.relativeY(h));
        h += this.armorLabel.getTextBounds(true).local.height;

        this.gearDisplays.push(new GearDisplay(this, this.relativeX(20), this.relativeY(h), this.player.armor));
        h += 20 + this.gearDisplays[1].getTextBounds();

        this.trinketLabel.setPosition(this.relativeX(10), this.relativeY(h));
        h += this.trinketLabel.getTextBounds(true).local.height;

        this.gearDisplays.push(new GearDisplay(this, this.relativeX(20), this.relativeY(h), this.player.trinket));
    }

    _onEquipHandler(gear) {
        this.player.equip(gear);
        this._setupView();
        this._setupGearDisplays();
    }
    _onUpgradeHandler(gear) {
        if (this.buyMax === true) {
            var cost = GearData.getInstance().getGearCost(gear);
            while (Common.canCraft(cost[0], PlayerData.getInstance().resources[cost[1]])) {
                GearData.getInstance().upgradeGear(gear);
                cost = GearData.getInstance().getGearCost(gear);
            }
        } else {
            GearData.getInstance().upgradeGear(gear);
        }
        this._setupGearDisplays();
        this._setupView();
    }
    _onFuseHandler(gear) {
        var motesFused = Math.min(this.player.motes, this.scene.get("DarkWorld").buyAmount);
        GearData.getInstance().fuseGear(gear, motesFused);

        this._setupView();
        this._setupGearDisplays();
    }
    _onRuneHandler(gear) {
        this._closeRuneWindow();
        this.runeWindow = new GearRuneWindow(this, 350, 150, gear);
        this.runeWindow.onCancelHandler(() => { this._closeRuneWindow(); });
    }
    _onRuneUpgradeHandler(gear) {
        this._closeRuneWindow();
        this.runeWindow = new RuneUpgradeWindow(this, 350, 150, gear);
        this.runeWindow.onCancelHandler(() => { this._closeRuneWindow(); });
    }

    _closeRuneWindow() {
        if (this.runeWindow !== undefined) {
            this.runeWindow.destroy();
            this.runeWindow = undefined;
        }
    }

    _setupView() {
        for (var i = 0; i < this.craftDisplays.length; i++) {
            this.craftDisplays[i].destroy();
        }
        this.craftDisplays = [];
        for (var i = this.page * 6; i < Math.min(this.gearList.length, this.page * 6 + 6); i++) {
            var x = this.relativeX(290 + i % 2 * 305);
            var y = this.relativeY(40 + Math.floor((i - this.page * 6) / 2) * 215);
            this.craftDisplays.push(new GearCraftDisplay(this, x, y, this.gearList[i])
                .registerEvents("onEquip", (gear) => { this._onEquipHandler(gear); })
                .registerEvents("onUpgrade", (gear) => { this._onUpgradeHandler(gear); })
                .registerEvents("onFuse", (gear) => { this._onFuseHandler(gear); })
                .registerEvents("onRune", (gear) => { this._onRuneHandler(gear); }));
        }
    }

    refresh(changeFilter = true) {
        this._updateTierButtons();
        this._setupGearDisplays();
        if (changeFilter) {
            this._changeFilter(-1);
        }
    }

    rebirth() {
        this._updateTierButtons();
        this._setupGearDisplays();
        this._changeFilter(-1);
    }

    update(__time, __delta) {
        if (this.progression.unlocks.exploreTab === false) {
            if (this.player.weapon !== undefined &&
                this.player.armor !== undefined &&
                this.player.trinket !== undefined) {
                this.progression.registerFeatureUnlocked(Statics.UNLOCK_EXPLORE_TAB,
                    "Now that you're all equipped it's time to explore. It's not like\n" +
                    "staying here is going to do you any good.\n");
            }
        }
        if (this.runeWindow !== undefined) {
            this.runeWindow.update();
        }
    }
}