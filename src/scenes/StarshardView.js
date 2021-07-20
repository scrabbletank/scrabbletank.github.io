import { StarData } from "../data/StarData";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { TooltipImage } from "../ui/TooltipImage";
import { Common } from "../utils/Common";

export class StarshardView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.canLevelPerks = false;
        this.elements = [];

        this.constellationArray = [[408, 240], [480, 264], [336, 264], [504, 336], [312, 336], [360, 408], [456, 408],
        [144, 432], [96, 528], [192, 528],
        [600, 216], [624, 96], [696, 120], [720, 192],
        [408, 600], [336, 552], [480, 552],
        [264, 168], [192, 216], [120, 168], [120, 96], [192, 24],
        [720, 408], [672, 480], [768, 480]];
    }

    create() {
        this.refreshView();
    }

    refreshView() {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
        this.elements = [];

        var txt = this.scene.add.bitmapText(this.x + 550, this.y + 420, "courier20", "STAR SHARDS\n" +
            Common.numberString(Math.round(StarData.getInstance().starShards)), 20, 1).setOrigin(0.5);
        txt.setTint(Phaser.Display.Color.GetColor(177, 100, 169));
        this.elements.push(txt);

        var starData = new StarData();
        var idx = 0;
        for (const prop in starData.perks) {
            var x = this.x + this.constellationArray[idx][0] + 118;
            var y = this.y + this.constellationArray[idx][1] + 56;
            this.elements.push(this._setupPerkButton(starData.perks[prop], x, y));
            idx++;
        }
    }

    _havePerkRequirements(perk) {
        for (var i = 0; i < perk.requires.length; i++) {
            if (StarData.getInstance().perks[perk.requires[i]].level === 0) {
                return false;
            }
        }
        return true;
    }

    _levelUpPerk(perk) {
        if (this.canLevelPerks === false) {
            return;
        }
        StarData.getInstance().levelUpPerk(perk);
    }

    _setupPerkButton(perk, x, y) {
        var txt = "";
        if (perk.maxLevel !== -1) {
            txt = perk.name + " Lv" + perk.level + "/" + perk.maxLevel + "\n" +
                TooltipRegistry.getStarPerkTooltip(perk) + "\n\n";
        } else {
            txt = perk.name + " Lv" + perk.level + "\n" +
                TooltipRegistry.getStarPerkTooltip(perk) + "\n\n";
        }
        var cost = Math.floor((perk.cost[0] + perk.cost[1] * (perk.level)) * Math.pow(perk.cost[2], perk.level));
        txt += "Costs " + Common.numberString(cost) + " Star Shards\n";

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