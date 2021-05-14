import { ProgressionStore } from "../data/ProgressionStore";
import { RegionRegistry } from "../data/RegionRegistry";
import { Statics } from "../data/Statics";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class ClassSelectWindow {
    constructor(scene, x, y, regions) {
        this.backingRect = scene.add.rectangle(x, y, 780, 600, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive().setDepth(998);
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 4;

        this.title = scene.add.bitmapText(x + 390, y + 10, "courier20", "CHOOSE YOUR CLASS", 20, 1).setOrigin(0.5, 0).setDepth(999);
        // this.title.setTint(Phaser.Display.Color.GetColor(96, 172, 177));

        this.dividers = [];
        this.dividers.push(scene.add.line(0, 0, x + 260, y + 60, x + 260, y + 440,
            Phaser.Display.Color.GetColor(255, 255, 255)).setOrigin(0).setLineWidth(1).setDepth(999));
        this.dividers.push(scene.add.line(0, 0, x + 520, y + 60, x + 520, y + 440,
            Phaser.Display.Color.GetColor(255, 255, 255)).setOrigin(0).setLineWidth(1).setDepth(999));

        this.choiceBtns = [];
        this.uiElements = [];

        this.uiElements.push(scene.add.bitmapText(x + 130, y + 65, "courier20", "Adventurer").setOrigin(0.5, 0).setDepth(999));
        var txt = "- All around balanced class\n" +
            "- No weaknesses or strengths";
        this.uiElements.push(scene.add.bitmapText(x + 10, y + 90, "courier16", txt).setDepth(999));

        this.choiceBtns.push(new TextButton(scene, x + 70, y + 400, 120, 20, "SELECT", 999));

        if (ProgressionStore.getInstance().persistentUnlocks.wizardClass === true) {

            this.uiElements.push(scene.add.bitmapText(x + 390, y + 65, "courier20", "Wizard").setOrigin(0.5, 0).setDepth(999));
            var txt = "- Spellcasting, Talent based class\n" +
                "- Weaker Strength, Agility, and Endurance\n" +
                "- Defense and Accuracy stats replaced with Ward and Power\n" +
                "- Starts combat with a Shield\n" +
                "- Learns spells that deal Magic damage\n" +
                "- Magic damage ignores 90% of armor, but deals half damage to shields\n" +
                "- Can't crit, instead Crit Chance multiplies Spell Power";
            this.uiElements.push(scene.add.bitmapText(x + 270, y + 90, "courier16", Common.processText(txt, 28)).setDepth(999));

            this.choiceBtns.push(new TextButton(scene, x + 330, y + 400, 120, 20, "SELECT", 999));
        } else {
            this.uiElements.push(scene.add.bitmapText(x + 390, y + 65, "courier20", "???").setOrigin(0.5, 0).setDepth(999));
            var txt = "This class is a mystery to you. Reach 50 talents in a single run to unlock its secrets";
            var label = scene.add.bitmapText(x + 390, y + 90, "courier16", Common.processText(txt, 28)).setOrigin(0.5, 0).setDepth(999);
            label.setTint(Phaser.Display.Color.GetColor(200, 200, 200));
            this.uiElements.push(label);

            var btn = new TextButton(scene, x + 330, y + 400, 120, 20, "SELECT", 999);
            btn.setEnable(false);
            this.choiceBtns.push(btn);
        }
        this.uiElements.push(scene.add.bitmapText(x + 650, y + 65, "courier20", "???").setOrigin(0.5, 0).setDepth(999));
        var txt = "For another time, perhaps.";
        var label = scene.add.bitmapText(x + 650, y + 90, "courier16", Common.processText(txt, 28)).setOrigin(0.5, 0).setDepth(999);
        label.setTint(Phaser.Display.Color.GetColor(200, 200, 200));
        this.uiElements.push(label);

        var btn = new TextButton(scene, x + 590, y + 400, 120, 20, "SELECT", 999);
        btn.setEnable(false);
        this.choiceBtns.push(btn);
    }

    onSelectHandler(callback) {
        this.choiceBtns[0].onClickHandler(() => { callback(Statics.CLASS_ADVENTURER); });
        this.choiceBtns[1].onClickHandler(() => { callback(Statics.CLASS_WIZARD); });
        this.choiceBtns[2].onClickHandler(() => { callback(Statics.CLASS_BESERKER); });
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.title.destroy();
        for (var i = 0; i < this.dividers.length; i++) {
            this.dividers[i].destroy();
        }
        for (var i = 0; i < this.uiElements.length; i++) {
            this.uiElements[i].destroy();
        }
        for (var i = 0; i < this.choiceBtns.length; i++) {
            this.choiceBtns[i].destroy();
        }
    }
}