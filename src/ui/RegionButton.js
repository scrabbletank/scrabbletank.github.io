import { RegionRegistry } from "../data/RegionRegistry";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { TooltipImage } from "./TooltipImage";

export class RegionButton {
    constructor(scene, x, y, region) {
        this.backingRect = scene.add.rectangle(x, y, 96, 96, Phaser.Display.Color.GetColor(64, 64, 64))
            .setOrigin(0, 0);
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 1;
        this.traitIcons = [];

        if (region === undefined) {
            this.title = scene.add.bitmapText(x + 48, y + 5, "courier16", "???").setOrigin(0.5, 0);
            this.regionImg = new TooltipImage(scene, x + 24, y + 24, 48, 48, TooltipRegistry.getRegionImage('unknown'),
                "The road between lands, who know's where this will lead?");
        } else {
            this.title = scene.add.bitmapText(x + 48, y + 5, "courier16", RegionRegistry.REGION_TYPES[region.type].name).setOrigin(0.5, 0);
            this.regionImg = new TooltipImage(scene, x + 24, y + 24, 48, 48, TooltipRegistry.getRegionImage(region.type),
                TooltipRegistry.getRegionTooltip(region.type));

            for (var i = 0; i < region.traits.length; i++) {
                this.traitIcons.push(new TooltipImage(scene, x + 2 + (i * 20), y + 75, 16, 16,
                    TooltipRegistry.getTraitImage(region.traits[i]), TooltipRegistry.getTraitTooltip(region.traits[i])));
            }
        }
    }

    onClickHandler(callback) {
        this.backingRect.setInteractive({ useHandCursor: true })
            .on("pointerdown", () => { callback(); });
        this.regionImg.onClickHandler(callback);
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.title.destroy();
        this.regionImg.destroy();
        for (var i = 0; i < this.traitIcons.length; i++) {
            this.traitIcons[i].destroy();
        }
    }

    setVisible(visible) {
        this.backingRect.setVisible(visible);
        this.title.setVisible(visible);
        this.regionImg.setVisible(visible);
        for (var i = 0; i < this.traitIcons.length; i++) {
            this.traitIcons[i].setVisible(visible);
        }
    }
}