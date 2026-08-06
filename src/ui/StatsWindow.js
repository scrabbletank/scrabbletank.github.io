import { MoonlightData } from "../data/MoonlightData";
import { PlayerData } from "../data/PlayerData";
import { RitualData } from "../data/RitualData";
import { StarData } from "../data/StarData";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class StatsWindow {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 750, 650, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 2;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.titleLabel = scene.add.bitmapText(x + 375, y + 10, "courier20", "Stats And Stuff").setOrigin(0.5, 0);
        var by = y + 40;
        this.coreBtn = new TextButton(scene, x + 5, by, 120, 20, "Core Stats").onClickHandler(() => { this._showStats(0); });
        by += 22;
        // this.exploreBtn = ProgressionStore.getInstance().unlocks.exploreTab --- true ?
        //     new TextButton(scene, x + 5, by, 120, 20, "Region").onClickHandler(() => { this._setGuide(1); }) :
        //     new TextButton(scene, x + 5, by, 120, 20, "???");
        // by += 22;
        // this.combatBtn = ProgressionStore.getInstance().unlocks.combatTab --- true ?
        //     new TextButton(scene, x + 5, by, 120, 20, "Combat").onClickHandler(() => { this._setGuide(2); }) :
        //     new TextButton(scene, x + 5, by, 120, 20, "???");
        // by += 22;
        this.btns = [this.coreBtn];
        this.statTexts = [];
        this.closeButton = new TextButton(scene, x + 630, y + 620, 110, 20, "Back");

        this._showStats(0);
    }

    static statStrings(base, bonus, moonMulti, runeMulti, dungeonMulti, ritualMulti) {
        return "Base: " + Common.numberString(Math.round(base)) + "\n" +
            "Gear: " + Common.numberString(Math.round(bonus)) + "\n" +
            "Moonlight: " + Common.numberString(Math.round(moonMulti * 100)) + "%\n" +
            "Runes: " + Common.numberString(Math.round(runeMulti * 100)) + "%\n" +
            "Dungeons: " + Common.numberString(Math.round(dungeonMulti * 100)) + "%\n" +
            "Rituals: " + Common.numberString(Math.round(ritualMulti * 100)) + "%\n";
    }

    _showStats(index) {
        for (var i = 0; i < this.statTexts.length; i++) {
            this.statTexts[i].destroy();
        }
        this.statTexts = [];
        switch (index) {
            case 0:
                var p = PlayerData.getInstance();
                var s = p.statBlock;
                this.statTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Core Stats"));
                var txt = "---Strength---\n" +
                    StatsWindow.statStrings((s.stats.strength + p.runeBonuses.strFlat) * (1 + StarData.getInstance().perks.str.level * 10),
                        s.statBonuses.strength,
                        (1 + (MoonlightData.getInstance().moonperks.str.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.strPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.strength,
                        (1 + RitualData.getInstance().activePerks.playeroffense * 0.05)) + "\n" +
                    "---Dexterity---\n" +
                    StatsWindow.statStrings((s.stats.dexterity + p.runeBonuses.dexFlat) * (1 + StarData.getInstance().perks.dex.level * 10),
                        s.statBonuses.dexterity,
                        (1 + (MoonlightData.getInstance().moonperks.dex.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.dexPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.dexterity,
                        (1 + RitualData.getInstance().activePerks.playeroffense * 0.05)) + "\n" +
                    "---Agility---\n" +
                    StatsWindow.statStrings((s.stats.agility + p.runeBonuses.agiFlat) * (1 + StarData.getInstance().perks.agi.level * 10),
                        s.statBonuses.agility,
                        (1 + (MoonlightData.getInstance().moonperks.agi.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.agiPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.agility,
                        (1 + RitualData.getInstance().activePerks.playeroffense * 0.05)) + "\n" +
                    "---Endurance---\n" +
                    StatsWindow.statStrings((s.stats.endurance + p.runeBonuses.endFlat) * (1 + StarData.getInstance().perks.end.level * 10),
                        s.statBonuses.endurance,
                        (1 + (MoonlightData.getInstance().moonperks.end.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.endPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.endurance,
                        (1 + RitualData.getInstance().activePerks.playerdefense * 0.05)) + "\n";
                this.statTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 75, "courier16", Common.processText(txt, 72)));
                txt = "---Recovery---\n" +
                    StatsWindow.statStrings((s.stats.recovery + p.runeBonuses.recFlat) * (1 + StarData.getInstance().perks.rec.level * 10),
                        s.statBonuses.recovery,
                        (1 + (MoonlightData.getInstance().moonperks.rec.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.recPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.recovery,
                        (1 + RitualData.getInstance().activePerks.playerdefense * 0.05)) + "\n" +
                    "---Defense---\n" +
                    StatsWindow.statStrings((s.stats.defense + p.runeBonuses.defFlat) * (1 + StarData.getInstance().perks.def.level * 10),
                        s.statBonuses.defense,
                        (1 + (MoonlightData.getInstance().moonperks.def.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.defPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.defense,
                        (1 + RitualData.getInstance().activePerks.playerdefense * 0.05)) + "\n" +
                    "---Accuracy---\n" +
                    StatsWindow.statStrings((s.stats.accuracy + p.runeBonuses.accFlat) * (1 + StarData.getInstance().perks.acc.level * 10),
                        s.statBonuses.accuracy,
                        (1 + (MoonlightData.getInstance().moonperks.acc.level + MoonlightData.getInstance().challengePoints * 2) * 0.005),
                        (1 + p.runeBonuses.accPercent + p.runeBonuses.allPercent),
                        p.dungeonBonus.accuracy,
                        (1 + RitualData.getInstance().activePerks.playercrits * 0.15)) + "\n";
                this.statTexts.push(this.scene.add.bitmapText(this.x + 460, this.y + 75, "courier16", Common.processText(txt, 72)));

        }
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.closeButton.destroy();
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].destroy();
        }
        for (var i = 0; i < this.statTexts.length; i++) {
            this.statTexts[i].destroy();
        }
    }

    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}