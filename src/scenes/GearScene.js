import { SceneUIBase } from "./SceneUIBase";
import { TextButton } from "../ui/TextButton";
import { GearCraftDisplay } from "../ui/GearCraftDisplay";
import { Statics } from "../data/Statics";
import { ProgressionStore } from "../data/ProgressionStore";
import { GearDisplay } from "../ui/GearDisplay";
import { Common } from "../utils/Common";
import { GearData } from "../data/GearData";
import { PlayerData } from "../data/PlayerData";

export class GearScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.player = new PlayerData();
        this.page = 0;
        this.gearList = [];
        this.craftDisplays = [];
        this.gearDisplays = [];

        this.progression = new ProgressionStore();
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.allBtn = new TextButton(this, this.relativeX(340), this.relativeY(10), 50, 20, "All");
        this.allBtn.onClickHandler(() => { this._changeFilter(-1); });
        this.tier0Btn = new TextButton(this, this.relativeX(390), this.relativeY(10), 80, 20, "Broken");
        this.tier0Btn.onClickHandler(() => { this._changeFilter(0); });
        this.tier1Btn = new TextButton(this, this.relativeX(470), this.relativeY(10), 30, 20, "T1");
        this.tier1Btn.onClickHandler(() => { this._changeFilter(1); });
        this.tier2Btn = new TextButton(this, this.relativeX(500), this.relativeY(10), 30, 20, "T2");
        this.tier2Btn.onClickHandler(() => { this._changeFilter(2); });
        this.tier3Btn = new TextButton(this, this.relativeX(530), this.relativeY(10), 30, 20, "T3");
        this.tier3Btn.onClickHandler(() => { this._changeFilter(3); });
        this.tier4Btn = new TextButton(this, this.relativeX(560), this.relativeY(10), 30, 20, "T4");
        this.tier4Btn.onClickHandler(() => { this._changeFilter(4); });
        this.tier5Btn = new TextButton(this, this.relativeX(590), this.relativeY(10), 30, 20, "T5");
        this.tier5Btn.onClickHandler(() => { this._changeFilter(5); });
        this.tier6Btn = new TextButton(this, this.relativeX(620), this.relativeY(10), 30, 20, "T6");
        this.tier6Btn.onClickHandler(() => { this._changeFilter(6); });
        this.tier7Btn = new TextButton(this, this.relativeX(650), this.relativeY(10), 30, 20, "T7");
        this.tier7Btn.onClickHandler(() => { this._changeFilter(7); });
        this.tier8Btn = new TextButton(this, this.relativeX(680), this.relativeY(10), 30, 20, "T8");
        this.tier8Btn.onClickHandler(() => { this._changeFilter(8); });

        this.prevPageBtn = new TextButton(this, this.relativeX(850), this.relativeY(10), 20, 20, "<")
            .onClickHandler(() => { this._prevPage(); });
        this.nextPageBtn = new TextButton(this, this.relativeX(870), this.relativeY(10), 20, 20, ">")
            .onClickHandler(() => { this._nextPage(); });

        this.weaponLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Weapon");
        this.armorLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Armor");
        this.trinketLabel = this.add.bitmapText(this.relativeX(0), this.relativeY(0), "courier20", "Trinket");

        this._updateTierButtons();
        this._setupGearDisplays();
        this._changeFilter(-1);

        var progression = new ProgressionStore();
        progression.addOnUnlockHandler((type, count, text) => { this._handleProgressionEvents(type, count, text); });
    }

    _handleProgressionEvents(type, __count, __text) {
        switch (type) {
            case Statics.UNLOCK_RESOURCE_UI:
            case Statics.UNLOCK_CRAFTING_UI:
                this._updateTierButtons();
                this._setupView();
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
        var gearData = new GearData();
        this.gearList = [];
        this.page = 0;
        for (var i = 0; i < gearData.gear.length; i++) {
            if ((filter === -1 || filter === gearData.gear[i].tier) && gearData.gear[i].tier <= gearData.tiersAvailable) {
                this.gearList.push(gearData.gear[i]);
            }
        }
        this._setupView();
    }

    _isEquipedItem(gear) {
        switch (gear.slotType) {
            case Statics.GEAR_WEAPON:
                return this.player.weapon !== undefined && gear.name === this.player.weapon.name;
            case Statics.GEAR_ARMOR:
                return this.player.armor !== undefined && gear.name === this.player.armor.name;
            case Statics.GEAR_TRINKET:
                return this.player.trinket !== undefined && gear.name === this.player.trinket.name;
        }
    }

    _setupGearDisplays() {
        for (var i = 0; i < this.gearDisplays.length; i++) {
            this.gearDisplays[i].destroy();
        }
        this.gearDisplays = [];

        this.weaponLabel.setPosition(this.relativeX(10), this.relativeY(10));
        var h = 10 + this.weaponLabel.getTextBounds(true).local.height;

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
        var craftCostMulti = gear.tier <= 0 ? 1 : this.player.craftingCosts[gear.tier - 1];
        var res = [];
        for (var i = 0; i < gear.costs.length; i++) {
            res.push(gear.costs[i] * craftCostMulti);
        }
        if (Common.canCraft(res, this.player.resources[Math.max(0, gear.tier - 1)]) === false) {
            return;
        }
        this.player.spendResource(res, Math.max(0, gear.tier - 1));
        if (this._isEquipedItem(gear)) {
            this.player.unequip(gear.slotType);
            gear.bringToLevel(gear.level + 1);
            this.player.equip(gear);
            this._setupGearDisplays();
        } else {
            gear.bringToLevel(gear.level + 1);
        }

        this._setupView();
    }
    _onFuseHandler(gear) {
        if (this.player.motes <= 0) {
            return;
        }
        var wasEquipped = this._isEquipedItem(gear);
        if (wasEquipped === true) {
            this.player.unequip(gear.slotType);
        }
        var motesFused = Math.min(this.player.motes, this.scene.get("DarkWorld").buyAmount);
        this.player.addMote(-motesFused);
        gear.motesFused += motesFused;
        if (wasEquipped === true) {
            this.player.equip(gear);
        }
        this._setupView();
        this._setupGearDisplays();
    }

    _setupView() {
        for (var i = 0; i < this.craftDisplays.length; i++) {
            this.craftDisplays[i].destroy();
        }
        this.craftDisplays = [];
        for (var i = this.page * 6; i < Math.min(this.gearList.length, this.page * 6 + 6); i++) {
            var x = this.relativeX(320 + i % 2 * 290);
            var y = this.relativeY(40 + Math.floor((i - this.page * 6) / 2) * 215);
            this.craftDisplays.push(new GearCraftDisplay(this, x, y, this.gearList[i])
                .registerEvents("onEquip", (gear) => { this._onEquipHandler(gear); })
                .registerEvents("onUpgrade", (gear) => { this._onUpgradeHandler(gear); })
                .registerEvents("onFuse", (gear) => { this._onFuseHandler(gear); }));
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
    }
}