import { Common } from "../utils/Common";
import { PlayerData } from "../data/PlayerData";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "./TextButton";

export class RebirthDialog {
    constructor(scene, x, y, regionDifficulty) {
        this.backingRect = scene.add.rectangle(x, y, 400, 270, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 200);
        this.backingRect.lineWidth = 2;

        this.titleLabel = scene.add.bitmapText(x + 200, y + 10, "courier20", "Mystic Gate").setOrigin(0.5, 0);
        this.titleLabel.setTint(Phaser.Display.Color.GetColor(200, 0, 200));

        var desc = "You approach the mysterious, ancient gate. The air buzzes with energy as you peer into the pale " +
            "blue portal. All those shadow beasts, guarding this place.. what's so important about this?";
        desc = Common.processText(desc, 48);
        this.descLabel = scene.add.bitmapText(x + 200, y + 30, "courier16", desc, 16, 1).setOrigin(0.5, 0);

        desc = "\"THE MOON CALLS TO ALL IN THESE LANDS THAT WOULD HEAR IT. BE REBORN IN MOONLIGHT.\"";
        desc = Common.processText(desc, 48);
        this.desc2Label = scene.add.bitmapText(x + 200, y + 107, "courier16", desc, 16, 1).setOrigin(0.5, 0);
        this.desc2Label.setTint(Phaser.Display.Color.GetColor(96, 172, 177));

        desc = "You hear a voice calling to you. Do you enter into the unknown, or continue your journey?";
        desc = Common.processText(desc, 48);
        this.desc3Label = scene.add.bitmapText(x + 200, y + 150, "courier16", desc, 16, 1).setOrigin(0.5, 0);


        var playerData = new PlayerData();
        var costTxt = "MOONLIGHT\n" + playerData.earnableMoonlight(Math.floor(regionDifficulty / 20));
        this.moonlightLabel = scene.add.bitmapText(x + 200, y + 190, "courier20", costTxt, 20, 1).setOrigin(0.5, 0);
        this.moonlightLabel.setTint(Phaser.Display.Color.GetColor(206, 238, 240));

        this.rebirthButton = new TextButton(scene, x + 30, y + 240, 155, 20, "Enter");
        this.leaveButton = new TextButton(scene, x + 215, y + 240, 155, 20, "Leave");
    }

    onRebirthHandler(callback) {
        this.rebirthButton.onClickHandler(callback);
        return this;
    }
    onLeaveHandler(callback) {
        this.leaveButton.onClickHandler(callback);
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.descLabel.destroy();
        this.desc2Label.destroy();
        this.desc3Label.destroy();
        this.moonlightLabel.destroy();
        this.rebirthButton.destroy();
        this.leaveButton.destroy();
    }
}