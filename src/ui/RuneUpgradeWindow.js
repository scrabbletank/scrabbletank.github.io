import { PlayerData } from "../data/PlayerData";
import { RuneRegistry } from "../data/RuneRegistry";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { FloatingTooltip } from "./FloatingTooltip";
import { ImageButton } from "./ImageButton";
import { TextButton } from "./TextButton";

export class RuneUpgradeWindow {
    constructor(sceneContext, x, y) {
        this.selectedRune = -1;
        this.scene = sceneContext;
        this.x = x;
        this.y = y;
        this.backRect = sceneContext.add.rectangle(x, y, 700, 500, Phaser.Display.Color.GetColor(0, 0, 0))
            .setInteractive()
            .setOrigin(0, 0).setDepth(999);
        this.backRect.isStroked = true;
        this.backRect.strokeColor = Phaser.Display.Color.GetColor(128, 128, 128);
        this.backRect.lineWidth = 2;
        this.separator = sceneContext.add.rectangle(x + 250, y, 2, 500,
            Phaser.Display.Color.GetColor(128, 128, 128)).setOrigin(0, 0).setDepth(999);

        this.upgradeTitle = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", "UPGRADE").setOrigin(0, 0).setDepth(999);
        this.runeTitle = sceneContext.add.bitmapText(x + 260, y + 5, "courier20", "RUNES").setOrigin(0, 0).setDepth(999);
        this.sortNameBtn = new TextButton(this.scene, this.x + 350, this.y + 5, 35, 20, "A-Z", 999)
            .onClickHandler(() => { this._sortRunes(0); });
        this.sortLevelBtn = new TextButton(this.scene, this.x + 390, this.y + 5, 35, 20, "Lv", 999)
            .onClickHandler(() => { this._sortRunes(1); });

        this.runeInventory = [];
        this.upgradeRune = this.scene.add.image(x + 125, y + 50, "runeicons", 0).setOrigin(0.5).setDepth(999);
        this.upgradeRune.displayWidth = 48;
        this.upgradeRune.displayHeight = 48;
        this.runeText = [];

        this.upgradeBtn = new TextButton(this.scene, this.x + 20, this.y + 315, 120, 20, "Upgrade", 999);
        this.upgradeBtn.onClickHandler(() => { this._upgradeRune(); });
        this.rerollBtn = new TextButton(this.scene, this.x + 20, this.y + 390, 120, 20, "Reroll", 999);
        this.rerollBtn.onClickHandler(() => { this._rerollRune(); });
        this.shatterBtn = new TextButton(this.scene, this.x + 20, this.y + 465, 120, 20, "Shatter", 999);
        this.shatterBtn.onClickHandler(() => { this._shatterRune(); });
        this.upgradeTxt = this.scene.add.bitmapText(this.x + 125, this.y + 275, "courier16",
            "Empower this rune with\nMotes of Darkness").setOrigin(0.5, 0).setDepth(999);
        this.upgradeTxt.setCenterAlign();
        this.rerollTxt = this.scene.add.bitmapText(this.x + 125, this.y + 345, "courier16",
            "Use Motes to Reforge this\nRune into a different Rune.").setOrigin(0.5, 0).setDepth(999);
        this.rerollTxt.setCenterAlign();
        this.shatterTxt = this.scene.add.bitmapText(this.x + 125, this.y + 420, "courier16",
            "Shatter this rune for\nMotes of Darkness.").setOrigin(0.5, 0).setDepth(999);
        this.shatterTxt.setCenterAlign();
        this.upgradeCost = this.scene.add.bitmapText(this.x + 205, this.y + 316, "courier16", "").setOrigin(1, 0).setDepth(999);
        this.rerollCost = this.scene.add.bitmapText(this.x + 205, this.y + 391, "courier16", "").setOrigin(1, 0).setDepth(999);
        this.shatterCost = this.scene.add.bitmapText(this.x + 205, this.y + 466, "courier16", "").setOrigin(1, 0).setDepth(999);
        this.upgradeIcon = this.scene.add.image(x + 220, y + 325, "icons", 39).setDepth(999);
        this.upgradeIcon.displayWidth = 20;
        this.upgradeIcon.displayHeight = 20;
        this.rerollIcon = this.scene.add.image(x + 220, y + 400, "icons", 39).setDepth(999);
        this.rerollIcon.displayWidth = 20;
        this.rerollIcon.displayHeight = 20;
        this.shatterIcon = this.scene.add.image(x + 220, y + 475, "icons", 39).setDepth(999);
        this.shatterIcon.displayWidth = 20;
        this.shatterIcon.displayHeight = 20;
        this.upgradeUI = [
            this.upgradeTxt, this.upgradeBtn, this.rerollTxt, this.rerollBtn,
            this.upgradeCost, this.rerollCost, this.upgradeIcon, this.rerollIcon,
            this.shatterTxt, this.shatterBtn, this.shatterCost, this.shatterIcon
        ];

        this.cancelBtn = new TextButton(this.scene, this.x + 575, this.y + 475, 120, 20, "Cancel", 999);

        this.page = 0;
        this.pageBtns = [];

        this._setupViews();
        for (var i = 0; i < this.upgradeUI.length; i++) {
            this.upgradeUI[i].setVisible(false);
        }
    }

