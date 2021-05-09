import { PlayerData } from "../data/PlayerData";
import { RuneRegistry } from "../data/RuneRegistry";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { FloatingTooltip } from "./FloatingTooltip";
import { ImageButton } from "./ImageButton";
import { TextButton } from "./TextButton";

export class GearRuneWindow {
    constructor(sceneContext, x, y, gear) {
        this.selectedRune = -1;
        this.gear = gear;
        this.scene = sceneContext;
        this.x = x;
        this.y = y;

        this.backRect = sceneContext.add.rectangle(x, y, 700, 500, Phaser.Display.Color.GetColor(0, 0, 0))
            .setInteractive()
            .setOrigin(0, 0);
        this.backRect.isStroked = true;
        this.backRect.strokeColor = Phaser.Display.Color.GetColor(128, 128, 128);
        this.backRect.lineWidth = 2;
        this.backRect.setDepth(998);
        this.separator = sceneContext.add.rectangle(x + 250, y, 2, 500,
            Phaser.Display.Color.GetColor(128, 128, 128)).setOrigin(0, 0).setDepth(999);

        this.socketTitle = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", "SOCKETS").setOrigin(0, 0).setDepth(999);
        this.runeTitle = sceneContext.add.bitmapText(x + 260, y + 5, "courier20", "RUNES").setOrigin(0, 0).setDepth(999);
        this.cancelBtn = new TextButton(this.scene, this.x + 575, this.y + 475, 120, 20, "Cancel", 999);

        this.gearRuneImages = [];
        this.runeBonuses = [];
        this.runeInventory = [];
        this._setupViews();
    }

    _setupViews() {
        for (var i = 0; i < this.gearRuneImages.length; i++) {
            this.gearRuneImages[i].destroy();
        }
        for (var i = 0; i < this.runeBonuses.length; i++) {
            this.runeBonuses[i].destroy();
        }
        for (var i = 0; i < this.runeInventory.length; i++) {
            this.runeInventory[i].destroy();
        }
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
        this.gearRuneImages = [];
        this.runeBonuses = [];
        this.runeInventory = [];

        for (var i = 0; i < this.gear.runes.length; i++) {
            var posX = this.x + 7 + 36 * i;
            var posY = this.y + 27 + (i % 2) * 36;
            this.gearRuneImages.push(this._setupRuneSocket(this.scene, this.gear.runes[i], posX, posY, i));
        }

        var t = this.y + 140;
        for (var i = 0; i < this.gear.compiledRunes.length; i++) {
            var text = this.scene.add.bitmapText(this.x + 15, t, "courier20",
                this.gear.compiledRunes[i].word + " Lv" + this.gear.compiledRunes[i].level).setDepth(999);;
            text.setTint(Phaser.Display.Color.GetColor(200, 0, 200));
            this.runeBonuses.push(text);

            var txt = "";
            for (const prop in this.gear.compiledRunes[i].bonus) {
                txt += TooltipRegistry.getRuneBonusText(prop, this.gear.compiledRunes[i].bonus[prop]) + "\n";
            }
            text = this.scene.add.bitmapText(this.x + 15, t + 20, "courier16", txt).setDepth(999);;
            this.runeBonuses.push(text);

            t += 20 + text.getTextBounds(true).local.height + 10;
        }

        var player = PlayerData.getInstance();
        for (var i = 0; i < player.runes.length; i++) {
            var posX = this.x + 258 + (i % 8) * 55;
            var posY = this.y + 30 + Math.floor(i / 8) * 55;
            this.runeInventory.push(this._setupRuneInventory(this.scene, player.runes[i], posX, posY, i));
        }
    }

    _slotRune(idx) {
        if (this.selectedRune !== -1) {
            PlayerData.getInstance().unequip(this.gear.slotType);
            this.gear.addRune(PlayerData.getInstance().runes[this.selectedRune], idx);
            PlayerData.getInstance().removeRune(this.selectedRune);
            PlayerData.getInstance().equip(this.gear);
            this._setupViews();
            this.selectedRune = -1;
        }
    }

    _selectRune(idx) {
        if (this.selectedRune !== -1) {
            this.runeInventory[this.selectedRune].setBorderTint(Phaser.Display.Color.GetColor(255, 255, 255));
        }
        this.selectedRune = idx;
        this.runeInventory[this.selectedRune].setBorderTint(Phaser.Display.Color.GetColor(0, 255, 0));
    }

    _setupRuneSocket(sceneContext, rune, x, y, idx) {
        var bonus = RuneRegistry.getBonusForRune(rune);
        var txt = rune.word + " Lv" + rune.level + "\n";
        for (const prop in bonus) {
            txt += TooltipRegistry.getRuneBonusText(prop, bonus[prop]) + "\n";
        }
        var runeBtn = new ImageButton(sceneContext, x, y, 48, 48, RuneRegistry.getRuneTexture(rune.word), 999);
        runeBtn.onClickHandler(() => { this._slotRune(idx); });
        if (rune.word != "Empty") {
            runeBtn.onPointerOverHandler(() => { this._showTooltip(sceneContext, txt, x, y); })
                .onPointerOutHandler(() => { this._removeTooltip() });
        }
        runeBtn.removeBackground();
        return runeBtn;
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
        this.socketTitle.destroy();
        this.runeTitle.destroy();
        this.cancelBtn.destroy();
        for (var i = 0; i < this.gearRuneImages.length; i++) {
            this.gearRuneImages[i].destroy();
        }
        for (var i = 0; i < this.runeBonuses.length; i++) {
            this.runeBonuses[i].destroy();
        }
        for (var i = 0; i < this.runeInventory.length; i++) {
            this.runeInventory[i].destroy();
        }
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
        }
    }
}