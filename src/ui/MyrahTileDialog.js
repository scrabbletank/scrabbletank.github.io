import { Common } from "../utils/Common";
import { PlayerData } from "../data/PlayerData";
import { TextButton } from "./TextButton";

export class MyrahTileDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 400, 270, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(177, 100, 169);
        this.backingRect.lineWidth = 2;

        this.titleLabel = scene.add.bitmapText(x + 200, y + 10, "courier20", "Starlight Palace").setOrigin(0.5, 0);
        this.titleLabel.setTint(Phaser.Display.Color.GetColor(177, 100, 169));

        var desc = "You've made it to the only structure you can see in this vast void, a palace made from the light of thousands " +
        "of stars. You get the feeling that everything you've done in this world has lead to this moment. Who knows what's inside? " +
        "Maybe you should grab a meal, do some stretches, and inject a few million shade into your veins before entering.";
        desc = Common.processText(desc, 48);
        this.descLabel = scene.add.bitmapText(x + 200, y + 50, "courier16", desc, 16, 1).setOrigin(0.5, 0);

        this.enterButton = new TextButton(scene, x + 30, y + 240, 155, 20, "Enter");
        this.leaveButton = new TextButton(scene, x + 215, y + 240, 155, 20, "Leave");
    }

    onRebirthHandler(callback) {
        this.enterButton.onClickHandler(callback);
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
        this.enterButton.destroy();
        this.leaveButton.destroy();
    }
}