    _sortRunes(sortType) {
        PlayerData.getInstance().sortRunes(sortType);
        this._switchPage(0);
    }

    _setupPageBtn(x, y, idx) {
        var pageBtn = new TextButton(this.scene, x, y, 30, 20, idx + "", 999);
        pageBtn.onClickHandler(() => { this._switchPage(idx); });
        return pageBtn;
    }

    _switchPage(page) {
        if (this.page !== page) {
            this.selectedRune = -1;
        }
        this.page = page;
        var player = PlayerData.getInstance();

        for (var i = 0; i < this.runeInventory.length; i++) {
            this.runeInventory[i].destroy();
        }
        this.runeInventory = [];

        var idx = 0;
        for (var i = page * 64; i < Math.min(player.runes.length, page * 64 + 64); i++) {
            var posX = this.x + 258 + (idx % 8) * 55;
            var posY = this.y + 30 + Math.floor(idx / 8) * 55;
            this.runeInventory.push(this._setupRuneInventory(this.scene, player.runes[i], posX, posY, i));
            idx += 1;
        }
        if (this.selectedRune !== -1) {
            this._selectRune(this.selectedRune);
        } else {
            for (var i = 0; i < this.runeText.length; i++) {
                this.runeText[i].destroy();
            }
            this.runeText = [];
            this.upgradeRune.destroy();
            this.upgradeRune = this.scene.add.image(this.x + 125, this.y + 50, "runeicons", 0).setOrigin(0.5);
            this.upgradeRune.displayWidth = 48;
            this.upgradeRune.displayHeight = 48;
        }
    }

    _setupViews() {
        for (var i = 0; i < this.pageBtns.length; i++) {
            this.pageBtns[i].destroy();
        }
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        this.pageBtns = [];
        var maxPage = 1 + Math.floor(PlayerData.getInstance().runes.length / 64);
        for (var i = 0; i < maxPage; i++) {
            this.pageBtns.push(this._setupPageBtn(this.x + 440 + i * 35, this.y + 5, i));
        }
        this._switchPage(Math.min(maxPage, this.page));
    }

    _selectRune(idx) {
        for (var i = 0; i < this.runeText.length; i++) {
            this.runeText[i].destroy();
        }
        this.runeText = [];

        if (this.selectedRune !== -1) {
            this.runeInventory[this.selectedRune % 64].setBorderTint(Phaser.Display.Color.GetColor(255, 255, 255));
        }
        this.selectedRune = idx;
        this.runeInventory[this.selectedRune % 64].setBorderTint(Phaser.Display.Color.GetColor(0, 255, 0));

        var rune = PlayerData.getInstance().runes[this.selectedRune];
        var runeTexture = RuneRegistry.getRuneTexture(rune.word);
        this.upgradeRune.destroy();
        this.upgradeRune = this.scene.add.image(this.x + 125, this.y + 50, runeTexture.sprite, runeTexture.tile).setOrigin(0.5).setDepth(999);
        this.upgradeRune.displayWidth = 48;
        this.upgradeRune.displayHeight = 48;
        var bonus = RuneRegistry.getBonusForRune(rune);
        this.runeText.push(this.scene.add.bitmapText(this.x + 15, this.y + 100, "courier20", rune.word + " Lv" + rune.level).setDepth(999));
        this.runeText[this.runeText.length - 1].setTint(Phaser.Display.Color.GetColor(200, 0, 200));
        var txt = rune.word + " Lv" + rune.level + "\n";
        for (const prop in bonus) {
            txt += TooltipRegistry.getRuneBonusText(prop, bonus[prop]) + "\n";
        }
        this.runeText.push(this.scene.add.bitmapText(this.x + 20, this.y + 120, "courier16", txt).setDepth(999));

        var cost = RuneRegistry.getUpgradeCost(rune);
        this.upgradeCost.setText(Common.numberString(cost));
        this.rerollCost.setText(Common.numberString(Math.floor(cost / 2)));
        this.shatterCost.setText(Common.numberString(RuneRegistry.getSellCost(rune)));

        for (var i = 0; i < this.upgradeUI.length; i++) {
            this.upgradeUI[i].setVisible(true);
        }
    }

