import { SceneUIBase } from "./SceneUIBase";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { PlayerData } from "../data/PlayerData";
import { FloatingTooltip } from "../ui/FloatingTooltip";
import { ImageButton } from "../ui/ImageButton";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "../ui/TextButton";
import { ProgressionStore } from "../data/ProgressionStore";
import { ChallengeWindow } from "../ui/ChallengeWindow";
import { DynamicSettings } from "../data/DynamicSettings";
import { ActiveChallengeDialog } from "../ui/ActiveChallengeDialog";
import { TooltipImage } from "../ui/TooltipImage";

export class MoonlightScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.canLevelPerks = false;
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 1100, 800, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this.floatingText = undefined;
        this.moonlightLabel = this.add.bitmapText(this.relativeX(550), this.relativeY(400), "courier20", "MOONLIGHT\n0", 20, 1).setOrigin(0.5);
        this.moonlightLabel.setTint(Phaser.Display.Color.GetColor(206, 238, 240));

        var standardArray = [[648, 480], [672, 408], [624, 312], [552, 240], [456, 192], [360, 144], [264, 120],
        [168, 144], [144, 216], [192, 312], [264, 384], [360, 432], [456, 480], [552, 504],
        [528, 576], [312, 504], [120, 360], [120, 72], [72, 240]];
        this.moonlight = new MoonlightData();

        this.moonlightButtons = [];
        var idx = 0;
        for (const prop in this.moonlight.moonperks) {
            var x = this.relativeX(standardArray[idx][0] + 118);
            var y = this.relativeY(standardArray[idx][1] + 56);
            this._setupMoonlightButton(this.moonlight.moonperks[prop], x, y);
            idx++;
        }

        this.exitButton = new TextButton(this, this.relativeX(950), this.relativeY(730), 120, 40, "BACK")
            .onClickHandler(() => {
                if (this.canLevelPerks === true) {
                    var game = this.scene.get("DarkWorld");
                    this.canLevelPerks = false;
                    game.rebirth();
                } else {
                    this.scene.sendToBack();
                }
            });

        this.challengeBox = undefined;

        this.challengeBtn = new TextButton(this, 970, 12, 120, 30, "Challenges")
            .onClickHandler(() => { this._setupChallengeWindow(); });
        this.challengePointIcon = new TooltipImage(this, 20, 20, 16, 16, { sprite: "moonicons", tile: 7 },
            "Challenge Points earned from completing challenges. Each point increases your core stats by an additional 1%.");
        this.challengePointLabel = this.add.bitmapText(40, 20, "courier20", MoonlightData.instance.challengePoints + "");
        this.challengeBtn.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
        this.challengePointIcon.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
        this.challengePointLabel.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
    }

    enableLeveling() {
        this.canLevelPerks = true;
        this.challengeBtn.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
        this.challengePointIcon.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
        this.challengePointLabel.setText(MoonlightData.instance.challengePoints + "");
        this.challengePointLabel.setVisible(ProgressionStore.instance.persistentUnlocks.challenges);
    }

    _setupChallengeWindow() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
        if (DynamicSettings.instance.challengeName !== "") {
            this.challengeBox = new ActiveChallengeDialog(this, 200, 150)
                .onAbandonHandler(() => { this._abandonChallenge(); })
                .onCancelHandler(() => { this._removeChallengeWindow(); });
        } else {
            this.challengeBox = new ChallengeWindow(this, 150, 100)
                .onAcceptHandler((c) => { this._beginChallenge(c); })
                .onCancelHandler(() => { this._removeChallengeWindow(); });
        }
    }
    _removeChallengeWindow() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
    }
    _beginChallenge(challenge) {
        if (this.canLevelPerks === true) {
            DynamicSettings.instance.setupChallenge(challenge);
            var game = this.scene.get("DarkWorld");
            this.canLevelPerks = false;
            game.rebirth();
        }
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
    }
    _abandonChallenge() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
        this.canLevelPerks = true;
    }

    _setupMoonlightButton(perk, x, y) {
        this.moonlightButtons.push(new ImageButton(this, x, y, 48, 48, perk.texture)
            .onClickHandler(() => {
                this._levelUpPerk(perk);
                this._onMoonlightChanged();
                this._disableTooltip();
                this._setTooltip(perk, x, y);
            })
            .onPointerOverHandler(() => { this._setTooltip(perk, x, y); })
            .onPointerOutHandler(() => { this._disableTooltip(); }));
    }

    _onMoonlightChanged() {
        this.moonlightLabel.setText("MOONLIGHT\n" + Common.numberString(this.moonlight.moonlight));
    }

    _haveMoonlightRequirements(perk) {
        for (var i = 0; i < perk.requires.length; i++) {
            if (this.moonlight.moonperks[perk.requires[i]].level === 0) {
                return false;
            }
        }
        return true;
    }

    _levelUpPerk(perk) {
        if (this.canLevelPerks === false) {
            return;
        }
        if (perk.level >= perk.maxLevel && perk.maxLevel !== -1) {
            return;
        }
        var cost = Math.floor((perk.cost[0] + perk.cost[1] * (perk.level)) * Math.pow(perk.cost[2], perk.level));
        if (this.moonlight.moonlight < cost || this._haveMoonlightRequirements(perk) === false) {
            return;
        }
        this.moonlight.moonlight -= cost;
        perk.level += 1;
    }

    _setTooltip(perk, x, y) {
        if (this.FloatingTooltip !== undefined) {
            this._disableTooltip();
        }
        var txt = perk.name + " Lv" + perk.level + "\n" +
            TooltipRegistry.getMoonlightTooltip(perk) + "\n\n";

        var cost = Math.floor((perk.cost[0] + perk.cost[1] * (perk.level)) * Math.pow(perk.cost[2], perk.level));

        txt += "Costs " + Common.numberString(cost) + " Moonlight\n";

        if (perk.requires.length > 0) {
            txt += "Requires: ";
            for (var i = 0; i < perk.requires.length; i++) {
                if (this.moonlight.moonperks[perk.requires[i]].level === 0) {
                    txt += this.moonlight.moonperks[perk.requires[i]].name + (i < perk.requires.length - 1 ? ", " : "");
                }
            }
        }
        txt = Common.processText(txt, 53);
        this.floatingText = new FloatingTooltip(this, txt, x + (x + 450 > 1100 ? -450 : 0), y + (y > 300 ? -150 : 50), 450, 150, "courier16", 16);
    }
    _disableTooltip() {
        this.floatingText.destroy();
        this.floatingText = undefined;
    }
}