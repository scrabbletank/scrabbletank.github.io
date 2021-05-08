import { SceneUIBase } from "./SceneUIBase";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { PlayerData } from "../data/PlayerData";
import { FloatingTooltip } from "../ui/FloatingTooltip";
import { ImageButton } from "../ui/ImageButton";

export class TalentScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);
    }

    refresh() {
        this.rebirth();
    }

    rebirth() {
        this.talentLabel.setText("Talent Points\n" + this.player.talentPoints);

        var standardArray = [[264, 288], [312, 240], [360, 216], [408, 192], [456, 216], [504, 240], [552, 288],
        [216, 240], [264, 192], [336, 144], [408, 120], [480, 144], [552, 192], [600, 240],
        [168, 192], [240, 120], [312, 72], [408, 48], [504, 72], [576, 120], [648, 192],
        [408, 312], [480, 384], [336, 384], [408, 456], [336, 312], [480, 312], [480, 456], [336, 456]];

        for (var i = 0; i < this.talentButtons.length; i++) {
            this.talentButtons[i].destroy();
        }

        this.talentButtons = [];
        var idx = 0;
        for (const prop in this.player.talents) {
            var x = this.relativeX(standardArray[idx][0] + 18);
            var y = this.relativeY(standardArray[idx][1] + 20);
            this._setupTalentButton(prop, x, y, idx);
            idx++;
        }
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.floatingText = undefined;
        this.talentLabel = this.add.bitmapText(this.relativeX(450), this.relativeY(25), "courier20", "Talent Points\n0", 20, 1).setOrigin(0.5);
        this.player = new PlayerData();
        this.talentButtons = [];

        this._refreshView();

        this.player.registerEvent("onTalentChanged", () => { this._onTalentChanged(); });
    }

    _refreshView() {
        var standardArray = [[264, 288], [312, 240], [360, 216], [408, 192], [456, 216], [504, 240], [552, 288],
        [216, 240], [264, 192], [336, 144], [408, 120], [480, 144], [552, 192], [600, 240],
        [168, 192], [240, 120], [312, 72], [408, 48], [504, 72], [576, 120], [648, 192],
        [408, 312], [480, 384], [336, 384], [408, 456], [336, 312], [480, 312], [480, 456], [336, 456]];

        for (var i = 0; i < this.talentButtons.length; i++) {
            this.talentButtons[i].destroy();
        }
        this._disableTooltip();
        this.talentButtons = [];

        var idx = 0;
        for (const prop in this.player.talents) {
            var x = this.relativeX(standardArray[idx][0] + 18);
            var y = this.relativeY(standardArray[idx][1] + 20);
            this._setupTalentButton(prop, x, y, idx);
            idx++;
        }
    }

    _setupTalentButton(talentName, x, y, index) {
        this.talentButtons.push(new ImageButton(this, x, y, 48, 48, this.player.talents[talentName].texture)
            .onClickHandler(() => {
                this._levelUpTalent(this.player.talents[talentName]);
                this._disableTooltip();
                this._setTooltip(talentName, x, y);
                this._refreshView();
            })
            .onPointerOverHandler(() => { this._setTooltip(talentName, x, y); })
            .onPointerOutHandler(() => { this._disableTooltip(); }));
        this._updateTalentButton(this.player.talents[talentName], index);
    }

    _updateTalentButton(talent, index) {
        if (talent.level >= talent.maxLevel && talent.maxLevel !== -1) {
            this.talentButtons[index].setBorderTint(Phaser.Display.Color.GetColor(0, 220, 0));
        } else if (talent.level > 0) {
            this.talentButtons[index].setBorderTint(Phaser.Display.Color.GetColor(212, 175, 55));
        } else if (this._haveTalentRequirements(talent) === false) {
            this.talentButtons[index].setTint(Phaser.Display.Color.GetColor(32, 32, 32));
        } else {
            this.talentButtons[index].clearTint();
        }
    }

    _onTalentChanged() {
        this.talentLabel.setText("Talent Points\n" + this.player.talentPoints);
    }

    _haveTalentRequirements(talent) {
        for (var i = 0; i < talent.requires.length; i++) {
            if (this.player.talents[talent.requires[i]].level === 0) {
                return false;
            }
        }
        return true;
    }

    _levelUpTalent(talent) {
        if (this.player.talentPoints <= 0 || this._haveTalentRequirements(talent) === false) {
            return;
        }
        this.player.levelTalent(talent);
    }

    _setTooltip(talentName, x, y) {
        var talent = this.player.talents[talentName];
        if (this.FloatingTooltip !== undefined) {
            this._disableTooltip();
        }
        var txt = "";
        if (talent.maxLevel !== -1) {
            txt = talent.name + " Lv" + this.player.getTalentLevel(talentName) + "/" +
                talent.maxLevel + "\n" +
                TooltipRegistry.getTalentTooltip(talent, this.player.getTalentLevel(talentName)) + "\n\n";
        } else {
            txt = talent.name + " Lv" + this.player.getTalentLevel(talentName) + "\n" +
                TooltipRegistry.getTalentTooltip(talent, this.player.getTalentLevel(talentName)) + "\n\n";
        }

        if (talent.requires.length > 0) {
            txt += "Requires: ";
            for (var i = 0; i < talent.requires.length; i++) {
                txt += this.player.talents[talent.requires[i]].name + (i < talent.requires.length - 1 ? ", " : "");
            }
        }
        txt = Common.processText(txt, 53);
        this.floatingText = new FloatingTooltip(this, txt, x + (x + 450 > 1100 ? -450 : 0), y + (y > 300 ? -150 : 50), 450, 150, "courier16", 16);
    }
    _disableTooltip() {
        if (this.floatingText !== undefined) {
            this.floatingText.destroy();
            this.floatingText = undefined;
        }
    }
}