    _upgradeRune() {
        var rune = PlayerData.getInstance().runes[this.selectedRune];
        var cost = Math.floor(RuneRegistry.getUpgradeCost(rune));
        if (PlayerData.getInstance().motes >= cost) {
            PlayerData.getInstance().addMote(-cost);
            PlayerData.getInstance().runes[this.selectedRune].level += 1;
            this._selectRune(this.selectedRune);
        }
    }
    _rerollRune() {
        var rune = PlayerData.getInstance().runes[this.selectedRune];
        var cost = Math.floor(RuneRegistry.getUpgradeCost(rune) / 2);
        if (PlayerData.getInstance().motes >= cost) {
            PlayerData.getInstance().addMote(-cost);
            var newRune = RuneRegistry.getRandomRuneAtLevel(rune.level);
            PlayerData.getInstance().runes[this.selectedRune] = newRune;
            this._switchPage(this.page);
        }
    }
    _shatterRune() {
        var rune = PlayerData.getInstance().runes[this.selectedRune];
        var cost = RuneRegistry.getSellCost(rune);
        PlayerData.getInstance().removeRune(this.selectedRune);
        PlayerData.getInstance().addMote(cost);
        this.selectedRune = -1;
        this._setupViews();
        for (var i = 0; i < this.upgradeUI.length; i++) {
            this.upgradeUI[i].setVisible(false);
        }
    }

    _setupRuneInventory(sceneContext, rune, x, y, idx) {
        var bonus = RuneRegistry.getBonusForRune(rune);
        var txt = rune.word + " Lv" + rune.level + "\n";
        for (const prop in bonus) {
            txt += TooltipRegistry.getRuneBonusText(prop, bonus[prop]) + "\n";
        }
        var runeBtn = new ImageButton(sceneContext, x, y, 48, 48, RuneRegistry.getRuneTexture(rune.word), 999);
        runeBtn.onClickHandler(() => { this._selectRune(idx); })
            .onPointerOverHandler(() => { this._showTooltip(sceneContext, txt, x, y); })
            .onPointerOutHandler(() => { this._removeTooltip() });
        return runeBtn;
    }

    _showTooltip(scenContext, text, x, y) {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        var posX = x + (x + 200 > 1100 ? -152 : 0);
        var posY = y + (y - 60 < 100 ? 50 : -62);
        this.floatingText = new FloatingTooltip(scenContext, text, posX, posY, 200, 60, "courier16", 16, 1000);
    }

    _removeTooltip() {
        this.floatingText.destroy();
        this.floatingText = undefined;
    }

    onCancelHandler(callback) {
        this.cancelBtn.onClickHandler(() => { callback(); });
        return this;
    }

    destroy() {
        this.backRect.destroy();
        this.separator.destroy();
        this.upgradeTitle.destroy();
        this.runeTitle.destroy();
        this.cancelBtn.destroy();
        this.upgradeRune.destroy();
        this.sortNameBtn.destroy();
        this.sortLevelBtn.destroy();
        for (var i = 0; i < this.runeInventory.length; i++) {
            this.runeInventory[i].destroy();
        }
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        for (var i = 0; i < this.runeText.length; i++) {
            this.runeText[i].destroy();
        }
        for (var i = 0; i < this.upgradeUI.length; i++) {
            this.upgradeUI[i].destroy();
        }
    }
}