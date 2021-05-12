import { RegionRegistry } from "../data/RegionRegistry";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";
import { TooltipImage } from "./TooltipImage";

export class NewRegionWindow {
    constructor(scene, x, y, regions) {
        this.backingRect = scene.add.rectangle(x, y, 600, 400, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 4;

        this.title = scene.add.bitmapText(x + 300, y + 10, "courier16", "THE MIST OPENS TO REVEAL A PATH.\n" +
            "THE PATH IS WINDING, WHO KNOWS WHAT LIES BEYOND?", 16, 1).setOrigin(0.5, 0);
        this.title.setTint(Phaser.Display.Color.GetColor(96, 172, 177));

        this.dividers = [];
        this.dividers.push(scene.add.line(0, 0, x + 200, y + 60, x + 200, y + 340,
            Phaser.Display.Color.GetColor(255, 255, 255)).setOrigin(0).setLineWidth(1));
        this.dividers.push(scene.add.line(0, 0, x + 400, y + 60, x + 400, y + 340,
            Phaser.Display.Color.GetColor(255, 255, 255)).setOrigin(0).setLineWidth(1));

        this.choiceBtns = [];
        this.uiElements = [];

        for (var i = 0; i < regions.length; i++) {
            this.uiElements.push(scene.add.bitmapText(x + 100 + (i * 200), y + 65, "courier20",
                RegionRegistry.REGION_TYPES[regions[i].type].name).setOrigin(0.5, 0));
            var texture = TooltipRegistry.getRegionImage(regions[i].type);
            var img = scene.add.image(x + 100 + (i * 200), y + 85, texture.sprite, texture.tile).setOrigin(0.5, 0);
            img.displayWidth = 48;
            img.displayHeight = 48;
            this.uiElements.push(img);
            var traitStart = 100 - regions[i].traits.length * 10;
            for (var t = 0; t < regions[i].traits.length; t++) {
                this.uiElements.push(new TooltipImage(scene, x + traitStart + (i * 200) + (t * 20), y + 137, 16, 16,
                    TooltipRegistry.getTraitImage(regions[i].traits[t]), TooltipRegistry.getTraitTooltip(regions[i].traits[t])));
            }
            this.uiElements.push(scene.add.bitmapText(x + 5 + (i * 200), y + 155, "courier16",
                Common.processText(TooltipRegistry.getRegionTooltip(regions[i].type), 23)));

            this.choiceBtns.push(new TextButton(scene, x + 40 + (i * 200), y + 300, 120, 20, "TRAVEL"));
        }

        this.cancelBtn = new TextButton(scene, x + 240, y + 365, 120, 20, "STEP AWAY");
    }

    onSelectHandler(callback) {
        this.choiceBtns[0].onClickHandler(() => { callback(0); });
        this.choiceBtns[1].onClickHandler(() => { callback(1); });
        this.choiceBtns[2].onClickHandler(() => { callback(2); });
        return this;
    }
    onCancelHandler(callback) {
        this.cancelBtn.onClickHandler(() => { callback(); });
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.title.destroy();
        this.cancelBtn.destroy();
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