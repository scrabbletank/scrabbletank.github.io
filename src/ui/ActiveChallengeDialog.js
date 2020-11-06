import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { WorldTime } from "../data/WorldTime";
import { DynamicSettings } from "../data/DynamicSettings";
import { WorldData } from "../data/WorldData";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "./TextButton";

export class ActiveChallengeDialog {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 700, 500, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 4;

        this.title = scene.add.bitmapText(x + 350, y + 5, "courier20", DynamicSettings.getInstance().challengeName).setOrigin(0.5, 0);

        var runTime = WorldData.getInstance().time.time - WorldData.getInstance().timeAtRunStart;
        var txt = TooltipRegistry.getChallengeDescription(MoonlightData.getInstance().getChallengeFromName(DynamicSettings.getInstance().challengeName));
        txt += "\nCurrent Run Time: " + new WorldTime(runTime).getTimespanText() + "\n\n" +
            "You may abandon this challenge, causing you to gate immediately. You will not get any Moonlight for this run if you abandon.";
        this.desc = scene.add.bitmapText(x + 10, y + 30, "courier20", Common.processText(txt, 70)).setOrigin(0);


        this.abandonBtn = new TextButton(scene, x + 225, y + 450, 120, 20, "Abandon");
        this.cancelBtn = new TextButton(scene, x + 355, y + 450, 120, 20, "Cancel");
    }

    onAbandonHandler(callback) {
        this.abandonBtn.onClickHandler(() => { callback(); });
        return this;
    }
    onCancelHandler(callback) {
        this.cancelBtn.onClickHandler(() => { callback(); });
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.title.destroy();
        this.abandonBtn.destroy();
        this.cancelBtn.destroy();
        this.desc.destroy();
    }
}