import { MoonlightData } from "../data/MoonlightData";
import { ProgressionStore } from "../data/ProgressionStore";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { TooltipImage } from "../ui/TooltipImage";
import { Common } from "../utils/Common";

export class MoonlightView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.canLevelPerks = false;
        this.elements = [];

        this.moonlightArray = [[648, 480], [672, 408], [624, 312], [552, 240], [456, 192], [360, 144], [264, 120],
        [168, 144], [144, 216], [192, 312], [264, 384], [360, 432], [456, 480], [552, 504],
        [528, 576], [312, 504], [120, 360], [120, 72], [72, 240], [672, 552], [744, 432], [696, 288],
        [624, 192], [528, 120], [408, 72], [264, 48], [24, 384], [192, 456], [216, 552], [480, 648], [408, 552],
        [336, 624], [-24, 240], [96, 504], [672, 624], [816, 480], [792, 288], [720, 168], [624, 72], [480, 0],
        [288, -24], [120, 0], [696, 0], [768, 24], [792, 96]];
    }

    create() {
        this.refreshView();
    }

    refreshView() {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
        this.elements = [];

        var txt = this.scene.add.bitmapText(this.x + 550, this.y + 400, "courier20", "MOONLIGHT\n" +
            Common.numberString(Math.round(MoonlightData.getInstance().moonlight)), 20, 1).setOrigin(0.5);
        txt.setTint(Phaser.Display.Color.GetColor(206, 238, 240));
        this.elements.push(txt);

        var moonlight = new MoonlightData();
        var idx = 0;
        for (const prop in moonlight.moonperks) {
            if ((prop === 'devotion' || prop === 'ninja' || prop === 'urbanization') &&
                ProgressionStore.getInstance().persistentUnlocks.dungeons === false) {
                continue;
            }
            var x = this.x + this.moonlightArray[idx][0] + 118;
            var y = this.y + this.moonlightArray[idx][1] + 56;
            this.elements.push(this._setupMoonlightButton(moonlight.moonperks[prop], x, y));
            idx++;
        }
    }

    _havePerkRequirements(perk) {
        for (var i = 0; i < perk.requires.length; i++) {
            if (MoonlightData.getInstance().moonperks[perk.requires[i]].level === 0) {
                return false;
            }
        }
        return true;
    }

    _levelUpPerk(perk) {
        if (this.canLevelPerks === false) {
            return;
        }
        MoonlightData.getInstance().levelUpPerk(perk);
    }

    _setupMoonlightButton(perk, x, y) {
        var txt = "";
        if (perk.maxLevel !== -1) {
            txt = perk.name + " Lv" + perk.level + "/" + perk.maxLevel + "\n" +
                TooltipRegistry.getMoonlightTooltip(perk) + "\n\n";
        } else {
            txt = perk.name + " Lv" + perk.level + "\n" +
                TooltipRegistry.getMoonlightTooltip(perk) + "\n\n";
        }
        var cost = Math.floor((perk.cost[0] + perk.cost[1] * (perk.level)) * Math.pow(perk.cost[2], perk.level));
        txt += "Costs " + Common.numberString(cost) + " Moonlight\n";

        var btn = new TooltipImage(this.scene, x, y, 48, 48, perk.texture, txt, [450, 150], 53)
            .onClickHandler(() => {
                this._levelUpPerk(perk);
                this.refreshView();
            });
        if (this._havePerkRequirements(perk) === false) {
            btn.setTint(Phaser.Display.Color.GetColor(32, 32, 32));
        }
        return btn;
    }

    setVisible(visible) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].setVisible(visible);
        }
    }
}